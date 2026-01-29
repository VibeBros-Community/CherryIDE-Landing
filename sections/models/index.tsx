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
    <section id="models" className="py-24 bg-black relative overflow-hidden">
      {/* Full-section 3D Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <View className="w-full h-full">
          <Models3D />
        </View>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="flex flex-col items-center">
             
            {/* Text Content */}
            <div className="max-w-4xl mx-auto w-full">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        Choose Your <br/>
                        <span className="text-cherry-500">Intelligence</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-md">
                        Run the best open-source AI models locally. Switch on-the-fly based on your needs—whether it's speed, accuracy, or specialized coding tasks.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                {filters.map((f) => (
                    <Button
                    key={f.value}
                    variant={filter === f.value ? 'default' : 'outline'}
                    className={`rounded-full ${filter === f.value ? 'bg-cherry-600 hover:bg-cherry-700' : 'border-dark-border hover:bg-dark-bg/50 backdrop-blur-sm'}`}
                    onClick={() => setFilter(f.value)}
                    >
                    {f.label}
                    </Button>
                ))}
                </div>

                {/* Models List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredModels.map((model, index) => {
                    const PerformanceIcon = performanceIcons[model.performance];
                    const performanceColor = performanceColors[model.performance];

                    return (
                        <div key={model.id} className="metallic-card p-5 rounded-xl border border-white/5 hover:border-cherry-500/30 transition-all flex flex-col items-start gap-4 h-full bg-dark-bg/60 backdrop-blur-md">
                            <div className="flex w-full justify-between items-start">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${performanceColor}`}>
                                    <PerformanceIcon className="w-5 h-5" />
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">{model.parameters}</span>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{model.name}</h3>
                                <p className="text-sm text-cherry-400 mb-2">{model.provider}</p>
                                <p className="text-sm text-gray-400 line-clamp-3">{model.description}</p>
                            </div>
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
