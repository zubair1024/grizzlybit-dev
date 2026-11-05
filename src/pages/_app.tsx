import { CapabilityProvider } from '@/components/fx/CapabilityProvider';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ReactLenis, useLenis } from 'lenis/react';
import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react';
import type { AppProps } from 'next/app';
import type { NextWebVitalsMetric } from 'next/app';
import { DM_Sans, Space_Mono } from 'next/font/google';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { init } from '../util/ga';

/**
 * Report Web Vitals for performance monitoring
 * Tracks Core Web Vitals (CLS, FID, LCP, INP) and sends to analytics
 *
 * Core Web Vitals Thresholds:
 * - LCP (Largest Contentful Paint): < 2.5s (good), < 4.0s (needs improvement)
 * - FID (First Input Delay): < 100ms (good), < 300ms (needs improvement)
 * - CLS (Cumulative Layout Shift): < 0.1 (good), < 0.25 (needs improvement)
 * - INP (Interaction to Next Paint): < 200ms (good), < 500ms (needs improvement)
 */
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Log metrics in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }

  // Send to Google Analytics in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Check if gtag is available
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }

  // You can also send metrics to other analytics services here:
  // - Vercel Analytics
  // - Sentry Performance
  // - New Relic
  // - Custom backend endpoint
}

const sans = DM_Sans({ subsets: ['latin'], display: 'swap' });
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// Lenis owns scrolling, so reset it ourselves on non-hash navigations.
function ScrollReset() {
  const lenis = useLenis();
  const router = useRouter();
  useEffect(() => {
    const onDone = (url: string) => {
      if (!url.includes('#')) lenis?.scrollTo(0, { immediate: true });
    };
    router.events.on('routeChangeComplete', onDone);
    return () => router.events.off('routeChangeComplete', onDone);
  }, [lenis, router.events]);
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    init('G-ZD3BELKQE2');
    hotjar.initialize({ id: 3372547, sv: 6 });
  }, []);

  return (
    <>
      {/* Pages Router: expose next/font families as CSS vars on :root so portals inherit them */}
      <style jsx global>{`
        :root {
          --font-dm-sans: ${sans.style.fontFamily};
          --font-space-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        {!reduceMotion && (
          <ReactLenis root options={{ lerp: 0.1, anchors: true }} />
        )}
        <ScrollReset />
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <CapabilityProvider>
              {/* initial={false}: skip mount animations on first load so the
                  server HTML (hero included) is visible without JS */}
              <AnimatePresence initial={false}>
                <Component {...pageProps} />
              </AnimatePresence>
            </CapabilityProvider>
          </TooltipProvider>
        </MotionConfig>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
