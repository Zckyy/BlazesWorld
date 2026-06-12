import { motion } from 'framer-motion'
import type { Theme } from '../types'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

/**
 * Playful sun/moon switch with cat ears on the sliding knob.
 * The knob slides across and the icon cross-fades between ☀ and ☾.
 */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isNight = theme === 'night'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isNight}
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
      onClick={onToggle}
      className="theme-fade relative h-9 w-[4.25rem] cursor-pointer rounded-full border border-line bg-base-soft px-1 shadow-inner transition-colors hover:border-accent/50"
    >
      {/* track icons */}
      <span aria-hidden="true" className="absolute top-1/2 left-2.5 -translate-y-1/2 text-xs opacity-60">
        ☀️
      </span>
      <span aria-hidden="true" className="absolute top-1/2 right-2.5 -translate-y-1/2 text-xs opacity-60">
        🌙
      </span>

      {/* sliding knob with cat ears */}
      <motion.span
        aria-hidden="true"
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm shadow-md"
        animate={{ x: isNight ? 32 : 0, rotate: isNight ? 360 : 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      >
        {/* tiny ears */}
        <span className="absolute -top-1.5 left-1 h-0 w-0 border-x-[5px] border-b-[7px] border-x-transparent border-b-accent" />
        <span className="absolute -top-1.5 right-1 h-0 w-0 border-x-[5px] border-b-[7px] border-x-transparent border-b-accent" />
        <span className="text-[13px] leading-none">{isNight ? '🌙' : '☀️'}</span>
      </motion.span>
    </button>
  )
}
