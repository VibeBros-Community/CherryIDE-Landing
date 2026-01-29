'use client';

import { useRef } from 'react';
import { View, Float, PerspectiveCamera, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Download, Github, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { formatNumber } from '@/lib/utils';

function Hero3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <Environment preset="city" />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
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
      </Float>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff0f39" />
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 3D Content (Left) */}
          <div className="relative h-[500px] w-full order-2 lg:order-1">
             <View className="absolute inset-0 w-full h-full">
                <Hero3D />
             </View>
          </div>

          {/* Text Content (Right) */}
          <div className="order-1 lg:order-2 text-left z-20">
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
