'use client';

import { Check, X } from 'lucide-react';
import MotionWrapper from '@/components/animations/motion-wrapper';
import Image from 'next/image';

const comparisonData = [
  { feature: 'Cost', cherry: 'Free Forever', cursor: '$20/month', windsurf: '$15/month' },
  { feature: 'AI Models', cherry: '15+ Open-Source', cursor: 'GPT-4, Claude', windsurf: 'Proprietary' },
  { feature: 'Local Processing', cherry: true, cursor: 'Partial', windsurf: false },
  { feature: 'Open Source', cherry: true, cursor: false, windsurf: false },
  { feature: 'Rate Limits', cherry: 'None', cursor: '500/month', windsurf: 'Varies' },
  { feature: 'Privacy', cherry: '100% Private', cursor: 'Cloud-based', windsurf: 'Cloud-based' },
  { feature: 'Customizable', cherry: true, cursor: 'Limited', windsurf: 'Limited' },
];


export default function Differentiators() {
  return (
    <section id="differentiators" className="py-20 bg-[#0d0d0d] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Content (Left) */}
          <div className="order-1">
            {/* Section Header */}
            <MotionWrapper className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Why Choose <br />
                <span className="text-cherry-500">Cherry IDE?</span>
              </h2>
              <p className="text-xl text-gray-300">
                Compare with other AI-powered editors
              </p>
            </MotionWrapper>

            {/* Comparison Table - Compact */}
            <MotionWrapper delay={0.2} className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-3 px-3">
                  <div className="text-white font-bold mb-1">Cherry</div>
                  <div className="text-cherry-500 text-xs">Open-Source</div>
                </th>
                <th className="text-center py-3 px-3 text-white font-semibold">Cursor</th>
                <th className="text-center py-3 px-3 text-white font-semibold">Windsurf</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.feature}
                  className="border-b border-dark-border/50 hover:bg-dark-surface/30 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-300 font-medium">{row.feature}</td>
                  <td className="py-3 px-3 text-center">
                    {typeof row.cherry === 'boolean' ? (
                      row.cherry ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-white font-semibold text-xs">{row.cherry}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {typeof row.cursor === 'boolean' ? (
                      row.cursor ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400 text-xs">{row.cursor}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {typeof row.windsurf === 'boolean' ? (
                      row.windsurf ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400 text-xs">{row.windsurf}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </MotionWrapper>

            {/* Key Differentiators - Compact */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <MotionWrapper delay={0.3} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">🔓</div>
                <h3 className="text-sm font-bold text-white mb-1">Open Source</h3>
                <p className="text-xs text-gray-400">Fork & customize</p>
              </MotionWrapper>
              <MotionWrapper delay={0.4} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">🔒</div>
                <h3 className="text-sm font-bold text-white mb-1">Privacy First</h3>
                <p className="text-xs text-gray-400">100% local</p>
              </MotionWrapper>
              <MotionWrapper delay={0.5} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">💰</div>
                <h3 className="text-sm font-bold text-white mb-1">Zero Cost</h3>
                <p className="text-xs text-gray-400">Free forever</p>
              </MotionWrapper>
              <MotionWrapper delay={0.6} className="text-center p-4 bg-dark-surface/50 rounded-lg border border-dark-border/50">
                <div className="text-3xl mb-1">🎯</div>
                <h3 className="text-sm font-bold text-white mb-1">Full Control</h3>
                <p className="text-xs text-gray-400">Your AI, your way</p>
              </MotionWrapper>
            </div>
          </div>

          {/* IDE Screenshot (Right) */}
          <div className="order-2 relative hidden lg:block">
            <div className="relative group">
              {/* Glow effect background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cherry-500/20 via-rose-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Main IDE container with perspective */}
              <div className="relative perspective-1000">
                <div className="relative transform transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2">
                  {/* Border gradient wrapper */}
                  <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-cherry-500/40 via-rose-500/30 to-transparent">
                    {/* Inner border for depth */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900/90 via-black/95 to-black border border-white/5">
                      {/* IDE Image */}
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src="/images/IDE.png"
                          alt="Cherry IDE Interface"
                          fill
                          className="object-cover object-center"
                          priority
                          quality={95}
                        />

                        {/* Subtle overlay gradient for polish */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Subtle inner shadow for depth */}
                      <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none" style={{
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                      }} />
                    </div>
                  </div>

                  {/* Outer glow shadow */}
                  <div className="absolute -inset-[1px] rounded-2xl shadow-2xl shadow-cherry-500/20 -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-cherry-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
