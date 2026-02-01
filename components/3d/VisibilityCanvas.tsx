'use client';

import { Canvas, useThree } from '@react-three/fiber';
import type { CanvasProps } from '@react-three/fiber';
import { useCanvasVisibility } from '@/hooks/use-canvas-visibility';
import { useReducedQuality } from '@/lib/use-performance-mode';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface VisibilityCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  canvasProps?: Omit<CanvasProps, 'children'>;
  /**
   * Dynamically lower DPR during active scrolling to reduce scroll-time GPU/raster pressure
   * while keeping animations running.
   */
  adaptiveDprOnScroll?: boolean;
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

function AdaptiveDprOnScroll({
  enabled,
  isScrolling,
  baseDpr,
  scrollDpr,
}: {
  enabled: boolean;
  isScrolling: boolean;
  baseDpr: number;
  scrollDpr: number;
}) {
  const setDpr = useThree((state) => state.setDpr);

  useEffect(() => {
    if (!enabled) return;
    setDpr(isScrolling ? scrollDpr : baseDpr);
  }, [enabled, isScrolling, baseDpr, scrollDpr, setDpr]);

  return null;
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
  adaptiveDprOnScroll = true,
}: VisibilityCanvasProps) {
  const { ref, isVisible } = useCanvasVisibility(0.1);
  const useReduced = useReducedQuality();
  const isScrolling = useScrollActivity(adaptiveDprOnScroll);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultGl: NonNullable<CanvasProps['gl']> = {
    powerPreference: 'high-performance',
    antialias: !useReduced,
    alpha: true,
    stencil: false,
    depth: true,
  };

  const requestedDpr = canvasProps?.dpr ?? (useReduced ? 1 : [1, 1.5]);
  const baseDpr =
    typeof requestedDpr === 'number'
      ? requestedDpr
      : requestedDpr[1];
  const scrollDpr =
    typeof requestedDpr === 'number'
      ? Math.min(1, requestedDpr)
      : requestedDpr[0];
  const canAdapt = adaptiveDprOnScroll && scrollDpr < baseDpr;

  return (
    <div ref={ref} className={className} style={style}>
      <Canvas
        {...canvasProps}
        ref={canvasRef}
        dpr={baseDpr}
        frameloop={isVisible ? 'always' : 'never'} // Pause when offscreen
        performance={{
          min: 0.5,
          ...canvasProps?.performance,
        }}
        gl={{
          ...defaultGl,
          ...(canvasProps?.gl ?? {}),
        }}
      >
        <AdaptiveDprOnScroll
          enabled={canAdapt}
          isScrolling={isScrolling}
          baseDpr={baseDpr}
          scrollDpr={scrollDpr}
        />
        {children}
      </Canvas>
    </div>
  );
}
