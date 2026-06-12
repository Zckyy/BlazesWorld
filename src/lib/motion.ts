import type { Variants } from 'framer-motion'

/** Shared scroll-reveal variants. Components pair these with whileInView. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const viewportOnce = { once: true, amount: 0.25 } as const
