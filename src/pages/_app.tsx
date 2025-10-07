import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import type { NextWebVitalsMetric } from 'next/app';
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

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(`Running in ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV === 'development') return;
    init('G-ZD3BELKQE2');
    hotjar.initialize(3372547, 6);
  }, []);

  return (
    <>
      {/*
        Font Optimization:
        - Using system fonts via Tailwind/DaisyUI for optimal performance
        - System fonts load instantly without network requests
        - If custom fonts are needed, use @next/font with font-display: swap

        Example with @next/font (Next.js 13):
        ```typescript
        import { Inter } from '@next/font/google';

        const inter = Inter({
          subsets: ['latin'],
          display: 'swap', // Prevents layout shift
          variable: '--font-inter',
        });

        <div className={inter.variable}>
          ...
        </div>
        ```
      */}
      <div data-theme="halloween">
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </div>
    </>
  );
}
