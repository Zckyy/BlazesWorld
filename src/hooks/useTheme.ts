import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../types'

const STORAGE_KEY = 'blazesworld:theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
}

function initialTheme(): Theme {
  // index.html already resolved this before first paint — trust the DOM.
  const fromDom = document.documentElement.dataset.theme
  if (fromDom === 'day' || fromDom === 'night') return fromDom
  return systemTheme()
}

/**
 * Day/night theme state. Persists explicit choices to localStorage and tracks
 * the OS preference until the user picks a side.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'night' ? '#161427' : '#fff7ed')
  }, [theme])

  // Follow OS changes only while the user hasn't made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!localStorage.getItem(STORAGE_KEY)) setTheme(systemTheme())
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'day' ? 'night' : 'day'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Private browsing — preference just won't persist.
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
