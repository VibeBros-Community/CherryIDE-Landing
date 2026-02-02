'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Performance monitoring component - DEVELOPMENT ONLY
 * Shows FPS, memory usage, and render time
 * Automatically disabled in production builds
 */
export function PerformanceMonitor({ enabled = false }: { enabled?: boolean }) {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState('N/A');
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>();

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const updateStats = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime.current;

      // Update FPS every second
      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(currentFps);

        // Update memory if available
        if ((performance as any).memory) {
          const memMB = ((performance as any).memory.usedJSHeapSize / 1048576).toFixed(0);
          setMemory(`${memMB} MB`);
        }

        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      rafId.current = requestAnimationFrame(updateStats);
    };

    rafId.current = requestAnimationFrame(updateStats);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled]);

  // Force disable in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!enabled) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-black/90 backdrop-blur-lg border border-cherry-500/30 rounded-lg p-4 font-mono text-xs">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">FPS:</span>
          <span className={`font-bold ${fps >= 55 ? 'text-green-500' : fps >= 30 ? 'text-yellow-500' : 'text-red-500'}`}>
            {fps}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">Memory:</span>
          <span className="text-white">{memory}</span>
        </div>
        <div className="text-gray-500 text-[10px] mt-2 pt-2 border-t border-gray-700">
          Performance Monitor
        </div>
      </div>
    </div>
  );
}
