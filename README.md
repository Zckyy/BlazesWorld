# 🐾 BlazesWorld

> Tiny paws. Big personality. The official home of Blaze the cat.

A modern, animated, fully responsive single-page website dedicated to Blaze — built with **Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion**, deployed to **GitHub Pages**, with an optional **Cloudflare Worker** that keeps the gallery in sync with a Google Photos album.

## Features

- ✨ Animated hero with morphing gradient blobs, floating paw prints and an illustrated blinking/tail-swishing Blaze
- ☀️🌙 Day/night theme toggle (cat-eared knob) — respects `prefers-color-scheme` on first visit, persists to `localStorage`, animated cross-fade
- 📸 Masonry photo gallery with lazy loading, shimmer skeletons, shuffle button, and a keyboard-navigable lightbox
- 🧶 About facts, favourite things, and an animated memories timeline — all copy editable in one file
- ♿ Semantic HTML, skip link, focus states, ARIA labels, focus-trapped modal, and full `prefers-reduced-motion` support
- 🖼️ Bundled illustrated sample gallery so the site is never empty, even with no API configured

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Editable content (facts, favourites, timeline, tagline) lives in [`src/data/content.ts`](src/data/content.ts).

## Project structure

```
├─ .github/workflows/deploy.yml   GitHub Pages deployment
├─ public/sample/                 illustrated fallback gallery (generated)
├─ scripts/generate-sample-photos.mjs
├─ src/
│  ├─ components/                 sections + decor (paw icons, hero cat, …)
│  ├─ data/                       editable copy + sample photo manifest
│  ├─ hooks/useTheme.ts           day/night theme state
│  ├─ lib/photos.ts               photo provider (live feed → sample fallback)
│  └─ index.css                   theme tokens + animations (Tailwind v4)
└─ worker/                        optional Cloudflare Worker photo feed
```

## Deploying to GitHub Pages

1. Create a GitHub repository named **BlazesWorld** and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push (or run the workflow manually) — the included [`deploy.yml`](.github/workflows/deploy.yml) builds and publishes automatically.
4. The site appears at `https://<your-username>.github.io/BlazesWorld/`.

> The Vite `base` defaults to `/BlazesWorld/` for production builds. If you rename the repo or use a custom domain, set the `VITE_BASE` environment variable accordingly (e.g. `/my-repo/` or `/`).

## Google Photos integration

### ⚠️ The important limitation (read this first)

As of **31 March 2025**, Google removed the `photoslibrary.readonly`, `photoslibrary.sharing` and `photoslibrary` OAuth scopes. The Library API can now only read photos **that the calling app itself uploaded** (`*.appcreateddata` scopes), and the replacement [Picker API](https://developers.google.com/photos/picker/guides/get-started-picker) requires the user to interactively pick photos in every session. **No official Google API allows a website to automatically read your photo library or albums anymore** — this is true for any backend, not just static sites. Sources: [Google Photos API updates](https://developers.google.com/photos/support/updates), [Google Developers Blog announcement](https://developers.googleblog.com/en/google-photos-picker-api-launch-and-library-api-updates/).

### The implemented alternative: shared-album feed via Cloudflare Worker

The workflow you actually wanted — *“I upload photos to Google Photos and the site updates automatically”* — still works through **link-shared albums**:

1. You keep one Google Photos album for Blaze and turn on **link sharing** for it.
2. A tiny Cloudflare Worker ([`worker/`](worker/src/index.ts)) fetches that public album page server-side, extracts the image URLs and dimensions, caches the result at the edge (30 min default), and serves it as JSON with CORS headers.
3. The frontend fetches that JSON, shows the photos newest-first, and caches them in `sessionStorage`.
4. If anything fails — worker down, album link revoked, Google changed the page format — the site quietly falls back to the bundled sample gallery and shows a friendly note.

Security properties:

- **No OAuth, no client secrets, no tokens** anywhere — there is nothing to leak.
- The album share link lives only in a Worker secret (not in the repo, not in frontend code).
- The worker only ever exposes what the share link already makes public by design.

Honest trade-offs:

- The album page parsing is **unofficial** — Google could change the format and break the feed (the site degrades gracefully to samples until the worker regex is updated).
- A link-shared album is viewable by anyone who has the link. Only share an album you're happy to have on a public website anyway — which is inherently true for photos you're publishing on a website.

### Setup

1. **Create the album**: In Google Photos, make an album for Blaze → ⋮ → *Options* → enable **Link sharing** → copy the `https://photos.app.goo.gl/…` link.
2. **Deploy the worker** (free Cloudflare account is plenty):

   ```bash
   cd worker
   npm install
   npx wrangler login
   npx wrangler secret put ALBUM_URL     # paste the share link when prompted
   npm run deploy
   ```

   Note the deployed URL, e.g. `https://blazesworld-photos.<account>.workers.dev`.
3. **(Recommended)** Lock CORS to your site: in `worker/wrangler.toml` uncomment `ALLOWED_ORIGIN = "https://<your-username>.github.io"` and redeploy.
4. **Point the site at it**:
   - Locally: copy `.env.example` to `.env.local` and set `VITE_PHOTOS_API_URL=https://…workers.dev`.
   - On GitHub: **Settings → Secrets and variables → Actions → Variables** → add `VITE_PHOTOS_API_URL` with the worker URL, then re-run the deploy workflow.

New photos you add to the album appear on the site within the worker's cache window (default 30 minutes).

### Environment variables

| Variable | Where | Required | Purpose |
| --- | --- | --- | --- |
| `VITE_PHOTOS_API_URL` | frontend build (`.env.local` / repo Actions variable) | no | URL of the photo-feed worker; unset = sample gallery |
| `VITE_BASE` | frontend build | no | Vite base path; defaults to `/BlazesWorld/` in production |
| `ALBUM_URL` | worker secret | yes (for live feed) | Google Photos share link |
| `ALLOWED_ORIGIN` | worker var | no | CORS allowlist, defaults to `*` |
| `CACHE_SECONDS` | worker var | no | Edge cache TTL, default `1800` |
| `MAX_PHOTOS` | worker var | no | Cap on returned photos, default `60` |

None of the frontend variables are secrets — `VITE_*` values are baked into the public bundle by design, which is why the integration was built to need no secrets there.

## Known limitations

- **Google Photos**: fully automatic *private* library syncing is impossible with current official APIs (see above). The shared-album approach is the best practical alternative and is unofficial, so it may need a regex tweak in `worker/src/index.ts` if Google changes their page markup.
- **Image alt text** for live photos is generic (“A photo of Blaze the cat”) — Google's shared album page doesn't expose descriptions.
- GitHub Pages serves the site from a subpath; deep-linking uses in-page anchors (`#gallery`) so no SPA-router 404 handling is needed.

## Regenerating the sample gallery

```bash
node scripts/generate-sample-photos.mjs
```

Edit the palettes/scenes at the bottom of the script to taste.

---

Made with 🧡 and an unreasonable number of treats.
