import React from 'react';
import { useServiceCategory } from '../contexts/ServiceCategoryContext';

const ServiceCategoryDebug: React.FC = () => {
  const { activeCategory, setActiveCategory } = useServiceCategory();
  
  // Test categories that can be set directly
  const testCategories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web' }, 
    { id: 'ai', name: 'AI' },
    { id: 'data', name: 'Data' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' }
  ];
  
  // Force set the category directly
  const forceSetCategory = (category: string) => {
    console.log("Forcing category to:", category);
    setActiveCategory(category as any);
  };
  
  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg shadow-lg text-xs max-w-xs">
      <div className="mb-2">
        <strong>Service Category Debug:</strong> {activeCategory}
      </div>
      <div className="flex flex-wrap gap-1">
        {testCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => forceSetCategory(cat.id)}
            className={`px-2 py-1 rounded ${
              activeCategory === cat.id ? 'bg-white text-black' : 'bg-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="mt-2 opacity-70">
        Click buttons to force category change
      </div>
    </div>
  );
};

export default ServiceCategoryDebug;
