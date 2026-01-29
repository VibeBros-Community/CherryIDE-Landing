'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, MeshTransmissionMaterial, RoundedBox, PresentationControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Download, Github, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { formatNumber } from '@/lib/utils';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Crystal({ transitionRef }: { transitionRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);

  // Create 3D Cherry Logo - accurate 1:1 copy
  const cherryLogoGeometry = useMemo(() => {
    // Main outer shape - cherry with connected outer curves
    const outerShape = new THREE.Shape();

    // Left side - start from top left
    outerShape.moveTo(-0.1, 0.22);

    // Left outer curve - thick C-shape wrapping around
    outerShape.bezierCurveTo(-0.25, 0.2, -0.4, 0.15, -0.48, 0.0);
    outerShape.bezierCurveTo(-0.54, -0.15, -0.54, -0.35, -0.48, -0.48);

    // Left bottom curve - rounded lobe
    outerShape.bezierCurveTo(-0.42, -0.56, -0.28, -0.62, -0.12, -0.6);

    // Bottom center - slight dip for double-lobe cherry shape
    outerShape.bezierCurveTo(-0.04, -0.59, 0.04, -0.59, 0.12, -0.6);

    // Right bottom curve - rounded lobe
    outerShape.bezierCurveTo(0.28, -0.62, 0.42, -0.56, 0.48, -0.48);

    // Right outer curve
    outerShape.bezierCurveTo(0.54, -0.35, 0.54, -0.15, 0.48, 0.0);
    outerShape.bezierCurveTo(0.4, 0.15, 0.25, 0.2, 0.1, 0.22);

    // Top dip where stem connects
    outerShape.bezierCurveTo(0.05, 0.18, -0.05, 0.18, -0.1, 0.22);

    // Create crescent-shaped gaps - smooth inner curves
    const leftGap = new THREE.Path();
    // Outer edge of gap
    leftGap.moveTo(-0.15, 0.16);
    leftGap.bezierCurveTo(-0.28, 0.13, -0.38, 0.05, -0.42, -0.08);
    leftGap.bezierCurveTo(-0.45, -0.23, -0.44, -0.39, -0.38, -0.49);
    leftGap.bezierCurveTo(-0.33, -0.52, -0.24, -0.53, -0.16, -0.50);
    // Inner edge of gap - smooth flowing curve
    leftGap.bezierCurveTo(-0.17, -0.42, -0.17, -0.32, -0.17, -0.22);
    leftGap.bezierCurveTo(-0.17, -0.10, -0.16, 0.02, -0.15, 0.10);
    leftGap.bezierCurveTo(-0.15, 0.13, -0.15, 0.15, -0.15, 0.16);

    const rightGap = new THREE.Path();
    // Outer edge of gap
    rightGap.moveTo(0.15, 0.16);
    rightGap.bezierCurveTo(0.28, 0.13, 0.38, 0.05, 0.42, -0.08);
    rightGap.bezierCurveTo(0.45, -0.23, 0.44, -0.39, 0.38, -0.49);
    rightGap.bezierCurveTo(0.33, -0.52, 0.24, -0.53, 0.16, -0.50);
    // Inner edge of gap - smooth flowing curve
    rightGap.bezierCurveTo(0.17, -0.42, 0.17, -0.32, 0.17, -0.22);
    rightGap.bezierCurveTo(0.17, -0.10, 0.16, 0.02, 0.15, 0.10);
    rightGap.bezierCurveTo(0.15, 0.13, 0.15, 0.15, 0.15, 0.16);

    outerShape.holes.push(leftGap, rightGap);

    const extrudeSettings = {
      steps: 8,
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.07,  // Thicker bevel for more roundness
      bevelSize: 0.06,       // Bigger bevel for more curve
      bevelSegments: 24,     // Very smooth edges
      curveSegments: 48      // Very smooth curves
    };

    return new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
  }, []);

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
            {/* Mini black crystal */}
            <mesh position={[3, 1, 0]} rotation={[0.3, 0.5, 0]}>
                <icosahedronGeometry args={[0.25, 0]} />
                <meshPhysicalMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                />
            </mesh>
            {/* 3D Cherry Logo - Unified shape with gaps */}
            <group position={[-3, -2, 1]} rotation={[0.15, -0.3, 0.2]} scale={[0.68, 0.7, 0.7]}>
                {/* Main logo body - one piece with cutouts */}
                <mesh geometry={cherryLogoGeometry}>
                    <meshPhysicalMaterial
                        color="#ff0f39"
                        emissive="#ff0f39"
                        emissiveIntensity={0.3}
                        metalness={0.6}
                        roughness={0.2}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </mesh>

                {/* Stem - single smooth curve matching logo */}
                <mesh position={[0.02, 0.28, 0.09]} rotation={[0, 0, -0.35]}>
                    <cylinderGeometry args={[0.032, 0.048, 0.42, 64]} />
                    <meshPhysicalMaterial
                        color="#ff0f39"
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>

                {/* Stem upper curve */}
                <mesh position={[0.12, 0.48, 0.09]} rotation={[0, 0, -0.65]}>
                    <cylinderGeometry args={[0.025, 0.032, 0.18, 64]} />
                    <meshPhysicalMaterial
                        color="#ff0f39"
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>

                {/* Stem tip - rounded */}
                <mesh position={[0.2, 0.58, 0.09]}>
                    <sphereGeometry args={[0.025, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#ff0f39"
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>
            </group>
            {/* Small ball */}
            <mesh position={[1, 3, -1]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshPhysicalMaterial
                    color="#ff0f39"
                    metalness={0.7}
                    roughness={0.2}
                    clearcoat={1}
                />
            </mesh>
        </group>
    </group>
  );
}

function IDE({ transitionRef }: { transitionRef: React.MutableRefObject<number> }) {
    const ref = useRef<THREE.Group>(null);
    const codeGroupRef = useRef<THREE.Group>(null);
    const popupRef = useRef<THREE.Group>(null);
    const cursorRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            const transition = transitionRef.current;
            const smoothT = THREE.MathUtils.smoothstep(transition, 0, 1);
            ref.current.scale.setScalar(smoothT * 1.0);
            ref.current.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, smoothT) + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }

        const time = state.clock.elapsedTime;

        // Multi-layer dynamic animation
        if (codeGroupRef.current && codeGroupRef.current.children) {
            codeGroupRef.current.children.forEach((child, i) => {
                if (!child || !child.children || child.children.length < 2) return;

                const contentMesh = child.children[1] as THREE.Mesh;
                if (!contentMesh || !contentMesh.material) return;

                // Layer 1: Wave pattern for width
                const wavePhase = (time * 2 + i * 0.4) % 8;
                if (wavePhase < 1) {
                    contentMesh.scale.x = THREE.MathUtils.smoothstep(wavePhase, 0, 1);
                } else if (wavePhase > 6) {
                    contentMesh.scale.x = THREE.MathUtils.smoothstep(8 - wavePhase, 0, 1);
                } else {
                    contentMesh.scale.x = 1;
                }
                contentMesh.visible = wavePhase < 7;

                if (contentMesh.material instanceof THREE.MeshStandardMaterial) {
                    // Layer 2: Traveling highlight wave
                    const highlightWave = Math.sin(time * 3 - i * 0.5) * 0.5 + 0.5;

                    // Layer 3: Focus pulse on important lines
                    const focusPulse = (i === 2 || i === 5 || i === 8) ?
                        Math.sin(time * 4) * 0.3 + 0.7 : 0.4;

                    // Layer 4: Random flicker for active coding feel
                    const flicker = Math.sin(time * 20 + i * 3) * 0.05 + 0.95;

                    // Combine effects
                    const baseIntensity = contentMesh.material.emissive.r > 0.5 ? 0.8 : 0.4;
                    contentMesh.material.emissiveIntensity =
                        (baseIntensity + highlightWave * 0.3 + focusPulse * 0.2) * flicker;

                    // Layer 5: Position jitter for active feel
                    contentMesh.position.x = Math.sin(time * 5 + i) * 0.005;
                }
            });
        }

        // Dynamic cursor with multiple behaviors
        if (cursorRef.current) {
            // Moves through lines
            const lineProgress = (time * 1.2) % 10;
            const currentLine = Math.floor(lineProgress);
            const lineFraction = lineProgress - currentLine;

            // Smooth line transitions
            cursorRef.current.position.y = 0.8 - lineProgress * 0.22;

            // Cursor moves horizontally as if typing
            cursorRef.current.position.x = -0.5 + lineFraction * 1.8;

            // Fast blink
            const blinkPhase = (time * 3) % 1;
            cursorRef.current.visible = blinkPhase < 0.5;

            // Cursor intensity pulse
            if (cursorRef.current.material instanceof THREE.MeshBasicMaterial) {
                const intensity = 0.8 + Math.sin(time * 6) * 0.2;
                cursorRef.current.scale.y = 0.1 * (0.8 + intensity * 0.4);
            }
        }

        // Always visible popup with dynamic suggestions
        if (popupRef.current) {
            popupRef.current.visible = true;

            // Complex float pattern
            popupRef.current.position.y = -0.2 +
                Math.sin(time * 1.5) * 0.04 +
                Math.sin(time * 3) * 0.02;

            // Subtle rotation sway
            popupRef.current.rotation.y = -0.15 + Math.sin(time * 2) * 0.05;

            // Scale pulse when cursor hits specific lines
            const activePulse = ((time * 1.2) % 10) < 0.3 ? 1 + Math.sin(time * 10) * 0.04 : 1;
            popupRef.current.scale.setScalar(activePulse);

            // Animate suggestion selection cycling
            if (popupRef.current.children && popupRef.current.children.length > 1) {
                const selectionHighlight = popupRef.current.children[1];
                if (selectionHighlight) {
                    const suggestionCycle = Math.floor((time * 2) % 5);
                    selectionHighlight.position.y = 0.3 - suggestionCycle * 0.2;
                }
            }
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

            {/* Code Lines - Brighter and more visible */}
            <group position={[-0.8, 0.8, 0.2]} ref={codeGroupRef}>
                 {Array.from({ length: 10 }).map((_, i) => {
                    // Predefined widths for consistency
                    const widths = [1.8, 1.5, 2.0, 1.3, 1.6, 2.2, 1.4, 1.7, 1.9, 1.2];
                    const positions = [0.6, 0.5, 0.7, 0.4, 0.55, 0.8, 0.45, 0.6, 0.65, 0.5];

                    return (
                        <group key={i} position={[0, -i * 0.22, 0]}>
                            {/* Line number - brighter */}
                            <mesh position={[-0.3, 0, 0]}>
                                 <boxGeometry args={[0.1, 0.05, 0.02]} />
                                 <meshBasicMaterial color="#666" />
                            </mesh>
                            {/* Code content - brighter colors */}
                            <mesh position={[positions[i], 0, 0]}>
                                <boxGeometry args={[widths[i], 0.08, 0.02]} />
                                <meshStandardMaterial
                                    color={i === 2 || i === 5 || i === 8 ? "#ff4466" : "#99aacc"}
                                    toneMapped={false}
                                    emissive={i === 2 || i === 5 || i === 8 ? "#ff4466" : "#4466aa"}
                                    emissiveIntensity={i === 2 || i === 5 || i === 8 ? 0.6 : 0.3}
                                />
                            </mesh>
                        </group>
                    );
                 })}
            </group>

            {/* Cursor - blinking */}
            <mesh ref={cursorRef} position={[-0.5, 0.8, 0.22]}>
                <boxGeometry args={[0.02, 0.1, 0.01]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>

            {/* Autocomplete Popup - Enhanced */}
             <group position={[1, -0.2, 0.6]} rotation={[0, -0.15, 0]} ref={popupRef}>
                 <RoundedBox args={[1.4, 1.2, 0.05]} radius={0.05} smoothness={2}>
                     <meshPhysicalMaterial
                        color="#1a1b1e"
                        roughness={0.3}
                        metalness={0.8}
                        emissive="#2a2b2e"
                        emissiveIntensity={0.3}
                     />
                 </RoundedBox>
                 {/* Selection Highlight - brighter */}
                 <mesh position={[0, 0.3, 0.04]}>
                     <boxGeometry args={[1.2, 0.15, 0.01]} />
                     <meshBasicMaterial color="#ff4466" transparent opacity={0.4} toneMapped={false} />
                 </mesh>
                 {/* Suggestion Lines - more visible */}
                 {Array.from({ length: 5 }).map((_, i) => (
                     <mesh key={i} position={[-0.2, 0.3 - i * 0.2, 0.06]}>
                         <boxGeometry args={[0.8, 0.08, 0.01]} />
                         <meshStandardMaterial
                            color={i === 0 ? "#ffffff" : "#8899aa"}
                            emissive={i === 0 ? "#ffffff" : "#445566"}
                            emissiveIntensity={i === 0 ? 0.3 : 0.1}
                            toneMapped={false}
                         />
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
         <Canvas
           camera={{ position: [0, 0, 10], fov: 40 }}
           shadows
           style={{ width: '100%', height: '100%' }}
         >
            <Hero3D />
         </Canvas>
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
