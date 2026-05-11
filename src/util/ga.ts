import GA4React from 'ga-4-react';
import Router from 'next/router';

let ga4react: GA4React | null = null;

export async function init(G: string) {
  if (!GA4React.isInitialized() && G && process.browser) {
    ga4react = new GA4React(G, { debug_mode: !process.env.production });

    try {
      await ga4react.initialize();

      logPageViews();
    } catch (error) {
      console.error(error);
    }
  }
}

function logPageView() {
  if (ga4react) ga4react.pageview(window.location.pathname);
}

function logPageViews() {
  console.log('logPageViews');
  logPageView();

  Router.events.on('routeChangeComplete', () => {
    console.log('Rou changed');
    logPageView();
  });
}

export function logEvent(action: string, label: string, category: string) {
  if (ga4react) ga4react.event(action, label, category);
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  const clean: EventParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') clean[k] = v;
  }
  window.gtag('event', name, clean);
}
