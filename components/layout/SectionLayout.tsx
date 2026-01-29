'use client';

import { Suspense, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-dark-bg">
       {/* Placeholder while 3D loads */}
       <div className="w-10 h-10 border-2 border-cherry-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false });

interface SectionLayoutProps {
  children: ReactNode;
  Scene: React.ComponentType;
  id?: string;
  align?: 'left' | 'right'; // 'left' means content on left, 3D on right
  className?: string;
  bgColor?: string; // Optional background color override
}

export default function SectionLayout({ 
  children, 
  Scene, 
  id, 
  align = 'left', 
  className,
  bgColor = '#050505'
}: SectionLayoutProps) {
  return (
    <section id={id} className={cn("relative min-h-[90vh] w-full flex items-center py-20", className)}>
      <div className="container mx-auto px-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center h-full">
          
          {/* Content Column */}
          <div className={cn(
            "flex flex-col justify-center order-2", 
            align === 'left' ? "lg:order-1" : "lg:order-2"
          )}>
            {children}
          </div>

          {/* 3D Scene Column */}
          <div className={cn(
            "relative h-[50vh] lg:h-[70vh] w-full flex items-center justify-center order-1",
            align === 'left' ? "lg:order-2" : "lg:order-1"
          )}>
             <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02]">
                <View className="absolute h-full w-full">
                  <Suspense fallback={null}>
                    <Scene />
                    <Common color={bgColor} />
                  </Suspense>
                </View>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
