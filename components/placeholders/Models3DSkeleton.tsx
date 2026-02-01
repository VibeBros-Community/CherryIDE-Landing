'use client';

/**
 * Loading skeleton for Models 3D scene (rings)
 * Provides branded loading state while Three.js initializes
 */
export function Models3DSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
      {/* Rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-48 h-48 border-4 border-cherry-500/10 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute inset-0 border-t-4 border-cherry-500/30 rounded-full" />
          </div>

          {/* Middle ring */}
          <div className="absolute inset-8 border-4 border-purple-500/10 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
            <div className="absolute inset-0 border-t-4 border-purple-500/30 rounded-full" />
          </div>

          {/* Inner ring */}
          <div className="absolute inset-16 border-4 border-blue-500/10 rounded-full animate-spin" style={{ animationDuration: '4s' }}>
            <div className="absolute inset-0 border-t-4 border-blue-500/30 rounded-full" />
          </div>

          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-cherry-500/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-sm text-cherry-500/60 animate-pulse">Crafting rings...</p>
      </div>
    </div>
  );
}
