'use client';

import { Canvas } from '@react-three/fiber';
import { useCanvasVisibility } from '@/hooks/use-canvas-visibility';
import { useReducedQuality } from '@/lib/use-performance-mode';
import { ReactNode, useEffect, useRef } from 'react';

interface VisibilityCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Canvas that only renders when visible in viewport
 * Massive GPU savings when scrolling past 3D sections
 */
export function VisibilityCanvas({ children, className, style }: VisibilityCanvasProps) {
  const { ref, isVisible } = useCanvasVisibility(0.1);
  const useReduced = useReducedQuality();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div ref={ref} className={className} style={style}>
      <Canvas
        ref={canvasRef}
        dpr={useReduced ? 1 : [1, 2]}
        frameloop={isVisible ? 'always' : 'never'} // KEY: Pause when not visible
        performance={{
          min: 0.5,
        }}
        gl={{
          powerPreference: 'high-performance',
          antialias: !useReduced,
          alpha: true,
          stencil: false,
          depth: true,
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}
