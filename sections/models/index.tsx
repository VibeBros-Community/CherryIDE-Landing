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
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#6688ff" />
            <pointLight position={[-5, -5, 5]} intensity={1.5} color="#ff0f39" />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                <group ref={groupRef}>
                    {/* Central diamond */}
                    <mesh>
                        <octahedronGeometry args={[1.2, 0]} />
                        <meshPhysicalMaterial
                            color="#6688ff"
                            metalness={0.9}
                            roughness={0.1}
                            emissive="#6688ff"
                            emissiveIntensity={0.6}
                            clearcoat={1}
                        />
                    </mesh>

                    {/* Surrounding model spheres */}
                    {[0, 1, 2].map((i) => {
                        const angle = (i / 3) * Math.PI * 2;
                        const radius = 2.5;
                        const x = Math.cos(angle) * radius;
                        const z = Math.sin(angle) * radius;

                        return (
                            <mesh key={i} position={[x, 0, z]}>
                                <sphereGeometry args={[0.4, 32, 32]} />
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
    <section id="models" className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-[#000a14] to-black">
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
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
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
                    className={`rounded-full ${filter === f.value ? 'bg-blue-600 hover:bg-blue-700' : 'border-dark-border hover:bg-dark-bg/50'}`}
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
                        <div key={model.id} className="metallic-card p-5 rounded-xl hover:border-blue-500/40 transition-all bg-dark-bg/60 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${performanceColor}`}>
                                    <PerformanceIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-white">{model.name}</h3>
                                    <p className="text-xs text-blue-400">{model.provider}</p>
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
