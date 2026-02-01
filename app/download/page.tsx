'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AppleIcon, LinuxIcon, WindowsIcon } from '@/components/icons/os-icons';
import { siteConfig } from '@/config/site';
import MotionWrapper from '@/components/animations/motion-wrapper';
import { getOS } from '@/lib/utils';
import { ArrowRight, Cpu, Download, HardDrive, ShieldCheck, Terminal } from 'lucide-react';

type PlatformId = 'windows' | 'mac' | 'linux';

const RELEASES_LATEST_PATH = '/releases/latest';

const PLATFORM_IDS: readonly PlatformId[] = ['windows', 'mac', 'linux'] as const;

const SYSTEM_REQUIREMENTS = [
  {
    icon: <Cpu className="h-5 w-5 text-cherry-500" />,
    title: 'CPU',
    detail: '4 cores minimum',
    sub: 'Apple M-series or modern Intel/AMD recommended for local models',
  },
  {
    icon: <Terminal className="h-5 w-5 text-cherry-500" />,
    title: 'RAM',
    detail: '8GB minimum',
    sub: '16GB+ recommended for larger models',
  },
  {
    icon: <HardDrive className="h-5 w-5 text-cherry-500" />,
    title: 'Storage',
    detail: '4GB for the IDE',
    sub: 'Extra space needed for local models',
  },
] as const;

export default function DownloadPage() {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('windows');

  useEffect(() => {
    const os = getOS();
    setActivePlatform(os === 'unknown' ? 'windows' : os);
  }, []);

  const releasesLatestUrl = useMemo(() => `${siteConfig.links.github}${RELEASES_LATEST_PATH}`, []);

  const platforms = useMemo(
    () =>
      ({
        windows: {
          id: 'windows' as const,
          name: 'Windows',
          description: 'Windows 10/11 (64-bit)',
          icon: <WindowsIcon className="h-10 w-10" />,
          downloadUrl: siteConfig.downloadLinks.windows,
          artifactHint: 'Installer (.exe)',
        },
        mac: {
          id: 'mac' as const,
          name: 'macOS',
          description: 'Apple Silicon & Intel',
          icon: <AppleIcon className="h-10 w-10 text-white" />,
          downloadUrl: siteConfig.downloadLinks.mac,
          artifactHint: 'Disk image (.dmg)',
        },
        linux: {
          id: 'linux' as const,
          name: 'Linux',
          description: 'AppImage (64-bit)',
          icon: <LinuxIcon className="h-10 w-10" />,
          downloadUrl: siteConfig.downloadLinks.linux,
          artifactHint: 'AppImage',
        },
      }) as const,
    []
  );

  const active = platforms[activePlatform];

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans selection:bg-cherry-500/30 relative overflow-hidden">
      {/* Shared background for page + footer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0505] to-black" />
        <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_12%_18%,_rgba(255,15,57,0.06)_0deg,_transparent_55deg,_rgba(255,15,57,0.035)_120deg,_transparent_190deg,_rgba(255,15,57,0.045)_260deg,_transparent_360deg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_50%_10%,_rgba(255,15,57,0.06)_0%,_transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_80%_78%,_rgba(255,15,57,0.03)_0%,_transparent_60%)]" />
      </div>

      <Header />

      <main id="main-content" className="flex-grow pt-36 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <MotionWrapper className="mb-12">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-cherry-500/10 border border-cherry-500/20 text-cherry-300 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cherry-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cherry-500" />
                </span>
                Latest release: {siteConfig.version}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Download
                    <span className="cherry-gradient-animate block pb-1">
                      Cherry IDE
                    </span>
                  </h1>
                  <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                    Local AI code editor with zero cloud dependency. Private by default. Fast by design.
                  </p>

                  <div className="mt-8">
                    <div className="flex flex-nowrap gap-2 overflow-x-auto rounded-2xl p-2 bg-dark-surface/40 border border-white/5 backdrop-blur-md">
                      {PLATFORM_IDS.map((platformId) => {
                        const platform = platforms[platformId];
                        const isActive = platformId === activePlatform;
                        return (
                          <button
                            key={platform.id}
                            type="button"
                            onClick={() => setActivePlatform(platformId)}
                            className={[
                              'flex flex-1 min-w-[220px] items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                              isActive
                                ? 'bg-dark-hover border border-cherry-500/30 shadow-lg shadow-cherry-500/10'
                                : 'border border-transparent hover:bg-dark-hover/70',
                            ].join(' ')}
                            aria-pressed={isActive}
                          >
                            <div className="flex items-center justify-center h-10 w-10 shrink-0">{platform.icon}</div>
                            <div className="text-left leading-tight">
                              <div className="text-white font-semibold">{platform.name}</div>
                              <div className="text-xs text-gray-400">{platform.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                      Not sure which one to pick? We auto-selected based on your browser.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <Card className="metallic-card p-0 overflow-hidden">
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="text-sm text-gray-400">Selected</div>
                          <div className="mt-1 text-2xl font-bold text-white">{active.name}</div>
                          <div className="mt-1 text-sm text-gray-400">{active.artifactHint}</div>
                        </div>
                        <div className="shrink-0">{active.icon}</div>
                      </div>

                      <div className="mt-6 flex flex-col gap-3">
                        <Button size="xl" className="w-full group" asChild>
                          <a href={active.downloadUrl}>
                            <Download className="h-5 w-5" />
                            Download for {active.name}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        </Button>

                        <Button variant="secondary" size="xl" className="w-full" asChild>
                          <a href={releasesLatestUrl} target="_blank" rel="noopener noreferrer">
                            <ShieldCheck className="h-5 w-5" />
                            Release notes & checksums
                          </a>
                        </Button>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                          <div className="text-gray-400">Telemetry</div>
                          <div className="mt-1 font-semibold text-white">Off</div>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                          <div className="text-gray-400">License</div>
                          <div className="mt-1 font-semibold text-white">MIT</div>
                        </div>
                      </div>

                      <div className="mt-6 text-xs text-gray-500 leading-relaxed">
                        Having trouble installing? Check the{' '}
                        <a
                          href={siteConfig.links.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cherry-400 hover:text-cherry-300 underline underline-offset-4"
                        >
                          documentation
                        </a>
                        {' '}or{' '}
                        <a
                          href={siteConfig.links.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cherry-400 hover:text-cherry-300 underline underline-offset-4"
                        >
                          ask in Discord
                        </a>
                        .
                      </div>
                    </div>

                  </Card>
                </div>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.05}>
            <section className="mt-10">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">System requirements</h2>
                <div className="h-px bg-dark-border flex-grow" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SYSTEM_REQUIREMENTS.map((req) => (
                  <Card
                    key={req.title}
                    className="bg-dark-surface/30 backdrop-blur-md border border-white/5 hover:border-cherry-500/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-cherry-500/10 p-3">{req.icon}</div>
                      <div className="min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="font-semibold text-white">{req.title}</div>
                          <div className="text-sm text-gray-300 font-mono">{req.detail}</div>
                        </div>
                        <p className="mt-2 text-sm text-gray-400 leading-relaxed">{req.sub}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <section className="mt-10">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">Prefer the source?</h2>
                <div className="h-px bg-dark-border flex-grow" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-dark-surface/30 backdrop-blur-md border border-white/5 hover:border-cherry-500/20 transition-colors">
                  <div className="text-sm text-gray-400">GitHub</div>
                  <div className="mt-2 text-white font-semibold">Browse releases</div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    Find older versions, changelogs, and checksums in one place.
                  </p>
                  <div className="mt-4">
                    <Button variant="secondary" size="sm" asChild>
                      <a href={releasesLatestUrl} target="_blank" rel="noopener noreferrer">
                        Open releases
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>

                <Card className="bg-dark-surface/30 backdrop-blur-md border border-white/5 hover:border-cherry-500/20 transition-colors">
                  <div className="text-sm text-gray-400">Docs</div>
                  <div className="mt-2 text-white font-semibold">Install help</div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    Gatekeeper, SmartScreen, and Linux permissions - step-by-step.
                  </p>
                  <div className="mt-4">
                    <Button variant="secondary" size="sm" asChild>
                      <a href={siteConfig.links.docs} target="_blank" rel="noopener noreferrer">
                        View docs
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>

                <Card className="bg-dark-surface/30 backdrop-blur-md border border-white/5 hover:border-cherry-500/20 transition-colors">
                  <div className="text-sm text-gray-400">License</div>
                  <div className="mt-2 text-white font-semibold">MIT</div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    Free for personal and commercial use. Fork it, ship it, improve it.
                  </p>
                  <div className="mt-4">
                    <Button variant="secondary" size="sm" asChild>
                      <Link href="/license">
                        Read license
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </section>
          </MotionWrapper>
        </div>
      </main>

      <Footer variant="transparent" />
    </div>
  );
}
