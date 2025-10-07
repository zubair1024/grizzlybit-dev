/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Enable compression
  compress: true,

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'www.youtube.com', // For embedded YouTube videos
    ],
  },

  // Security and SEO headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
