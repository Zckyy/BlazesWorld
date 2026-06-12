import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { PhotoFeed } from '../types'
import { loadPhotos, shufflePhotos } from '../lib/photos'
import { viewportOnce } from '../lib/motion'
import { SectionHeading } from './SectionHeading'
import { Lightbox } from './Lightbox'
import { PawIcon } from './decor/PawIcon'

const PAGE_SIZE = 9

function GallerySkeleton() {
  // Varied heights so the loading state already looks like a masonry grid.
  const heights = ['h-72', 'h-56', 'h-64', 'h-80', 'h-56', 'h-72', 'h-64', 'h-80', 'h-56']
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3" aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className={`skeleton mb-5 break-inside-avoid rounded-3xl ${h}`} />
      ))}
    </div>
  )
}

export function Gallery() {
  const [feed, setFeed] = useState<PhotoFeed | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    let cancelled = false
    loadPhotos().then((result) => {
      if (!cancelled) setFeed(result)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const photos = (feed?.photos ?? []).filter((p) => !failedIds.has(p.id))
  const visible = photos.slice(0, visibleCount)
  const isLive = feed?.source === 'google-photos'

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Gallery"
        title="A gallery of chaos, cuddles & cat magic"
        subtitle="Freshly groomed highlights from the Blaze archives."
      />

      {/* feed source + shuffle controls */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm font-semibold ${
            isLive ? 'bg-accent-soft text-ink' : 'bg-surface text-ink-soft'
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-gold'}`}
          />
          {feed === null ? 'Summoning photos…' : isLive ? 'Live from Google Photos' : 'Sample gallery'}
        </span>
        {photos.length > 1 && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: -3 }}
            onClick={() => {
              setFeed((f) => (f ? { ...f, photos: shufflePhotos(f.photos) } : f))
              setVisibleCount(PAGE_SIZE)
            }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent/40 bg-surface px-4 py-1.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <span aria-hidden="true">🎲</span> Shuffle the chaos
          </motion.button>
        )}
      </div>

      {feed?.fallbackReason && (
        <p role="status" className="mb-8 text-center text-sm text-ink-soft">
          The live photo feed had a nap ({feed.fallbackReason}) — showing the sample gallery instead.
        </p>
      )}

      {feed === null ? (
        <>
          <p role="status" className="sr-only">
            Loading photos of Blaze
          </p>
          <GallerySkeleton />
        </>
      ) : photos.length === 0 ? (
        <div className="rounded-3xl border border-line bg-surface p-12 text-center">
          <span className="text-5xl" aria-hidden="true">
            🙀
          </span>
          <p className="mt-4 font-display text-xl font-semibold text-ink">The photos escaped!</p>
          <p className="mt-2 text-ink-soft">No images could be loaded right now — try again in a little while.</p>
        </div>
      ) : (
        <>
          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {visible.map((photo, i) => (
              <motion.li
                key={photo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="mb-5 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Open photo: ${photo.alt}`}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl border border-line bg-base-soft shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-glow"
                >
                  <img
                    src={photo.thumb ?? photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => setFailedIds((s) => new Set(s).add(photo.id))}
                    className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {/* hover overlay */}
                  <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 text-sm font-semibold text-white">
                      <PawIcon className="w-4" /> Peek closer
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>

          {visibleCount < photos.length && (
            <div className="mt-10 text-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-accent/40 bg-surface px-7 py-3 font-display font-semibold text-ink transition-colors hover:border-accent"
              >
                More floof, please <span aria-hidden="true">🐾</span>
              </motion.button>
            </div>
          )}

          <Lightbox
            photos={visible}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        </>
      )}
    </section>
  )
}
