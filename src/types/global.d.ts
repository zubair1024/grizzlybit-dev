/**
 * Global type declarations for grizzlybit.dev
 */

/**
 * Google Analytics gtag function
 * Used for tracking events and Web Vitals
 */
interface GtagConfig {
  value?: number;
  event_label?: string;
  non_interaction?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  gtag?: (
    command: 'config' | 'event' | 'set',
    targetId: string,
    config?: GtagConfig
  ) => void;
}

/**
 * Extend the global namespace if needed
 */
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: GtagConfig
    ) => void;
  }
}

export {};
