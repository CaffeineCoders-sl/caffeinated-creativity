import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code, Brain, Database, Camera, Layout } from 'lucide-react';
import { useServiceCategory } from '../contexts/ServiceCategoryContext';

type CategoryId = 'all' | 'web' | 'ai' | 'data' | 'design' | 'marketing';

const ServiceFilter: React.FC = () => {
  const { activeCategory, setActiveCategory, isChanging } = useServiceCategory();
  
  const serviceCategories: { id: CategoryId, name: string, icon: React.ReactNode }[] = [
      { id: 'all', name: 'All Services', icon: <Globe size={16} /> },
      { id: 'web', name: 'Web & Mobile', icon: <Code size={16} /> }, 
      { id: 'ai', name: 'AI & ML', icon: <Brain size={16} /> },
      { id: 'data', name: 'Data Services', icon: <Database size={16} /> },
      { id: 'design', name: 'Design', icon: <Camera size={16} /> },
      { id: 'marketing', name: 'Marketing', icon: <Layout size={16} /> }
    ];

  const handleCategoryClick = (e: React.MouseEvent, categoryId: CategoryId) => {
    // Prevent the default behavior which might cause page scroll
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Clicked category:", categoryId);
    
    // Remember the current scroll position
    const currentScrollPosition = window.scrollY;
    
    // Set the category
    setActiveCategory(categoryId);
    
    // Add visual feedback for the click
    const button = e.currentTarget;
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 300);
    
    // Restore the scroll position (do this after a small delay to ensure any layout shifts have completed)
    setTimeout(() => {
      window.scrollTo({
        top: currentScrollPosition,
        behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent visible scrolling
      });
    }, 10);
  };
  
  return (
    <motion.div 
      className="flex flex-wrap gap-3 justify-center mb-12"
      layout
    >
      {serviceCategories.map((category) => (
        <button
          key={category.id}
          data-category={category.id}
          onClick={(e) => handleCategoryClick(e, category.id)}
          className={`px-5 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
            activeCategory === category.id
              ? 'bg-black text-white shadow-md scale-105'
              : 'bg-black/5 text-black hover:bg-black/10'
          } filter-button`}
          aria-label={`Filter by ${category.name}`}
          aria-pressed={activeCategory === category.id}
          style={{ pointerEvents: 'auto' }} // Ensure clicks are registered
        >
          <span className={activeCategory === category.id ? 'scale-110 mr-2' : 'mr-2'}>
            {category.icon}
          </span>
          <span>{category.name}</span>
          
          {/* Visual feedback for selected category */}
          {activeCategory === category.id && (
            <motion.span 
              layoutId="categoryFilterDot"
              className="w-2 h-2 bg-white rounded-full ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
      
      {/* Add click effect styles */}
      <style>{`
        .filter-button {
          position: relative;
          overflow: hidden;
          /* Prevent focus outline which can cause layout shifts */
          outline: none;
        }
        
        .filter-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%, -50%);
          transform-origin: 50% 50%;
        }
        
        .filter-button.clicked::after {
          animation: ripple 0.6s ease-out;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 0.5;
          }
          100% {
            transform: scale(20, 20);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ServiceFilter;
