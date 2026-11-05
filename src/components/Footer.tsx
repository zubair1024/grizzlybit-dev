import { Button } from '@/components/ui/button';
import { trackEvent } from '@/util/ga';
import socialLinks from 'data/socialLinks';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import {
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaStackOverflow,
  FaXTwitter,
} from 'react-icons/fa6';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about-me', label: 'About' },
  { href: '/#my-portfolio', label: 'Portfolio' },
  { href: '/#my-testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact-form', label: 'Contact' },
];

// currentColor icons so they follow the theme (the /social SVGs are white-only)
const socialIcons: Record<string, IconType> = {
  LinkedIn: FaLinkedin,
  Twitter: FaXTwitter,
  GitHub: FaGithub,
  Medium: FaMedium,
  'Stack Overflow': FaStackOverflow,
};

const labelClass = 'font-mono text-sm font-bold text-muted-foreground';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-border bg-muted text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-sm text-xl font-bold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            <Image
              src="/grizzlybit-dev-only-logo.svg"
              height={40}
              width={40}
              alt=""
              className="rounded-full border-2 border-border"
            />
            Grizzlybit
          </Link>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
            Zubair Ahmed, full-stack software engineer and CTO at RAZRLAB.
            Building Node.js, React, TypeScript and IoT products on AWS.
          </p>
          <address className="mt-3 text-sm not-italic text-muted-foreground">
            Dubai, United Arab Emirates
          </address>
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-10 sm:grid-cols-2 md:col-span-2"
        >
          <div>
            <p className={labelClass}>Navigate</p>
            <ul className="mt-4 space-y-1">
              {navLinks.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={labelClass}>Connect</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <li key={s.name}>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="size-11"
                    >
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Zubair Ahmed on ${s.name} (opens in a new tab)`}
                        onClick={() =>
                          trackEvent('social_click', {
                            network: s.name,
                            url: s.url,
                            location: 'footer',
                          })
                        }
                      >
                        {Icon && <Icon aria-hidden="true" className="size-5" />}
                      </a>
                    </Button>
                  </li>
                );
              })}
            </ul>
            <a
              href="mailto:za@grizzlybit.dev"
              onClick={() =>
                trackEvent('email_click', {
                  location: 'footer',
                  address: 'primary',
                })
              }
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring"
            >
              <Mail aria-hidden="true" className="size-4" />
              za@grizzlybit.dev
            </a>
          </div>
        </nav>
      </div>

      <div className="border-t-2 border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 md:px-6 font-mono text-xs text-muted-foreground md:flex-row">
          <p>© {year} Zubair Ahmed. All rights reserved.</p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
