'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { View, Float, PerspectiveCamera, Environment, MeshTransmissionMaterial, RoundedBox, PresentationControls, Text, Center, useTexture, Decal } from '@react-three/drei';
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
        {/* Core Icosahedron - Gem-like */}
        <mesh>
            <icosahedronGeometry args={[2, 0]} />
            <MeshTransmissionMaterial
                backside
                samples={8} // Increased quality
                thickness={0.8} // Thicker glass
                roughness={0.1}
                anisotropy={1.5} // High anisotropy for gem look
                chromaticAberration={0.3} // More rainbow edges
                color="#ff0f39"
                resolution={1024}
                distortion={0.2}
                distortionScale={0.2}
                temporalDistortion={0.1}
            />
        </mesh>
        
        {/* Outer Ring - Metallic with Cherry Gradient feel via Iridescence */}
        <mesh scale={[1.5, 1.5, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.05, 32, 100]} />
                <meshPhysicalMaterial 
                    color="#1a1b1e"
                    emissive="#ff0f39"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    iridescence={1}
                    iridescenceIOR={1.8}
                    iridescenceThicknessRange={[100, 400]}
                />
        </mesh>
        
        {/* Inner Ring - Thin & Bright */}
        <mesh scale={[1.2, 1.2, 1.2]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
             <torusGeometry args={[2, 0.02, 16, 100]} />
             <meshBasicMaterial color="#ff0f39" toneMapped={false} />
        </mesh>

        {/* Floating Particles */}
        <group rotation={[0.5, 0.5, 0]}>
            <mesh position={[3, 1, 0]}>
                <octahedronGeometry args={[0.3, 0]} />
                <meshStandardMaterial color="#ff0f39" emissive="#ff0f39" emissiveIntensity={4} toneMapped={false} />
            </mesh>
            {/* 3D Cherry Logo Shape - Constructed from primitives to match logo silhouette */}
            <group position={[-3, -2, 1]} scale={[0.4, 0.4, 0.4]} rotation={[0, 0, 0.2]}>
                {/* Left side arc */}
                <mesh position={[-0.5, 0, 0]}>
                    <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI * 1.2]} />
                    <meshPhysicalMaterial color="#ff0f39" emissive="#ff0f39" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
                </mesh>
                {/* Right side arc */}
                <mesh position={[0.5, 0, 0]} rotation={[0, Math.PI, 0]}>
                    <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI * 1.2]} />
                    <meshPhysicalMaterial color="#ff0f39" emissive="#ff0f39" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
                </mesh>
                {/* Center Core */}
                <mesh position={[0, -0.1, 0]}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshPhysicalMaterial color="#ff0f39" roughness={0.1} metalness={0.5} clearcoat={1} />
                </mesh>
                {/* Stem */}
                <mesh position={[0.1, 0.6, 0]} rotation={[0, 0, -0.5]}>
                    <cylinderGeometry args={[0.08, 0.05, 0.8, 16]} />
                    <meshPhysicalMaterial color="#ff0f39" />
                </mesh>
            </group>
            <mesh position={[1, 3, -1]}>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshStandardMaterial color="#ff0f39" />
            </mesh>
        </group>
    </group>
  );
}

function IDE({ transitionRef }: { transitionRef: React.MutableRefObject<number> }) {
    const ref = useRef<THREE.Group>(null);
    const codeGroupRef = useRef<THREE.Group>(null);
    const popupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            const transition = transitionRef.current;
            // Gentle float handled by <Float> parent, but here we handle entry
            const t = transition; // 0 -> 1
            const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
            
            ref.current.scale.setScalar(smoothT * 1.0);
            
            // Tilt effect based on mouse (optional, keeping it simple for now)
            ref.current.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, smoothT) + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }

        // Animate Code Lines (Typing effect)
        if (codeGroupRef.current) {
            codeGroupRef.current.children.forEach((child, i) => {
                const time = state.clock.elapsedTime;
                
                // Get the code content mesh (2nd child of the group)
                const contentMesh = child.children[1] as THREE.Mesh;
                
                if(contentMesh) {
                     // 1. Typing / Length animation
                     // Animate scale.x to simulate typing from left to right
                     // Stagger based on line index (i)
                     const loopTime = (time * 2 + i * 0.5) % 10; // Loop every 10s
                     if (loopTime < 1) {
                         // Type out phase
                         contentMesh.scale.x = THREE.MathUtils.lerp(0.1, 1, loopTime);
                         contentMesh.visible = true;
                     } else if (loopTime > 8) {
                         // Delete phase
                         contentMesh.visible = false;
                     } else {
                         // Static phase
                         contentMesh.scale.x = 1;
                         contentMesh.visible = true;
                     }

                     // 2. Pulse brightness for highlighted lines
                     if (contentMesh.material instanceof THREE.MeshStandardMaterial && contentMesh.material.emissive.r > 0) {
                          contentMesh.material.emissiveIntensity = 0.8 + Math.sin(time * 5) * 0.5;
                     }
                }
            });
        }

        // Animate Popup (Float up and down)
        if (popupRef.current) {
            popupRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <group ref={ref} scale={[0,0,0]}>
             {/* Window Frame - High Polish Metallic */}
             <RoundedBox args={[4, 2.8, 0.2]} radius={0.15} smoothness={4}>
                <meshPhysicalMaterial 
                    color="#0a0a0a" 
                    roughness={0.2} 
                    metalness={0.9}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </RoundedBox>
            
            {/* Screen Content - Separated Layer */}
            <mesh position={[0, 0, 0.15]}>
                <planeGeometry args={[3.8, 2.6]} />
                <meshPhysicalMaterial 
                    color="#050505" 
                    roughness={0.2}
                    metalness={0.5}
                />
            </mesh>

            {/* UI Header - Separated */}
            <mesh position={[0, 1.2, 0.2]}>
                 <planeGeometry args={[3.8, 0.2]} />
                 <meshBasicMaterial color="#1a1b1e" />
            </mesh>
            {/* Traffic Lights - Pop out */}
            <group position={[-1.7, 1.2, 0.22]} rotation={[Math.PI/2, 0, 0]}>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.05, 32]} />
                    <meshBasicMaterial color="#ff5f56" />
                </mesh>
                <mesh position={[0.2, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.05, 32]} />
                    <meshBasicMaterial color="#ffbd2e" />
                </mesh>
                <mesh position={[0.4, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.05, 32]} />
                    <meshBasicMaterial color="#27c93f" />
                </mesh>
            </group>

            {/* Sidebar - Separated Layer */}
            <mesh position={[-1.6, -0.1, 0.18]}>
                <boxGeometry args={[0.6, 2.4, 0.02]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Code Lines - Floating above screen */}
            <group position={[-0.8, 0.8, 0.2]} ref={codeGroupRef}>
                 {Array.from({ length: 10 }).map((_, i) => (
                    <group key={i} position={[0, -i * 0.22, 0]}>
                        {/* Line number */}
                        <mesh position={[-0.3, 0, 0]}>
                             <boxGeometry args={[0.1, 0.05, 0.02]} />
                             <meshBasicMaterial color="#333" />
                        </mesh>
                        {/* Code content */}
                        <mesh position={[0.5 + Math.random() * 0.5, 0, 0]}>
                            <boxGeometry args={[1 + Math.random() * 1.5, 0.08, 0.02]} />
                            <meshStandardMaterial 
                                color={i === 2 || i === 5 || i === 8 ? "#ff0f39" : "#4a4a4a"} 
                                toneMapped={false}
                                emissive={i === 2 || i === 5 || i === 8 ? "#ff0f39" : "#000"}
                                emissiveIntensity={0.5}
                            />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Floating Suggestions / IntelliSense Popup - Highly Separated */}
             <group position={[1, -0.2, 0.6]} rotation={[0, -0.15, 0]} ref={popupRef}>
                 <RoundedBox args={[1.4, 1.2, 0.05]} radius={0.05} smoothness={2}>
                     <meshPhysicalMaterial 
                        color="#1a1b1e"
                        roughness={0.3}
                        metalness={0.8}
                        emissive="#1a1b1e"
                        emissiveIntensity={0.2}
                     />
                 </RoundedBox>
                 {/* Selection Highlight */}
                 <mesh position={[0, 0.3, 0.04]}>
                     <boxGeometry args={[1.2, 0.15, 0.01]} />
                     <meshBasicMaterial color="#ff0f39" transparent opacity={0.3} />
                 </mesh>
                 {/* Suggestion Text Lines */}
                 {Array.from({ length: 5 }).map((_, i) => (
                     <mesh key={i} position={[-0.2, 0.3 - i * 0.2, 0.06]}>
                         <boxGeometry args={[0.8, 0.08, 0.01]} />
                         <meshBasicMaterial color={i === 0 ? "#fff" : "#666"} />
                     </mesh>
                 ))}
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
        <PresentationControls
          global={false} // Restrict to the container
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Crystal transitionRef={transitionRef} />
                <IDE transitionRef={transitionRef} />
            </Float>
        </PresentationControls>
      </group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff0f39" />
    </>
  );
}

export default function Hero() {
  return (
    <section 
        className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-black"
    >
      {/* Full-section 3D Background - High Z-index for interaction, pointer-events-auto */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-10">
         <View className="w-full h-full">
            <Hero3D />
         </View>
      </div>

      <div className="container mx-auto px-4 relative z-20 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Spacer for 3D Content (Left) */}
          <div className="hidden lg:block h-[500px] w-full order-2 lg:order-1" />

          {/* Text Content (Right) */}
          <div className="order-1 lg:order-2 text-left pointer-events-auto">
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
