/**
 * Example: How to use structured data (JSON-LD) for better SEO
 *
 * Structured data helps search engines understand your content better,
 * leading to rich snippets in search results.
 */

import Head from 'next/head';
import { generateStructuredData } from '../src/util/seo';

/**
 * Example 1: Blog Post Page
 */
export function BlogPostWithStructuredData({ post }: any) {
  const structuredData = generateStructuredData('article', {
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    lastModified: post.lastModified,
    image: post.image,
    author: post.author,
  });

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />

        {/* Add structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <article>
        <h1>{post.title}</h1>
        {/* Rest of your blog post */}
      </article>
    </>
  );
}

/**
 * Example 2: Homepage with Website Structured Data
 */
export function HomepageWithStructuredData() {
  const structuredData = generateStructuredData('website', {});

  return (
    <>
      <Head>
        <title>GrizzlyBit - Software Development & Consulting</title>
        <meta name="description" content="Professional software development and consulting services" />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <main>
        {/* Your homepage content */}
      </main>
    </>
  );
}

/**
 * Example 3: Portfolio Page with Creative Work
 */
export function PortfolioWithStructuredData({ project }: any) {
  const structuredData = generateStructuredData('portfolio', {
    title: project.name,
    description: project.description,
    image: project.image,
  });

  return (
    <>
      <Head>
        <title>{project.name} - GrizzlyBit Portfolio</title>
        <meta name="description" content={project.description} />

        {/* Portfolio item structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <div>
        <h1>{project.name}</h1>
        {/* Rest of your portfolio page */}
      </div>
    </>
  );
}

/**
 * Example 4: Using Meta Tag Validation
 */
import { validateMetaTags } from '../src/util/seo';

export function MetaTagValidationExample() {
  const meta = {
    title: 'How to Optimize React Performance',
    description: 'Learn advanced React performance optimization techniques.',
    ogTitle: 'How to Optimize React Performance',
    ogDescription: 'Learn advanced React performance optimization techniques.',
    ogImage: '/images/react-performance.jpg',
    twitterCard: 'summary_large_image',
  };

  const validation = validateMetaTags(meta);

  // Log validation results in development
  if (process.env.NODE_ENV === 'development') {
    if (validation.errors.length > 0) {
      console.error('Meta tag errors:', validation.errors);
    }
    if (validation.warnings.length > 0) {
      console.warn('Meta tag warnings:', validation.warnings);
    }
    if (validation.suggestions.length > 0) {
      console.info('Meta tag suggestions:', validation.suggestions);
    }
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:image" content={meta.ogImage} />
      <meta name="twitter:card" content={meta.twitterCard} />
    </Head>
  );
}

/**
 * Example 5: Complete Blog Post Implementation
 */
export function CompleteBlogPostExample({ post }: any) {
  // Generate structured data
  const structuredData = generateStructuredData('article', post);

  // Validate meta tags (in development)
  if (process.env.NODE_ENV === 'development') {
    const validation = validateMetaTags({
      title: post.title,
      description: post.description,
      ogTitle: post.title,
      ogDescription: post.description,
      ogImage: post.image,
      twitterCard: 'summary_large_image',
    });

    if (!validation.isValid) {
      console.error('Meta validation failed:', validation.errors);
    }
  }

  return (
    <>
      <Head>
        {/* Basic meta tags */}
        <title>{post.title} - GrizzlyBit Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords?.join(', ')} />
        <meta name="author" content={post.author || 'GrizzlyBit'} />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={`https://www.grizzlybit.dev/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.publishedAt} />
        {post.lastModified && (
          <meta property="article:modified_time" content={post.lastModified} />
        )}

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />

        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <article>
        <header>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <time dateTime={post.publishedAt}>
            Published: {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          {post.lastModified && (
            <time dateTime={post.lastModified}>
              Updated: {new Date(post.lastModified).toLocaleDateString()}
            </time>
          )}
        </header>

        <div>
          {/* Your blog post content */}
        </div>
      </article>
    </>
  );
}

/**
 * Example 6: Using Core Web Vitals Constants
 */
import { CORE_WEB_VITALS } from '../src/util/seo';

export function WebVitalsThresholdExample(metric: string, value: number) {
  const thresholds = CORE_WEB_VITALS[metric as keyof typeof CORE_WEB_VITALS];

  if (value <= thresholds.good) {
    return 'Good';
  } else if (value <= thresholds.needsImprovement) {
    return 'Needs Improvement';
  } else {
    return 'Poor';
  }
}

/**
 * Example 7: Custom Sitemap Entry
 *
 * You can add custom entries in next-sitemap.config.js additionalPaths
 */
export const customSitemapExample = {
  additionalPaths: async (config: any) => {
    const result: Array<{
      loc: string;
      changefreq: string;
      priority: number;
      lastmod: string;
    }> = [];

    // Example: Add dynamic portfolio items
    const portfolioItems = [
      'covid-tracker',
      'mycarlo-app',
      'tools-grizzly',
    ];

    portfolioItems.forEach((item) => {
      result.push({
        loc: `/portfolio/${item}`,
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    // Example: Add blog posts from database/API
    // const posts = await fetchBlogPosts();
    // posts.forEach((post) => {
    //   result.push({
    //     loc: `/blog/${post.slug}`,
    //     changefreq: 'monthly',
    //     priority: 0.8,
    //     lastmod: post.lastModified,
    //   });
    // });

    return result;
  },
};
