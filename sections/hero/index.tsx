'use client';

import { Button } from '@/components/ui/button';
import { Download, Github, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { formatNumber } from '@/lib/utils';
import CinematicSection from '@/components/layout/cinematic-section';

export default function Hero() {
  return (
    <CinematicSection>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Spacer for 3D Model */}
          <div className="hidden lg:block h-full min-h-[400px]" />

          {/* Right Column: Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface/50 backdrop-blur-md border border-dark-border mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-cherry-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Open-source AI IDE</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up tracking-tight leading-none">
              Code with <br />
              <span className="bg-gradient-to-r from-cherry-400 to-cherry-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                AI Freedom
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-8 max-w-lg animate-slide-up leading-relaxed delay-100">
              Cherry IDE brings open-source AI models directly into your workflow. 
              <span className="text-white block mt-2">No cloud. No subscriptions. 100% You.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12 animate-slide-up delay-200">
              <Button size="xl" className="bg-cherry-500 hover:bg-cherry-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all hover:scale-105">
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </Button>
              <Button size="xl" variant="secondary" asChild className="bg-dark-surface/80 border border-dark-border hover:bg-dark-surface transition-all hover:scale-105">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 animate-fade-in delay-300 border-t border-dark-border/30 pt-8">
              <div>
                <div className="text-2xl font-bold text-white">
                  {formatNumber(siteConfig.stats.downloads)}+
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Downloads</div>
              </div>
              <div className="w-px h-8 bg-dark-border/50" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {formatNumber(siteConfig.stats.githubStars)}+
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Stars</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
