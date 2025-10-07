# Performance Optimization Guide for grizzlybit.dev

This document outlines the performance optimizations implemented for grizzlybit.dev and provides guidance on monitoring and improving performance over time.

## Core Web Vitals

Google's Core Web Vitals are essential metrics for measuring user experience:

### Metrics & Thresholds

| Metric | Good | Needs Improvement | Poor | Description |
|--------|------|-------------------|------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s | > 4.0s | Loading performance - when the largest content element becomes visible |
| **FID** (First Input Delay) | < 100ms | 100ms - 300ms | > 300ms | Interactivity - time from first user interaction to browser response |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 | Visual stability - measures unexpected layout shifts |
| **INP** (Interaction to Next Paint) | < 200ms | 200ms - 500ms | > 500ms | Responsiveness - time to next paint after interaction |

## Implemented Optimizations

### 1. Sitemap Configuration

**File**: `next-sitemap.config.js`

Advanced sitemap configuration with:
- Custom priorities for different page types (homepage: 1.0, blog: 0.8, portfolio: 0.7)
- Change frequencies (homepage: weekly, blog: daily, portfolio: yearly)
- Robots.txt generation with user-agent specific policies
- Transform function for customizing URL entries
- Automatic exclusion of API routes

### 2. SEO Utilities

**File**: `src/util/seo.ts`

Comprehensive SEO utilities including:
- Sitemap data generation functions
- Meta tag validation
- Structured data (JSON-LD) generators
- lastMod date helpers
- Core Web Vitals threshold constants

### 3. Resource Hints

**File**: `src/pages/_document.tsx`

Optimized resource loading with:
- `dns-prefetch` for early DNS resolution (Google Analytics, Hotjar)
- `preconnect` for complete connection setup (DNS + TCP + TLS)
- Comments documenting font optimization strategies

### 4. Font Optimization

**File**: `src/pages/_app.tsx`

Current implementation uses system fonts via DaisyUI/Tailwind for optimal performance.

**Benefits**:
- Zero network requests for fonts
- Instant font rendering
- No FOUT (Flash of Unstyled Text)
- No CLS (Cumulative Layout Shift)

**For Custom Fonts** (if needed in future):
```typescript
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents layout shift
  variable: '--font-inter',
  preload: true,
});
```

### 5. Web Vitals Monitoring

**File**: `src/pages/_app.tsx`

Implemented `reportWebVitals()` function that:
- Logs metrics in development mode
- Sends metrics to Google Analytics in production
- Supports integration with other analytics services

**Tracked Metrics**:
- LCP, FID, CLS, INP (Core Web Vitals)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

### 6. Blog Post Metadata

**File**: `src/util/posts.ts`

Enhanced with:
- `getPostLastModified()` - Gets accurate modification dates
- `getAllPostsWithLastModified()` - Returns all posts with lastMod dates
- Reads from frontmatter or falls back to file system

## Performance Monitoring Setup

### 1. Lighthouse CI

Automate Lighthouse audits in your CI/CD pipeline.

**Installation**:
```bash
npm install -g @lhci/cli
```

**Configuration**:
1. Copy `lighthouserc.example.js` to `lighthouserc.js`
2. Customize URLs and thresholds
3. Add to CI pipeline

**CI/CD Integration Examples**:

**GitHub Actions**:
```yaml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    npm run build
    npm run start &
    lhci autorun
```

**GitLab CI**:
```yaml
lighthouse:
  script:
    - npm install -g @lhci/cli
    - npm run build
    - npm run start &
    - lhci autorun
```

### 2. Real User Monitoring (RUM)

Track actual user performance in production.

**Option A: Google Analytics 4**

Already configured in `src/pages/_app.tsx` via `reportWebVitals()`.

View metrics in:
- GA4 → Events → web-vitals
- Custom reports for Core Web Vitals trends

**Option B: Vercel Analytics**

```bash
npm install @vercel/analytics
```

```typescript
// _app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

**Option C: Sentry Performance**

```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js`:
```javascript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
});
```

### 3. Local Testing

**Chrome DevTools**:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit (select categories)
4. Review recommendations

**WebPageTest**:
- Visit [webpagetest.org](https://www.webpagetest.org/)
- Enter URL
- Select location and device
- Review detailed waterfall and metrics

**Chrome User Experience Report (CrUX)**:
- View real-world data from Chrome users
- Access via [PageSpeed Insights](https://pagespeed.web.dev/)

## Performance Best Practices

### Image Optimization

**Use Next.js Image component**:
```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy" // Lazy load below-the-fold images
  placeholder="blur" // Show blur placeholder while loading
/>
```

**Benefits**:
- Automatic WebP/AVIF conversion
- Responsive image sizing
- Lazy loading
- Blur-up placeholder

### Code Splitting

Next.js automatically code-splits at the page level. For component-level splitting:

```typescript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if not needed
});
```

### Minimize JavaScript

**Analyze bundle size**:
```bash
npm install @next/bundle-analyzer
```

**next.config.js**:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});
```

**Run analysis**:
```bash
ANALYZE=true npm run build
```

### Caching Strategies

**Next.js Automatic**:
- Static pages cached at CDN
- API routes can use Cache-Control headers
- ISR (Incremental Static Regeneration) for dynamic content

**Service Worker** (optional):
```typescript
// Install next-pwa
npm install next-pwa

// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // your config
});
```

### Database Optimization

If using a database:
- Index frequently queried fields
- Use connection pooling
- Implement query caching (Redis)
- Optimize N+1 queries

### API Route Optimization

```typescript
// pages/api/example.ts
export const config = {
  runtime: 'edge', // Use Edge Runtime for better performance
};

export default async function handler(req: Request) {
  // Set cache headers
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
```

## Monitoring Dashboard

Track these metrics regularly:

### Weekly
- [ ] Check Lighthouse scores (mobile & desktop)
- [ ] Review Core Web Vitals in Google Search Console
- [ ] Monitor page load times in analytics

### Monthly
- [ ] Analyze bundle size trends
- [ ] Review and update performance budgets
- [ ] Check for outdated dependencies

### Quarterly
- [ ] Full performance audit
- [ ] Update optimization strategies
- [ ] Benchmark against competitors

## Performance Budget

Current recommended budgets:

| Resource Type | Budget | Current |
|--------------|--------|---------|
| Total JavaScript | < 500KB | Check with bundle analyzer |
| Total CSS | < 100KB | Check with bundle analyzer |
| Total Images | < 2MB per page | Monitor in DevTools |
| Total Page Size | < 3MB | Monitor in DevTools |
| HTTP Requests | < 50 | Monitor in DevTools |

## Troubleshooting

### High LCP (Largest Contentful Paint)

**Causes**:
- Large images
- Slow server response
- Render-blocking resources

**Solutions**:
- Optimize/compress images
- Use Next.js Image component
- Preload critical resources
- Use CDN

### High CLS (Cumulative Layout Shift)

**Causes**:
- Images without dimensions
- Dynamic content insertion
- Web fonts causing FOUT

**Solutions**:
- Always set width/height on images
- Reserve space for dynamic content
- Use font-display: swap
- Use system fonts

### High FID/INP (Interactivity)

**Causes**:
- Large JavaScript bundles
- Long-running tasks
- Heavy third-party scripts

**Solutions**:
- Code splitting
- Defer non-critical JavaScript
- Use Web Workers for heavy computations
- Optimize third-party scripts

## Resources

- [Web.dev - Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Google Search Console - Core Web Vitals Report](https://search.google.com/search-console)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

## Support

For questions or issues related to performance optimization, please:
1. Check this documentation
2. Review the implementation in the codebase
3. Consult the official Next.js performance documentation
4. Open an issue in the project repository

---

Last updated: 2025-10-07
