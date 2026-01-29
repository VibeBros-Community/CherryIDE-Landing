'use client';

import { useRef } from 'react';
import { View, Float, PerspectiveCamera } from '@react-three/drei';
import { Brain, ShieldCheck, Code2, Layers, Terminal, Puzzle } from 'lucide-react';
import { coreFeatures } from '@/config/features';

const iconMap = {
  'brain': Brain,
  'shield-check': ShieldCheck,
  'search-code': Code2,
  'layers': Layers,
  'terminal': Terminal,
  'puzzle': Puzzle,
};

function Features3D() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Abstract geometric nodes representing features connecting */}
                 <mesh position={[-2, 1, 0]}>
                    <octahedronGeometry args={[1.2, 0]} />
                    <meshStandardMaterial color="#333" roughness={0.1} metalness={1} wireframe />
                 </mesh>
                 <mesh position={[2, -1, -1]}>
                    <dodecahedronGeometry args={[1.2, 0]} />
                    <meshStandardMaterial color="#ff0f39" roughness={0.4} metalness={0.8} />
                 </mesh>
                 <mesh position={[0, 2, -2]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#555" roughness={0.1} metalness={1} />
                 </mesh>
                 {/* Connecting lines could be added here later */}
            </Float>
            <ambientLight intensity={0.5} />
            <pointLight position={[-10, 0, 10]} intensity={1} color="#ff0f39" />
        </>
    )
}

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#111111]">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content (Left) */}
            <div className="order-1">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Everything You Need <br/>
                        <span className="text-gray-400">to Code with AI</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-lg">
                        Cherry IDE combines the best open-source AI models with a powerful, privacy-focused editor.
                        It's built for developers who demand control.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {coreFeatures.map((feature, index) => {
                        const Icon = iconMap[feature.icon as keyof typeof iconMap];
                        return (
                        <div
                            key={feature.id}
                            className="metallic-card rounded-xl p-6 group hover:border-cherry-500/30 transition-all duration-300"
                        >
                            <div className="mb-4">
                                <Icon className="w-8 h-8 text-cherry-500 mb-2" />
                                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                        );
                    })}
                </div>
            </div>

            {/* 3D Content (Right) */}
            <div className="order-2 h-[600px] w-full relative hidden lg:block">
                 <View className="absolute inset-0 w-full h-full">
                    <Features3D />
                 </View>
            </div>

        </div>
      </div>
    </section>
  );
}
