'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { detectDeviceCapability } from '@/lib/device-capabilities';
import { useSharedMaterials } from '@/lib/shared-materials-context';
import { useLOD } from '@/lib/use-lod';

interface DynamicLODPlanetProps {
  size: number;
  position: [number, number, number];
  color: string;
  emissive: string;
  hasRings?: boolean;
  rotationSpeed: number;
  orbitSpeed: number;
}

/**
 * Advanced planet component with dynamic LOD based on camera distance
 * Uses useLOD hook for automatic geometry switching
 */
export function DynamicLODPlanet({
  size,
  position,
  color,
  emissive,
  hasRings,
  rotationSpeed,
  orbitSpeed,
}: DynamicLODPlanetProps) {
  const planetRef = useRef<THREE.Group>(null);
  const mainSphereRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [deviceCapability] = useState(() => detectDeviceCapability());
  const { getMaterial } = useSharedMaterials();

  // Dynamic LOD for main planet sphere
  const { geometry: mainGeometry } = useLOD(mainSphereRef, 'sphere', size);

  // Static geometries for other layers (less critical)
  const secondaryGeometry = useMemo(() => {
    const baseSegments = deviceCapability === 'high' ? 16 : deviceCapability === 'medium' ? 12 : 8;
    return {
      core: new THREE.SphereGeometry(size * 0.6, baseSegments, baseSegments),
      clouds: new THREE.SphereGeometry(size * 1.02, baseSegments, baseSegments),
      atmosphere: new THREE.SphereGeometry(size * 1.12, baseSegments, baseSegments),
      wireframe: new THREE.SphereGeometry(size * 1.18, Math.max(6, baseSegments / 2), Math.max(6, baseSegments / 2)),
    };
  }, [size, deviceCapability]);

  const ringGeometry = useMemo(() => {
    if (!hasRings) return null;
    const segments = deviceCapability === 'high' ? 32 : deviceCapability === 'medium' ? 24 : 16;
    return {
      orbital: new THREE.TorusGeometry(size * 1.8, 0.02, 6, segments),
      main: new THREE.TorusGeometry(size * 1.5, 0.12, 6, segments),
      secondary: new THREE.TorusGeometry(size * 1.8, 0.06, 6, segments),
      outer: new THREE.TorusGeometry(size * 2.1, 0.03, 4, segments),
    };
  }, [size, hasRings, deviceCapability]);

  // Cached materials
  const materials = useMemo(() => {
    const colorKey = `${color}-${emissive}`;

    return {
      core: getMaterial(`planet-core-${colorKey}`, () =>
        new THREE.MeshStandardMaterial({
          color: emissive,
          emissive: emissive,
          emissiveIntensity: 2,
          transparent: true,
          opacity: 0.7,
        })
      ),
      main: getMaterial(`planet-main-${colorKey}`, () =>
        new THREE.MeshPhysicalMaterial({
          color,
          emissive,
          emissiveIntensity: 0.5,
          metalness: 0.4,
          roughness: 0.6,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
        })
      ),
      clouds: getMaterial(`planet-clouds-${colorKey}`, () =>
        new THREE.MeshStandardMaterial({
          color,
          emissive,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
        })
      ),
      atmosphere: getMaterial(`planet-atmosphere-${colorKey}`, () =>
        new THREE.MeshStandardMaterial({
          color: emissive,
          emissive: emissive,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.25,
          side: THREE.BackSide,
        })
      ),
      wireframe: getMaterial(`planet-wireframe-${colorKey}`, () =>
        new THREE.MeshStandardMaterial({
          color: emissive,
          emissive: emissive,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.15,
          wireframe: true,
        })
      ),
      orbital: getMaterial(`planet-orbital-${colorKey}`, () =>
        new THREE.MeshStandardMaterial({
          color,
          emissive,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.4,
          metalness: 0.8,
          roughness: 0.2,
        })
      ),
      ringMain: hasRings ? getMaterial(`planet-ring-main-${colorKey}`, () =>
        new THREE.MeshPhysicalMaterial({
          color,
          emissive,
          emissiveIntensity: 0.7,
          metalness: 0.9,
          roughness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          transparent: true,
          opacity: 0.95,
        })
      ) : null,
      ringSecondary: hasRings ? getMaterial(`planet-ring-secondary-${colorKey}`, () =>
        new THREE.MeshStandardMaterial({
          color: emissive,
          emissive: emissive,
          emissiveIntensity: 1.2,
          transparent: true,
          opacity: 0.7,
        })
      ) : null,
      ringOuter: hasRings ? getMaterial(`planet-ring-outer-${colorKey}`, () =>
        new THREE.MeshStandardMaterial({
          color,
          emissive,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.4,
        })
      ) : null,
      particle: getMaterial(`planet-particle-${emissive}`, () =>
        new THREE.MeshStandardMaterial({
          color: emissive,
          emissive: emissive,
          emissiveIntensity: 3,
          transparent: true,
          opacity: 0.9,
        })
      ),
    };
  }, [color, emissive, hasRings, getMaterial]);

  // Particle geometry - only create if not minimal device
  const particleGeometry = useMemo(() => {
    if (deviceCapability === 'minimal') return null;
    return new THREE.SphereGeometry(0.06, 6, 6);
  }, [deviceCapability]);

  // Particle positions
  const particlePositions = useMemo(() => {
    if (deviceCapability === 'minimal') return [];
    const count = deviceCapability === 'low' ? 3 : 6;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = size * 1.5;
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        Math.cos(angle * 2) * 0.3,
      ] as [number, number, number];
    });
  }, [size, deviceCapability]);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = Math.sin(state.clock.elapsedTime * orbitSpeed) * 0.3;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 1.5;
    }
  });

  // Cleanup geometries on unmount
  useEffect(() => {
    return () => {
      Object.values(secondaryGeometry).forEach(geo => geo.dispose());
      if (ringGeometry) {
        Object.values(ringGeometry).forEach(geo => geo.dispose());
      }
      particleGeometry?.dispose();
    };
  }, [secondaryGeometry, ringGeometry, particleGeometry]);

  return (
    <group position={position}>
      {/* Orbital ring */}
      <group ref={orbitRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={ringGeometry?.orbital || secondaryGeometry.core} />
          <primitive object={materials.orbital} />
        </mesh>
      </group>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <group ref={planetRef}>
          {/* Inner core glow */}
          <mesh>
            <primitive object={secondaryGeometry.core} />
            <primitive object={materials.core} />
          </mesh>

          {/* Main planet body - DYNAMIC LOD */}
          <mesh ref={mainSphereRef}>
            {mainGeometry && <primitive object={mainGeometry} />}
            <primitive object={materials.main} />
          </mesh>

          {/* Surface detail layer - rotating clouds */}
          <mesh ref={cloudsRef}>
            <primitive object={secondaryGeometry.clouds} />
            <primitive object={materials.clouds} />
          </mesh>

          {/* Outer atmosphere glow */}
          <mesh>
            <primitive object={secondaryGeometry.atmosphere} />
            <primitive object={materials.atmosphere} />
          </mesh>

          {/* Wireframe energy field - skip on minimal */}
          {deviceCapability !== 'minimal' && (
            <mesh>
              <primitive object={secondaryGeometry.wireframe} />
              <primitive object={materials.wireframe} />
            </mesh>
          )}

          {/* Enhanced ring decorations */}
          {hasRings && ringGeometry && materials.ringMain && materials.ringSecondary && (
            <>
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <primitive object={ringGeometry.main} />
                <primitive object={materials.ringMain} />
              </mesh>
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <primitive object={ringGeometry.secondary} />
                <primitive object={materials.ringSecondary} />
              </mesh>
              {deviceCapability !== 'minimal' && deviceCapability !== 'low' && materials.ringOuter && (
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                  <primitive object={ringGeometry.outer} />
                  <primitive object={materials.ringOuter} />
                </mesh>
              )}
            </>
          )}

          {/* Glowing particles */}
          {particleGeometry && particlePositions.map((pos, i) => (
            <mesh key={i} position={pos}>
              <primitive object={particleGeometry} />
              <primitive object={materials.particle} />
            </mesh>
          ))}

          {/* Enhanced point light */}
          <pointLight
            position={[0, 0, 0]}
            intensity={2.5}
            distance={size * 7}
            color={emissive}
            decay={2}
          />
        </group>
      </Float>
    </group>
  );
}
