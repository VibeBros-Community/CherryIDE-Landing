import { useEffect, useState, useRef } from 'react';

/**
 * Hook to detect when a canvas container is visible in viewport
 * Used to control rendering and save performance
 */
export function useCanvasVisibility(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '200px', // Pre-load before entering viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
}
