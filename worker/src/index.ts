/**
 * BlazesWorld photo feed — a tiny Cloudflare Worker that mirrors a Google
 * Photos "share by link" album as JSON the static site can consume.
 *
 * WHY THIS EXISTS
 * ---------------
 * Since 31 March 2025 the Google Photos Library API only exposes media that
 * the calling app itself uploaded (the *.appcreateddata scopes); the
 * photoslibrary.readonly scope is gone, and the Picker API requires an
 * interactive user session per pick. There is therefore no official API that
 * lets a website automatically read a user's album. The practical secure
 * alternative is a link-shared album: the album page is intentionally public
 * (anyone with the link can view it), so this worker fetches that page
 * server-side and extracts the image URLs. No OAuth, no secrets in the
 * frontend, nothing private is exposed beyond what the share link already
 * shares.
 *
 * CAVEAT: parsing the shared-album page is unofficial. If Google changes the
 * page format this worker starts returning errors — and the website simply
 * falls back to its bundled sample gallery, so nothing breaks visibly.
 *
 * CONFIG (set via `wrangler secret put` / dashboard):
 *   ALBUM_URL       required — https://photos.app.goo.gl/… share link
 *   ALLOWED_ORIGIN  optional — CORS origin, defaults to "*"
 *   CACHE_SECONDS   optional — edge cache TTL, defaults to 1800 (30 min)
 *   MAX_PHOTOS      optional — cap on returned photos, defaults to 60
 */

export interface Env {
  ALBUM_URL: string
  ALLOWED_ORIGIN?: string
  CACHE_SECONDS?: string
  MAX_PHOTOS?: string
}

interface FeedPhoto {
  id: string
  src: string
  thumb: string
  width: number
  height: number
  alt: string
}

// Matches ["<baseUrl>",width,height entries in the album page's embedded data.
const PHOTO_RE = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9_\-./]+)",(\d+),(\d+)/g

function corsHeaders(env: Env): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN ?? '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Max-Age': '86400',
  }
}

function json(body: unknown, status: number, env: Env, cacheSeconds = 0): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cacheSeconds > 0 ? `public, s-maxage=${cacheSeconds}, max-age=300` : 'no-store',
      ...corsHeaders(env),
    },
  })
}

async function fetchAlbumPhotos(env: Env): Promise<FeedPhoto[]> {
  const res = await fetch(env.ALBUM_URL, {
    redirect: 'follow',
    headers: {
      // A browser-ish UA so Google serves the regular album page.
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'Accept-Language': 'en',
    },
  })
  if (!res.ok) throw new Error(`Album page responded with ${res.status}`)
  const html = await res.text()

  const seen = new Set<string>()
  const photos: FeedPhoto[] = []
  const maxPhotos = Number(env.MAX_PHOTOS ?? 60)

  for (const match of html.matchAll(PHOTO_RE)) {
    const [, baseUrl, w, h] = match
    if (seen.has(baseUrl)) continue
    seen.add(baseUrl)
    photos.push({
      id: `gp-${seen.size}`,
      // Size parameters are appended to the base URL per Google's CDN scheme.
      src: `${baseUrl}=w1600`,
      thumb: `${baseUrl}=w640`,
      width: Number(w),
      height: Number(h),
      alt: 'A photo of Blaze the cat',
    })
  }

  if (photos.length === 0) {
    throw new Error('No photos found — the album may be empty or Google changed the page format')
  }

  // Shared album pages list oldest first; the site wants recent photos first.
  return photos.reverse().slice(0, maxPhotos)
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) })
    }
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed' }, 405, env)
    }
    if (!env.ALBUM_URL) {
      return json({ error: 'ALBUM_URL is not configured' }, 500, env)
    }

    const cacheSeconds = Number(env.CACHE_SECONDS ?? 1800)
    const cache = caches.default
    const url = new URL(request.url)
    const cacheKey = new Request(url.origin + '/feed', request)

    // ?refresh=1 forces a fresh fetch from the album (e.g. right after
    // deleting photos) instead of waiting out the edge-cache TTL.
    const forceRefresh = url.searchParams.get('refresh') === '1'
    if (forceRefresh) {
      await cache.delete(cacheKey)
    } else {
      const cached = await cache.match(cacheKey)
      if (cached) return cached
    }

    try {
      const photos = await fetchAlbumPhotos(env)
      const response = json({ photos, fetchedAt: new Date().toISOString() }, 200, env, cacheSeconds)
      ctx.waitUntil(cache.put(cacheKey, response.clone()))
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return json({ error: message }, 502, env)
    }
  },
} satisfies ExportedHandler<Env>
