'use client';

/**
 * Loading skeleton for Hero 3D scene
 * Provides branded loading state while Three.js initializes
 */
export function Hero3DSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-black via-zinc-900/50 to-black relative overflow-hidden">
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-64 h-64 border-2 border-cherry-500/20 rounded-full animate-pulse" />

          {/* Middle ring */}
          <div className="absolute inset-8 border-2 border-cherry-500/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />

          {/* Inner ring */}
          <div className="absolute inset-16 border-2 border-cherry-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />

          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-cherry-500/30 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-sm text-cherry-500/60 animate-pulse">Loading 3D scene...</p>
      </div>
    </div>
  );
}
