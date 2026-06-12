interface PawIconProps {
  className?: string
}

/** Simple paw-print glyph used for logos, bullets and floating decorations. */
export function PawIcon({ className }: PawIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="12" cy="15.5" rx="5.2" ry="4.4" />
      <circle cx="5" cy="10.2" r="2.1" />
      <circle cx="9.4" cy="7.3" r="2.2" />
      <circle cx="14.6" cy="7.3" r="2.2" />
      <circle cx="19" cy="10.2" r="2.1" />
    </svg>
  )
}
