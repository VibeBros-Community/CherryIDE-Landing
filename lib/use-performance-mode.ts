import { useState, useEffect } from 'react';

/**
 * Hook to detect performance mode based on URL params or localStorage
 * Useful for debugging and development
 */
export function usePerformanceMode() {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Check URL params for ?debug=true or ?stats=true
    const params = new URLSearchParams(window.location.search);
    const debugMode = params.get('debug') === 'true' || params.get('stats') === 'true';

    // Check localStorage
    const storedMode = localStorage.getItem('cherry-performance-stats') === 'true';

    setShowStats(debugMode || storedMode || process.env.NODE_ENV === 'development');
  }, []);

  const toggleStats = () => {
    const newValue = !showStats;
    setShowStats(newValue);
    localStorage.setItem('cherry-performance-stats', String(newValue));
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
