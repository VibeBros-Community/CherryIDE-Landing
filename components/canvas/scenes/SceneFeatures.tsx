'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

export function SceneFeatures() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create abstract blocks representing code chunks
  const blocks = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      scale: [1 + Math.random(), 0.2, 0.2] as [number, number, number],
      color: i % 3 === 0 ? '#ff0f39' : '#333',
    }));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {blocks.map((block, i) => (
            <mesh key={i} position={block.position} scale={block.scale}>
                <boxGeometry />
                <meshStandardMaterial 
                    color={block.color} 
                    emissive={block.color === '#ff0f39' ? '#ff0f39' : '#000'}
                    emissiveIntensity={block.color === '#ff0f39' ? 2 : 0}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        ))}
        {/* Glass Container representing the 'Editor' */}
        <mesh position={[0, 0, -1]} scale={[7, 5, 1]}>
            <planeGeometry />
            <meshStandardMaterial color="#111" transparent opacity={0.5} roughness={0} />
        </mesh>
      </Float>
    </group>
  );
}
