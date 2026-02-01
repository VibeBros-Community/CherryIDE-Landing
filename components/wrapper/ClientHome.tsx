'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Hero3DSkeleton } from '@/components/placeholders/Hero3DSkeleton';
import { Features3DSkeleton } from '@/components/placeholders/Features3DSkeleton';
import { Models3DSkeleton } from '@/components/placeholders/Models3DSkeleton';

// Lazy imports using dynamic import() - client-side only
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/sections/hero'), {
  loading: () => (
    <section className="min-h-screen w-full bg-black">
      <Hero3DSkeleton />
    </section>
  ),
});

const Features = dynamic(() => import('@/sections/features'), {
  loading: () => (
    <section className="min-h-screen w-full bg-black">
      <Features3DSkeleton />
    </section>
  ),
});

const Models = dynamic(() => import('@/sections/models'), {
  loading: () => (
    <section className="min-h-screen w-full bg-black">
      <Models3DSkeleton />
    </section>
  ),
});

// Keep bundled (lightweight, SEO-critical sections)
import Differentiators from '@/sections/differentiators';
import SocialProof from '@/sections/social-proof';
import PricingPreview from '@/sections/pricing-preview';
import FAQ from '@/sections/faq';

export default function ClientHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-dark-bg bg-noise text-foreground overflow-x-hidden">
      <Header />

      {/* Main Content Layout - Each section has its own canvas */}
      <main id="main-content" className="w-full relative flex flex-col bg-black">
        {mounted ? (
          <>
            <Hero />
            <Features />
            <Models />
          </>
        ) : (
          <>
            <section className="min-h-screen w-full bg-black">
              <Hero3DSkeleton />
            </section>
            <section className="min-h-screen w-full bg-black">
              <Features3DSkeleton />
            </section>
            <section className="min-h-screen w-full bg-black">
              <Models3DSkeleton />
            </section>
          </>
        )}
        <Differentiators />
        <SocialProof />
        <PricingPreview />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
