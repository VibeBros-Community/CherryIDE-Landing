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
    <section id="differentiators" className="py-24 bg-[#111111] relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <MotionWrapper className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Cherry IDE?
          </h2>
          <p className="text-xl text-gray-400">
            Compare Cherry IDE with other AI-powered code editors
          </p>
        </MotionWrapper>

        {/* Comparison Table */}
        <MotionWrapper delay={0.2} className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-4 px-6">
                  <div className="text-white font-bold text-lg mb-1">Cherry IDE</div>
                  <div className="text-cherry-500 text-sm">Open-Source</div>
                </th>
                <th className="text-center py-4 px-6 text-white font-semibold">Cursor</th>
                <th className="text-center py-4 px-6 text-white font-semibold">Windsurf</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.feature}
                  className="border-b border-dark-border hover:bg-dark-surface transition-colors"
                >
                  <td className="py-4 px-6 text-gray-300 font-medium">{row.feature}</td>
                  <td className="py-4 px-6 text-center">
                    {typeof row.cherry === 'boolean' ? (
                      row.cherry ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-white font-semibold">{row.cherry}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof row.cursor === 'boolean' ? (
                      row.cursor ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400">{row.cursor}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof row.windsurf === 'boolean' ? (
                      row.windsurf ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400">{row.windsurf}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MotionWrapper>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">
          <MotionWrapper delay={0.3} className="text-center p-6 bg-dark-surface rounded-xl border border-dark-border">
            <div className="text-4xl mb-2">🔓</div>
            <h3 className="text-xl font-bold text-white mb-2">Open Source</h3>
            <p className="text-gray-400">Fork, customize, and contribute</p>
          </MotionWrapper>
          <MotionWrapper delay={0.4} className="text-center p-6 bg-dark-surface rounded-xl border border-dark-border">
            <div className="text-4xl mb-2">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Privacy First</h3>
            <p className="text-gray-400">Your code stays on your machine</p>
          </MotionWrapper>
          <MotionWrapper delay={0.5} className="text-center p-6 bg-dark-surface rounded-xl border border-dark-border">
            <div className="text-4xl mb-2">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Zero Cost</h3>
            <p className="text-gray-400">Free forever, no hidden fees</p>
          </MotionWrapper>
          <MotionWrapper delay={0.6} className="text-center p-6 bg-dark-surface rounded-xl border border-dark-border">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Full Control</h3>
            <p className="text-gray-400">Choose your AI, your way</p>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
