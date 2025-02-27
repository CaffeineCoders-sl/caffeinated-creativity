
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu, X } from 'lucide-react';

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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-100 transition-all duration-300 group-hover:shadow-lg">
              <img 
                src="/lovable-uploads/5c9e8331-194f-4d58-8b01-bb4dbb6018a7.png" 
                alt="CaffeineCoders Logo" 
                className="w-full h-full object-cover scale-[0.7] transform group-hover:scale-[0.75] transition-transform duration-300"
              />
            </div>
            <span className="text-xl font-bold tracking-tight inline-flex">
              <span className="text-secondary">Caffeine</span>
              <span className="text-black">Coders</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <Link 
              to="/contact" 
              className="ml-4 btn-secondary button-shine flex items-center space-x-2"
            >
              <Coffee size={18} />
              <span>Let's Talk</span>
            </Link>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
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
            <NavLink to="/" className="px-4 py-3">Home</NavLink>
            <NavLink to="/about" className="px-4 py-3">About</NavLink>
            <NavLink to="/services" className="px-4 py-3">Services</NavLink>
            <NavLink to="/portfolio" className="px-4 py-3">Portfolio</NavLink>
            <NavLink to="/contact" className="px-4 py-3">Contact</NavLink>
            <Link 
              to="/contact" 
              className="mt-4 btn-secondary w-full flex justify-center items-center space-x-2"
            >
              <Coffee size={18} />
              <span>Let's Talk</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
