'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Download, Check } from 'lucide-react';

const features = [
  '15+ Open-Source AI Models',
  'Unlimited AI Requests',
  '100% Local Processing',
  'All Premium Features Included',
  'Regular Updates & Support',
  'Community Extensions',
  'No Telemetry or Tracking',
  'MIT License - Fork & Customize',
];

export default function PricingPreview() {
  return (
    <section id="pricing" className="py-24 bg-dark-bg relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Free forever. No credit card required. No hidden costs.
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="max-w-2xl mx-auto border-2 border-cherry-500/20 bg-gradient-to-br from-dark-surface to-dark-bg">
          <CardHeader className="text-center pb-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-cherry-500/10 text-cherry-500 rounded-full text-sm font-semibold">
                OPEN-SOURCE
              </span>
            </div>
            <CardTitle className="text-4xl mb-2">
              <span className="text-6xl font-bold text-white">$0</span>
              <span className="text-gray-400 text-2xl">/forever</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Everything included. No limitations. No subscriptions.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-cherry-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button size="xl" className="w-full group">
              <Download className="w-5 h-5" />
              Download Cherry IDE
            </Button>
            <p className="text-center text-sm text-gray-400">
              Available for Windows, macOS, and Linux
            </p>
          </CardFooter>
        </Card>

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-gray-400">
            Want to support the project?{' '}
            <a href="#" className="text-cherry-500 hover:text-cherry-400 underline">
              Sponsor on GitHub
            </a>
            {' '}or{' '}
            <a href="#" className="text-cherry-500 hover:text-cherry-400 underline">
              contribute to the codebase
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
