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
const socialLabels: Record<string, string> = { Twitter: 'X (Twitter)' };

// Inverted surface (foreground/background swapped), so focus rings use the
// page background colour to stay visible in both themes.
const focusClass =
  'rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-background';
const labelClass = 'font-mono text-sm font-bold text-background/70';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className={`inline-flex items-center gap-3 text-xl font-bold tracking-tight ${focusClass}`}
          >
            <Image
              src="/grizzlybit-dev-only-logo.svg"
              height={40}
              width={40}
              alt=""
              className="rounded-full border-2 border-background"
            />
            Grizzlybit
          </Link>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-background/80">
            Zubair Ahmed, full-stack software engineer and CTO at RAZRLAB.
            Building Node.js, React, TypeScript and IoT products on AWS.
          </p>
          <address className="mt-3 text-sm not-italic text-background/80">
            Dubai, United Arab Emirates
          </address>
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-10 sm:grid-cols-2 md:col-span-2"
        >
          <div>
            <p className={labelClass}>Navigate</p>
            <ul className="mt-4 space-y-1 md:space-y-0">
              {navLinks.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline md:min-h-0 md:py-1 ${focusClass}`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={labelClass}>Connect</p>
            <ul className="mt-4 grid max-w-xs grid-cols-5 gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIcons[s.name];
                const label = socialLabels[s.name] ?? s.name;
                return (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Zubair Ahmed on ${label} (opens in a new tab)`}
                      title={label}
                      onClick={() =>
                        trackEvent('social_click', {
                          network: s.name,
                          url: s.url,
                          location: 'footer',
                        })
                      }
                      className={`flex size-11 items-center justify-center border-2 border-background bg-foreground text-background shadow-[3px_3px_0_0_var(--background)] transition-all hover:shadow-none motion-safe:hover:translate-x-[3px] motion-safe:hover:translate-y-[3px] ${focusClass}`}
                    >
                      {Icon && <Icon aria-hidden="true" className="size-5" />}
                    </a>
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
              className={`mt-5 inline-flex min-h-11 items-center gap-2 font-medium underline decoration-primary decoration-2 underline-offset-4 hover:decoration-background ${focusClass}`}
            >
              <Mail aria-hidden="true" className="size-4" />
              za@grizzlybit.dev
            </a>
          </div>
        </nav>
      </div>

      <div className="border-t-2 border-background/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 font-mono text-xs text-background/70 md:flex-row md:px-6">
          <p>© {year} Zubair Ahmed. All rights reserved.</p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
