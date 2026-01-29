'use client';

import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/data/testimonials';
import { Star } from 'lucide-react';
import MotionWrapper from '@/components/animations/motion-wrapper';

export default function SocialProof() {
  return (
    <section id="testimonials" className="py-24 bg-dark-surface relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <MotionWrapper className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of developers who have switched to Cherry IDE
          </p>
        </MotionWrapper>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <MotionWrapper
              key={testimonial.id}
              delay={index * 0.1}
            >
              <Card className="hover:scale-105 transition-transform duration-300 h-full">
                <CardContent className="pt-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cherry-500 text-cherry-500" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cherry-500 to-cherry-700 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
