/** A single gallery photo, regardless of where it came from. */
export interface Photo {
  id: string
  /** Full-size image URL (used in the lightbox). */
  src: string
  /** Smaller URL for the grid; falls back to `src` when absent. */
  thumb?: string
  width: number
  height: number
  alt: string
}

export type PhotoSource = 'google-photos' | 'sample'

export interface PhotoFeed {
  source: PhotoSource
  photos: Photo[]
  /** Set when the live feed failed and we fell back to samples. */
  fallbackReason?: string
}

export type Theme = 'day' | 'night'
