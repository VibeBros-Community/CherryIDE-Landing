'use client';

import { useState, useRef } from 'react';
import { View, Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { aiModels } from '@/data/models';
import { Zap, Gauge, Rocket } from 'lucide-react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

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
    const pointsRef = useRef<THREE.Points>(null);
    // Generate random points for a "neural network" cloud
    const count = 1500; // Increased count for full screen
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) {
        // Spread points wider
        positions[i] = (Math.random() - 0.5) * 20; 
    }

    useFrame((state, delta) => {
        if(pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.1;
            pointsRef.current.rotation.x += delta * 0.05;
        }
    })

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                    <PointMaterial
                        transparent
                        color="#ff0f39"
                        size={0.05}
                        sizeAttenuation={true}
                        depthWrite={false}
                    />
                </Points>
                {/* Central Core */}
                <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="#222" wireframe />
                </mesh>
            </Float>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ff0f39" />
        </>
    )
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
    <section id="models" className="py-20 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text Content (Left) */}
            <div className="order-1">
                <div className="mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Choose Your <br/>
                        <span className="text-cherry-500">Intelligence</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                        Run the best open-source AI models locally. Switch on-the-fly based on your needs.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
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

                {/* Models List - Compact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredModels.slice(0, 6).map((model, index) => {
                    const PerformanceIcon = performanceIcons[model.performance];
                    const performanceColor = performanceColors[model.performance];

                    return (
                        <div key={model.id} className="metallic-card p-4 rounded-xl border border-white/5 hover:border-cherry-500/30 transition-all bg-dark-bg/60 backdrop-blur-md">
                            <div className="flex items-start gap-3 mb-2">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${performanceColor} flex-shrink-0`}>
                                    <PerformanceIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-white truncate">{model.name}</h3>
                                    <p className="text-xs text-cherry-400">{model.provider}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2">{model.description}</p>
                        </div>
                    );
                })}
                </div>
            </div>

            {/* 3D Content (Right) */}
            <div className="order-2 h-[500px] w-full relative hidden lg:block">
              <View className="absolute inset-0 w-full h-full">
                <Models3D />
              </View>
            </div>

        </div>
      </div>
    </section>
  );
}
