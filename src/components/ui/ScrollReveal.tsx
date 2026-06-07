import React, { useEffect, useRef, useState } from 'react'

export interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export default function ScrollReveal({
  children,
  className = '',
  delay,
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check for reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style: React.CSSProperties = {}
  if (delay !== undefined) {
    style.transitionDelay = `${delay * 120}ms`
  }
  if (stagger) {
    ;(style as any)['--i'] = delay ?? 0
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
