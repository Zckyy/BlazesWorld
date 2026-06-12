import { motion } from 'framer-motion'
import { PawIcon } from './decor/PawIcon'
import { WhiskerDivider } from './decor/WhiskerDivider'

/** Trail of paw prints that fade in one after another, like a cat walked by. */
function PawTrail() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.18, type: 'spring', stiffness: 260, damping: 14 }}
          className="text-accent"
          style={{ transform: `rotate(${i % 2 === 0 ? -16 : 16}deg)` }}
        >
          <PawIcon className="w-5" />
        </motion.span>
      ))}
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="theme-fade border-t border-line bg-surface-deep">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
        <PawTrail />
        <WhiskerDivider />
        <p className="font-display text-2xl font-semibold text-ink">
          Thanks for visiting Blazes<span className="text-accent">World</span>
        </p>
        <p className="mt-2 text-ink-soft">
          Made with <span aria-label="orange heart">🧡</span> and an unreasonable number of treats.
        </p>
        <p className="mt-6 text-sm text-ink-soft/80">
          © {year} BlazesWorld · Approved by Blaze (payment received in chin scratches)
        </p>
        <motion.a
          href="#home"
          whileHover={{ y: -3 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-accent hover:text-accent"
        >
          <span aria-hidden="true">↑</span> Back to the top
        </motion.a>
      </div>
    </footer>
  )
}
