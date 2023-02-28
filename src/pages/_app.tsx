import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { init } from '../util/ga';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    init('G-ZD3BELKQE2');
    hotjar.initialize(3372547, 6);
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
