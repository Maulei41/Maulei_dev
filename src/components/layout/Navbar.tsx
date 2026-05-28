import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '../ui/LanguageSwitcher'

const mobileNavVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 },
  },
}

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.3, ease: 'easeOut' as const },
  }),
}

export default function Navbar() {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { label: t('nav.home'), href: '#home', id: 'home' },
    { label: t('nav.about'), href: '#about', id: 'about' },
    { label: t('nav.projects'), href: '#projects', id: 'projects' },
    { label: t('nav.experience'), href: '#experience', id: 'experience' },
    { label: t('nav.contact'), href: '#contact', id: 'contact' },
  ]

  const handleNavClick = useCallback((id: string) => {
    setActiveLink(id)
    setIsMobileMenuOpen(false)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-neutral-800/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={() => setActiveLink('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-display font-bold text-xl text-text-primary hover:text-accent transition-colors border pl-2 pr-2 rounded-3xl"
        >
          Li Ho Yin
        </motion.a>

        {/* Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={() => setActiveLink(item.id)}
              className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                activeLink === item.id ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Right section (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-accent text-bg-primary font-semibold rounded-lg text-sm hover:bg-accent-light transition-colors"
          >
            {t('nav.getInTouch')}
          </motion.a>
        </div>

        {/* Mobile hamburger button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="p-2 text-text-primary hover:text-accent transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="mobile-drawer"
              variants={mobileNavVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-72 bg-bg-primary border-l border-neutral-800/30 shadow-2xl md:hidden flex flex-col z-50"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/20">
                <span className="font-display font-bold text-lg text-text-primary">{t('nav.home')}</span>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-2 text-text-secondary hover:text-accent transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    custom={idx}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleNavClick(item.id)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      activeLink === item.id
                        ? 'text-accent bg-accent/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-neutral-800/30'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-6 border-t border-neutral-800/20 space-y-4">
                <motion.a
                  href="#contact"
                  onClick={closeMenu}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-6 py-3 bg-accent text-bg-primary font-semibold rounded-lg text-center text-sm hover:bg-accent-light transition-colors"
                >
                  {t('nav.getInTouch')}
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
