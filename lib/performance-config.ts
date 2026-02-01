import { DeviceCapability } from './device-capabilities';

/**
 * Performance configuration presets for different device tiers
 * Used to balance visual quality with performance
 */

export interface PerformanceConfig {
  // Rendering
  dpr: number | [number, number]; // Device pixel ratio
  antialias: boolean;
  shadowMap: boolean;

  // 3D Scene
  maxLights: number;
  enablePostProcessing: boolean;
  enableBloom: boolean;

  // Geometry
  geometryMultiplier: number;
  enableWireframes: boolean;
  enableParticles: boolean;

  // Animation
  enableFloating: boolean;
  animationQuality: 'high' | 'medium' | 'low';
}

export const performancePresets: Record<DeviceCapability, PerformanceConfig> = {
  high: {
    dpr: [1, 2],
    antialias: true,
    shadowMap: true,
    maxLights: 8,
    enablePostProcessing: true,
    enableBloom: true,
    geometryMultiplier: 1.0,
    enableWireframes: true,
    enableParticles: true,
    enableFloating: true,
    animationQuality: 'high',
  },
  medium: {
    dpr: [1, 1.5],
    antialias: true,
    shadowMap: false,
    maxLights: 6,
    enablePostProcessing: false,
    enableBloom: false,
    geometryMultiplier: 0.75,
    enableWireframes: true,
    enableParticles: true,
    enableFloating: true,
    animationQuality: 'medium',
  },
  low: {
    dpr: 1,
    antialias: false,
    shadowMap: false,
    maxLights: 4,
    enablePostProcessing: false,
    enableBloom: false,
    geometryMultiplier: 0.5,
    enableWireframes: false,
    enableParticles: false,
    enableFloating: true,
    animationQuality: 'low',
  },
  minimal: {
    dpr: 1,
    antialias: false,
    shadowMap: false,
    maxLights: 2,
    enablePostProcessing: false,
    enableBloom: false,
    geometryMultiplier: 0.25,
    enableWireframes: false,
    enableParticles: false,
    enableFloating: false,
    animationQuality: 'low',
  },
};

/**
 * Get performance config for current device
 */
export function getPerformanceConfig(capability: DeviceCapability): PerformanceConfig {
  return performancePresets[capability];
}
