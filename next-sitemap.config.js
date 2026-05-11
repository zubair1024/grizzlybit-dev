const fs = require('fs');
const path = require('path');

// Read MDX frontmatter once at sitemap generation
const postsDir = path.join(process.cwd(), 'src/posts');
const tagToSlug = (t) =>
  t
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const { postLastmods, tagLastmods } = (() => {
  const posts = {};
  const tags = {};
  try {
    for (const f of fs.readdirSync(postsDir)) {
      const slug = f.replace(/\.mdx$/, '');
      const src = fs.readFileSync(path.join(postsDir, f), 'utf8');
      const lm = src.match(/lastModified:\s*['"]?([^\n'"]+)/);
      const pub = src.match(/publishedAt:\s*['"]?([^\n'"]+)/);
      const fileMtime = fs
        .statSync(path.join(postsDir, f))
        .mtime.toISOString();
      const iso = new Date(
        (lm && lm[1].trim()) || (pub && pub[1].trim()) || fileMtime,
      ).toISOString();
      posts[slug] = iso;

      const kwBlock = src.match(/keywords:\s*\n((?:\s+-\s+.+\n?)+)/);
      if (kwBlock) {
        for (const line of kwBlock[1].split('\n')) {
          const m = line.match(/^\s+-\s+(.+?)\s*$/);
          if (!m) continue;
          const raw = m[1].replace(/^['"]|['"]$/g, '');
          const ts = tagToSlug(raw);
          if (!ts) continue;
          if (!tags[ts]) tags[ts] = { lastmod: iso, count: 0 };
          tags[ts].count += 1;
          if (tags[ts].lastmod < iso) tags[ts].lastmod = iso;
        }
      }
    }
  } catch (e) {
    /* sitemap proceeds with defaults */
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
      loc: urlPath,
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
