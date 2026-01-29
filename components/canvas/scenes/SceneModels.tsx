'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export function SceneModels() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Neural Network Nodes
  const nodes = useMemo(() => {
    const points = [];
    for(let i=0; i<12; i++) {
        points.push(new THREE.Vector3(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        ));
    }
    return points;
  }, []);

  const connections = useMemo(() => {
      const lines = [];
      for(let i=0; i<nodes.length; i++) {
          for(let j=i+1; j<nodes.length; j++) {
              if (nodes[i].distanceTo(nodes[j]) < 3.5) {
                  lines.push([nodes[i], nodes[j]]);
              }
          }
      }
      return lines;
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.x += delta * 0.05;
        groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        {nodes.map((pos, i) => (
            <mesh key={i} position={pos}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#ff0f39" emissive="#ff0f39" emissiveIntensity={2} />
            </mesh>
        ))}
        {connections.map((line, i) => (
            <Line
                key={i}
                points={line}
                color="#444"
                lineWidth={1}
                transparent
                opacity={0.3}
            />
        ))}
        {/* Central Brain Core */}
        <mesh>
             <icosahedronGeometry args={[1, 1]} />
             <meshStandardMaterial wireframe color="#333" />
        </mesh>
      </Float>
    </group>
  );
}
