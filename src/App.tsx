import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import MagneticCursor from './components/effects/MagneticCursor'

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Set dark mode
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <>
      {/* Grain overlay — subtle noise texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Skip-to-content link */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <MagneticCursor />
      <div className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </>
  )
}

export default App
