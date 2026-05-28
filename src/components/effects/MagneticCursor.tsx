import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

export default function MagneticCursor() {
  const [isMobile, setIsMobile] = useState(true)
  const [visible, setVisible] = useState(false)
  const [isPullActive, setIsPullActive] = useState(false)

  // Disable on touch devices (no fine pointer)
  useEffect(() => {
    const mq = window.matchMedia('(any-pointer: coarse)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (isMobile) return null

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 200, damping: 25 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 25 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setVisible(true)

    const el = e.target as HTMLElement
    const clickable =
      el.tagName === 'A' ||
      el.tagName === 'BUTTON' ||
      el.tagName === 'INPUT' ||
      el.tagName === 'SELECT' ||
      el.tagName === 'TEXTAREA' ||
      el.getAttribute('role') === 'button' ||
      el.closest('a') !== null ||
      el.closest('button') !== null ||
      el.classList.contains('cursor-pointer')

    if (clickable) {
      const interactiveEl = el.closest(
        'a, button, [role="button"], .cursor-pointer',
      ) as HTMLElement || el
      const rect = interactiveEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Magnetic pull: move cursor 50% toward element center
      const pull = 0.5
      cursorX.set(e.clientX + (centerX - e.clientX) * pull)
      cursorY.set(e.clientY + (centerY - e.clientY) * pull)
      setIsPullActive(true)
    } else {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsPullActive(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', () => setVisible(false))
      document.removeEventListener('mouseenter', () => setVisible(true))
    }
  }, [handleMouseMove])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <motion.div
        className="relative"
        style={{ x: springX, y: springY }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Ring */}
          <motion.div
            className="absolute rounded-full border border-accent/30"
            animate={{
              width: isPullActive ? 48 : 32,
              height: isPullActive ? 48 : 32,
              borderColor: isPullActive
                ? 'rgba(0,255,149,0.6)'
                : 'rgba(0,255,149,0.25)',
              boxShadow: isPullActive
                ? '0 0 24px rgba(0,255,149,0.12)'
                : '0 0 0px rgba(0,255,149,0)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          {/* Dot */}
          <motion.div
            className="rounded-full bg-accent"
            animate={{
              width: isPullActive ? 8 : 6,
              height: isPullActive ? 8 : 6,
              boxShadow: isPullActive
                ? '0 0 14px rgba(0,255,149,0.6)'
                : '0 0 6px rgba(0,255,149,0.35)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
