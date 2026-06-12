import { useTheme } from './hooks/useTheme'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Gallery } from './components/Gallery'
import { Favourites } from './components/Favourites'
import { Timeline } from './components/Timeline'
import { Footer } from './components/Footer'
import { WhiskerDivider } from './components/decor/WhiskerDivider'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Nav theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <About />
        <WhiskerDivider />
        <Gallery />
        <Favourites />
        <Timeline />
      </main>

      <Footer />
    </>
  )
}
