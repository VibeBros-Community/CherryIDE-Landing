'use client';

import React, { createContext, useContext, useMemo } from 'react';
import * as THREE from 'three';
import { materialCache, createPlanetMaterial, createRingMaterial, createGlowMaterial } from './material-cache';

/**
 * Shared materials context for reusing materials across multiple Canvas instances.
 * Reduces memory usage and improves performance by preventing duplicate material creation.
 */

interface SharedMaterials {
  // Planet materials
  getPlanetMaterial: (color: string, roughness?: number, metalness?: number) => THREE.MeshStandardMaterial;

  // Ring materials
  getRingMaterial: (color: string, opacity?: number) => THREE.MeshBasicMaterial;

  // Glow materials
  getGlowMaterial: (color: string, opacity?: number) => THREE.MeshBasicMaterial;

  // Crystal materials
  getCrystalMaterial: () => THREE.MeshPhysicalMaterial;

  // Generic material getter
  getMaterial: <T extends THREE.Material>(key: string, createFn: () => T) => T;
}

const SharedMaterialsContext = createContext<SharedMaterials | null>(null);

export const useSharedMaterials = () => {
  const context = useContext(SharedMaterialsContext);
  if (!context) {
    throw new Error('useSharedMaterials must be used within SharedMaterialsProvider');
  }
  return context;
};

interface SharedMaterialsProviderProps {
  children: React.ReactNode;
}

export const SharedMaterialsProvider: React.FC<SharedMaterialsProviderProps> = ({ children }) => {
  const materials = useMemo<SharedMaterials>(() => ({
    getPlanetMaterial: (color: string, roughness = 0.4, metalness = 0.6) => {
      return createPlanetMaterial(color, roughness, metalness);
    },

    getRingMaterial: (color: string, opacity = 0.4) => {
      return createRingMaterial(color, opacity);
    },

    getGlowMaterial: (color: string, opacity = 0.3) => {
      return createGlowMaterial(color, opacity);
    },

    getCrystalMaterial: () => {
      return materialCache.get('crystal-main', () =>
        new THREE.MeshPhysicalMaterial({
          color: '#ff3366',
          metalness: 0.9,
          roughness: 0.1,
          transmission: 0.5,
          thickness: 0.5,
          envMapIntensity: 1.5,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        })
      );
    },

    getMaterial: <T extends THREE.Material>(key: string, createFn: () => T): T => {
      return materialCache.get(key, createFn);
    },
  }), []);

  return (
    <SharedMaterialsContext.Provider value={materials}>
      {children}
    </SharedMaterialsContext.Provider>
  );
};
