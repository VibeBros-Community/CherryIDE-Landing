'use client';

import { Canvas } from '@react-three/fiber';
import type { CanvasProps } from '@react-three/fiber';
import { useCanvasVisibility } from '@/hooks/use-canvas-visibility';
import { useReducedQuality } from '@/lib/use-performance-mode';
import { ReactNode, useRef } from 'react';

interface VisibilityCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  canvasProps?: Omit<CanvasProps, 'children'>;
}

/**
 * Canvas that only renders when visible in viewport
 * Massive GPU savings when scrolling past 3D sections
 */
export function VisibilityCanvas({ children, className, style, canvasProps }: VisibilityCanvasProps) {
  const { ref, isVisible } = useCanvasVisibility(0.1);
  const useReduced = useReducedQuality();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultGl: NonNullable<CanvasProps['gl']> = {
    powerPreference: 'high-performance',
    antialias: !useReduced,
    alpha: true,
    stencil: false,
    depth: true,
  };

  return (
    <div ref={ref} className={className} style={style}>
      <Canvas
        {...canvasProps}
        ref={canvasRef}
        dpr={useReduced ? 1 : [1, 2]}
        frameloop={isVisible ? 'always' : 'never'} // KEY: Pause when not visible
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
