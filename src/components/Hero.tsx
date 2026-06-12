import { motion } from 'framer-motion'
import { heroIntro, tagline } from '../data/content'
import { FloatingPaws } from './decor/FloatingPaws'
import { HeroCat } from './decor/HeroCat'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden pt-16">
      {/* morphing gradient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="anim-blob absolute -top-32 -left-24 h-[28rem] w-[28rem] blur-3xl"
          style={{ background: 'var(--c-blob-a)' }}
        />
        <div
          className="anim-blob absolute top-1/3 -right-32 h-[26rem] w-[26rem] blur-3xl"
          style={{ background: 'var(--c-blob-b)', animationDelay: '-6s' }}
        />
        <div
          className="anim-blob absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] blur-3xl"
          style={{ background: 'var(--c-blob-c)', animationDelay: '-11s' }}
        />
      </div>

      <FloatingPaws />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <motion.div variants={container} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.p
            variants={item}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 font-semibold text-ink-soft shadow-sm backdrop-blur-sm"
          >
            <span aria-hidden="true">🐾</span> The official home of Blaze
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl leading-tight font-bold text-ink sm:text-6xl md:text-7xl"
          >
            Welcome to{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="bg-gradient-to-r from-accent via-pink to-gold bg-clip-text text-transparent">
                BlazesWorld
              </span>
              <svg
                viewBox="0 0 220 14"
                className="absolute -bottom-2 left-0 w-full text-accent/60"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 10 Q 55 2 110 8 T 216 6"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 font-display text-2xl font-medium text-accent sm:text-3xl">
            {tagline}
          </motion.p>

          <motion.p variants={item} className="mx-auto mt-4 max-w-xl text-lg text-ink-soft lg:mx-0">
            {heroIntro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-lg font-semibold text-white shadow-lg shadow-glow transition-shadow hover:shadow-xl"
            >
              See the floof <span aria-hidden="true">📸</span>
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-accent/40 bg-surface/70 px-7 py-3.5 font-display text-lg font-semibold text-ink backdrop-blur-sm transition-colors hover:border-accent"
            >
              Meet Blaze <span aria-hidden="true">🐱</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="anim-float mx-auto w-64 sm:w-80 lg:w-full lg:max-w-md"
        >
          <HeroCat className="h-auto w-full drop-shadow-xl" />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-soft transition-colors hover:text-accent sm:flex"
      >
        <span className="text-xs font-semibold tracking-widest uppercase">scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} aria-hidden="true">
          ↓
        </motion.span>
      </motion.a>
    </section>
  )
}
