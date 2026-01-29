'use client';

import { Check, X } from 'lucide-react';
import MotionWrapper from '@/components/animations/motion-wrapper';

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
    <section id="differentiators" className="py-20 relative overflow-hidden bg-gradient-to-bl from-[#120204] via-black to-black">
      {/* Toned down gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,15,57,0.18)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,15,57,0.12)_0%,_transparent_65%)]" />
      {/* Textured overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==')]" />
      <div className="container mx-auto px-4 relative z-10">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                {comparisonData.map((row) => (
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
          <div className="grid grid-cols-2 gap-4">
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
      </div>
    </section>
  );
}
