
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
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
      className="pt-20 min-h-screen"
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="tag mb-3">Our Work</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-coffee-dark">Portfolio</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our past projects and discover how we've helped businesses achieve their digital goals.
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Placeholder for Portfolio page content */}
          <div className="text-center py-16">
            <p className="text-muted-foreground italic">Full Portfolio page content coming soon!</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
