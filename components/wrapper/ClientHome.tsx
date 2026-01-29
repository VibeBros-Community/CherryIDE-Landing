'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/sections/hero';
import Features from '@/sections/features';
import Models from '@/sections/models';
import Differentiators from '@/sections/differentiators';
import SocialProof from '@/sections/social-proof';
import PricingPreview from '@/sections/pricing-preview';
import FAQ from '@/sections/faq';

export default function ClientHome() {
  return (
    <div className="min-h-screen w-full bg-dark-bg bg-noise text-foreground overflow-x-hidden">
      <Header />

      {/* Main Content Layout - Each section has its own canvas */}
      <main className="w-full relative flex flex-col bg-black">
        <Hero />
        <Features />
        <Models />
        <Differentiators />
        <SocialProof />
        <PricingPreview />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
