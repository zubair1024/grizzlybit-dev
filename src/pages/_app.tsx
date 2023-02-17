import GoogleAnalytics from '@/components/GoogleAnalytics';
import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics></GoogleAnalytics>
      <div data-theme="halloween">
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </div>
    </>
  );
}
