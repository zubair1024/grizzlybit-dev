import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* DNS Prefetch for external resources - establishes early connections */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        <link rel="dns-prefetch" href="https://script.hotjar.com" />

        {/* Preconnect to critical domains for faster resource loading */}
        {/* Performs DNS lookup, TCP handshake, and TLS negotiation early */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static.hotjar.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://script.hotjar.com" crossOrigin="anonymous" />

        {/*
          Font Optimization Notes:
          - Using @next/font (Next.js 13) for automatic font optimization
          - Fonts are configured in _app.tsx with font-display: swap
          - This prevents layout shift and improves CLS (Cumulative Layout Shift)
          - System fonts are used as fallbacks for optimal performance
        */}

        {/*
          Performance & Core Web Vitals Monitoring:
          - LCP (Largest Contentful Paint): Target < 2.5s
          - FID (First Input Delay): Target < 100ms
          - CLS (Cumulative Layout Shift): Target < 0.1
          - INP (Interaction to Next Paint): Target < 200ms

          Monitoring Tools:
          1. Lighthouse CI: Run in CI/CD pipeline for automated audits
          2. Real User Monitoring: Track actual user performance metrics
          3. Web Vitals: Use reportWebVitals in _app.tsx

          Setup Lighthouse CI:
          - npm install -g @lhci/cli
          - Create lighthouserc.js configuration
          - Add to CI pipeline: lhci autorun

          Monitor Core Web Vitals:
          - Implement reportWebVitals function in _app.tsx
          - Send metrics to Google Analytics or other analytics service
          - Set up alerts for threshold violations
        */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
