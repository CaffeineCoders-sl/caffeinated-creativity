import React from 'react';
import { motion } from 'framer-motion';

const BlogPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white pt-20"
    >
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">Our Blog</h1>
            <p className="text-xl text-gray-300 mb-8">
              Insights, tutorials, and updates from our team of experts
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-gray-600">
                Blog content coming soon! We're working on creating valuable articles and resources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;
