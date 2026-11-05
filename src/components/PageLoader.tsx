import BrutalistDeckLoader from '@/components/ui/brutalist-deck-loader';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Only surfaces when loading is actually slow, so fast loads never flash it.
const DELAY_MS = 400;

// Client-only overlay: never in the server HTML, so crawlers and the first
// paint see the page itself. Shows for slow route changes and for a first
// load that hasn't reached window `load` (images, fonts) after DELAY_MS.
export default function PageLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setLoading(true), DELAY_MS);
    };
    const done = () => {
      clearTimeout(timer);
      setLoading(false);
    };

    if (document.readyState !== 'complete') {
      start();
      window.addEventListener('load', done, { once: true });
    }
    // Hash-only navigations don't fire routeChangeStart.
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', done);
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router.events]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-[100]"
        >
          <BrutalistDeckLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
