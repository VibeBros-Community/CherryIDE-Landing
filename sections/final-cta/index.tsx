'use client';

import { Button } from '@/components/ui/button';
import { Download, Github, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import MotionWrapper from '@/components/animations/motion-wrapper';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cherry-500/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <MotionWrapper className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Code with{' '}
            <span className="cherry-gradient-animate">
              AI Freedom
            </span>
            ?
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of developers using Cherry IDE. Download now and experience the power of open-source AI—completely free, forever.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="xl" className="group min-w-[240px]">
              <Download className="w-5 h-5" />
              Download Cherry IDE
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="xl" variant="secondary" asChild className="min-w-[240px]">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cherry-500 mb-1">15+</div>
              <div className="text-sm text-gray-400">AI Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cherry-500 mb-1">100%</div>
              <div className="text-sm text-gray-400">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cherry-500 mb-1">$0</div>
              <div className="text-sm text-gray-400">Forever</div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
