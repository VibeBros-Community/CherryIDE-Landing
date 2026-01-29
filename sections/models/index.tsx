'use client';

import { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { aiModels } from '@/data/models';
import { Zap, Gauge, Rocket } from 'lucide-react';
import { useRef } from 'react';
import * as THREE from 'three';

const performanceIcons = {
  fast: Zap,
  balanced: Gauge,
  powerful: Rocket,
};

const performanceColors = {
  fast: 'text-green-500 bg-green-500/10',
  balanced: 'text-blue-500 bg-blue-500/10',
  powerful: 'text-purple-500 bg-purple-500/10',
};

function Models3D() {
    const mainRef = useRef<THREE.Group>(null);
    const orbitRefs = useRef<THREE.Mesh[]>([]);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Main hub rotation
        if (mainRef.current) {
            mainRef.current.rotation.y = time * 0.2;
        }

        // Individual model nodes rotation
        orbitRefs.current.forEach((mesh, i) => {
            if (mesh) {
                const angle = (i / 5) * Math.PI * 2 + time * 0.3;
                const radius = 2.5;
                mesh.position.x = Math.cos(angle) * radius;
                mesh.position.z = Math.sin(angle) * radius;
                mesh.position.y = Math.sin(time * 0.5 + i) * 0.3;
                mesh.rotation.y = time * 0.4;
            }
        });
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={2.5} color="#ff0f39" />
            <pointLight position={[-5, -5, 5]} intensity={2} color="#ff6688" />
            <spotLight position={[0, 10, 5]} intensity={1.5} angle={0.5} penumbra={1} />

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                <group ref={mainRef}>
                    {/* Central AI Hub - larger crystal */}
                    <mesh>
                        <icosahedronGeometry args={[1, 0]} />
                        <meshPhysicalMaterial
                            color="#ff0f39"
                            metalness={0.9}
                            roughness={0.05}
                            emissive="#ff0f39"
                            emissiveIntensity={0.8}
                            clearcoat={1}
                            transmission={0.1}
                        />
                    </mesh>

                    {/* Inner glow sphere */}
                    <mesh>
                        <sphereGeometry args={[0.6, 32, 32]} />
                        <meshStandardMaterial
                            color="#ff0f39"
                            emissive="#ff0f39"
                            emissiveIntensity={1.2}
                            transparent
                            opacity={0.3}
                        />
                    </mesh>

                    {/* Orbiting AI Model nodes - 5 different models */}
                    {[0, 1, 2, 3, 4].map((i) => {
                        // Different shapes for different model types
                        const shapes = [
                            <octahedronGeometry key={i} args={[0.35, 0]} />,
                            <dodecahedronGeometry key={i} args={[0.35, 0]} />,
                            <tetrahedronGeometry key={i} args={[0.4, 0]} />,
                            <boxGeometry key={i} args={[0.5, 0.5, 0.5]} />,
                            <icosahedronGeometry key={i} args={[0.35, 0]} />,
                        ];

                        return (
                            <mesh
                                key={i}
                                ref={(el) => {
                                    if (el) orbitRefs.current[i] = el;
                                }}
                            >
                                {shapes[i]}
                                <meshPhysicalMaterial
                                    color="#ff4466"
                                    metalness={0.9}
                                    roughness={0.1}
                                    emissive="#ff4466"
                                    emissiveIntensity={0.6}
                                    clearcoat={1}
                                />
                            </mesh>
                        );
                    })}

                    {/* Connection rings */}
                    {[0, 1].map((i) => (
                        <mesh key={`ring-${i}`} rotation={[Math.PI / 4 + i * Math.PI / 2, Math.PI / 4, 0]}>
                            <torusGeometry args={[2.5, 0.03, 16, 100]} />
                            <meshStandardMaterial
                                color="#ff0f39"
                                emissive="#ff0f39"
                                emissiveIntensity={0.4}
                                transparent
                                opacity={0.4}
                            />
                        </mesh>
                    ))}
                </group>
            </Float>
        </>
    );
}

export default function Models() {
  const [filter, setFilter] = useState<string>('all');

  const filteredModels = filter === 'all'
    ? aiModels
    : aiModels.filter(model => model.useCase.includes(filter));

  const filters = [
    { label: 'All Models', value: 'all' },
    { label: 'Coding', value: 'coding' },
    { label: 'Completion', value: 'completion' },
    { label: 'Chat', value: 'chat' },
  ];

  return (
    <section id="models" className="py-20 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* 3D Content (Left) */}
            <div className="order-2 lg:order-1 h-[500px] w-full relative hidden lg:block">
              <Canvas style={{ width: '100%', height: '100%' }}>
                <Models3D />
              </Canvas>
            </div>

            {/* Text Content (Right) */}
            <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Choose Your{' '}
                    <span className="bg-gradient-to-r from-cherry-500 to-rose-400 bg-clip-text text-transparent">
                        AI Intelligence
                    </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-lg">
                    Run the best open-source AI models locally. Switch on-the-fly based on your needs.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                {filters.map((f) => (
                    <Button
                    key={f.value}
                    variant={filter === f.value ? 'default' : 'outline'}
                    className={`rounded-full ${filter === f.value ? 'bg-cherry-600 hover:bg-cherry-700' : 'border-dark-border hover:bg-dark-bg/50'}`}
                    onClick={() => setFilter(f.value)}
                    >
                    {f.label}
                    </Button>
                ))}
                </div>

                {/* Models List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                {filteredModels.slice(0, 8).map((model) => {
                    const PerformanceIcon = performanceIcons[model.performance];
                    const performanceColor = performanceColors[model.performance];

                    return (
                        <div key={model.id} className="metallic-card p-5 rounded-xl hover:border-cherry-500/40 transition-all bg-dark-bg/60 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${performanceColor}`}>
                                    <PerformanceIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-white">{model.name}</h3>
                                    <p className="text-xs text-cherry-400">{model.provider}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2">{model.description}</p>
                        </div>
                    );
                })}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
