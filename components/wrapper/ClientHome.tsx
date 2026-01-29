'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/sections/hero';
import Features from '@/sections/features';
import Models from '@/sections/models';
import Differentiators from '@/sections/differentiators';
import { Suspense } from 'react';

const ViewCanvas = dynamic(() => import('@/components/canvas/ViewCanvas'), { ssr: false });

export default function ClientHome() {
  return (
    <div className="min-h-screen w-full bg-dark-bg bg-noise text-foreground overflow-x-hidden">
      <Header />
      
      {/* 3D Canvas Layer (Fixed) */}
      <Suspense fallback={null}>
         <ViewCanvas />
      </Suspense>

      {/* Main Content Layout */}
      <main className="w-full relative z-10 flex flex-col bg-black">
        <Hero />
        <Features />
        <Models />
        <Differentiators />
        {/* Placeholder for missing sections if needed: SocialProof, Pricing, CTA */}
      </main>

      <Footer />
    </div>
  );
}
