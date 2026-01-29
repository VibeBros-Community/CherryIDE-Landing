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
    const brainRef = useRef<THREE.Group>(null);
    const shieldRef = useRef<THREE.Group>(null);
    const layersRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Brain rotation
        if (brainRef.current) {
            brainRef.current.rotation.y = time * 0.3;
            brainRef.current.position.y = Math.sin(time * 0.5) * 0.2;
        }

        // Shield subtle rotation
        if (shieldRef.current) {
            shieldRef.current.rotation.y = Math.sin(time * 0.4) * 0.3;
            shieldRef.current.position.y = Math.cos(time * 0.6) * 0.2;
        }

        // Layers rotation
        if (layersRef.current) {
            layersRef.current.rotation.y = time * 0.2;
            layersRef.current.position.y = Math.sin(time * 0.7) * 0.15;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={2.5} color="#ff0f39" />
            <pointLight position={[-5, -5, 5]} intensity={2} color="#ff6688" />
            <spotLight position={[0, 10, 5]} intensity={1.5} angle={0.5} penumbra={1} />

            {/* AI Brain - representing intelligence */}
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                <group ref={brainRef} position={[-2.5, 1.5, 0]}>
                    {/* Central brain core */}
                    <mesh>
                        <sphereGeometry args={[0.5, 32, 32]} />
                        <meshPhysicalMaterial
                            color="#ff0f39"
                            metalness={0.8}
                            roughness={0.2}
                            emissive="#ff0f39"
                            emissiveIntensity={0.7}
                            clearcoat={1}
                        />
                    </mesh>
                    {/* Neural connections */}
                    {[0, 1, 2, 3, 4].map((i) => {
                        const angle = (i / 5) * Math.PI * 2;
                        const radius = 0.7;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        return (
                            <group key={i}>
                                <mesh position={[x, y, 0]}>
                                    <sphereGeometry args={[0.12, 16, 16]} />
                                    <meshStandardMaterial
                                        color="#ff4466"
                                        emissive="#ff4466"
                                        emissiveIntensity={0.5}
                                    />
                                </mesh>
                                {/* Connection lines */}
                                <mesh position={[x/2, y/2, 0]} rotation={[0, 0, angle]}>
                                    <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
                                    <meshStandardMaterial
                                        color="#ff0f39"
                                        emissive="#ff0f39"
                                        emissiveIntensity={0.4}
                                        transparent
                                        opacity={0.6}
                                    />
                                </mesh>
                            </group>
                        );
                    })}
                </group>
            </Float>

            {/* Shield - representing security/privacy */}
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                <group ref={shieldRef} position={[2.5, -1, 0]}>
                    {/* Shield body */}
                    <mesh>
                        <boxGeometry args={[1, 1.3, 0.15]} />
                        <meshPhysicalMaterial
                            color="#ff0f39"
                            metalness={0.9}
                            roughness={0.1}
                            emissive="#ff0f39"
                            emissiveIntensity={0.5}
                            clearcoat={1}
                        />
                    </mesh>
                    {/* Shield top */}
                    <mesh position={[0, 0.75, 0]}>
                        <coneGeometry args={[0.5, 0.5, 4]} />
                        <meshPhysicalMaterial
                            color="#ff0f39"
                            metalness={0.9}
                            roughness={0.1}
                            emissive="#ff0f39"
                            emissiveIntensity={0.5}
                            clearcoat={1}
                        />
                    </mesh>
                    {/* Shield emblem */}
                    <mesh position={[0, 0, 0.1]}>
                        <sphereGeometry args={[0.25, 16, 16]} />
                        <meshStandardMaterial
                            color="#ff6688"
                            emissive="#ff6688"
                            emissiveIntensity={0.8}
                        />
                    </mesh>
                </group>
            </Float>

            {/* Layered stack - representing multi-model support */}
            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.3}>
                <group ref={layersRef} position={[0, -1.5, -1]}>
                    {[0, 1, 2].map((i) => (
                        <mesh key={i} position={[0, i * 0.35, 0]}>
                            <boxGeometry args={[1.2 - i * 0.15, 0.2, 1.2 - i * 0.15]} />
                            <meshPhysicalMaterial
                                color="#ff4466"
                                metalness={0.8}
                                roughness={0.2}
                                emissive="#ff4466"
                                emissiveIntensity={0.4 + i * 0.1}
                                clearcoat={1}
                                transparent
                                opacity={0.9}
                            />
                        </mesh>
                    ))}
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
