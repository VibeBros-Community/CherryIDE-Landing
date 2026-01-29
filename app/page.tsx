import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/sections/hero';
import Features from '@/sections/features';
import Models from '@/sections/models';
import SocialProof from '@/sections/social-proof';
import Differentiators from '@/sections/differentiators';
import PricingPreview from '@/sections/pricing-preview';
import FinalCTA from '@/sections/final-cta';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Models />
      <Differentiators />
      <SocialProof />
      <PricingPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
