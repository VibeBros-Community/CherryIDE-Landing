'use client';

import { Canvas } from '@react-three/fiber';
import type { CanvasProps } from '@react-three/fiber';
import { useCanvasVisibility } from '@/hooks/use-canvas-visibility';
import { useReducedQuality } from '@/lib/use-performance-mode';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface VisibilityCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  canvasProps?: Omit<CanvasProps, 'children'>;
  pauseOnScroll?: boolean;
}

const SCROLL_IDLE_DEBOUNCE_MS = 140;

function useScrollActivity(enabled: boolean) {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    const stopScrolling = () => {
      setIsScrolling(false);
      timeoutRef.current = null;
    };

    const onScrollActivity = () => {
      setIsScrolling(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(stopScrolling, SCROLL_IDLE_DEBOUNCE_MS);
    };

    window.addEventListener('scroll', onScrollActivity, { passive: true });
    window.addEventListener('wheel', onScrollActivity, { passive: true });
    window.addEventListener('touchmove', onScrollActivity, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollActivity);
      window.removeEventListener('wheel', onScrollActivity);
      window.removeEventListener('touchmove', onScrollActivity);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [enabled]);

  return isScrolling;
}

/**
 * Canvas that only renders when visible in viewport
 * Massive GPU savings when scrolling past 3D sections
 */
export function VisibilityCanvas({
  children,
  className,
  style,
  canvasProps,
  pauseOnScroll = true,
}: VisibilityCanvasProps) {
  const { ref, isVisible } = useCanvasVisibility(0.1);
  const useReduced = useReducedQuality();
  const isScrolling = useScrollActivity(pauseOnScroll);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultGl: NonNullable<CanvasProps['gl']> = {
    powerPreference: 'high-performance',
    antialias: !useReduced,
    alpha: true,
    stencil: false,
    depth: true,
  };

  const dpr = canvasProps?.dpr ?? (useReduced ? 1 : [1, 1.5]);
  const shouldRender = isVisible && (!pauseOnScroll || !isScrolling);

  return (
    <div ref={ref} className={className} style={style}>
      <Canvas
        {...canvasProps}
        ref={canvasRef}
        dpr={dpr}
        frameloop={shouldRender ? 'always' : 'never'} // Pause when offscreen (and optionally while scrolling)
        performance={{
          min: 0.5,
          ...canvasProps?.performance,
        }}
        gl={{
          ...defaultGl,
          ...(canvasProps?.gl ?? {}),
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}
