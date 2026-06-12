import { motion } from 'framer-motion'
import { favourites } from '../data/content'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { SectionHeading } from './SectionHeading'
import { PawIcon } from './decor/PawIcon'

export function Favourites() {
  return (
    <section id="favourites" className="theme-fade relative bg-base-soft/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Favourite things"
          title="Officially endorsed by Blaze"
          subtitle="A curated list of the finest toys, naps, snacks and questionable habits."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {favourites.map((cat, i) => (
            <motion.li key={cat.title} variants={fadeUp}>
              <motion.div
                whileHover={{ y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="glow-card theme-fade h-full rounded-3xl border border-line bg-surface p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-soft text-2xl">
                    {cat.icon}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">{cat.title}</h3>
                </div>
                <p className="mb-4 text-sm font-semibold text-accent">{cat.blurb}</p>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-ink-soft">
                      <PawIcon className="mt-0.5 w-3.5 shrink-0 text-pink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
