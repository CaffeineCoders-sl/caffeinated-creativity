import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const NavbarWithRouterIntegration = () => {
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if current page has dark background
  useEffect(() => {
    // Services page and Contact page both have dark hero sections
    setIsDarkBackground(location.pathname === '/services' || location.pathname === '/contact');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Call once on mount to set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return <Navbar isDarkBackground={isDarkBackground} isScrolled={isScrolled} />;
};

export default NavbarWithRouterIntegration;
