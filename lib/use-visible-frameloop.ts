import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Hook to control Canvas frameloop based on visibility
 * Pauses rendering when section is off-screen for better performance
 */
export function useVisibleFrameloop(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { gl, set } = useThree();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        // Control frameloop based on visibility
        if (visible) {
          set({ frameloop: 'always' });
        } else {
          set({ frameloop: 'never' });
          // Clear the canvas when not visible to save GPU
          gl.clear();
        }
      },
      {
        threshold, // Trigger when at least 10% visible
        rootMargin: '100px', // Start rendering slightly before entering viewport
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      // Resume rendering on cleanup
      set({ frameloop: 'always' });
    };
  }, [gl, set, threshold]);

  return {
    containerRef,
    isVisible,
  };
}
