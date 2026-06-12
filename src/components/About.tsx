import { motion } from 'framer-motion'
import { facts } from '../data/content'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="About Blaze"
        title="The cat behind the legend"
        subtitle="Six essential facts about the small orange creature running this household."
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {facts.map((fact) => (
          <motion.li key={fact.title} variants={fadeUp}>
            <motion.div
              whileHover={{ y: -6, rotate: -0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glow-card theme-fade group h-full rounded-3xl border border-line bg-surface p-6"
            >
              <span
                aria-hidden="true"
                className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-3xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
              >
                {fact.icon}
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">{fact.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{fact.text}</p>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
