import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-all"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
