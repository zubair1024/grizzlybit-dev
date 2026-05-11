import { motion } from 'framer-motion';
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-brand-glow focus:text-black focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <Header></Header>
        <div className="antialiased">{props.children}</div>
        <Footer></Footer>
      </motion.div>
    </>
  );
};

export default Layout;
