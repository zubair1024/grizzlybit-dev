import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { init } from '../util/ga';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init('G-ZD3BELKQE2');
  }, []);

  return (
    <>
      <div data-theme="halloween">
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </div>
    </>
  );
}
