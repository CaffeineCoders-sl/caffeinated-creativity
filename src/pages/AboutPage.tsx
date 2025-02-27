
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
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
          <div className="tag mb-3">Our Story</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-coffee-dark">CaffeineCoders</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know the team behind the code and discover our journey from humble beginnings to industry excellence.
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Placeholder for About page content */}
          <div className="text-center py-16">
            <p className="text-muted-foreground italic">Full About page content coming soon!</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
