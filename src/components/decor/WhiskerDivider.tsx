/** Decorative section divider: a cat nose with whiskers fanning outwards. */
export function WhiskerDivider() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <svg viewBox="0 0 260 40" className="h-8 w-56 text-ink-soft/70" fill="none">
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <line x1="10" y1="14" x2="96" y2="20" />
          <line x1="14" y1="26" x2="96" y2="25" />
          <line x1="250" y1="14" x2="164" y2="20" />
          <line x1="246" y1="26" x2="164" y2="25" />
        </g>
        <path d="M124 16 h12 l-6 7 z" fill="var(--c-pink)" />
        <path
          d="M130 23 q0 5 -6 6 M130 23 q0 5 6 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
