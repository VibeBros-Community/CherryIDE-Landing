import * as THREE from 'three';
import { DeviceCapability } from './device-capabilities';

/**
 * Level of Detail (LOD) system for optimizing 3D geometry rendering
 * based on distance from camera and device capability.
 */

export interface LODLevel {
  distance: number;
  segments: number;
  detail: number;
}

export interface LODConfig {
  high: LODLevel;
  medium: LODLevel;
  low: LODLevel;
}

/**
 * Get LOD configuration based on device capability
 * Distances are measured in Three.js units from camera
 */
export const getLODConfig = (capability: DeviceCapability): LODConfig => {
  // Base LOD distances (will be scaled by device)
  const distanceMultiplier = capability === 'high' ? 1.2 :
                             capability === 'medium' ? 1.0 :
                             capability === 'low' ? 0.8 : 0.6;

  // Base segment counts (already reduced from original 64x64)
  const segmentMultiplier = capability === 'high' ? 1.0 :
                            capability === 'medium' ? 0.75 :
                            capability === 'low' ? 0.5 : 0.25;

  return {
    high: {
      distance: 0,
      segments: Math.max(8, Math.floor(32 * segmentMultiplier)),
      detail: Math.max(8, Math.floor(32 * segmentMultiplier)),
    },
    medium: {
      distance: 10 * distanceMultiplier,
      segments: Math.max(8, Math.floor(16 * segmentMultiplier)),
      detail: Math.max(8, Math.floor(16 * segmentMultiplier)),
    },
    low: {
      distance: 20 * distanceMultiplier,
      segments: Math.max(6, Math.floor(8 * segmentMultiplier)),
      detail: Math.max(6, Math.floor(8 * segmentMultiplier)),
    },
  };
};

/**
 * Calculate current LOD level based on distance from camera
 * Includes hysteresis to prevent flickering between levels
 */
export const getCurrentLODLevel = (
  distance: number,
  config: LODConfig,
  currentLevel: 'high' | 'medium' | 'low' = 'high',
  hysteresis: number = 1.5 // 50% hysteresis to prevent flickering
): 'high' | 'medium' | 'low' => {
  // Add hysteresis based on current level to prevent rapid switching
  const highThreshold = config.medium.distance;
  const mediumThreshold = config.low.distance;

  if (currentLevel === 'high') {
    // Only switch to medium if we exceed threshold + hysteresis
    if (distance > highThreshold * hysteresis) {
      return distance > mediumThreshold * hysteresis ? 'low' : 'medium';
    }
    return 'high';
  } else if (currentLevel === 'medium') {
    // Switch up if below threshold / hysteresis, down if above threshold * hysteresis
    if (distance < highThreshold / hysteresis) {
      return 'high';
    } else if (distance > mediumThreshold * hysteresis) {
      return 'low';
    }
    return 'medium';
  } else {
    // currentLevel === 'low'
    if (distance < mediumThreshold / hysteresis) {
      return distance < highThreshold / hysteresis ? 'high' : 'medium';
    }
    return 'low';
  }
};

/**
 * Create geometry with specific LOD level
 */
export const createLODGeometry = (
  type: 'sphere' | 'ring' | 'torus',
  level: LODLevel,
  radius: number = 1,
  tubeRadius?: number
): THREE.BufferGeometry => {
  switch (type) {
    case 'sphere':
      return new THREE.SphereGeometry(
        radius,
        level.segments,
        level.detail
      );
    case 'ring':
      return new THREE.RingGeometry(
        radius * 0.8,
        radius * 1.2,
        level.segments
      );
    case 'torus':
      return new THREE.TorusGeometry(
        radius,
        tubeRadius || radius * 0.1,
        level.detail,
        level.segments
      );
    default:
      return new THREE.SphereGeometry(radius, 16, 16);
  }
};

/**
 * LOD Manager class for managing geometry switching
 */
export class LODManager {
  private config: LODConfig;
  private currentLevel: 'high' | 'medium' | 'low' = 'high';
  private geometryCache: Map<string, THREE.BufferGeometry> = new Map();

  constructor(capability: DeviceCapability) {
    this.config = getLODConfig(capability);
  }

  /**
   * Update LOD based on distance and return appropriate geometry
   */
  updateLOD(
    distance: number,
    type: 'sphere' | 'ring' | 'torus',
    radius: number = 1,
    tubeRadius?: number
  ): { geometry: THREE.BufferGeometry; levelChanged: boolean } {
    const newLevel = getCurrentLODLevel(distance, this.config, this.currentLevel);
    const levelChanged = newLevel !== this.currentLevel;

    if (levelChanged) {
      this.currentLevel = newLevel;
    }

    // Generate cache key
    const cacheKey = `${type}-${newLevel}-${radius}-${tubeRadius || 0}`;

    // Get or create geometry
    if (!this.geometryCache.has(cacheKey)) {
      const level = this.config[newLevel];
      const geometry = createLODGeometry(type, level, radius, tubeRadius);
      this.geometryCache.set(cacheKey, geometry);
    }

    return {
      geometry: this.geometryCache.get(cacheKey)!,
      levelChanged,
    };
  }

  /**
   * Clear geometry cache and dispose geometries
   */
  dispose(): void {
    this.geometryCache.forEach((geometry) => geometry.dispose());
    this.geometryCache.clear();
  }

  /**
   * Get current LOD level
   */
  getCurrentLevel(): 'high' | 'medium' | 'low' {
    return this.currentLevel;
  }
}
