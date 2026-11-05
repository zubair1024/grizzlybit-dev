import { motion } from 'motion/react';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:border-2 focus:border-border focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <motion.div
        // Fades in on client navigations only; _app's AnimatePresence
        // initial={false} keeps the first (server) render fully visible.
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Header></Header>
        <div className="antialiased">{props.children}</div>
        <Footer></Footer>
      </motion.div>
    </>
  );
};

export default Layout;
