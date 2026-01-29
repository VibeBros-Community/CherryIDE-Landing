'use client';

import { Check, X } from 'lucide-react';
import MotionWrapper from '@/components/animations/motion-wrapper';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
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
  const trophyRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Trophy subtle rotation
    if (trophyRef.current) {
      trophyRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      trophyRef.current.position.y = Math.sin(time * 0.8) * 0.1;
    }

    // Stars rotation
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#ff0f39" />
      <pointLight position={[-5, -5, 5]} intensity={2} color="#ffaa00" />
      <spotLight position={[0, 10, 5]} intensity={1.5} angle={0.5} penumbra={1} />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={trophyRef}>
          {/* Trophy base platform */}
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[1, 1.2, 0.3, 32]} />
            <meshPhysicalMaterial
              color="#1a1a1a"
              metalness={0.9}
              roughness={0.2}
              clearcoat={1}
            />
          </mesh>

          {/* Trophy stem */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 0.8, 16]} />
            <meshPhysicalMaterial
              color="#ff0f39"
              metalness={0.9}
              roughness={0.1}
              emissive="#ff0f39"
              emissiveIntensity={0.3}
              clearcoat={1}
            />
          </mesh>

          {/* Trophy cup body */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.7, 0.5, 1.2, 32]} />
            <meshPhysicalMaterial
              color="#ff0f39"
              metalness={0.95}
              roughness={0.05}
              emissive="#ff0f39"
              emissiveIntensity={0.5}
              clearcoat={1}
              clearcoatRoughness={0}
            />
          </mesh>

          {/* Trophy top rim */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.75, 0.7, 0.15, 32]} />
            <meshPhysicalMaterial
              color="#ff4466"
              metalness={0.95}
              roughness={0.05}
              emissive="#ff4466"
              emissiveIntensity={0.6}
              clearcoat={1}
            />
          </mesh>

          {/* Trophy handles */}
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.8, 0.4, 0]} rotation={[0, 0, side * Math.PI / 6]}>
              <torusGeometry args={[0.3, 0.08, 16, 32]} />
              <meshPhysicalMaterial
                color="#ff0f39"
                metalness={0.9}
                roughness={0.1}
                emissive="#ff0f39"
                emissiveIntensity={0.4}
                clearcoat={1}
              />
            </mesh>
          ))}

          {/* Winner emblem on cup */}
          <mesh position={[0, 0.3, 0.72]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial
              color="#ffaa00"
              emissive="#ffaa00"
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      </Float>

      {/* Orbiting stars/sparkles */}
      <group ref={starsRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const radius = 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <mesh key={i} position={[x, y, 0]}>
              <octahedronGeometry args={[0.15, 0]} />
              <meshStandardMaterial
                color="#ffaa00"
                emissive="#ffaa00"
                emissiveIntensity={0.8}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

export default function Differentiators() {
  return (
    <section id="differentiators" className="py-20 bg-[#0d0d0d] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Content (Left) */}
          <div className="order-1">
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

          {/* 3D Content (Right) */}
          <div className="order-2 h-[400px] w-full relative hidden lg:block">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100%', height: '100%' }}>
              <Differentiators3D />
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
}
