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
    <section id="pricing" className="py-20 bg-[#0d0d0d] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cherry-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

          {/* CTA Content (Left) */}
          <div className="order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Code with{' '}
              <span className="bg-gradient-to-r from-cherry-500 to-rose-400 bg-clip-text text-transparent">
                AI Freedom
              </span>
              ?
            </h2>

            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers using Cherry IDE. Download now and experience the power of open-source AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="xl" className="group min-w-[200px]">
                <Download className="w-5 h-5" />
                Download Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="xl" variant="outline" asChild className="min-w-[200px] border-dark-border">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-cherry-500 mb-1">15+</div>
                <div className="text-sm text-gray-400">AI Models</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cherry-500 mb-1">100%</div>
                <div className="text-sm text-gray-400">Open Source</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cherry-500 mb-1">$0</div>
                <div className="text-sm text-gray-400">Forever</div>
              </div>
            </div>
          </div>

          {/* Pricing Card (Right) */}
          <div className="order-2">
            <Card className="border-2 border-cherry-500/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
              <CardHeader className="text-center pb-6">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-cherry-500/10 text-cherry-500 rounded-full text-sm font-semibold">
                    OPEN-SOURCE
                  </span>
                </div>
                <CardTitle className="text-3xl mb-2">
                  <span className="text-5xl font-bold text-white">$0</span>
                  <span className="text-gray-400 text-xl">/forever</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Everything included. No limitations.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cherry-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-6">
                <Button size="lg" className="w-full group">
                  <Download className="w-4 h-4" />
                  Download Cherry IDE
                </Button>
                <p className="text-center text-xs text-gray-400">
                  Windows, macOS, and Linux
                </p>
              </CardFooter>
            </Card>

            {/* Support Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                <a href={siteConfig.links.github} className="text-cherry-500 hover:text-cherry-400 underline">
                  Sponsor
                </a>
                {' · '}
                <a href={siteConfig.links.github} className="text-cherry-500 hover:text-cherry-400 underline">
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
