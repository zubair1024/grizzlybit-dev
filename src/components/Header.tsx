import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { trackEvent } from '@/util/ga';

type MenuItem = { title: string; url: string };

const landingPageMenu: MenuItem[] = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/#about-me' },
  { title: 'Portfolio', url: '/#my-portfolio' },
  { title: 'Testimonials', url: '/#my-testimonials' },
  { title: 'Blog', url: '/blog' },
  { title: 'Contact', url: '/#contact-form' },
];

// Always-available menu used on subroutes so users can navigate back.
const subRouteMenu: MenuItem[] = [
  { title: 'Home', url: '/' },
  { title: 'Blog', url: '/blog' },
];

const Header = () => {
  const { pathname } = useRouter();
  const isLandingPage = pathname === '/';
  const menu = isLandingPage ? landingPageMenu : subRouteMenu;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const header = document.getElementById('header');
    const onScroll = () => {
      if (window.scrollY !== 0) {
        header?.classList.add('shadow-xl');
        header?.classList.remove('bg-transparent');
        header?.classList.add('bg-base-300');
      } else {
        header?.classList.remove('shadow-xl');
        header?.classList.add('bg-transparent');
        header?.classList.remove('bg-base-300');
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header id="header" className="fixed z-50 navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="btn btn-ghost lg:hidden min-h-[44px] min-w-[44px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            id="mobile-menu"
            className={`${
              mobileOpen ? '' : 'hidden'
            } absolute left-0 top-full p-2 mt-3 uppercase shadow menu menu-compact bg-base-100 rounded-box w-52`}
          >
            {menu.map((i) => (
              <li key={i.title}>
                <Link href={i.url}>{i.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost">
          <Image
            src="/grizzlybit-dev-logo.svg"
            width={150}
            height={150}
            alt="Grizzlybit"
          />
        </Link>
      </div>
      <div className="hidden navbar-center lg:flex lg:justify-between">
        <ul className="px-1 uppercase menu menu-horizontal menu-compact">
          {menu.map((i) => (
            <li key={i.title}>
              <Link href={i.url}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex space-x-2">
          <a
            href="/zubair_cv.pdf"
            className="btn min-h-[44px]"
            download
            onClick={() =>
              trackEvent('resume_download', {
                file: 'zubair_cv.pdf',
                location: 'header',
              })
            }
          >
            My Resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
