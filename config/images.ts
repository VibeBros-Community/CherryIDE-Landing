/**
 * Optimized image configurations with blur placeholders
 * All images are WebP format for optimal performance
 */

export const images = {
  logo: {
    src: '/images/logo.webp',
    alt: 'Cherry IDE Logo',
    // Original: 1,255 KB → Optimized: 64.67 KB (-95%)
  },
  logoTransparent: {
    src: '/images/logo-transparent.webp',
    alt: 'Cherry IDE Logo - Open Source AI Code Editor',
    blurDataURL: 'data:image/webp;base64,UklGRooAAABXRUJQVlA4WAoAAAAQAAAACQAACQAAQUxQSD8AAAABuTJE9D8sbiLbliI2C/g3CrOPh47uj7gRAiImYAL2q3vB08M4bDDDyB2h9IrfvRAKUfKloQx/M9pUpKdO0AgAVlA4ICQAAABwAQCdASoKAAoABUB8JaACdAFAAAD+5fnrH2/R/3f+pJ+AAAA=',
    // Original: 1,160 KB → Optimized: 126.59 KB (-89%)
  },
  ide: {
    src: '/images/IDE.webp',
    alt: 'Cherry IDE Interface Screenshot',
    // Original: 389.80 KB → Optimized: 158.39 KB (-59%)
  },
} as const;

/**
 * Total image size reduction:
 * Before: 2,805 KB
 * After: 349.65 KB
 * Savings: -87.5% 🎉
 */
