
import { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
    </motion.div>
  );
};

export default Index;
