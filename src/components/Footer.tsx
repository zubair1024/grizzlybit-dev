import socialLinks from 'data/socialLinks';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/util/ga';

const navLinks = [
  { href: '/#about-me', label: 'About' },
  { href: '/#my-portfolio', label: 'Portfolio' },
  { href: '/#my-testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact-form', label: 'Contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-black text-white/80">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-glow/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/grizzlybit-dev-only-logo.svg"
              height={36}
              width={36}
              alt="Grizzlybit"
            />
            <span className="font-mono text-lg tracking-wider text-white">
              GRIZZLYBIT
            </span>
          </Link>
          <p className="mt-4 max-w-sm font-mono text-sm text-white/60 leading-relaxed">
            Zubair Ahmed — Software engineer, entrepreneur, and CTO at RAZRLAB.
            Building products at the intersection of Node.js, React, and
            TypeScript.
          </p>
          <p className="mt-3 font-mono text-xs text-white/40">
            Dubai, United Arab Emirates
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-brand-glow uppercase">
            Navigate
          </p>
          <ul className="mt-4 space-y-2 font-mono text-sm">
            {navLinks.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-white/70 hover:text-brand-glow transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-brand-glow uppercase">
            Connect
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <li key={s.name}>
                <Link
                  target="_blank"
                  href={s.url}
                  rel="noreferrer"
                  aria-label={s.name}
                  onClick={() =>
                    trackEvent('social_click', {
                      network: s.name,
                      url: s.url,
                      location: 'footer',
                    })
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:border-brand-glow/60 hover:bg-brand-glow/10 transition-colors"
                >
                  <Image src={s.img} height={18} width={18} alt={s.name} />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="mailto:za@grizzlybit.dev"
            onClick={() =>
              trackEvent('email_click', {
                location: 'footer',
                address: 'primary',
              })
            }
            className="mt-5 inline-block font-mono text-sm text-white/70 hover:text-brand-glow transition-colors"
          >
            za@grizzlybit.dev
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-white/40">
          <p>© {year} Zubair Ahmed. All rights reserved.</p>
          <p>
            Built with <span className="text-brand-glow">Next.js</span> &
            <span className="text-brand-glow"> Tailwind</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
