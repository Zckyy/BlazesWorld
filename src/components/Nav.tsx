import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Theme } from '../types'
import { ThemeToggle } from './ThemeToggle'
import { PawIcon } from './decor/PawIcon'

const links = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#favourites', label: 'Favourites' },
  { href: '#memories', label: 'Memories' },
]

interface NavProps {
  theme: Theme
  onToggleTheme: () => void
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`theme-fade fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled ? 'bg-base/85 shadow-lg shadow-glow backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a
          href="#home"
          className="group flex items-center gap-2 font-display text-xl font-semibold text-ink"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white shadow-md transition-transform group-hover:-rotate-12">
            <PawIcon className="w-5" />
          </span>
          Blazes<span className="text-accent">World</span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-lg px-3 py-2 font-semibold text-ink-soft transition-colors hover:text-accent"
            >
              {l.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <div className="ml-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>

        {/* mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-line bg-surface text-ink"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute top-1.5 left-0 block h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-base/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-2 py-3 font-semibold text-ink-soft transition-colors hover:text-accent"
                >
                  <PawIcon className="w-4 text-accent/60" />
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
