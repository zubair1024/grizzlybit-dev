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
