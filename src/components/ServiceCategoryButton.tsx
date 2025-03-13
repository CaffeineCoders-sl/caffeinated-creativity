import React from 'react';
import { motion } from 'framer-motion';
import { useServiceCategory } from '../contexts/ServiceCategoryContext';

interface ServiceCategoryButtonProps {
  category: string;
  name: string;
  icon: React.ReactNode;
}

const ServiceCategoryButton: React.FC<ServiceCategoryButtonProps> = ({ 
  category, 
  name, 
  icon 
}) => {
  const { activeCategory, setActiveCategory } = useServiceCategory();
  const isActive = activeCategory === category;
  
  return (
    <button
      onClick={() => setActiveCategory(category)}
      className={`px-5 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
        isActive
          ? 'bg-black text-white shadow-md scale-105'
          : 'bg-black/5 text-black hover:bg-black/10'
      }`}
      aria-label={`Filter by ${name}`}
      aria-pressed={isActive}
    >
      <span className={isActive ? 'scale-110' : ''}>
        {icon}
      </span>
      <span>{name}</span>
      
      {/* Visual feedback for selected category */}
      {isActive && (
        <motion.span 
          layoutId="categoryDot"
          className="w-2 h-2 bg-white rounded-full ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
};

export default ServiceCategoryButton;
