/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.grizzlybit.dev',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
