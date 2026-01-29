'use client';

import { useRef, useState, useMemo } from 'react';
import { View, Float, PerspectiveCamera, Environment, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Download, Github, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { formatNumber } from '@/lib/utils';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Crystal({ transitionRef }: { transitionRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
        const transition = transitionRef.current;
        // Continuous rotation
        ref.current.rotation.y += delta * 0.2;
        ref.current.rotation.x += delta * 0.1;
        
        // Transition effect: Scale down and spin fast when leaving
        const t = 1 - transition; // 1 -> 0
        // Use smoothstep for nicer easing
        const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
        
        ref.current.scale.setScalar(smoothT * 0.6);
        // Only spin out when transitioning
        if(transition > 0) {
            ref.current.rotation.z += delta * transition * 5; 
        }
    }
  });

  return (
    <group ref={ref}>
        {/* Core Icosahedron */}
        <mesh>
            <icosahedronGeometry args={[2, 0]} />
            <MeshTransmissionMaterial
                backside
                samples={4}
                thickness={0.5}
                roughness={0.2}
                anisotropy={1}
                chromaticAberration={0.1}
                color="#ff0f39"
                resolution={512}
            />
        </mesh>
        {/* Outer Ring */}
        <mesh scale={[1.5, 1.5, 1.5]}>
                <torusGeometry args={[2, 0.05, 16, 100]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        {/* Floating Particles */}
        <group rotation={[0.5, 0.5, 0]}>
            <mesh position={[3, 1, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#ff0f39" emissive="#ff0f39" emissiveIntensity={2} />
            </mesh>
                <mesh position={[-3, -2, 1]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
        </group>
    </group>
  );
}

function IDE({ transitionRef }: { transitionRef: React.MutableRefObject<number> }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            const transition = transitionRef.current;
            // Gentle float handled by <Float> parent, but here we handle entry
            const t = transition; // 0 -> 1
            const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
            
            ref.current.scale.setScalar(smoothT * 0.8);
            
            // Tilt effect based on mouse (optional, keeping it simple for now)
            ref.current.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, smoothT) + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={ref} scale={[0,0,0]}>
             {/* Window Frame */}
             <RoundedBox args={[4, 2.8, 0.2]} radius={0.1} smoothness={4}>
                <meshPhysicalMaterial 
                    color="#1a1b1e" 
                    roughness={0.2} 
                    metalness={0.8}
                    clearcoat={1}
                />
            </RoundedBox>
            
            {/* Screen Content - Dark Glass */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[3.8, 2.6]} />
                <meshBasicMaterial color="#000" />
            </mesh>

            {/* UI Header */}
            <mesh position={[0, 1.2, 0.12]}>
                 <planeGeometry args={[3.8, 0.2]} />
                 <meshBasicMaterial color="#333" />
            </mesh>
            {/* Traffic Lights */}
            <group position={[-1.7, 1.2, 0.13]}>
                <mesh position={[0, 0, 0]}>
                    <circleGeometry args={[0.05, 16]} />
                    <meshBasicMaterial color="#ff5f56" />
                </mesh>
                <mesh position={[0.15, 0, 0]}>
                    <circleGeometry args={[0.05, 16]} />
                    <meshBasicMaterial color="#ffbd2e" />
                </mesh>
                <mesh position={[0.3, 0, 0]}>
                    <circleGeometry args={[0.05, 16]} />
                    <meshBasicMaterial color="#27c93f" />
                </mesh>
            </group>

            {/* Code Lines - Glowing */}
            <group position={[-1.6, 0.8, 0.12]}>
                 {Array.from({ length: 8 }).map((_, i) => (
                    <mesh key={i} position={[0, -i * 0.25, 0]} scale={[1 + Math.random(), 1, 1]}>
                        <planeGeometry args={[1, 0.05]} />
                        <meshBasicMaterial color={i === 2 || i === 5 ? "#ff0f39" : "#444"} />
                    </mesh>
                ))}
            </group>

            {/* Floating Elements (Suggestions) */}
             <group position={[1, 0, 0.3]} rotation={[0, -0.2, 0]}>
                 <RoundedBox args={[1.5, 0.8, 0.05]} radius={0.05}>
                     <meshBasicMaterial color="#222" />
                 </RoundedBox>
                 <mesh position={[-0.5, 0.1, 0.06]}>
                     <planeGeometry args={[0.8, 0.05]} />
                     <meshBasicMaterial color="#ff0f39" />
                 </mesh>
                 <mesh position={[-0.4, -0.1, 0.06]}>
                     <planeGeometry args={[1, 0.03]} />
                     <meshBasicMaterial color="#666" />
                 </mesh>
             </group>
        </group>
    )
}

function Hero3D() {
  const transitionRef = useRef(0); // 0 = Crystal, 1 = IDE

  // Toggle state every 5 seconds
  useFrame((state, delta) => {
      const time = state.clock.elapsedTime;
      const cycle = Math.floor(time / 5) % 2; // 0 or 1
      const target = cycle === 1 ? 1 : 0;
      
      // Smooth interpolation
      transitionRef.current = THREE.MathUtils.lerp(transitionRef.current, target, delta * 2);
  });
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <Environment preset="city" />
      {/* Move group to left to account for full-width canvas */}
      <group position={[-2.5, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Crystal transitionRef={transitionRef} />
            <IDE transitionRef={transitionRef} />
        </Float>
      </group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff0f39" />
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-black">
      {/* Full-section 3D Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
         <View className="w-full h-full">
            <Hero3D />
         </View>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Spacer for 3D Content (Left) */}
          <div className="hidden lg:block h-[500px] w-full order-2 lg:order-1" />

          {/* Text Content (Right) */}
          <div className="order-1 lg:order-2 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface/50 backdrop-blur-md border border-dark-border mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-cherry-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">Open-source AI IDE • Free Forever</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up leading-tight">
                Code with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry-500 to-rose-400">
                  Open-Source AI
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-lg animate-slide-up delay-100">
                Cherry IDE brings the latest open-source AI models directly into your editor. 
                <span className="text-white block mt-2 font-medium">No cloud. No subscriptions. 100% Private.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up delay-200">
                <Button size="xl" className="group shadow-lg shadow-cherry-500/20 bg-cherry-600 hover:bg-cherry-700 text-white border-none">
                  <Download className="w-5 h-5 mr-2" />
                  Download Now
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="xl" variant="outline" className="border-dark-border hover:bg-dark-surface" asChild>
                  <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>

               <div className="flex items-center gap-8 text-sm text-gray-500 animate-fade-in delay-300">
                  <div>
                    <strong className="text-white text-lg block">{formatNumber(siteConfig.stats.downloads)}+</strong>
                    Downloads
                  </div>
                   <div className="h-8 w-px bg-dark-border" />
                  <div>
                    <strong className="text-white text-lg block">{formatNumber(siteConfig.stats.githubStars)}+</strong>
                    Stars
                  </div>
                   <div className="h-8 w-px bg-dark-border" />
                  <div>
                    <strong className="text-white text-lg block">v{siteConfig.version}</strong>
                    Latest Release
                  </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}
