import { motion } from 'framer-motion'
import { memories } from '../data/content'
import { viewportOnce } from '../lib/motion'
import { SectionHeading } from './SectionHeading'
import { PawIcon } from './decor/PawIcon'

export function Timeline() {
  return (
    <section id="memories" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Memories"
        title="A timeline of tiny chaos"
        subtitle="Milestones, incidents and victories from the life of Blaze so far."
      />

      <ol className="relative">
        {/* vertical line */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[1.05rem] w-0.5 rounded-full bg-gradient-to-b from-accent via-pink to-gold opacity-50 sm:left-1/2 sm:-translate-x-1/2"
        />

        {memories.map((memory, i) => {
          const left = i % 2 === 0
          return (
            <li key={memory.title} className="relative pb-12 last:pb-0">
              <div className={`sm:flex ${left ? 'sm:justify-start' : 'sm:justify-end'}`}>
                <motion.div
                  initial={{ opacity: 0, x: left ? -36 : 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`glow-card theme-fade ml-12 rounded-3xl border border-line bg-surface p-6 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                    left ? 'sm:text-right' : ''
                  }`}
                >
                  <p className="text-sm font-bold tracking-wide text-accent uppercase">{memory.date}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    <span aria-hidden="true" className="mr-1.5">
                      {memory.icon}
                    </span>
                    {memory.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{memory.text}</p>
                </motion.div>
              </div>

              {/* paw marker on the line */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={viewportOnce}
                transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.15 }}
                aria-hidden="true"
                className="absolute top-6 left-0 grid h-9 w-9 place-items-center rounded-full bg-accent text-white shadow-md shadow-glow sm:left-1/2 sm:-translate-x-1/2"
              >
                <PawIcon className="w-4.5" />
              </motion.span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
