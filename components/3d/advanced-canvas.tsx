'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { scheduleIdleTask } from '@/lib/schedule-idle-task';
import { getOptimalRenderQuality, getOptimalDPR, type RenderQuality } from '@/lib/device-capabilities';
import { PerformanceMonitor, usePerformanceMonitor, type PerformanceMonitorApi } from '@react-three/drei';
import * as THREE from 'three';

const DETAIL_ENHANCE_IDLE_TIMEOUT_MS = 1200;
const DETAIL_ENHANCE_FALLBACK_TIMEOUT_MS = 200;
const DETAIL_PREWARM_RATIO = 0.7;
const PERFORMANCE_UPDATE_MIN_INTERVAL_MS = 600;
const PERFORMANCE_UPDATE_THRESHOLD = 0.08;

interface AdvancedCanvasProps {
  children: React.ReactNode | ((props: { enhanced: boolean; quality: RenderQuality }) => React.ReactNode);
  camera?: any;
  shadows?: boolean;
  quality?: RenderQuality;
  onQualityChange?: (enhanced: boolean) => void;
  [key: string]: any;
}

/**
 * Dynamic Performance Tuner
 * Automatically adjusts DPR based on frame rate
 */
function DynamicPerformanceTuner() {
  const setDpr = useThree((state) => state.setDpr);
  const { min: minDpr, max: maxDpr } = getOptimalDPR();
  const lastUpdateRef = useRef<{ time: number; factor: number } | null>(null);

  const applyPerformanceChange = useCallback(
    (api: PerformanceMonitorApi) => {
      const factor = THREE.MathUtils.clamp(api.factor, 0, 1);
      const now = performance.now();
      const lastUpdate = lastUpdateRef.current;

      if (lastUpdate) {
        const delta = Math.abs(factor - lastUpdate.factor);
        if (
          delta < PERFORMANCE_UPDATE_THRESHOLD &&
          now - lastUpdate.time < PERFORMANCE_UPDATE_MIN_INTERVAL_MS
        ) {
          return;
        }
      }

      lastUpdateRef.current = { time: now, factor };
      const nextDpr = THREE.MathUtils.lerp(minDpr, maxDpr, factor);
      setDpr(nextDpr);
    },
    [maxDpr, minDpr, setDpr]
  );

  usePerformanceMonitor({
    onChange: applyPerformanceChange,
    onFallback: applyPerformanceChange,
  });

  return null;
}

/**
 * Advanced Canvas with Progressive Enhancement
 *
 * Features:
 * - Viewport-based rendering
 * - Progressive detail enhancement
 * - Device capability detection
 * - Dynamic DPR adjustment
 * - Connection-aware rendering
 */
export function AdvancedCanvas({
  children,
  camera,
  shadows = false,
  quality: forcedQuality,
  onQualityChange,
  ...props
}: AdvancedCanvasProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '200px',
  });

  const [hasRendered, setHasRendered] = useState(false);
  const [enhancedDetails, setEnhancedDetails] = useState(false);
  const [quality] = useState<RenderQuality>(() => forcedQuality || getOptimalRenderQuality());
  const { min: minDpr, max: maxDpr } = getOptimalDPR();

  // Progressive enhancement - start with reduced detail, enhance after idle
  useEffect(() => {
    if (quality === 'static') return;

    const cancelIdle = scheduleIdleTask(
      () => {
        setEnhancedDetails(true);
        onQualityChange?.(true);
      },
      {
        timeoutMs: DETAIL_ENHANCE_IDLE_TIMEOUT_MS,
        fallbackMs: DETAIL_ENHANCE_FALLBACK_TIMEOUT_MS,
      }
    );

    return () => cancelIdle();
  }, [quality, onQualityChange]);

  useEffect(() => {
    if (inView && !hasRendered) {
      setHasRendered(true);
    }
  }, [inView, hasRendered]);

  // Static fallback for low-end devices
  if (quality === 'static') {
    return (
      <div ref={ref} className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-zinc-900/50 to-black">
        <div className="text-center text-white/70 p-6">
          <div className="text-sm mb-2">3D rendering paused</div>
          <div className="text-xs text-white/50">Optimized for your connection</div>
        </div>
      </div>
    );
  }

  const initialDpr = enhancedDetails ? maxDpr : Math.min(maxDpr, minDpr * 1.5);

  return (
    <div ref={ref} className="w-full h-full">
      {(inView || hasRendered) ? (
        <Canvas
          camera={camera}
          shadows={shadows}
          dpr={initialDpr}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            preserveDrawingBuffer: false,
          }}
          frameloop={inView ? 'always' : 'never'}
          {...props}
        >
          <Suspense fallback={null}>
            <PerformanceMonitor>
              <DynamicPerformanceTuner />
              {typeof children === 'function'
                ? children({ enhanced: enhancedDetails, quality })
                : children}
            </PerformanceMonitor>
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <div className="w-12 h-12 border-4 border-cherry-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

/**
 * Utility to scale geometry detail for progressive enhancement
 */
export function scaleDetail(value: number, minValue: number, enhanced: boolean): number {
  if (enhanced) return value;
  return Math.max(minValue, Math.round(value * DETAIL_PREWARM_RATIO));
}
