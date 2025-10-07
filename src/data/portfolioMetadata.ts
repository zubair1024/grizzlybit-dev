/**
 * Centralized SEO metadata for all portfolio pages
 * This file contains optimized titles, descriptions, and images for better search engine visibility
 */

export interface PortfolioMetadata {
  slug: string;
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string[];
}

export const portfolioMetadata: Record<string, PortfolioMetadata> = {
  'vehicle-tracking': {
    slug: 'vehicle-tracking',
    title: 'Vehicle Tracking Application - Fleet Management Solution',
    description:
      'Real-time vehicle tracking web application with GPS monitoring, maintenance scheduling, fuel tracking, and driver performance analytics. Built with React, Node.js, and Google Maps.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/razrtrack.jpg',
    keywords: [
      'vehicle tracking',
      'fleet management',
      'GPS tracking',
      'React',
      'Node.js',
      'real-time monitoring',
    ],
  },
  'vehicle-tracking-mobile': {
    slug: 'vehicle-tracking-mobile',
    title: 'Vehicle Tracking Mobile App - Real-Time Fleet Monitoring',
    description:
      'Mobile application for real-time vehicle tracking with push notifications, work order monitoring, and driver management. Built with Ionic and TypeScript for iOS and Android.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/razrtrack-mobile.jpg',
    keywords: [
      'mobile app',
      'vehicle tracking',
      'Ionic',
      'TypeScript',
      'fleet management',
      'work orders',
    ],
  },
  'covid-tracker': {
    slug: 'covid-tracker',
    title: 'COVID-19 Patient Health Tracking Mobile App',
    description:
      'Mobile health tracking app for COVID-19 patients with symptom logging, medication reminders, and BLE oxygen meter integration. Built with Ionic and Node.js.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/razrlibre.jpg',
    keywords: [
      'health tracking',
      'COVID-19',
      'mobile app',
      'Ionic',
      'patient monitoring',
      'BLE integration',
    ],
  },
  'my247-app': {
    slug: 'my247-app',
    title: 'My247 App - 24/7 Home Rescue Service Mobile Application',
    description:
      'Mobile app for 24/7 Home Rescue customers to make claims, book services, and manage home coverage plans. Built with Ionic and TypeScript.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/my247.jpg',
    keywords: [
      'home services',
      'mobile app',
      'Ionic',
      'boiler service',
      'customer service',
      'UK',
    ],
  },
  'mycarlo-app': {
    slug: 'mycarlo-app',
    title: 'MyCarlo - Consumer Vehicle Tracking & Safety Mobile App',
    description:
      'Consumer vehicle tracking mobile app with GPS tracking, geofencing, crash detection, driving behavior analytics, and vehicle health monitoring. Available on iOS and Android.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/mycarlo-banner-main.jpg',
    keywords: [
      'vehicle tracking',
      'consumer app',
      'GPS',
      'geofencing',
      'crash detection',
      'Ionic',
    ],
  },
  'boiler-mobile': {
    slug: 'boiler-mobile',
    title: 'Smart Boiler Control - Remote Thermostat Mobile App',
    description:
      'Smart home mobile app for remote thermostat and boiler control with scheduling, energy monitoring, and temperature management. Built with Ionic and TypeScript.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/razrboiler.jpg',
    keywords: [
      'smart home',
      'thermostat control',
      'IoT',
      'mobile app',
      'energy monitoring',
      'Ionic',
    ],
  },
  'he-app': {
    slug: 'he-app',
    title: 'Heavy Equipment Monitoring System - Construction IoT Platform',
    description:
      'Real-time monitoring system for heavy equipment and gensets in construction with maintenance tracking, alerts, and remote control. Built with React and Node.js.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/he.jpg',
    keywords: [
      'heavy equipment',
      'IoT monitoring',
      'construction',
      'React',
      'genset monitoring',
      'maintenance tracking',
    ],
  },
  'worldly-pins': {
    slug: 'worldly-pins',
    title: 'Worldly Pins - Travel Tracking Web App for Explorers',
    description:
      'Interactive travel tracking web app to mark visited countries and cities on a map. Built with Next.js, TypeScript, Postgres, and Prisma.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/worldlypins.jpg',
    keywords: [
      'travel app',
      'Next.js',
      'TypeScript',
      'Postgres',
      'Prisma',
      'map visualization',
    ],
  },
  'tools-grizzly': {
    slug: 'tools-grizzly',
    title: 'Grizzly Developer Tools - Online Utilities for Developers',
    description:
      'Collection of online developer tools and utilities for quick tasks. Built with Next.js and TypeScript. Visit tools.grizzlybit.dev',
    ogImage: 'https://www.grizzlybit.dev/portfolio/gizzly-tools.jpg',
    keywords: [
      'developer tools',
      'Next.js',
      'TypeScript',
      'web utilities',
      'online tools',
    ],
  },
  'tis-landing-page': {
    slug: 'tis-landing-page',
    title: 'TIS - Thermal Insulation Solutions Landing Page',
    description:
      'Modern landing page for thermal insulation cladding solutions company in Dubai. Built with Next.js, TypeScript, and React.',
    ogImage: 'https://www.grizzlybit.dev/portfolio/tis.jpg',
    keywords: [
      'landing page',
      'Next.js',
      'construction',
      'thermal insulation',
      'Dubai',
      'web design',
    ],
  },
};

/**
 * Get metadata for a specific portfolio item by slug
 */
export const getPortfolioMetadata = (slug: string): PortfolioMetadata => {
  return (
    portfolioMetadata[slug] || {
      slug,
      title: 'Portfolio Project - Grizzlybit',
      description: 'View this portfolio project by Grizzlybit.',
    }
  );
};

/**
 * Get canonical URL for a portfolio page
 */
export const getPortfolioCanonicalUrl = (slug: string): string => {
  return `https://www.grizzlybit.dev/portfolio/${slug}`;
};
