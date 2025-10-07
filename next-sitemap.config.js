/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.grizzlybit.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.5,

  // Exclude API routes and admin paths from sitemap
  exclude: ['/api/*', '/server-sitemap.xml'],

  // Additional sitemap configuration for separate blog and portfolio sitemaps
  additionalPaths: async (config) => {
    const result = [];

    // You can add dynamic routes here if needed
    // For now, we'll let Next.js handle blog routes automatically

    return result;
  },

  // Transform function to customize each URL entry
  transform: async (config, path) => {
    // Default values
    let priority = 0.5;
    let changefreq = 'weekly';

    // Homepage
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    }
    // Blog listing page
    else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    }
    // Individual blog posts
    else if (path.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Portfolio pages
    else if (path.startsWith('/portfolio')) {
      priority = 0.7;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

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
