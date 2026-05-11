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

const { postLastmods, tagLastmods } = (() => {
  const posts = {};
  const tags = {};
  let files = [];
  try {
    files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
  } catch (e) {
    console.warn('[sitemap] posts dir unreadable:', e.message);
    return { postLastmods: posts, tagLastmods: tags };
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
    const iso = Number.isNaN(d.getTime())
      ? fileMtime
      : d.toISOString();
    posts[slug] = iso;

    const kws = Array.isArray(data.keywords) ? data.keywords : [];
    for (const raw of kws) {
      const ts = tagToSlug(raw);
      if (!ts) continue;
      if (!tags[ts]) tags[ts] = { lastmod: iso, count: 0 };
      tags[ts].count += 1;
      if (tags[ts].lastmod < iso) tags[ts].lastmod = iso;
    }
  }
  return { postLastmods: posts, tagLastmods: tags };
})();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.grizzlybit.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.5,
  autoLastmod: true,

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
    let lastmod = new Date().toISOString();
    // Normalize so sitemap homepage <loc> matches canonical (trailing slash)
    let loc = urlPath === '/' ? '/' : urlPath;

    if (urlPath === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (urlPath === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
      // Newest post drives blog index freshness
      const newest = Object.values(postLastmods).sort().pop();
      if (newest) lastmod = newest;
    } else if (urlPath.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'monthly';
      const slug = urlPath.replace('/blog/', '');
      if (postLastmods[slug]) lastmod = postLastmods[slug];
    } else if (urlPath.startsWith('/blog/tag/')) {
      priority = 0.6;
      changefreq = 'weekly';
      const tag = urlPath.replace('/blog/tag/', '');
      // Skip thin tag pages (single post) to align with runtime noindex
      if (!tagLastmods[tag] || tagLastmods[tag].count < 2) return null;
      lastmod = tagLastmods[tag].lastmod;
    } else if (urlPath.startsWith('/portfolio')) {
      priority = 0.7;
      changefreq = 'yearly';
    }

    return {
      loc,
      changefreq,
      priority,
      lastmod,
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
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/*'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/*'],
        crawlDelay: 1,
      },
    ],
    additionalSitemaps: [
      // You can add separate sitemaps here if needed
      // `${process.env.SITE_URL || 'https://www.grizzlybit.dev'}/blog-sitemap.xml`,
      // `${process.env.SITE_URL || 'https://www.grizzlybit.dev'}/portfolio-sitemap.xml`,
    ],
  },
};
