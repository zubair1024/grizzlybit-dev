/**
 * Global type declarations for grizzlybit.dev
 */

declare global {
  interface Window {
    /** Google Analytics gtag.js, bootstrapped in src/util/ga.ts */
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
