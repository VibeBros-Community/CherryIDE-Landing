'use client';

/**
 * Loading skeleton for Features 3D scene (planet system)
 * Provides branded loading state while Three.js initializes
 */
export function Features3DSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Orbital paths */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Large orbital ring */}
          <div className="w-96 h-96 border border-cherry-500/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />

          {/* Medium orbital ring */}
          <div className="absolute inset-12 border border-cherry-500/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

          {/* Small orbital ring */}
          <div className="absolute inset-24 border border-cherry-500/10 rounded-full animate-spin" style={{ animationDuration: '10s' }} />

          {/* Planet placeholders */}
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-cherry-500/30 rounded-full blur-sm animate-pulse" />
          <div className="absolute right-0 top-1/2 w-4 h-4 bg-purple-500/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-500/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="absolute left-0 top-1/2 w-4 h-4 bg-green-500/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.6s' }} />

          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-cherry-500/20 rounded-full blur-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-sm text-cherry-500/60 animate-pulse">Initializing universe...</p>
      </div>
    </div>
  );
}
