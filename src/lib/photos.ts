import type { Photo, PhotoFeed } from '../types'
import { samplePhotos } from '../data/samplePhotos'

/**
 * Photo provider with graceful degradation:
 *
 *   1. If VITE_PHOTOS_API_URL is set, fetch the live feed (a small Cloudflare
 *      Worker that mirrors a Google Photos shared album — see /worker).
 *   2. Cache the result in sessionStorage so navigating around the site
 *      doesn't re-hit the API.
 *   3. On any failure (offline, quota, worker down, bad payload) fall back to
 *      the bundled sample gallery and report why.
 */

const API_URL = import.meta.env.VITE_PHOTOS_API_URL as string | undefined
const CACHE_KEY = 'blazesworld:photos:v1'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
const FETCH_TIMEOUT_MS = 9000

interface CachedFeed {
  fetchedAt: number
  photos: Photo[]
}

function readCache(): Photo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw) as CachedFeed
    if (Date.now() - cached.fetchedAt > CACHE_TTL_MS) return null
    return cached.photos.length > 0 ? cached.photos : null
  } catch {
    return null
  }
}

function writeCache(photos: Photo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), photos } satisfies CachedFeed))
  } catch {
    // Storage full or unavailable — caching is best-effort only.
  }
}

function isValidPhoto(p: unknown): p is Photo {
  if (typeof p !== 'object' || p === null) return false
  const photo = p as Record<string, unknown>
  return (
    typeof photo.src === 'string' &&
    photo.src.startsWith('https://') &&
    typeof photo.width === 'number' &&
    typeof photo.height === 'number'
  )
}

async function fetchLivePhotos(url: string): Promise<Photo[]> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`Photo API responded with ${res.status}`)
    const data: unknown = await res.json()
    const list = Array.isArray(data) ? data : (data as { photos?: unknown[] }).photos
    if (!Array.isArray(list)) throw new Error('Unexpected photo API payload')
    const photos = list.filter(isValidPhoto).map((p, i) => ({
      ...p,
      id: p.id ?? `live-${i}`,
      alt: p.alt || 'A photo of Blaze the cat',
    }))
    if (photos.length === 0) throw new Error('Photo API returned no usable photos')
    return photos
  } finally {
    clearTimeout(timer)
  }
}

export async function loadPhotos(): Promise<PhotoFeed> {
  if (!API_URL) {
    return { source: 'sample', photos: samplePhotos }
  }

  const cached = readCache()
  if (cached) {
    return { source: 'google-photos', photos: cached }
  }

  try {
    const photos = await fetchLivePhotos(API_URL)
    writeCache(photos)
    return { source: 'google-photos', photos }
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown error'
    return { source: 'sample', photos: samplePhotos, fallbackReason: reason }
  }
}

/** Fisher–Yates shuffle (non-mutating) — used for the “shuffle” button. */
export function shufflePhotos(photos: Photo[]): Photo[] {
  const out = [...photos]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
