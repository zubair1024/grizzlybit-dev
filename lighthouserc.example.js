/**
 * Lighthouse CI Configuration
 *
 * Setup Instructions:
 * 1. Install Lighthouse CI: npm install -g @lhci/cli
 * 2. Rename this file to lighthouserc.js
 * 3. Add to your CI/CD pipeline: lhci autorun
 * 4. Configure your CI environment variables if using LHCI server
 *
 * For more information: https://github.com/GoogleChrome/lighthouse-ci
 */

module.exports = {
  ci: {
    // Collect configuration
    collect: {
      // Number of runs to perform for each URL (median of runs is used)
      numberOfRuns: 3,

      // URLs to audit
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/blog',
        'http://localhost:3000/portfolio/covid-tracker',
      ],

      // Start a local server before collecting (optional)
      // startServerCommand: 'npm run start',
      // startServerReadyPattern: 'ready on',

      // Settings passed to Lighthouse
      settings: {
        preset: 'desktop', // or 'mobile'
        // throttling: {
        //   rttMs: 40,
        //   throughputKbps: 10 * 1024,
        //   cpuSlowdownMultiplier: 1,
        // },
      },
    },

    // Assert configuration - set performance budgets
    assert: {
      assertions: {
        // Category scores (0-1)
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'interactive': ['warn', { maxNumericValue: 3800 }],

        // Resource budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 500000 }], // 500KB
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 100000 }], // 100KB
        'resource-summary:image:size': ['warn', { maxNumericValue: 2000000 }], // 2MB
        'resource-summary:total:size': ['warn', { maxNumericValue: 3000000 }], // 3MB

        // Network requests
        'resource-summary:total:count': ['warn', { maxNumericValue: 50 }],
      },
    },

    // Upload configuration (optional - requires LHCI server)
    // upload: {
    //   target: 'lhci',
    //   serverBaseUrl: 'https://your-lhci-server.com',
    //   token: process.env.LHCI_TOKEN,
    // },

    // Or upload to Temporary Public Storage (for debugging)
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
