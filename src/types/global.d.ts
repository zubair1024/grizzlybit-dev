/**
 * Global type declarations for grizzlybit.dev
 */

/**
 * Google Analytics gtag function
 * Used for tracking events and Web Vitals
 */
interface Window {
  gtag?: (
    command: 'config' | 'event' | 'set',
    targetId: string,
    config?: Record<string, any>
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
      config?: Record<string, any>
    ) => void;
  }
}

export {};
