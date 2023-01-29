import { motion } from 'framer-motion';
import Footer from './Footer';
import Header from './Header';

interface ILayoutProps {
  children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
  return (
    <>
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
