'use client';

import { useRef } from 'react';
import { View, Float, PerspectiveCamera } from '@react-three/drei';
import { Brain, ShieldCheck, Code2, Layers, Terminal, Puzzle } from 'lucide-react';
import { coreFeatures } from '@/config/features';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const iconMap = {
  'brain': Brain,
  'shield-check': ShieldCheck,
  'search-code': Code2,
  'layers': Layers,
  'terminal': Terminal,
  'puzzle': Puzzle,
};

// Brain model for AI features
function BrainModel() {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <group position={[-3, 2, 0]}>
                <mesh>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#ff0f39"
                        metalness={0.8}
                        roughness={0.2}
                        emissive="#ff0f39"
                        emissiveIntensity={0.5}
                        clearcoat={1}
                    />
                </mesh>
                {/* Neural connections */}
                {[0, 1, 2, 3].map((i) => {
                    const angle = (i / 4) * Math.PI * 2;
                    const x = Math.cos(angle) * 0.8;
                    const y = Math.sin(angle) * 0.8;
                    return (
                        <mesh key={i} position={[x, y, 0]}>
                            <sphereGeometry args={[0.15, 16, 16]} />
                            <meshStandardMaterial
                                color="#ff4466"
                                emissive="#ff4466"
                                emissiveIntensity={0.4}
                            />
                        </mesh>
                    );
                })}
            </group>
        </Float>
    );
}

// Shield model for security/privacy
function ShieldModel() {
    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.3}>
            <group position={[3, -2, 0]}>
                <mesh>
                    <boxGeometry args={[1, 1.2, 0.2]} />
                    <meshPhysicalMaterial
                        color="#4466ff"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#4466ff"
                        emissiveIntensity={0.4}
                        clearcoat={1}
                    />
                </mesh>
                <mesh position={[0, 0.6, 0]}>
                    <coneGeometry args={[0.5, 0.4, 3]} />
                    <meshPhysicalMaterial
                        color="#4466ff"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#4466ff"
                        emissiveIntensity={0.4}
                        clearcoat={1}
                    />
                </mesh>
            </group>
        </Float>
    );
}

// Layers/nodes model for multi-model support
function LayersModel() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={[0, 0, -1]}>
                {[0, 1, 2].map((i) => (
                    <mesh key={i} position={[0, 0, i * 0.4]}>
                        <boxGeometry args={[1.2 - i * 0.2, 1.2 - i * 0.2, 0.1]} />
                        <meshPhysicalMaterial
                            color="#ff0f39"
                            metalness={0.8}
                            roughness={0.2}
                            emissive="#ff0f39"
                            emissiveIntensity={0.3 + i * 0.1}
                            transparent
                            opacity={0.8 - i * 0.2}
                            clearcoat={1}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

function Features3D() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#ff0f39" />
            <pointLight position={[-5, -5, 5]} intensity={1.5} color="#4466ff" />
            <spotLight position={[0, 10, 5]} intensity={1} angle={0.5} penumbra={1} />

            <BrainModel />
            <ShieldModel />
            <LayersModel />
        </>
    );
}

export default function Features() {
  return (
    <section id="features" className="py-16 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#0a0a0a]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />

      {/* 3D Background Layer */}
      <div className="absolute inset-0 opacity-40">
        <View className="w-full h-full">
          <Features3D />
        </View>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Everything You Need{' '}
            <span className="bg-gradient-to-r from-cherry-500 to-red-400 bg-clip-text text-transparent">
              to Code with AI
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Cherry IDE combines the best open-source AI models with a powerful, privacy-focused editor.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {coreFeatures.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={feature.id}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cherry-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative metallic-card rounded-xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:border-cherry-500/40">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-2 rounded-lg bg-cherry-500/10">
                      <Icon className="w-6 h-6 text-cherry-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white pt-1">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
