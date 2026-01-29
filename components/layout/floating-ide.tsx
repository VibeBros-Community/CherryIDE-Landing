'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Helper for ranges
function range(value: number, min: number, max: number) {
  return value >= min && value <= max ? (value - min) / (max - min) : 0;
}

export default function FloatingIDE({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!group.current) return;
    
    const t = state.clock.getElapsedTime();
    const scroll = scrollProgress.current;
    
    // Default position (Hero) - Centered slightly left
    // We reduced the movement range to keep it in view
    const r1 = range(scroll, 0/7, 2/7);
    const r2 = range(scroll, 1/7, 3/7);
    const r3 = range(scroll, 2/7, 4/7);
    const r4 = range(scroll, 3/7, 5/7);
    
    // Target Positions
    // Hero: x = -2
    // Features: x = 2
    // Models: x = -2
    const targetX = -2 + (r1 * 4) - (r2 * 4) + (r3 * 4) - (r4 * 2);
    const targetY = Math.sin(t * 0.5) * 0.1;
    const targetZ = 0;

    const targetRotY = 0.2 + (r1 * -0.4) + (r2 * 0.4);
    const targetRotX = Math.sin(t * 0.3) * 0.05;

    const damp = 4 * delta;
    
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, damp);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, damp);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, damp);

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, damp);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, damp);
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* === CHASSIS === */}
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[4.2, 2.8, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* === SCREEN === */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[4, 2.6, 0.05]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>

        {/* === UI ELEMENTS (Geometry based) === */}
        
        {/* Header Bar */}
        <group position={[0, 1.1, 0.04]}>
          {/* Bar Background */}
          <mesh position={[0, 0, -0.01]}>
             <boxGeometry args={[4.1, 0.25, 0.01]} />
             <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[-1.8, 0, 0]} rotation={[1.57, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 32]} />
            <meshBasicMaterial color="#ff5f56" />
          </mesh>
          <mesh position={[-1.6, 0, 0]} rotation={[1.57, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 32]} />
            <meshBasicMaterial color="#ffbd2e" />
          </mesh>
          <mesh position={[-1.4, 0, 0]} rotation={[1.57, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 32]} />
            <meshBasicMaterial color="#27c93f" />
          </mesh>
        </group>

        {/* Sidebar */}
        <mesh position={[-1.75, -0.15, 0.04]}>
          <boxGeometry args={[0.5, 2.3, 0.01]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        {/* Code Lines (Abstract) */}
        <group position={[-0.5, 0.5, 0.05]}>
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={i} position={[0, -i * 0.2, 0]}>
              <boxGeometry args={[2 + Math.random(), 0.08, 0.01]} />
              <meshStandardMaterial 
                color={i === 3 || i === 7 ? "#ff0f39" : "#333"} 
                emissive={i === 3 || i === 7 ? "#ff0f39" : "#000"}
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>

      </Float>
    </group>
  );
}
