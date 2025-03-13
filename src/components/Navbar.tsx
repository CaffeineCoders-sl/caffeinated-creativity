import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavLink = ({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (location.pathname === '/' && to === '/');
  
  return (
    <Link 
      to={to} 
      className={`relative px-3 py-2 rounded-md transition-all duration-300 hover:text-secondary
        ${isActive ? 'text-secondary font-medium' : 'text-gray-800'} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <span className="absolute inset-0 bg-secondary/10 rounded-md -z-0"></span>
      )}
    </Link>
  );
};

interface NavbarProps {
  isDarkBackground?: boolean;
  isScrolled?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkBackground = false, isScrolled = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Color adjustments for dark background
  const textColor = (isDarkBackground && !isScrolled) ? 'text-white' : 'text-black';
  const logoTextColor = (isDarkBackground && !isScrolled) 
    ? 'text-white dark:text-white' 
    : 'text-secondary';
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Text Only */}
          <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 transition-all duration-300 group-hover:shadow-lg border border-gray-200">
                <img 
                  src="/lovable-uploads/5c9e8331-194f-4d58-8b01-bb4dbb6018a7.png" 
                  alt="CaffeineCoders Logo" 
                  className="w-full h-full object-cover scale-[0.7] transform group-hover:scale-[0.75] transition-transform duration-300"
                />
              </div>
            <span className={`text-xl font-bold tracking-tight ${textColor}`}>
              <span className={logoTextColor}>Caffeine</span>
              <span>Coders</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`relative px-3 py-2 rounded-md transition-all duration-300 
                  ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) 
                    ? 'font-medium' : ''} 
                  ${isDarkBackground && !isScrolled 
                    ? 'text-white hover:text-white/80' 
                    : 'text-gray-800 hover:text-black'}`}
              >
                {item}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className={`ml-4 px-6 py-2 rounded-full ${
                isDarkBackground && !isScrolled
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/90'
              } transition-all`}
            >
              Let's Talk
            </Link>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-md transition-colors focus:outline-none ${
              isDarkBackground && !isScrolled 
                ? 'text-white hover:bg-white/10' 
                : 'text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md animate-fade-in">
          <nav className="flex flex-col space-y-2 p-4 max-w-7xl mx-auto">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="px-4 py-3 text-gray-800 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="mt-4 bg-black text-white px-6 py-3 rounded-full flex justify-center items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Let's Talk</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
