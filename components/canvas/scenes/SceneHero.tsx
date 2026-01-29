'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

export function SceneHero() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[2.5, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            roughness={0.1}
            anisotropy={1}
            chromaticAberration={0.05}
            color="#ff0f39"
            resolution={1024}
          />
        </mesh>
        
        {/* Core Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.2, 1.2, 1.2]}>
             <torusGeometry args={[2.8, 0.02, 16, 100]} />
             <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}
