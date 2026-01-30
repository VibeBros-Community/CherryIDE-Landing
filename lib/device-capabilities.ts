/**
 * Device capability detection for adaptive rendering
 */

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
  };
};

export type DeviceCapability = 'high' | 'medium' | 'low' | 'minimal';
export type RenderQuality = 'full' | 'lite' | 'static';

const SLOW_CONNECTION_TYPES = new Set(['slow-2g', '2g']);
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function detectDeviceCapability(): DeviceCapability {
  if (typeof window === 'undefined') return 'medium';

  const nav = navigator as NavigatorWithHints;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;

  // High-end device
  if (cores >= 8 && memory >= 8) return 'high';

  // Medium device
  if (cores >= 4 && memory >= 4) return 'medium';

  // Low-end device
  if (cores >= 2 || memory >= 2) return 'low';

  // Minimal capability
  return 'minimal';
}

export function shouldUseReducedQuality(): boolean {
  if (typeof window === 'undefined') return false;

  const nav = navigator as NavigatorWithHints;

  // Check user preferences
  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  if (prefersReducedMotion) return true;

  // Check data saver
  const saveData = nav.connection?.saveData === true;
  if (saveData) return true;

  // Check connection speed
  const effectiveType = nav.connection?.effectiveType;
  if (effectiveType && SLOW_CONNECTION_TYPES.has(effectiveType)) {
    return true;
  }

  return false;
}

export function getOptimalRenderQuality(): RenderQuality {
  if (shouldUseReducedQuality()) return 'static';

  const capability = detectDeviceCapability();

  switch (capability) {
    case 'high':
      return 'full';
    case 'medium':
      return 'full';
    case 'low':
      return 'lite';
    case 'minimal':
      return 'static';
    default:
      return 'lite';
  }
}

export function getOptimalDPR(): { min: number; max: number } {
  if (typeof window === 'undefined') {
    return { min: 1, max: 2 };
  }

  const devicePixelRatio = window.devicePixelRatio || 1;
  const capability = detectDeviceCapability();
  const quality = getOptimalRenderQuality();

  if (quality === 'static') {
    return { min: 1, max: 1 };
  }

  if (capability === 'high') {
    return {
      min: Math.max(1, devicePixelRatio * 0.7),
      max: Math.min(3, devicePixelRatio),
    };
  }

  if (capability === 'medium') {
    return {
      min: Math.max(1, devicePixelRatio * 0.7),
      max: Math.min(2, devicePixelRatio),
    };
  }

  // Low or minimal
  return {
    min: 1,
    max: Math.min(1.5, devicePixelRatio),
  };
}
