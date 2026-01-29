'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import { Brain, ShieldCheck, Code2, Layers, Terminal, Puzzle } from 'lucide-react';
import { coreFeatures } from '@/config/features';
import { useRef } from 'react';
import * as THREE from 'three';

const iconMap = {
  'brain': Brain,
  'shield-check': ShieldCheck,
  'search-code': Code2,
  'layers': Layers,
  'terminal': Terminal,
  'puzzle': Puzzle,
};

function Features3D() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#ff0f39" />
            <pointLight position={[-5, -5, 5]} intensity={1.5} color="#ff6688" />

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                <group ref={groupRef}>
                    {/* Central core sphere */}
                    <mesh>
                        <sphereGeometry args={[0.8, 32, 32]} />
                        <meshPhysicalMaterial
                            color="#ff0f39"
                            metalness={0.9}
                            roughness={0.1}
                            emissive="#ff0f39"
                            emissiveIntensity={0.6}
                            clearcoat={1}
                        />
                    </mesh>

                    {/* Orbiting feature cubes */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                        const angle = (i / 6) * Math.PI * 2;
                        const radius = 2;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <mesh key={i} position={[x, y, 0]}>
                                <boxGeometry args={[0.3, 0.3, 0.3]} />
                                <meshPhysicalMaterial
                                    color="#ff4466"
                                    metalness={1}
                                    roughness={0.1}
                                    emissive="#ff4466"
                                    emissiveIntensity={0.5}
                                    clearcoat={1}
                                />
                            </mesh>
                        );
                    })}
                </group>
            </Float>
        </>
    );
}

export default function Features() {
  return (
    <section id="features" className="py-20 relative overflow-hidden bg-[#0d0d0d]">
      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text Content (Left) */}
            <div className="order-1">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Powerful Features for{' '}
                    <span className="bg-gradient-to-r from-cherry-500 to-rose-400 bg-clip-text text-transparent">
                        Modern Development
                    </span>
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-lg">
                    Everything you need to code with AI, all in one powerful editor.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {coreFeatures.map((feature) => {
                        const Icon = iconMap[feature.icon as keyof typeof iconMap];
                        return (
                            <div
                                key={feature.id}
                                className="group"
                            >
                                <div className="metallic-card rounded-xl p-6 h-full transition-all duration-300 hover:scale-105 hover:border-cherry-500/50">
                                    <Icon className="w-8 h-8 text-cherry-500 mb-4" />
                                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 3D Content (Right) */}
            <div className="order-2 h-[500px] w-full relative hidden lg:block">
                <Canvas style={{ width: '100%', height: '100%' }}>
                    <Features3D />
                </Canvas>
            </div>

        </div>
      </div>
    </section>
  );
}
