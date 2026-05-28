import type { Variants } from 'framer-motion'

/**
 * Generate stagger animation delays for a list of items
 */
export function createStaggerDelay(index: number, baseDelay = 0.05) {
  return index * baseDelay
}

/**
 * Ease functions for consistent animation timing
 */
export const easing = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.6, 0, 0.4, 1],
}

/**
 * Transition presets for consistent motion
 */
export const transitions = {
  fast: { duration: 0.2, ease: easing.easeOut },
  base: { duration: 0.3, ease: easing.easeOut },
  slow: { duration: 0.5, ease: easing.easeOut },
  smooth: { type: 'spring', stiffness: 100, damping: 15, mass: 1 },
  bouncy: { type: 'spring', stiffness: 200, damping: 10 },
}

/**
 * Compose container and item variants for staggered animations
 */
export function createStaggerVariants(
  itemVariant: Variants,
  staggerDelay = 0.1,
): { container: Variants; item: Variants } {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1,
        },
      },
    },
    item: itemVariant,
  }
}
