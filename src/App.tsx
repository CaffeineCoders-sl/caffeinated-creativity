import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';

// Import components
import Navbar from "./components/Navbar";
import NavbarWithRouterIntegration from "./components/NavbarWithRouterIntegration"; // Add this import
import Footer from "./components/Footer";

// Import pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";

// Import context providers
import { ServiceCategoryProvider } from './contexts/ServiceCategoryContext';

// Import UI components if they exist, otherwise comment them out
const Toaster = () => <div id="toaster-placeholder"></div>;
const Sonner = () => <div id="sonner-placeholder"></div>;
const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;



const queryClient = new QueryClient();

// Main App component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toaster components - comment these out if they cause issues */}
        <Toaster />
        <Sonner />
        
        <Router>
          <ServiceCategoryProvider>
            <AppContent />
          </ServiceCategoryProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Separate component that uses router hooks - must be inside Router context
const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWithRouterIntegration />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      
      {/* Add debug component only in development */}
    
    </div>
  );
};

export default App;
