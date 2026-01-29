'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function ScenePrivacy() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Shield Shape Construction */}
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[2, 2, 0.5, 6]} />
            <MeshTransmissionMaterial 
                color="#0a0a0a" 
                thickness={0.5} 
                roughness={0} 
                chromaticAberration={0.05} 
                anisotropy={0.5}
            />
        </mesh>
        
        {/* Lock Icon */}
        <group position={[0, 0, 0.3]}>
            <mesh rotation={[0, 0, Math.PI]}>
               <torusGeometry args={[0.8, 0.15, 16, 32, Math.PI]} />
               <meshStandardMaterial color="#fff" />
            </mesh>
            <mesh position={[0, -0.8, 0]}>
               <boxGeometry args={[1.2, 1, 0.3]} />
               <meshStandardMaterial color="#fff" />
            </mesh>
        </group>

        {/* Floating Particles */}
        <mesh position={[2, 2, -1]}>
             <sphereGeometry args={[0.2]} />
             <meshStandardMaterial color="#ff0f39" emissive="#ff0f39" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}
