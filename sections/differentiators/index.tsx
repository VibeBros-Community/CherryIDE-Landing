'use client';

import { Check, X } from 'lucide-react';
import MotionWrapper from '@/components/animations/motion-wrapper';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const comparisonData = [
  { feature: 'Cost', cherry: 'Free Forever', cursor: '$20/month', windsurf: '$15/month' },
  { feature: 'AI Models', cherry: '15+ Open-Source', cursor: 'GPT-4, Claude', windsurf: 'Proprietary' },
  { feature: 'Local Processing', cherry: true, cursor: 'Partial', windsurf: false },
  { feature: 'Open Source', cherry: true, cursor: false, windsurf: false },
  { feature: 'Rate Limits', cherry: 'None', cursor: '500/month', windsurf: 'Varies' },
  { feature: 'Privacy', cherry: '100% Private', cursor: 'Cloud-based', windsurf: 'Cloud-based' },
  { feature: 'Customizable', cherry: true, cursor: 'Limited', windsurf: 'Limited' },
];

function Differentiators3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ff0f39" />
      <pointLight position={[-5, -5, 3]} intensity={1.5} color="#00ff88" />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        {/* Trophy/Winner visual */}
        <group>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.6, 0.4, 0.8, 32]} />
            <meshPhysicalMaterial
              color="#ff0f39"
              metalness={0.9}
              roughness={0.1}
              emissive="#ff0f39"
              emissiveIntensity={0.4}
              clearcoat={1}
            />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshPhysicalMaterial
              color="#ffaa00"
              metalness={0.9}
              roughness={0.1}
              emissive="#ffaa00"
              emissiveIntensity={0.5}
              clearcoat={1}
            />
          </mesh>
          {/* Base */}
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[1.2, 0.2, 1.2]} />
            <meshPhysicalMaterial
              color="#333"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export default function Differentiators() {
  return (
    <section id="differentiators" className="py-20 bg-[#0d0d0d] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* 3D Content (Left) */}
          <div className="order-2 lg:order-1 h-[400px] w-full relative hidden lg:block">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100%', height: '100%' }}>
              <Differentiators3D />
            </Canvas>
          </div>

          {/* Content (Right) */}
          <div className="order-1 lg:order-2">
            {/* Section Header */}
            <MotionWrapper className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Why Choose <br />
                <span className="text-cherry-500">Cherry IDE?</span>
              </h2>
              <p className="text-xl text-gray-300">
                Compare with other AI-powered editors
              </p>
            </MotionWrapper>

            {/* Comparison Table - Compact */}
            <MotionWrapper delay={0.2} className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-3 px-3">
                  <div className="text-white font-bold mb-1">Cherry</div>
                  <div className="text-cherry-500 text-xs">Open-Source</div>
                </th>
                <th className="text-center py-3 px-3 text-white font-semibold">Cursor</th>
                <th className="text-center py-3 px-3 text-white font-semibold">Windsurf</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.feature}
                  className="border-b border-dark-border/50 hover:bg-dark-surface/30 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-300 font-medium">{row.feature}</td>
                  <td className="py-3 px-3 text-center">
                    {typeof row.cherry === 'boolean' ? (
                      row.cherry ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-white font-semibold text-xs">{row.cherry}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {typeof row.cursor === 'boolean' ? (
                      row.cursor ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400 text-xs">{row.cursor}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {typeof row.windsurf === 'boolean' ? (
                      row.windsurf ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400 text-xs">{row.windsurf}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </MotionWrapper>

            {/* Key Differentiators - Compact */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <MotionWrapper delay={0.3} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">🔓</div>
                <h3 className="text-sm font-bold text-white mb-1">Open Source</h3>
                <p className="text-xs text-gray-400">Fork & customize</p>
              </MotionWrapper>
              <MotionWrapper delay={0.4} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">🔒</div>
                <h3 className="text-sm font-bold text-white mb-1">Privacy First</h3>
                <p className="text-xs text-gray-400">100% local</p>
              </MotionWrapper>
              <MotionWrapper delay={0.5} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">💰</div>
                <h3 className="text-sm font-bold text-white mb-1">Zero Cost</h3>
                <p className="text-xs text-gray-400">Free forever</p>
              </MotionWrapper>
              <MotionWrapper delay={0.6} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">🎯</div>
                <h3 className="text-sm font-bold text-white mb-1">Full Control</h3>
                <p className="text-xs text-gray-400">Your AI, your way</p>
              </MotionWrapper>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
