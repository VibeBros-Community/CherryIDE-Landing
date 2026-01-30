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
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#ff0f39" />
            <pointLight position={[-5, -5, 5]} intensity={1} color="#ff6688" />

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                <group ref={groupRef}>
                    {/* Simple layered rings */}
                    {[0, 1, 2].map((i) => (
                        <mesh key={i} position={[0, i * 0.8 - 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[1.2 - i * 0.2, 0.08, 16, 32]} />
                            <meshStandardMaterial
                                color="#ff0f39"
                                emissive="#ff0f39"
                                emissiveIntensity={0.6 - i * 0.1}
                            />
                        </mesh>
                    ))}

                    {/* Central sphere */}
                    <mesh>
                        <sphereGeometry args={[0.4, 32, 32]} />
                        <meshStandardMaterial
                            color="#ff4466"
                            emissive="#ff4466"
                            emissiveIntensity={0.8}
                        />
                    </mesh>
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
      {/* Subtle texture for depth */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==')]" />

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
                    <span className="cherry-gradient-animate">
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
