import { DeviceCapability } from './device-capabilities';

/**
 * Device-aware geometry scaling based on device capabilities.
 * Automatically adjusts geometry detail to maintain performance.
 */

export interface GeometryConfig {
  baseSegments: number;
  baseDetail: number;
}

export interface AdaptiveGeometryResult {
  segments: number;
  detail: number;
  multiplier: number;
}

/**
 * Get geometry detail multiplier based on device capability
 */
export const getGeometryMultiplier = (capability: DeviceCapability): number => {
  switch (capability) {
    case 'high':
      return 1.0; // Full detail
    case 'medium':
      return 0.75; // 75% detail
    case 'low':
      return 0.5; // 50% detail
    case 'minimal':
      return 0.25; // 25% detail
    default:
      return 0.5; // Safe default
  }
};

/**
 * Calculate adaptive geometry parameters based on device capability
 */
export const getAdaptiveGeometry = (
  config: GeometryConfig,
  capability: DeviceCapability
): AdaptiveGeometryResult => {
  const multiplier = getGeometryMultiplier(capability);

  // Ensure minimum segments (8) for visual quality
  const segments = Math.max(8, Math.floor(config.baseSegments * multiplier));
  const detail = Math.max(8, Math.floor(config.baseDetail * multiplier));

  return {
    segments,
    detail,
    multiplier,
  };
};

/**
 * Sphere geometry configurations by device tier
 */
export const getSphereGeometry = (capability: DeviceCapability) => {
  const config: GeometryConfig = {
    baseSegments: 32, // Reduced from 64 (75% reduction in base vertices)
    baseDetail: 32,
  };

  return getAdaptiveGeometry(config, capability);
};

/**
 * Ring/Torus geometry configurations by device tier
 */
export const getRingGeometry = (capability: DeviceCapability) => {
  const config: GeometryConfig = {
    baseSegments: 32, // Reduced from 100
    baseDetail: 8,
  };

  return getAdaptiveGeometry(config, capability);
};

/**
 * Crystal/Complex geometry configurations by device tier
 */
export const getCrystalGeometry = (capability: DeviceCapability) => {
  const config: GeometryConfig = {
    baseSegments: 24,
    baseDetail: 24,
  };

  return getAdaptiveGeometry(config, capability);
};

/**
 * Get render distance based on device capability
 * Used for LOD system and frustum culling
 */
export const getRenderDistance = (capability: DeviceCapability): number => {
  switch (capability) {
    case 'high':
      return 100;
    case 'medium':
      return 75;
    case 'low':
      return 50;
    case 'minimal':
      return 35;
    default:
      return 50;
  }
};
