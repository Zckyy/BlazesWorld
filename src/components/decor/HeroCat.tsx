/**
 * The hero illustration: a sitting orange cat with a gently swishing tail and
 * blinking eyes (CSS keyframes — disabled by prefers-reduced-motion).
 */
export function HeroCat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 380" className={className} role="img" aria-label="Illustration of Blaze, an orange cat, sitting with a gently swishing tail">
      <defs>
        <linearGradient id="hero-cat-body" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#f59a52" />
          <stop offset="1" stopColor="#e0762d" />
        </linearGradient>
        <radialGradient id="hero-cat-glow" cx="0.5" cy="0.6" r="0.55">
          <stop offset="0" stopColor="var(--c-glow)" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>

      <circle cx="180" cy="220" r="160" fill="url(#hero-cat-glow)" />

      {/* tail (swishes) */}
      <g className="anim-tail">
        <path
          d="M252 330 q78 10 70 -72"
          stroke="url(#hero-cat-body)"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M322 268 q4 -22 -4 -34" stroke="#fcd9b8" strokeWidth="34" strokeLinecap="round" fill="none" />
      </g>

      {/* body */}
      <ellipse cx="180" cy="268" rx="92" ry="102" fill="url(#hero-cat-body)" />
      {/* chest patch */}
      <ellipse cx="180" cy="300" rx="48" ry="56" fill="#fcd9b8" opacity="0.9" />
      {/* front paws */}
      <ellipse cx="148" cy="358" rx="26" ry="14" fill="#f7a763" />
      <ellipse cx="212" cy="358" rx="26" ry="14" fill="#f7a763" />

      {/* ears */}
      <path d="M96 96 L114 22 L162 70 Z" fill="#e0762d" />
      <path d="M110 88 L120 42 L150 72 Z" fill="#f9b9c3" />
      <path d="M264 96 L246 22 L198 70 Z" fill="#e0762d" />
      <path d="M250 88 L240 42 L210 72 Z" fill="#f9b9c3" />

      {/* head */}
      <circle cx="180" cy="128" r="86" fill="url(#hero-cat-body)" />

      {/* stripes */}
      <g stroke="#c75f1d" strokeWidth="9" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M150 52 q4 14 -2 24" />
        <path d="M180 46 q2 16 0 28" />
        <path d="M210 52 q-4 14 2 24" />
      </g>

      {/* eyes (blink) */}
      <g className="anim-blink">
        <ellipse cx="146" cy="124" rx="13" ry="16" fill="#3c2415" />
        <ellipse cx="214" cy="124" rx="13" ry="16" fill="#3c2415" />
        <circle cx="150" cy="118" r="4.5" fill="#fff" />
        <circle cx="218" cy="118" r="4.5" fill="#fff" />
      </g>

      {/* muzzle */}
      <path d="M172 156 L188 156 L180 166 Z" fill="#f06292" />
      <path d="M180 166 q0 12 -14 14 M180 166 q0 12 14 14" stroke="#3c2415" strokeWidth="4.5" strokeLinecap="round" fill="none" />

      {/* whiskers */}
      <g stroke="#fff3e0" strokeWidth="4" strokeLinecap="round" opacity="0.95">
        <line x1="120" y1="142" x2="58" y2="132" />
        <line x1="120" y1="156" x2="60" y2="160" />
        <line x1="240" y1="142" x2="302" y2="132" />
        <line x1="240" y1="156" x2="300" y2="160" />
      </g>
    </svg>
  )
}
