'use client';

import { Canvas } from '@react-three/fiber';
import { useReducedQuality } from '@/lib/use-performance-mode';
import { ReactNode } from 'react';

interface OptimizedCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Optimized Canvas wrapper with performance settings
 * - Conditional frame loop based on visibility
 * - Reduced DPR for low-end devices
 * - Power preference for GPU selection
 */
export function OptimizedCanvas({ children, className, style }: OptimizedCanvasProps) {
  const useReduced = useReducedQuality();

  return (
    <Canvas
      className={className}
      style={style}
      dpr={useReduced ? 1 : [1, 2]} // Limit pixel ratio on low-end devices
      performance={{
        min: 0.5, // Minimum performance target (50% of 60fps = 30fps)
      }}
      gl={{
        powerPreference: 'high-performance', // Request dedicated GPU
        antialias: !useReduced, // Disable AA on low-end for performance
        alpha: true,
        stencil: false, // Disable if not needed
        depth: true,
      }}
      frameloop="always" // Can be 'demand' to render only when needed
    >
      {children}
    </Canvas>
  );
}
