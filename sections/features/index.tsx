'use client';

import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Brain, ShieldCheck, Code2, Layers, Terminal, Puzzle } from 'lucide-react';
import { coreFeatures } from '@/config/features';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { DynamicLODPlanet } from './DynamicLODPlanet';
import { SharedMaterialsProvider } from '@/lib/shared-materials-context';
import { VisibilityCanvas } from '@/components/3d/VisibilityCanvas';

const iconMap = {
  'brain': Brain,
  'shield-check': ShieldCheck,
  'search-code': Code2,
  'layers': Layers,
  'terminal': Terminal,
  'puzzle': Puzzle,
};

// Removed old Planet component - now using OptimizedPlanet

function Features3D() {
    const threadRef = useRef<THREE.Mesh<THREE.TubeGeometry, THREE.MeshStandardMaterial>>(null);

    // Planet data with cherry theme colors - 7 planets
    const planets = [
        { size: 0.9, color: '#ff0f39', emissive: '#ff6688', t: 0.10, hasRings: false, rotationSpeed: 0.02, orbitSpeed: 0.3 },
        { size: 1.0, color: '#ff4466', emissive: '#ff0f39', t: 0.23, hasRings: false, rotationSpeed: 0.015, orbitSpeed: 0.25 },
        { size: 1.1, color: '#cc0033', emissive: '#ff3355', t: 0.36, hasRings: true, rotationSpeed: 0.018, orbitSpeed: 0.28 },
        { size: 1.4, color: '#dd0033', emissive: '#ff4466', t: 0.50, hasRings: true, rotationSpeed: 0.01, orbitSpeed: 0.2 },
        { size: 1.2, color: '#ff1144', emissive: '#ff5588', t: 0.64, hasRings: true, rotationSpeed: 0.016, orbitSpeed: 0.26 },
        { size: 1.0, color: '#ff3366', emissive: '#ff6699', t: 0.77, hasRings: false, rotationSpeed: 0.019, orbitSpeed: 0.29 },
        { size: 1.05, color: '#ee0044', emissive: '#ff4477', t: 0.90, hasRings: false, rotationSpeed: 0.017, orbitSpeed: 0.27 },
    ];

    // Wavy curve path function - FULL HEIGHT
    const getWavyPosition = (t: number): [number, number, number] => {
        const y = (t - 0.5) * 32; // Full section height coverage
        const x = Math.sin(t * Math.PI * 3) * 3.5; // Even wider wave
        const z = Math.cos(t * Math.PI * 2) * 1.2; // More depth variation
        return [x, y, z];
    };

    // Create geometry with vertex colors for fading
    const threadGeometry = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3(
            Array.from({ length: 100 }, (_, i) => {
                const t = i / 99;
                const [x, y, z] = getWavyPosition(t);
                return new THREE.Vector3(x, y, z);
            })
        );

        const geometry = new THREE.TubeGeometry(curve, 100, 0.08, 16, false);

        // Add vertex colors for fading
        const colors = [];
        const positionAttribute = geometry.attributes.position;

        for (let i = 0; i < positionAttribute.count; i++) {
            const y = positionAttribute.getY(i);
            // Calculate fade based on Y position
            const t = (y / 32 + 0.5); // Convert Y to 0-1 range

            let alpha = 1.0;
            if (t < 0.15) {
                alpha = t / 0.15; // Fade in at top
            } else if (t > 0.85) {
                alpha = (1.0 - t) / 0.15; // Fade out at bottom
            }

            colors.push(1, 1, 1, alpha); // RGBA
        }

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
        return geometry;
    }, []);

    useFrame((state) => {
        if (threadRef.current) {
            threadRef.current.material.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 28]} fov={65} />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 15]} intensity={4} color="#ff0f39" />
            <pointLight position={[-5, -10, 15]} intensity={3} color="#ff6688" />
            <pointLight position={[5, 0, 18]} intensity={3.5} color="#ff4466" />

            {/* Move group to right to account for full-width canvas */}
            <group position={[12, 0, 0]}>
                {/* Wavy thread/line - FULL HEIGHT with faded ends */}
                <mesh ref={threadRef} geometry={threadGeometry}>
                    <meshStandardMaterial
                        color="#ff0f39"
                        emissive="#ff0f39"
                        emissiveIntensity={0.8}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        vertexColors
                        opacity={1}
                        depthWrite={false}
                    />
                </mesh>

                {/* Planets positioned along the wavy path - DYNAMIC LOD */}
                {planets.map((planet, index) => {
                    const position = getWavyPosition(planet.t);
                    return (
                        <DynamicLODPlanet
                            key={index}
                            size={planet.size}
                            position={position}
                            color={planet.color}
                            emissive={planet.emissive}
                            hasRings={planet.hasRings}
                            rotationSpeed={planet.rotationSpeed}
                            orbitSpeed={planet.orbitSpeed}
                        />
                    );
                })}
            </group>
        </>
    );
}

export default function Features() {
  return (
    <section id="features" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gradient-to-br from-[#0f0202] via-black to-black">
      {/* Toned down gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,15,57,0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,15,57,0.08)_0%,_transparent_60%)]" />
      {/* Avoid heavy SVG noise filters here; they can cause scroll-time raster jank on some GPUs. */}

      {/* Full-section 3D Background - Visibility-based rendering */}
      <SharedMaterialsProvider>
        <VisibilityCanvas
          className="absolute inset-0 w-full h-full pointer-events-auto z-10"
          canvasProps={{
            // Decorative canvas: keep DPR/AA conservative to preserve scroll smoothness.
            dpr: [1, 1.25],
            gl: { alpha: false, antialias: false },
          }}
        >
          <Features3D />
        </VisibilityCanvas>
      </SharedMaterialsProvider>

      <div className="container mx-auto px-4 relative z-20 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content (Left) */}
          <div className="order-1 pointer-events-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Powerful Features for{' '}
              <span className="cherry-gradient-animate">
                Modern Development
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-lg">
              Everything you need to code with AI, all in one powerful editor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreFeatures.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <div
                    key={feature.id}
                    className="group"
                  >
                    <div className="metallic-card rounded-xl p-6 h-full transition-all duration-300 hover:scale-105 hover:border-cherry-500/50">
                      <Icon className="w-8 h-8 text-cherry-500 mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spacer for 3D Content (Right) */}
          <div className="hidden lg:block h-[600px] w-full order-2" />

        </div>
      </div>
    </section>
  );
}
