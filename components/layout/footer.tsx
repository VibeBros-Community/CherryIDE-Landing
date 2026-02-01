import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { images } from '@/config/images';
import { cn } from '@/lib/utils';

type FooterVariant = 'default' | 'transparent';

interface FooterProps {
  variant?: FooterVariant;
}

export default function Footer({ variant = 'default' }: FooterProps) {
  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Download', href: '/download' },
      { label: 'Changelog', href: '/changelog' },
    ],
    resources: [
      { label: 'Documentation', href: siteConfig.links.docs },
      { label: 'GitHub', href: siteConfig.links.github },
      { label: 'Discord', href: siteConfig.links.discord },
      { label: 'Blog', href: '/blog' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'License', href: '/license' },
    ],
  };

  return (
    <footer
      className={cn(
        'relative',
        variant === 'default'
          ? 'bg-gradient-to-b from-[#4a020d] to-black'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src={images.logoTransparent.src}
                  alt={images.logoTransparent.alt}
                  fill
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL={images.logoTransparent.blurDataURL}
                />
              </div>
              <span className="text-xl font-bold text-white">Cherry IDE</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Code with the power of open-source AI. 100% local, 100% private.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cherry-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cherry-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cherry-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cherry-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cherry-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cherry-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Cherry IDE. Open-source under MIT License.
            </p>
            <p className="text-gray-400 text-sm">
              Built with Next.js, React Three Fiber, and GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
