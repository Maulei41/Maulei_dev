import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

/* ─── Variants ─── */

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const deckVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 14,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
}

const listVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 24 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
}

/* ─── Animated hamburger / close icon ─── */
/* Uses <motion.div> bars with CSS transforms instead of SVG path
   morphing. GPU-accelerated, avoids expensive SVG path interpolation. */

function MenuToggle({ open }: { open: boolean }) {
  const spring = { type: 'spring' as const, stiffness: 400, damping: 24 }

  return (
    <div className="relative w-5 h-5" aria-hidden="true">
      {/* Top bar → rotates 45° down to form X */}
      <motion.span
        className="absolute left-[2px] top-[3px] w-4 h-[2px] bg-current rounded-full origin-center"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
      {/* Middle bar → fades out */}
      <motion.span
        className="absolute left-[2px] top-[9px] w-4 h-[2px] bg-current rounded-full origin-center"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.12 }}
      />
      {/* Bottom bar → rotates -45° up to form X */}
      <motion.span
        className="absolute left-[2px] top-[15px] w-4 h-[2px] bg-current rounded-full origin-center"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
    </div>
  )
}

/* ─── Component ─── */

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Track which section is currently in view
  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`)
            }
          })
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault()
      close()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [close]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      <style>{`
        @media (max-width: 820px) {
          body { padding-bottom: 100px; }
        }
      `}</style>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[998] bg-black/30 md:hidden"
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile deck */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-deck"
            variants={deckVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-[999] flex flex-col min-w-[220px] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 10, 14, 0.62)',
              backdropFilter: 'blur(32px) saturate(160%)',
              WebkitBackdropFilter: 'blur(32px) saturate(160%)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow:
                '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02), 0 0 20px rgba(255,255,255,0.04)',
            }}
          >
            {/* Edge refraction */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(160% 80% at 30% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)',
              }}
            />

            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex flex-col p-2 gap-[2px]"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={itemVariants}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative block px-4 py-[10px] text-center text-[14px] font-[500] no-underline rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#2997ff] focus-visible:outline-offset-2 ${
                    activeSection === item.href
                      ? 'text-white bg-white/15'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom pill nav */}
      <nav
        role="navigation"
        aria-label="Main"
        className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-5 px-6 py-[10px] rounded-full"
        style={{
          background: 'rgba(10, 10, 14, 0.78)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Edge refraction */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(180% 60% at 25% 50%, rgba(255,255,255,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Outer ambient glow */}
        <div
          className="absolute -inset-1 rounded-[calc(9999px+4px)] pointer-events-none -z-[1]"
          style={{
            background:
              'radial-gradient(60% 80% at 50% 50%, rgba(41,151,255,0.08), rgba(255,255,255,0.04) 40%, transparent 70%)',
            filter: 'blur(6px)',
          }}
        />

        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center shrink-0 no-underline text-white font-display font-semibold text-sm tracking-tight"
        >
          Li Ho Yin
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-[14px] py-2 text-[13px] font-[500] tracking-[-0.01em] no-underline rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#2997ff] focus-visible:outline-offset-2 ${
                  activeSection === item.href
                    ? 'text-white bg-white/15'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle with animated SVG */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          animate={open ? 'open' : 'closed'}
          initial="closed"
          className="flex md:hidden items-center justify-center bg-transparent border-none text-white/70 cursor-pointer w-9 h-9 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          <MenuToggle open={open} />
        </motion.button>
      </nav>
    </>
  )
}
