import { useState, useEffect } from 'react';

/**
 * Hook to detect performance mode - DEVELOPMENT ONLY
 * Performance monitor is completely disabled in production builds
 */
export function usePerformanceMode() {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Only enable in development mode
    // URL params and localStorage are ignored in production for security
    setShowStats(process.env.NODE_ENV === 'development');
  }, []);

  const toggleStats = () => {
    // Only allow toggling in development
    if (process.env.NODE_ENV === 'development') {
      const newValue = !showStats;
      setShowStats(newValue);
    }
  };

  return {
    showStats,
    toggleStats,
  };
}

/**
 * Check if we should use reduced quality
 * Based on device capability, user preferences, and performance
 */
export function useReducedQuality(): boolean {
  const [useReduced, setUseReduced] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check for data saver
    const saveData = (navigator as any).connection?.saveData === true;

    // Check for low-end device
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as any).deviceMemory ?? 4;
    const isLowEnd = cores < 4 || memory < 4;

    setUseReduced(prefersReducedMotion || saveData || isLowEnd);
  }, []);

  return useReduced;
}
