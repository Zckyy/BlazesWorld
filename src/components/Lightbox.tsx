import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Photo } from '../types'

interface LightboxProps {
  photos: Photo[]
  /** Index of the open photo, or null when closed. */
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/** Full-screen photo modal with keyboard navigation and focus handling. */
export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<Element | null>(null)

  const open = index !== null
  const photo = open ? photos[index] : null

  const prev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + photos.length) % photos.length)
  }, [index, photos.length, onNavigate])

  const next = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % photos.length)
  }, [index, photos.length, onNavigate])

  // Keyboard: Esc closes, arrows navigate, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, prev, next])

  // Lock body scroll and manage focus while open.
  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus()
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${photo.alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <motion.figure
            key={photo.id}
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="max-h-[80svh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-white/85">
              {photo.alt}
              <span className="mx-2 opacity-50" aria-hidden="true">
                •
              </span>
              {index + 1} / {photos.length}
            </figcaption>
          </motion.figure>

          <button
            ref={closeRef}
            type="button"
            aria-label="Close photo viewer"
            onClick={onClose}
            className="absolute top-4 right-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-xl text-white transition hover:rotate-90 hover:bg-white/25"
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-xl text-white transition hover:scale-110 hover:bg-white/25 sm:left-6"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-xl text-white transition hover:scale-110 hover:bg-white/25 sm:right-6"
              >
                →
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
