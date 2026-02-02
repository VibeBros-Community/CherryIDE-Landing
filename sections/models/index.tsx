'use client';

import { OrthographicCamera, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { VisibilityCanvas } from '@/components/3d/VisibilityCanvas';
import { Button } from '@/components/ui/button';
import { aiModels } from '@/data/models';

// Official provider logos (icon only, no text)
const providerLogos: Record<string, string> = {
  'Meta': 'https://cdn.simpleicons.org/meta/0668E1',
  'Mistral AI': '/icons/mistral.svg',
  'DeepSeek': 'https://avatars.githubusercontent.com/u/148330874?s=200&v=4',
  'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg',
  'BigCode': 'https://cdn.simpleicons.org/huggingface/FFD21E',
};

const providerColors: Record<string, string> = {
  'Meta': '#0668E1',
  'Mistral AI': '#FF8205',
  'DeepSeek': '#4D6BFE',
  'Microsoft': '#00A4EF',
  'BigCode': '#FFD21E',
};

// --- 2D Scene Components ---

function HeartbeatLogo() {
    const ref = useRef<THREE.Group>(null);
    const texture = useTexture('/images/logo-transparent.png');

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.elapsedTime;
        
        // "Lub-Dub" heartbeat pattern
        const cycle = time % 2; // 2 second period
        let scale = 1;
        
        if (cycle < 0.2) {
            // First beat (Lub)
            scale = 1 + Math.sin(cycle * Math.PI * 5) * 0.15;
        } else if (cycle > 0.25 && cycle < 0.45) {
            // Second beat (Dub)
            scale = 1 + Math.sin((cycle - 0.25) * Math.PI * 5) * 0.1;
        }
        
        // Smooth return to 1
        ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, scale, 0.2));
    });

    return (
        <group ref={ref}>
            <sprite scale={[3, 3, 1]}>
                <spriteMaterial map={texture} toneMapped={false} transparent />
            </sprite>
        </group>
    );
}

function Ripples() {
    const groupRef = useRef<THREE.Group>(null);
    const ripples = useMemo(() => [0, 1, 2], []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        
        ripples.forEach((offsetIndex) => {
            const mesh = groupRef.current!.children[offsetIndex] as THREE.Mesh;
            if (!mesh) return;

            const period = 2.0;
            const delay = offsetIndex * 0.15;
            const t = (time - 0.1 - delay) % period;
            
            if (t > 0 && t < 1.8) {
                mesh.visible = true;
                
                // Expansion: Slower, smoother
                const scale = 3 + Math.pow(t, 0.85) * 18; 
                mesh.scale.setScalar(scale);
                
                // Opacity: Subtle fade
                const opacity = Math.max(0, (0.35 - offsetIndex * 0.08) * (1 - t / 1.5));
                
                (mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
            } else {
                mesh.visible = false;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {ripples.map((i) => (
                <mesh key={i}>
                    <ringGeometry args={[0.48 - i * 0.02, 0.5, 64]} /> 
                    <meshBasicMaterial 
                        color="#ff0f39" 
                        transparent 
                        opacity={0} 
                        side={THREE.DoubleSide} 
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    );
}

function ModelsScene2D() {
  return (
    <>
      {/* Shift camera X to place center (0,0) on the left side of the viewport */}
      <OrthographicCamera makeDefault position={[7, 0, 10]} zoom={50} />
      <HeartbeatLogo />
      <Ripples />
      <ambientLight intensity={1} />
    </>
  );
}

// --- Main Component ---

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
    <section id="models" className="py-20 relative overflow-hidden bg-black min-h-screen flex items-center">

      {/* Full-Section Background Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <VisibilityCanvas
            className="w-full h-full"
            canvasProps={{
              dpr: [1, 2],
              gl: { alpha: true, antialias: true, powerPreference: 'high-performance' },
            }}
          >
            <ModelsScene2D />
          </VisibilityCanvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="order-2 lg:order-1 h-[500px] w-full relative hidden lg:block">
               {/* Spacer */}
            </div>

            {/* Text Content (Right) */}
            <div className="order-1 lg:order-2 lg:min-h-[500px] flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Choose Your{' '}
                    <span className="cherry-gradient-animate">
                        AI Intelligence
                    </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-lg">
                    Run the best open-source AI models locally. Switch on-the-fly based on your needs.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
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

                {/* Models List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[440px] lg:h-[460px] overflow-y-auto pr-2" style={{ scrollbarGutter: 'stable' }}>
                {filteredModels.slice(0, 8).map((model) => {
                    const logoUrl = providerLogos[model.provider];
                    const brandColor = providerColors[model.provider] || '#ff0f39';

                    return (
                        <div key={model.id} className="metallic-card p-5 rounded-xl hover:border-cherry-500/40 transition-all bg-dark-bg/60 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center p-2"
                                    style={{
                                        backgroundColor: `${brandColor}15`,
                                        border: `1px solid ${brandColor}30`,
                                    }}
                                >
                                    {logoUrl ? (
                                        <img
                                            src={logoUrl}
                                            alt={model.provider}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full" style={{ color: brandColor }}>AI</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-white">{model.name}</h3>
                                    <p className="text-xs" style={{ color: brandColor }}>{model.provider}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2">{model.description}</p>
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
