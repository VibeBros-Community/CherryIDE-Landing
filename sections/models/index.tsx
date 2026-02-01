'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrthographicCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { aiModels } from '@/data/models';
import { useRef } from 'react';
import * as THREE from 'three';
import { VisibilityCanvas } from '@/components/3d/VisibilityCanvas';
import { AnimatePresence, motion } from 'framer-motion';
import { DeepSeekIcon, HuggingFaceIcon, MetaIcon, MicrosoftIcon } from '@/components/icons/ai-icons';

// Official provider logos (icon only, no text)
const providerLogos: Record<string, string> = {
  'Meta': 'https://cdn.simpleicons.org/meta/0668E1',
  // Use the official mark (no text) with official colors.
  'Mistral AI': '/icons/mistral.svg',
  'DeepSeek': 'https://deepseek.com/favicon.ico',
  // Use the mark (4 squares) without the wordmark.
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

type OrbitIcon = {
  id: string;
  render: (className: string) => ReactNode;
};

const ORBIT_ICONS: readonly OrbitIcon[] = [
  { id: 'meta', render: (className) => <MetaIcon className={className} /> },
  { id: 'microsoft', render: (className) => <MicrosoftIcon className={className} /> },
  { id: 'deepseek', render: (className) => <DeepSeekIcon className={className} /> },
  { id: 'huggingface', render: (className) => <HuggingFaceIcon className={className} /> },
  { id: 'mistral', render: (className) => <img src="/icons/mistral.svg" alt="" className={className} /> },
] as const;

const ORBIT_COUNT = 3;
const ORBIT_RADIUS = 2.15;
const ORBIT_SPEED = 0.35;
const ICON_SIZE_PX = 34;
const LOGO_SIZE_PX = 90;
const ICON_ROTATE_INTERVAL_MS = 3200;

function ModelsHybrid3D() {
  const orbitRef = useRef<THREE.Group>(null);
  const iconRefs = useRef<Array<THREE.Group | null>>([]);
  const [baseIndex, setBaseIndex] = useState(0);

  useFrame((_, delta) => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    orbit.rotation.z += delta * ORBIT_SPEED;
    const inverse = -orbit.rotation.z;
    iconRefs.current.forEach((group) => {
      if (group) group.rotation.z = inverse;
    });
  });

  // Periodically rotate which icons appear at the three orbit positions.
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBaseIndex((prev) => (prev + 1) % ORBIT_ICONS.length);
    }, ICON_ROTATE_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  const iconSlots = Array.from({ length: ORBIT_COUNT }, (_, i) => {
    const icon = ORBIT_ICONS[(baseIndex + i) % ORBIT_ICONS.length];
    const angle = (i / ORBIT_COUNT) * Math.PI * 2;
    return { icon, angle };
  });

  return (
    <>
      {/* Orthographic camera keeps the scene visually “2D” (no perspective distortion). */}
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={90} />

      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 6]} intensity={1.2} color="#ff0f39" />
      <pointLight position={[2, 2, 6]} intensity={0.9} color="#ff6688" />

      {/* Flat ring around center */}
      <mesh>
        <torusGeometry args={[ORBIT_RADIUS, 0.06, 24, 140]} />
        <meshPhysicalMaterial
          color="#1a1b1e"
          emissive="#ff0f39"
          emissiveIntensity={0.25}
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </mesh>

      {/* Slight inner glow ring */}
      <mesh>
        <torusGeometry args={[ORBIT_RADIUS - 0.12, 0.02, 12, 140]} />
        <meshBasicMaterial color="#ff0f39" transparent opacity={0.25} />
      </mesh>

      {/* Center 2D logo (DOM for crispness) */}
      <Html center>
        <div
          style={{
            width: LOGO_SIZE_PX,
            height: LOGO_SIZE_PX,
            display: 'grid',
            placeItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <img
            src="/images/logo-transparent.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            draggable={false}
          />
        </div>
      </Html>

      {/* Orbiting icons */}
      <group ref={orbitRef}>
        {iconSlots.map(({ icon, angle }, idx) => (
          <group
            key={idx}
            ref={(el) => {
              iconRefs.current[idx] = el;
            }}
            position={[Math.cos(angle) * ORBIT_RADIUS, Math.sin(angle) * ORBIT_RADIUS, 0.2]}
          >
            <Html center sprite>
              <div
                style={{
                  width: ICON_SIZE_PX,
                  height: ICON_SIZE_PX,
                  display: 'grid',
                  placeItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={icon.id}
                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(1px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(1px)' }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        background: 'rgba(15, 16, 18, 0.55)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      {icon.render('w-7 h-7')}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Html>
          </group>
        ))}
      </group>
    </>
  );
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
    <section id="models" className="py-20 relative overflow-hidden bg-black">

      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* 3D Content (Left) */}
            <div className="order-2 lg:order-1 h-[500px] w-full relative hidden lg:block">
              <VisibilityCanvas
                className="w-full h-full"
                canvasProps={{
                  dpr: [1, 1.5],
                  gl: { alpha: false, antialias: false },
                }}
              >
                <ModelsHybrid3D />
              </VisibilityCanvas>
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
