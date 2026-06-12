import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../lib/motion'
import { PawIcon } from './decor/PawIcon'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
}

/** Consistent animated heading block used at the top of every section. */
export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <p className="mb-2 flex items-center justify-center gap-2 font-display text-sm font-semibold tracking-[0.2em] text-accent uppercase">
        <PawIcon className="w-4" />
        {eyebrow}
        <PawIcon className="w-4 -scale-x-100" />
      </p>
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>}
    </motion.div>
  )
}
