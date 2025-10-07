import { getAllPostsWithLastModified } from './posts';

/**
 * SEO Utilities for grizzlybit.dev
 * Provides helper functions for sitemap generation, meta tag validation, and SEO optimization
 */

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate sitemap data for all pages
 * @returns Array of sitemap entries with proper metadata
 */
export function generateSitemapData(): SitemapEntry[] {
  const baseUrl = process.env.SITE_URL || 'https://www.grizzlybit.dev';
  const sitemap: SitemapEntry[] = [];

  // Homepage
  sitemap.push({
    url: baseUrl,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Blog listing page
  sitemap.push({
    url: `${baseUrl}/blog`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // Blog posts - get dynamic data
  try {
    const posts = getAllPostsWithLastModified();
    posts.forEach((post) => {
      sitemap.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error('Error generating blog sitemap data:', error);
  }

  // Portfolio pages - static list
  const portfolioPages = [
    'covid-tracker',
    'mycarlo-app',
    'tools-grizzly',
    'vehicle-tracking-mobile',
    'vehicle-tracking',
    'he-app',
    'boiler-mobile',
    'worldly-pins',
    'tis-landing-page',
    'my247-app',
  ];

  portfolioPages.forEach((page) => {
    sitemap.push({
      url: `${baseUrl}/portfolio/${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.7,
    });
  });

  return sitemap;
}

/**
 * Validate meta tags for a page
 * @param meta Meta tag object to validate
 * @returns Validation result with suggestions
 */
export interface MetaTag {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export function validateMetaTags(meta: MetaTag): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: [],
  };

  // Title validation
  if (!meta.title) {
    result.isValid = false;
    result.errors.push('Title is required');
  } else if (meta.title.length > 60) {
    result.warnings.push('Title is longer than 60 characters (may be truncated in search results)');
  } else if (meta.title.length < 30) {
    result.suggestions.push('Consider a longer title (30-60 characters is optimal)');
  }

  // Description validation
  if (!meta.description) {
    result.isValid = false;
    result.errors.push('Description is required');
  } else if (meta.description.length > 160) {
    result.warnings.push('Description is longer than 160 characters (may be truncated in search results)');
  } else if (meta.description.length < 120) {
    result.suggestions.push('Consider a longer description (120-160 characters is optimal)');
  }

  // Open Graph validation
  if (!meta.ogTitle) {
    result.suggestions.push('Consider adding Open Graph title for better social media sharing');
  }
  if (!meta.ogDescription) {
    result.suggestions.push('Consider adding Open Graph description for better social media sharing');
  }
  if (!meta.ogImage) {
    result.warnings.push('Open Graph image is missing (required for social media cards)');
  }

  // Twitter Card validation
  if (!meta.twitterCard) {
    result.suggestions.push('Consider adding Twitter Card type for better Twitter sharing');
  }

  return result;
}

/**
 * Generate lastmod date for sitemap
 * Priority: frontmatter > git commit > file modification > current date
 * @param filePath Path to the file
 * @param frontmatterDate Date from frontmatter (if available)
 * @returns ISO date string
 */
export function generateLastModDate(filePath?: string, frontmatterDate?: string): string {
  // Use frontmatter date if provided
  if (frontmatterDate) {
    return new Date(frontmatterDate).toISOString();
  }

  // TODO: Implement git commit date extraction
  // This would require running git commands or using a git library
  // For now, fall back to current date
  // Example: execSync(`git log -1 --format=%cI -- ${filePath}`)

  // Fall back to current date
  return new Date().toISOString();
}

/**
 * Get Core Web Vitals thresholds
 * These are Google's recommended thresholds for good user experience
 */
export const CORE_WEB_VITALS = {
  // Largest Contentful Paint (LCP) - measures loading performance
  LCP: {
    good: 2500, // milliseconds
    needsImprovement: 4000,
    poor: Infinity,
  },
  // First Input Delay (FID) - measures interactivity
  FID: {
    good: 100, // milliseconds
    needsImprovement: 300,
    poor: Infinity,
  },
  // Cumulative Layout Shift (CLS) - measures visual stability
  CLS: {
    good: 0.1, // score
    needsImprovement: 0.25,
    poor: Infinity,
  },
  // Interaction to Next Paint (INP) - measures responsiveness
  INP: {
    good: 200, // milliseconds
    needsImprovement: 500,
    poor: Infinity,
  },
};

/**
 * Performance monitoring recommendations
 * This object documents how to set up performance monitoring
 */
export const PERFORMANCE_MONITORING = {
  lighthouseCI: {
    description: 'Automate Lighthouse audits in CI/CD pipeline',
    setup: [
      '1. Install: npm install -g @lhci/cli',
      '2. Create lighthouserc.js configuration file',
      '3. Add to CI pipeline: lhci autorun',
      '4. Set performance budgets for critical metrics',
    ],
    configExample: {
      ci: {
        collect: {
          numberOfRuns: 3,
          url: ['https://www.grizzlybit.dev/'],
        },
        assert: {
          assertions: {
            'categories:performance': ['error', { minScore: 0.9 }],
            'categories:accessibility': ['error', { minScore: 0.9 }],
            'categories:seo': ['error', { minScore: 0.9 }],
          },
        },
      },
    },
  },
  webVitals: {
    description: 'Monitor Core Web Vitals in production',
    implementation: [
      '1. Use next/web-vitals to track metrics',
      '2. Send data to analytics service (Google Analytics, Vercel Analytics, etc.)',
      '3. Set up alerts for threshold violations',
      '4. Monitor trends over time',
    ],
    codeExample: `
// In _app.tsx
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}
    `.trim(),
  },
  realUserMonitoring: {
    description: 'Track real user performance data',
    tools: [
      'Google Analytics 4 (with Web Vitals)',
      'Vercel Analytics',
      'New Relic Browser',
      'Sentry Performance Monitoring',
      'SpeedCurve',
    ],
  },
};

/**
 * Generate structured data (JSON-LD) for better SEO
 */
export function generateStructuredData(type: 'website' | 'article' | 'portfolio', data: any) {
  const baseUrl = process.env.SITE_URL || 'https://www.grizzlybit.dev';

  const commonData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'website':
      return {
        ...commonData,
        '@type': 'WebSite',
        name: 'GrizzlyBit',
        url: baseUrl,
        description: 'Software Development & Consulting Services',
        author: {
          '@type': 'Organization',
          name: 'GrizzlyBit',
        },
      };

    case 'article':
      return {
        ...commonData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image ? `${baseUrl}${data.image}` : undefined,
        datePublished: data.publishedAt,
        dateModified: data.lastModified || data.publishedAt,
        author: {
          '@type': 'Organization',
          name: data.author || 'GrizzlyBit',
        },
        publisher: {
          '@type': 'Organization',
          name: 'GrizzlyBit',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
      };

    case 'portfolio':
      return {
        ...commonData,
        '@type': 'CreativeWork',
        name: data.title,
        description: data.description,
        image: data.image ? `${baseUrl}${data.image}` : undefined,
        author: {
          '@type': 'Organization',
          name: 'GrizzlyBit',
        },
      };

    default:
      return commonData;
  }
}
