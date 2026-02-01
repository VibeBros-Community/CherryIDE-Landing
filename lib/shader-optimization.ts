import * as THREE from 'three';

/**
 * Shader optimization utilities
 * Reduces shader complexity for better performance
 */

/**
 * Optimize MeshPhysicalMaterial for performance
 * Reduces transmission samples and simplifies calculations
 */
export function optimizePhysicalMaterial(
  material: THREE.MeshPhysicalMaterial,
  quality: 'high' | 'medium' | 'low' = 'medium'
): THREE.MeshPhysicalMaterial {
  // Reduce transmission samples for performance
  // Default is 8, which is expensive on mobile
  const samples = quality === 'high' ? 6 : quality === 'medium' ? 4 : 2;

  // Apply optimizations based on quality
  if (quality === 'low') {
    // Disable expensive features on low-end
    material.transmission = 0;
    material.clearcoat = 0;
  } else if (quality === 'medium') {
    // Reduce but keep features
    if (material.transmission > 0) {
      material.transmission = Math.min(material.transmission, 0.3);
    }
    if (material.clearcoat > 0) {
      material.clearcoat = Math.min(material.clearcoat, 0.5);
    }
  }

  // Set shader precision
  material.precision = quality === 'high' ? 'highp' : quality === 'medium' ? 'mediump' : 'lowp';

  return material;
}

/**
 * Create optimized standard material
 * Uses simpler shader than MeshPhysicalMaterial
 */
export function createOptimizedStandardMaterial(
  params: THREE.MeshStandardMaterialParameters
): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial(params);

  // Use medium precision for balance
  material.precision = 'mediump';

  // Disable features we don't need
  material.flatShading = false;
  material.vertexColors = false;

  return material;
}

/**
 * Create optimized basic material for simple objects
 * Cheapest shader option
 */
export function createOptimizedBasicMaterial(
  params: THREE.MeshBasicMaterialParameters
): THREE.MeshBasicMaterial {
  const material = new THREE.MeshBasicMaterial(params);

  // Use low precision for maximum performance
  material.precision = 'lowp';

  return material;
}

/**
 * Note: Three.js handles shader caching internally via WebGLPrograms
 * Materials with identical parameters will automatically share compiled shaders
 * No manual shader caching needed
 */

/**
 * Optimize material for mobile devices
 */
export function optimizeMaterialForMobile(material: THREE.Material): void {
  // Reduce shader precision
  material.precision = 'mediump';

  // Disable expensive features
  if (material instanceof THREE.MeshPhysicalMaterial) {
    material.transmission = 0;
    material.thickness = 0;
    material.clearcoat = 0;
  }

  // Force shader recompilation with optimizations
  material.needsUpdate = true;
}

/**
 * Get recommended material type based on device capability
 */
export function getRecommendedMaterialType(
  capability: 'high' | 'medium' | 'low' | 'minimal'
): 'physical' | 'standard' | 'basic' {
  switch (capability) {
    case 'high':
      return 'physical';
    case 'medium':
      return 'standard';
    case 'low':
    case 'minimal':
      return 'basic';
    default:
      return 'standard';
  }
}
