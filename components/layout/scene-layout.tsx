'use client';

import { Environment, Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import FloatingIDE from './floating-ide';
import { Suspense, useRef, useEffect } from 'react';

interface SceneLayoutProps {
  children: React.ReactNode;
}

export default function SceneLayout({ children }: SceneLayoutProps) {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      scrollProgress.current = isNaN(progress) ? 0 : progress;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed 3D Background Canvas */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 6], fov: 35 }}
          gl={{ alpha: true }} 
          style={{ background: 'transparent' }}
        >
          <color attach="background" args={['#030303']} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={3} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ff0f39" />
            <pointLight position={[-10, -10, 5]} intensity={2} color="#ffffff" />
            
            <group position={[0, 0, 0]}>
              <FloatingIDE scrollProgress={scrollProgress} />
            </group>
            
            {/* Debug Cube to ensure scene is rendering */}
            <mesh position={[2, 0, 0]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshBasicMaterial color="blue" wireframe />
            </mesh>

            <Sparkles count={80} scale={12} size={4} speed={0.4} opacity={0.6} color="#ff0f39" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
