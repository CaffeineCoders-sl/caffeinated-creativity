import React, { createContext, useContext, useState, useEffect } from 'react';

// Valid category values
type ServiceCategory = 'all' | 'web' | 'data' | 'ai' | 'marketing' | 'design';

interface ServiceCategoryContextType {
  activeCategory: ServiceCategory;
  setActiveCategory: (category: ServiceCategory) => void;
  previousCategory: ServiceCategory;
  isChanging: boolean;
}

// Create the context with better default values
const ServiceCategoryContext = createContext<ServiceCategoryContextType>({
  activeCategory: 'all',
  setActiveCategory: () => console.warn('ServiceCategoryProvider not found'),
  previousCategory: 'all',
  isChanging: false
});

export const ServiceCategoryProvider: React.FC<{ 
  children: React.ReactNode,
  initialCategory?: ServiceCategory
}> = ({ children, initialCategory = 'all' }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(initialCategory);
  const [previousCategory, setPreviousCategory] = useState<ServiceCategory>(initialCategory);
  const [isChanging, setIsChanging] = useState(false);
  
  // Debug effect to log category changes
  useEffect(() => {
    console.log('ServiceCategoryContext: Category changed from', previousCategory, 'to', activeCategory);
  }, [activeCategory, previousCategory]);

  const handleCategoryChange = (category: ServiceCategory) => {
    // Force this to run even if category is the same - could help with stuck filters
    console.log('ServiceCategoryContext: Setting category to', category);
    
    // Remember the current scroll position
    const scrollPosition = window.scrollY;
    
    setPreviousCategory(activeCategory);
    setActiveCategory(category);
    setIsChanging(true);
    
    // Reset changing state after animation completes
    setTimeout(() => setIsChanging(false), 600);
    
    // Dispatch a more broadly detectable event
    window.dispatchEvent(new CustomEvent('serviceCategoryChanged', { 
      detail: { 
        category, 
        previousCategory: activeCategory,
        scrollPosition // Pass the scroll position in the event
      }
    }));
    
    // Store the last category in localStorage for persistence
    try {
      localStorage.setItem('lastServiceCategory', category);
    } catch (e) {
      // Ignore storage errors
    }
    
    // Prevent automatic scroll to top - maintain user's position
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
      });
    }, 50);
  };
  
  // Initialize from localStorage if available
  useEffect(() => {
    try {
      const savedCategory = localStorage.getItem('lastServiceCategory') as ServiceCategory;
      if (savedCategory && ['all', 'web', 'data', 'ai', 'marketing', 'design'].includes(savedCategory)) {
        setActiveCategory(savedCategory);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);
  
  const contextValue = {
    activeCategory,
    setActiveCategory: handleCategoryChange,
    previousCategory,
    isChanging
  };
  
  return (
    <ServiceCategoryContext.Provider value={contextValue}>
      {children}
    </ServiceCategoryContext.Provider>
  );
};

// Custom hook with better error handling
export const useServiceCategory = (): ServiceCategoryContextType => {
  const context = useContext(ServiceCategoryContext);
  
  // Context is now initialized with default values, so we don't need to throw an error
  return context;
};
