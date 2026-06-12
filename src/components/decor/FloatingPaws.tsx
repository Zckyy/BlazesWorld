import { PawIcon } from './PawIcon'

interface FloatSpec {
  top: string
  left: string
  size: string
  delay: string
  duration: string
  opacity: number
  rotate: number
}

// Deterministic layout so the hero looks the same on every visit.
const paws: FloatSpec[] = [
  { top: '14%', left: '8%', size: 'w-8', delay: '0s', duration: '9s', opacity: 0.5, rotate: -18 },
  { top: '68%', left: '5%', size: 'w-6', delay: '2.2s', duration: '12s', opacity: 0.4, rotate: 12 },
  { top: '22%', left: '88%', size: 'w-10', delay: '1.1s', duration: '10s', opacity: 0.45, rotate: 22 },
  { top: '76%', left: '90%', size: 'w-7', delay: '3.4s', duration: '11s', opacity: 0.4, rotate: -10 },
  { top: '44%', left: '94%', size: 'w-5', delay: '0.6s', duration: '13s', opacity: 0.35, rotate: 8 },
  { top: '55%', left: '12%', size: 'w-5', delay: '4.1s', duration: '10s', opacity: 0.3, rotate: -25 },
  { top: '8%', left: '38%', size: 'w-6', delay: '2.8s', duration: '12s', opacity: 0.3, rotate: 15 },
  { top: '12%', left: '70%', size: 'w-5', delay: '1.7s', duration: '9s', opacity: 0.35, rotate: -8 },
]

/** Softly drifting paw prints layered behind hero content. */
export function FloatingPaws() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {paws.map((p, i) => (
        <span
          key={i}
          className="anim-drift absolute text-accent"
          style={{
            top: p.top,
            left: p.left,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <PawIcon className={p.size} />
        </span>
      ))}
    </div>
  )
}
