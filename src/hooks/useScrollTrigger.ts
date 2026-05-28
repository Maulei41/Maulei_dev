import { useInView } from 'react-intersection-observer'
import { useAnimation, useScroll, useTransform } from 'framer-motion'
import { useEffect } from 'react'

/**
 * Hook for triggering animations when element enters viewport
 * @param threshold - Percentage of element that should be visible (0-1)
 * @returns { ref, controls } - ref to attach to element, controls for animation
 */
export function useScrollTrigger(threshold = 0.2) {
  const controls = useAnimation()
  const { ref, inView } = useInView({ threshold, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  return { ref, controls }
}

/**
 * Hook for staggering animations on multiple children
 * @param itemCount - Number of items to stagger
 * @param delay - Base delay between items in seconds
 * @returns stagger delay array for each item
 */
export function useStaggerAnimation(itemCount: number, delay = 0.1) {
  return Array.from({ length: itemCount }, (_, i) => i * delay)
}

/**
 * Hook for detecting if element is in viewport
 * @param options - IntersectionObserver options
 * @returns { ref, inView } - ref to attach to element, inView boolean
 */
export function useInViewHook(options = {}) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
    ...options,
  })

  return { ref, inView }
}

/**
 * Hook for parallax scroll effect
 * @param speed - Parallax speed multiplier (0-1)
 * @returns scroll transform value
 */
export function useParallax(speed = 0.5) {
  const { scrollY } = useScroll()
  const parallaxValue = useTransform(scrollY, [0, 1000], [0, 1000 * speed])

  return parallaxValue
}
