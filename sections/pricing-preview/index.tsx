'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Download, Check, Github, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

const features = [
  '15+ Open-Source AI Models',
  'Unlimited AI Requests',
  '100% Local Processing',
  'All Premium Features',
  'Regular Updates',
  'Community Extensions',
  'No Telemetry',
  'MIT License',
];

export default function PricingPreview() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-black via-[#1a0505] to-black relative overflow-hidden">
      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,15,57,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,15,57,0.1)_0%,_transparent_50%)]" />
      {/* Fine grain texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJ0dXJidWxlbmNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]" />

      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* CTA Content (Left) */}
          <div className="order-1 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
                Ready to Code with{' '}
                <span className="cherry-gradient-animate">
                  AI Freedom
                </span>
                ?
              </h2>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Join thousands of developers using Cherry IDE. Download now and experience the power of open-source AI—completely free, forever.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="xl" className="group shadow-lg shadow-cherry-500/20">
                <Download className="w-5 h-5" />
                Download Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="xl" variant="outline" asChild className="border-white/10 hover:bg-white/5">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </a>
              </Button>
            </div>

            {/* Stats - Better spacing */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-cherry-500 mb-2">15+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">AI Models</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-cherry-500 mb-2">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Open Source</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-cherry-500 mb-2">$0</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Forever</div>
              </div>
            </div>
          </div>

          {/* Pricing Card (Right) */}
          <div className="order-2 flex flex-col justify-center">
            <Card className="border-2 border-cherry-500/30 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-2xl shadow-cherry-500/10">
              <CardHeader className="text-center pb-8">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-cherry-500/10 text-cherry-500 rounded-full text-sm font-bold tracking-wide">
                    OPEN-SOURCE
                  </span>
                </div>
                <CardTitle className="mb-3">
                  <div className="text-6xl md:text-7xl font-bold text-white mb-2">$0</div>
                  <div className="text-gray-400 text-xl font-normal">/forever</div>
                </CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Everything included. No limitations. No subscriptions.
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-8">
                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-cherry-500/10 p-1">
                        <Check className="w-4 h-4 text-cherry-500" />
                      </div>
                      <span className="text-gray-200 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 pt-6 border-t border-white/5">
                <Button size="xl" className="w-full group shadow-lg shadow-cherry-500/20">
                  <Download className="w-5 h-5" />
                  Download Cherry IDE
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-center text-xs text-gray-400">
                  Available for Windows, macOS, and Linux
                </p>
              </CardFooter>
            </Card>

            {/* Support Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Want to support the project?{' '}
                <a href={siteConfig.links.github} className="text-cherry-500 hover:text-cherry-400 underline transition-colors">
                  Sponsor on GitHub
                </a>
                {' or '}
                <a href={siteConfig.links.github} className="text-cherry-500 hover:text-cherry-400 underline transition-colors">
                  Contribute
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
