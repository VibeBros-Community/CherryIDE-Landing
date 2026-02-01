import * as THREE from 'three';

/**
 * Centralized material cache to prevent creating duplicate materials
 * and reduce memory usage across multiple Canvas instances.
 */
class MaterialCache {
  private static instance: MaterialCache;
  private cache: Map<string, THREE.Material>;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): MaterialCache {
    if (!MaterialCache.instance) {
      MaterialCache.instance = new MaterialCache();
    }
    return MaterialCache.instance;
  }

  /**
   * Get or create a material based on a unique key and creation function
   */
  get<T extends THREE.Material>(
    key: string,
    createMaterial: () => T
  ): T {
    if (!this.cache.has(key)) {
      this.cache.set(key, createMaterial());
    }
    return this.cache.get(key) as T;
  }

  /**
   * Check if a material exists in the cache
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Remove a material from the cache and dispose it
   */
  delete(key: string): boolean {
    const material = this.cache.get(key);
    if (material) {
      material.dispose();
      return this.cache.delete(key);
    }
    return false;
  }

  /**
   * Clear all materials and dispose them
   */
  clear(): void {
    this.cache.forEach((material) => material.dispose());
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  get size(): number {
    return this.cache.size;
  }
}

export const materialCache = MaterialCache.getInstance();

/**
 * Common material creation helpers
 */
export const createPlanetMaterial = (color: string, roughness = 0.4, metalness = 0.6) => {
  return materialCache.get(`planet-${color}-${roughness}-${metalness}`, () =>
    new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      envMapIntensity: 1.5,
    })
  );
};

export const createRingMaterial = (color: string, opacity = 0.4) => {
  return materialCache.get(`ring-${color}-${opacity}`, () =>
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
    })
  );
};

export const createGlowMaterial = (color: string, opacity = 0.3) => {
  return materialCache.get(`glow-${color}-${opacity}`, () =>
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
    })
  );
};
