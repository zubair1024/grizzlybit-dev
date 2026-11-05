const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Parse MDX frontmatter once at sitemap generation via gray-matter
// (robust against quoted strings, inline arrays, block scalars).
const postsDir = path.join(process.cwd(), 'src/posts');
const tagToSlug = (t) =>
  String(t)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const SITE = process.env.SITE_URL || 'https://www.grizzlybit.dev';

// Content dates for portfolio pages (first-added commit of each page), so
// lastmod doesn't churn on every build. Bump when a case study changes.
const portfolioLastmods = {
  'boiler-mobile': '2023-01-28T03:09:00+04:00',
  'covid-tracker': '2023-01-28T03:09:00+04:00',
  'he-app': '2023-01-28T03:38:10+04:00',
  'my247-app': '2023-01-28T03:38:10+04:00',
  'mycarlo-app': '2023-03-12T20:44:00+01:00',
  'tis-landing-page': '2023-01-28T03:38:10+04:00',
  'tools-grizzly': '2023-02-26T20:37:03+01:00',
  'vehicle-tracking-mobile': '2023-01-28T03:09:00+04:00',
  'vehicle-tracking': '2023-01-28T02:35:26+04:00',
  'worldly-pins': '2023-03-26T14:41:08+02:00',
};
const PORTFOLIO_FALLBACK_LASTMOD = '2023-03-26T12:41:08.000Z';

const { postLastmods, postImages, tagLastmods } = (() => {
  const posts = {};
  const images = {};
  const tags = {};
  let files = [];
  try {
    files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
  } catch (e) {
    console.warn('[sitemap] posts dir unreadable:', e.message);
    return { postLastmods: posts, postImages: images, tagLastmods: tags };
  }

  for (const f of files) {
    const slug = f.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDir, f);
    let data = {};
    try {
      data = matter(fs.readFileSync(fullPath, 'utf8')).data || {};
    } catch (e) {
      console.warn(`[sitemap] frontmatter parse failed for ${f}:`, e.message);
    }
    const fileMtime = fs.statSync(fullPath).mtime.toISOString();
    const candidate = data.lastModified || data.publishedAt || fileMtime;
    const d = new Date(candidate);
    // Date-only frontmatter = midnight Dubai, same as BlogPostingSchema.
    // YAML parses unquoted dates as UTC-midnight Date objects.
    const day =
      candidate instanceof Date
        ? candidate.toISOString().slice(0, 10)
        : String(candidate);
    const iso = /^\d{4}-\d{2}-\d{2}$/.test(day)
      ? `${day}T00:00:00+04:00`
      : Number.isNaN(d.getTime())
        ? fileMtime
        : d.toISOString();
    posts[slug] = iso;
    {
      try {
        images[slug] = new URL(
          data.image || `/og-images/blog/${slug}.png`,
          SITE,
        );
      } catch (e) {
        console.warn(`[sitemap] bad cover image for ${f}:`, e.message);
      }
    }

    const kws = Array.isArray(data.keywords) ? data.keywords : [];
    for (const raw of kws) {
      const ts = tagToSlug(raw);
      if (!ts) continue;
      if (!tags[ts]) tags[ts] = { lastmod: iso, count: 0 };
      tags[ts].count += 1;
      if (tags[ts].lastmod < iso) tags[ts].lastmod = iso;
    }
  }
  return { postLastmods: posts, postImages: images, tagLastmods: tags };
})();

const newestPostLastmod = Object.values(postLastmods).sort().pop();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.5,
  autoLastmod: false,

  // Exclude API routes, admin paths, AND thin (single-post) tag pages
  exclude: [
    '/api/*',
    '/server-sitemap.xml',
    ...Object.entries(tagLastmods)
      .filter(([, v]) => v.count < 2)
      .map(([t]) => `/blog/tag/${t}`),
  ],

  // Transform function to customize each URL entry
  transform: async (config, urlPath) => {
    let priority = 0.5;
    let changefreq = 'weekly';
    // Content-derived dates only; never the build time (avoids lastmod churn)
    let lastmod;
    let images;
    // urlPath is relative ('/'); next-sitemap joins it with siteUrl
    const loc = urlPath;

    if (urlPath === '/') {
      priority = 1.0;
      changefreq = 'weekly';
      // Homepage lists the latest posts, so the newest post drives it
      lastmod = newestPostLastmod;
    } else if (urlPath === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
      // Newest post drives blog index freshness
      lastmod = newestPostLastmod;
    } else if (urlPath.startsWith('/blog/tag/')) {
      // Must precede the generic '/blog/' branch, which would otherwise match
      priority = 0.6;
      changefreq = 'weekly';
      const tag = urlPath.replace('/blog/tag/', '');
      // Skip thin tag pages (single post) to align with runtime noindex
      if (!tagLastmods[tag] || tagLastmods[tag].count < 2) return null;
      lastmod = tagLastmods[tag].lastmod;
    } else if (urlPath.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'monthly';
      const slug = urlPath.replace('/blog/', '');
      if (postLastmods[slug]) lastmod = postLastmods[slug];
      if (postImages[slug]) images = [{ loc: postImages[slug] }];
    } else if (urlPath.startsWith('/portfolio')) {
      priority = 0.7;
      changefreq = 'yearly';
      const slug = urlPath.replace('/portfolio/', '');
      const d = portfolioLastmods[slug];
      lastmod = d ? new Date(d).toISOString() : PORTFOLIO_FALLBACK_LASTMOD;
    }

    return {
      loc,
      changefreq,
      priority,
      lastmod,
      ...(images ? { images } : {}),
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  // Inject dynamic tag routes (next-sitemap can't discover GSPaths).
  // Single-post tags are noindex'd at runtime — skip them here too.
  additionalPaths: async () =>
    Object.entries(tagLastmods)
      .filter(([, v]) => v.count >= 2)
      .map(([tag, v]) => ({
        loc: `/blog/tag/${tag}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: v.lastmod,
      })),

  // Advanced robots.txt configuration
  robotsTxtOptions: {
    // Explicit allow for AI search/assistant crawlers so a future `*` rule
    // can't silently block them; the site wants to be cited.
    policies: [
      '*',
      'GPTBot',
      'OAI-SearchBot',
      'ChatGPT-User',
      'ClaudeBot',
      'Claude-SearchBot',
      'Claude-User',
      'PerplexityBot',
      'Perplexity-User',
      'Google-Extended',
      'Applebot',
      'Applebot-Extended',
      'Bingbot',
      'DuckAssistBot',
      'meta-externalagent',
      'Amazonbot',
      'MistralAI-User',
      'CCBot',
    ].map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] })),
    additionalSitemaps: [
      // You can add separate sitemaps here if needed
      // `${process.env.SITE_URL || 'https://www.grizzlybit.dev'}/blog-sitemap.xml`,
      // `${process.env.SITE_URL || 'https://www.grizzlybit.dev'}/portfolio-sitemap.xml`,
    ],
  },
};
