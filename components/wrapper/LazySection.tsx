'use client';

import { Suspense, lazy, ComponentType } from 'react';

interface LazySectionProps {
  loader: () => Promise<{ default: ComponentType<any> }>;
  fallback: React.ReactNode;
}

/**
 * Client-side lazy loading wrapper with suspense boundary
 * Uses React.lazy which is more reliable than next/dynamic for pure client components
 */
export function LazySection({ loader, fallback }: LazySectionProps) {
  // Only create lazy component on client side
  if (typeof window === 'undefined') {
    return <>{fallback}</>;
  }

  const LazyComponent = lazy(loader);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
}
