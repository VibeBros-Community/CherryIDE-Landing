'use client';

import { Button } from '@/components/ui/button';
import { Download, Github, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { formatNumber } from '@/lib/utils';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/scenes/hero-scene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface" />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 opacity-60">
        <HeroScene />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface border border-dark-border mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-cherry-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Open-source AI IDE • Free Forever</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Code with the Power of{' '}
            <span className="bg-gradient-to-r from-cherry-400 to-cherry-600 bg-clip-text text-transparent">
              Open-Source AI
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Cherry IDE brings the latest open-source AI models directly into your editor—
            <span className="text-white font-semibold">no cloud, no subscriptions, complete control.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button size="xl" className="group">
              <Download className="w-5 h-5" />
              Download Cherry IDE
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(siteConfig.stats.downloads)}+
              </div>
              <div className="text-sm text-gray-400">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(siteConfig.stats.githubStars)}+
              </div>
              <div className="text-sm text-gray-400">GitHub Stars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {siteConfig.stats.supportedModels}+
              </div>
              <div className="text-sm text-gray-400">AI Models</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full p-1">
          <div className="w-1 h-3 bg-cherry-500 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
