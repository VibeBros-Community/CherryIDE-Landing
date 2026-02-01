import { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { LODManager } from './lod-system';
import { detectDeviceCapability } from './device-capabilities';

/**
 * React hook for managing Level of Detail based on camera distance
 * Automatically updates geometry when distance changes
 */
export function useLOD(
  meshRef: React.RefObject<THREE.Mesh | THREE.Group>,
  type: 'sphere' | 'ring' | 'torus',
  radius: number = 1,
  tubeRadius?: number
) {
  const [deviceCapability] = useState(() => detectDeviceCapability());
  const [lodManager] = useState(() => new LODManager(deviceCapability));
  const [currentGeometry, setCurrentGeometry] = useState<THREE.BufferGeometry | null>(null);
  const previousLevel = useRef<'high' | 'medium' | 'low'>('high');

  const { camera } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;

    // Calculate distance from camera to mesh
    const distance = camera.position.distanceTo(meshRef.current.position);

    // Update LOD based on distance
    const { geometry, levelChanged } = lodManager.updateLOD(
      distance,
      type,
      radius,
      tubeRadius
    );

    // Only update if level changed (avoid unnecessary re-renders)
    if (levelChanged) {
      const currentLevel = lodManager.getCurrentLevel();

      // Debug logging (remove in production)
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `LOD: ${previousLevel.current} → ${currentLevel} (distance: ${distance.toFixed(2)})`
        );
      }

      previousLevel.current = currentLevel;
      setCurrentGeometry(geometry);
    }
  });

  // Initialize with default geometry
  useEffect(() => {
    const { geometry } = lodManager.updateLOD(10, type, radius, tubeRadius);
    setCurrentGeometry(geometry);

    return () => {
      lodManager.dispose();
    };
  }, []);

  return {
    geometry: currentGeometry,
    currentLevel: lodManager.getCurrentLevel(),
  };
}
