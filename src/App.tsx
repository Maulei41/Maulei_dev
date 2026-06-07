import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'

function App() {
  useEffect(() => {
    // Remove dark class for light theme
    document.documentElement.classList.remove('dark')
    // Smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1001] focus:px-4 focus:py-2 focus:bg-[#0071e3] focus:text-white focus:rounded-btn focus:text-[14px] focus:font-[500] focus:no-underline"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>    
  )
}

export default App
