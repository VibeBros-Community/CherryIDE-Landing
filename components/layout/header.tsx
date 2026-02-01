'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { images } from '@/config/images';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Models', href: '#models' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: siteConfig.links.docs },
  ];

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled
          ? 'top-0 bg-dark-bg/95 backdrop-blur-xl shadow-lg'
          : 'top-8 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
              <Image
                src={images.logoTransparent.src}
                alt={images.logoTransparent.alt}
                fill
                className="object-contain"
                priority
                placeholder="blur"
                blurDataURL={images.logoTransparent.blurDataURL}
              />
            </div>
            <span className="text-xl font-bold text-white">Cherry IDE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/download">Download</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-colors hover:text-cherry-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Animated */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-dark-border"
            >
              <nav className="flex flex-col gap-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-300 hover:text-cherry-500 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-4 border-t border-dark-border">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="View Cherry IDE on GitHub">
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/download">Download</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
