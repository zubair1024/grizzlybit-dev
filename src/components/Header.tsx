import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { trackEvent } from '@/util/ga';
import { Download, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Same links everywhere; section anchors are absolute so they work off-home.
const menu = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/#about-me' },
  { title: 'Portfolio', url: '/#my-portfolio' },
  { title: 'Testimonials', url: '/#my-testimonials' },
  { title: 'Blog', url: '/blog' },
  { title: 'Contact', url: '/#contact-form' },
];

// Only real pages get a current state; section anchors never do.
const isCurrent = (url: string, pathname: string) =>
  url === '/'
    ? pathname === '/'
    : (url === '/blog' && pathname.startsWith('/blog')) ||
      (url === '/#my-portfolio' && pathname.startsWith('/portfolio'));

const currentClass =
  'aria-[current=page]:underline aria-[current=page]:decoration-primary aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]';

const ResumeButton = ({ className }: { className?: string }) => (
  <Button asChild className={className}>
    <a
      href="/zubair_cv.pdf"
      download
      onClick={() =>
        trackEvent('resume_download', {
          file: 'zubair_cv.pdf',
          location: 'header',
        })
      }
    >
      <Download aria-hidden="true" />
      Download résumé<span className="sr-only"> (PDF)</span>
    </a>
  </Button>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useRouter();
  const current = (url: string) =>
    isCurrent(url, pathname) ? ('page' as const) : undefined;

  return (
    <header
      id="header"
      className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-background/90 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm font-bold text-lg tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring"
        >
          <Image
            src="/grizzlybit-dev-only-logo.svg"
            width={36}
            height={36}
            alt=""
            className="rounded-full border-2 border-border"
          />
          Grizzlybit
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {menu.map((i) => (
              <li key={i.title}>
                <Button asChild variant="ghost" className={currentClass}>
                  <Link href={i.url} aria-current={current(i.url)}>
                    {i.title}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ResumeButton className="hidden sm:inline-flex" />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11 lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-2 border-border">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">
                  Grizzlybit
                </SheetTitle>
                <SheetDescription>Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {menu.map((i) => (
                    <li key={i.title}>
                      <Button
                        asChild
                        variant="ghost"
                        className={`h-12 w-full justify-start rounded-none px-4 text-base ${currentClass}`}
                      >
                        <Link
                          href={i.url}
                          aria-current={current(i.url)}
                          onClick={() => setMobileOpen(false)}
                        >
                          {i.title}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <ResumeButton className="h-12 w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
