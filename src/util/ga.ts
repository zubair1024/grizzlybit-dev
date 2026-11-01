import Router from 'next/router';

let initialized = false;

// Standard gtag.js bootstrap, plus explicit page_view events on route change
export function init(G: string) {
  if (typeof window === 'undefined' || initialized || !G) return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  // page_view is sent explicitly by logPageViews; any debug_mode value enables debug mode
  window.gtag('config', G, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${G}`;
  document.head.appendChild(script);
  logPageViews();
}

function logPageView() {
  window.gtag?.('event', 'page_view', {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function logPageViews() {
  logPageView();
  Router.events.on('routeChangeComplete', logPageView);
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
