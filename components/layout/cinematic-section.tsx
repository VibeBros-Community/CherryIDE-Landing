'use client';

import { ReactNode } from 'react';
import MotionWrapper from '@/components/animations/motion-wrapper';

interface CinematicSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function CinematicSection({ children, id, className = '' }: CinematicSectionProps) {
  return (
    <section 
      id={id} 
      className={`h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12 relative pointer-events-none ${className}`}
    >
      {/* Cinematic Frame Container */}
      <div className="w-full max-w-[1800px] aspect-video relative flex items-center">
        {/* Content Area */}
        <div className="w-full h-full relative z-10 pointer-events-auto flex items-center">
          {children}
        </div>
      </div>
      
      {/* Section Separator Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border/30 to-transparent" />
    </section>
  );
}
