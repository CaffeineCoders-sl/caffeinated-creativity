import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Layout, Smartphone, Database, TrendingUp, Shield,
  Brain, Bot, LineChart, Camera, AlertTriangle, FileText, 
  Zap, Mic, MessageSquare, Heart, Globe, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useServiceCategory } from '../contexts/ServiceCategoryContext';
import ServiceFilter from './ServiceFilter';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  color: string;
  category: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, benefits, color, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      className="relative h-[420px] w-full perspective"
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-white border border-black/10 rounded-lg overflow-hidden shadow-lg p-8">
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-black/5 rounded-full text-black/70">
              {category}
            </span>
          </div>
          
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6`} style={{ backgroundColor: `${color}20`, color }}>
            {icon}
          </div>
          
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <motion.ul 
            className="space-y-3"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
          >
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <motion.span 
                  className="mr-2 mt-1 text-black"
                  initial={{ scale: 1 }}
                  animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >•</motion.span>
                {feature}
              </li>
            ))}
          </motion.ul>
          
          <div className="absolute bottom-6 left-8 right-8 flex justify-between items-center">
            <button
              onClick={() => setIsFlipped(true)}
              className="text-sm font-medium text-black hover:underline"
            >
              View benefits
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                to="/contact" 
                className="inline-flex items-center font-medium text-black group"
              >
                Get a quote
                <span className={`ml-2 group-hover:ml-3 transition-all`} style={{ color }}>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotateY-180 bg-white border border-black/10 rounded-lg overflow-hidden shadow-lg p-8">
          <h4 className="text-xl font-bold mb-6">Key Benefits</h4>
          
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/5 text-black mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute bottom-6 left-8 text-sm font-medium text-black hover:underline"
          >
            Back to details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ServicesProps {
  initialCategory?: string;
  showFilter?: boolean;
}

const Services = ({ initialCategory = 'all', showFilter = true }: ServicesProps) => {
  // Use the context values directly
  const { activeCategory, previousCategory, isChanging, setActiveCategory } = useServiceCategory();
  const [spotlightService, setSpotlightService] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Initialize with props if provided
  useEffect(() => {
    // Only update the context if initialCategory is different and valid
    if (initialCategory && initialCategory !== activeCategory) {
      console.log("Initializing category to:", initialCategory);
      setActiveCategory(initialCategory as any);
    }
  }, [initialCategory, activeCategory, setActiveCategory]);

  // Add direct event listener for category changes with scroll position handling
  useEffect(() => {
    const handleCategoryChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log("Services received category change event:", customEvent.detail.category);
      
      // Force a component update
      setForceUpdate(prev => prev + 1);
      
      // Get the scroll position from the event if available
      if (customEvent.detail.scrollPosition !== undefined) {
        // Restore the scroll position with a slight delay to ensure UI has updated
        setTimeout(() => {
          window.scrollTo({
            top: customEvent.detail.scrollPosition,
            behavior: 'auto'
          });
        }, 10);
      }
    };
    
    window.addEventListener('serviceCategoryChanged', handleCategoryChange);
    return () => {
      window.removeEventListener('serviceCategoryChanged', handleCategoryChange);
    };
  }, []);

  // Fix for the ServicesPage direct category buttons
  useEffect(() => {
    // Instead of scrolling to services section on mount, let user stay where they are
    if (initialCategory && initialCategory !== activeCategory) {
      // Remember current scroll position before setting category
      const currentScroll = window.scrollY;
      
      console.log("Initializing category to:", initialCategory);
      setActiveCategory(initialCategory as any);
      
      // Restore scroll position after a short delay
      setTimeout(() => {
        window.scrollTo({
          top: currentScroll,
          behavior: 'auto'
        });
      }, 10);
    }
  }, [initialCategory, activeCategory, setActiveCategory]);

  // Define categories
  const categories = [
    { id: 'all', name: 'All Services', icon: <Globe size={16} /> },
    { id: 'web', name: 'Web & Mobile', icon: <Code size={16} /> }, 
    { id: 'data', name: 'Data & Backend', icon: <Database size={16} /> },
    { id: 'ai', name: 'AI & ML', icon: <Brain size={16} /> },
    { id: 'marketing', name: 'Marketing & Design', icon: <Layout size={16} /> }
  ];
  
  // Define services - MOVED UP before filteredServices is called
  const services = [
    {
      icon: <Code size={24} />,
      title: "Web Development",
      description: "Create stunning, responsive websites built on modern frameworks that captivate your audience.",
      features: ["Custom web applications", "E-commerce solutions", "Progressive web apps", "Responsive design"],
      benefits: ["Enhanced user experience", "Increased conversion rates", "Better SEO performance", "Cross-platform compatibility"],
      color: "#000000",
      category: "web"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Development",
      description: "Build native and cross-platform mobile apps that deliver exceptional user experiences.",
      features: ["iOS and Android apps", "Cross-platform development", "UI/UX design", "App maintenance"],
      benefits: ["Reach users on their preferred devices", "High performance native experiences", "Consistent brand experience", "Offline functionality"],
      color: "#000000",
      category: "web"
    },
    {
      icon: <Database size={24} />,
      title: "Backend Solutions",
      description: "Develop robust backend systems and APIs that power your digital experiences.",
      features: ["API development", "Database design", "Cloud integration", "Performance optimization"],
      benefits: ["Scalable infrastructure", "Reliable data management", "Secure information handling", "Optimized performance"],
      color: "#000000",
      category: "data"
    },
    {
      icon: <Layout size={24} />,
      title: "UI/UX Design",
      description: "Create intuitive and beautiful user interfaces that enhance user experience.",
      features: ["Interface design", "User experience design", "Prototyping", "Design systems"],
      benefits: ["Increased user satisfaction", "Reduced learning curve", "Higher retention rates", "Consistent brand identity"],
      color: "#000000",
      category: "marketing"
    },
    {
      icon: <Brain size={24} />,
      title: "AI & Machine Learning",
      description: "Leverage the power of artificial intelligence to gain insights and automate processes.",
      features: ["Predictive analytics", "Natural language processing", "Computer vision", "AI consulting"],
      benefits: ["Data-driven decision making", "Process automation", "Personalized experiences", "Competitive advantage"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <Bot size={24} />,
      title: "Intelligent Chatbots",
      description: "Develop conversational agents using natural language processing to handle inquiries and tasks.",
      features: ["Customer service automation", "NLP implementation", "Multi-platform integration", "Conversational UI"],
      benefits: ["Reduced response times", "Improved customer satisfaction", "Cost savings in support operations", "24/7 availability"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <LineChart size={24} />,
      title: "Predictive Analytics",
      description: "Use ML algorithms to forecast trends such as customer behavior, sales performance, and more.",
      features: ["Customer churn prediction", "Sales forecasting", "Inventory management", "Risk assessment"],
      benefits: ["Data-driven decision-making", "Optimized resource allocation", "Proactive strategic planning", "Competitive advantage"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <Camera size={24} />,
      title: "Computer Vision",
      description: "Develop deep learning solutions for image recognition and object detection applications.",
      features: ["Image recognition", "Object detection", "Visual search", "Automated quality control"],
      benefits: ["Improved accuracy in visual tasks", "Reduced manual oversight", "New service offerings", "Enhanced automation"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Fraud Detection",
      description: "Leverage anomaly detection and pattern recognition to identify suspicious activities.",
      features: ["Transaction monitoring", "Anomaly detection", "Behavioral analysis", "Real-time alerting"],
      benefits: ["Enhanced security measures", "Reduced financial losses", "Increased trust among clients", "Regulatory compliance"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <FileText size={24} />,
      title: "Automated Data Processing",
      description: "Create ML-driven tools that automate data cleaning, integration, and analysis.",
      features: ["Data cleaning automation", "Information extraction", "Pattern recognition", "Data visualization"],
      benefits: ["Streamlined workflows", "Lower operational costs", "Faster decision-making", "Reduced human error"],
      color: "#000000",
      category: "data"
    },
    {
      icon: <Zap size={24} />,
      title: "AI-Driven Marketing",
      description: "Build systems that optimize digital ad targeting, content creation, and campaign management.",
      features: ["Ad targeting optimization", "Content personalization", "Campaign analytics", "Customer segmentation"],
      benefits: ["Higher ROI on marketing campaigns", "Effective audience targeting", "Better customer engagement", "Data-driven strategies"],
      color: "#000000",
      category: "marketing"
    },
    {
      icon: <Mic size={24} />,
      title: "Voice Recognition",
      description: "Develop applications for voice commands, transcription, and accessibility enhancements.",
      features: ["Speech-to-text conversion", "Voice commands", "Audio analysis", "Language processing"],
      benefits: ["Improved accessibility", "Enhanced user interfaces", "Hands-free operation", "New interaction paradigms"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Sentiment Analysis",
      description: "Utilize NLP to analyze social media, reviews, and feedback to gauge brand sentiment.",
      features: ["Social media monitoring", "Review analysis", "Brand sentiment tracking", "Customer feedback processing"],
      benefits: ["Real-time insights into customer attitudes", "Better crisis management", "Informed marketing strategies", "Customer satisfaction tracking"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <Heart size={24} />,
      title: "Healthcare Technology",
      description: "Apply machine learning for diagnostic imaging, patient data analysis, and health recommendations.",
      features: ["Medical image analysis", "Patient data processing", "Health recommendation systems", "Medical research assistance"],
      benefits: ["Improved diagnostic accuracy", "Personalized treatment plans", "Enhanced patient outcomes", "Efficient healthcare delivery"],
      color: "#000000",
      category: "ai"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Digital Marketing",
      description: "Boost your online presence with strategic digital marketing campaigns.",
      features: ["SEO optimization", "Content strategy", "Social media marketing", "Analytics & reporting"],
      benefits: ["Increased visibility", "Higher conversion rates", "Brand awareness", "Measurable results"],
      color: "#000000",
      category: "marketing"
    },
    {
      icon: <Shield size={24} />,
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security solutions and best practices.",
      features: ["Security audits", "Vulnerability assessment", "Data protection", "Compliance consulting"],
      benefits: ["Reduced security risks", "Protected sensitive data", "Regulatory compliance", "Customer trust"],
      color: "#000000",
      category: "data"
    }
  ];

  // AI service spotlight content - fixed the duplication issue
  const aiSpotlights = [
    {
      title: "Recommendation Engines",
      description: "Our machine learning models analyze user behavior and preferences to offer personalized product or content suggestions, increasing conversion rates and user engagement.",
      image: "/images/recommendation-engine.jpg",
      technologies: ["Neural Networks", "Collaborative Filtering", "Content-Based Filtering"]
    },
    {
      title: "Smart Chatbots",
      description: "We create intelligent conversational interfaces that understand natural language, providing 24/7 customer support, lead generation, and sales assistance for your business.",
      image: "/images/chatbot.jpg",
      technologies: ["NLP", "Intent Recognition", "Entity Extraction", "Dialog Management"]
    },
    {
      title: "Predictive Analytics",
      description: "Harness the power of your data with our predictive models that forecast trends, identify patterns, and provide actionable insights for better business decisions.",
      image: "/images/predictive-analytics.jpg",
      technologies: ["Regression Models", "Time Series Analysis", "Classification", "Anomaly Detection"]
    }
  ];

  // Improved filtering with animation trigger - force refresh on category change
  // Note: filteredServices is already declared above
  const filteredServices = React.useMemo(() => {
    console.log("Filtering services for category:", activeCategory);
    return activeCategory === 'all' 
      ? services 
      : services.filter(service => service.category === activeCategory);
  }, [activeCategory, forceUpdate]); // Added forceUpdate to dependencies

  return (
    <div className="bg-white" ref={rootRef}>
      {/* Add debug element to monitor state (remove in production) */}
      <div className="text-xs text-gray-400 text-center mb-2">
        Current category: {activeCategory} | Found {filteredServices.length} services
      </div>
      
      {/* AI spotlight section - only show for AI category or all categories */}
     
      {/* Services grid - improved with better transitions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Show filter if requested */}
          {showFilter && <ServiceFilter />}
          
          {/* Improved service grid with better transitions between categories */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
            key={activeCategory} // Forces re-render on category change
          >
            <AnimatePresence mode="wait">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        y: 20,
                        // Added directional animation based on previous category
                        x: previousCategory === 'all' ? 0 : 
                           categories.findIndex(c => c.id === previousCategory) > 
                           categories.findIndex(c => c.id === activeCategory) ? 30 : -30
                      },
                      show: { 
                        opacity: 1, 
                        y: 0,
                        x: 0,
                        transition: { duration: 0.5 } 
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -20, 
                      transition: { duration: 0.3 } 
                    }}
                    layout
                    className={isChanging ? 'animate-pulse-once' : ''}
                  >
                    <ServiceCard {...service} />
                  </motion.div>
                ))
              ) : (
                // Added "no results" state
                <motion.div
                  className="col-span-full text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-gray-500 mb-4">
                    <AlertTriangle size={48} className="mx-auto opacity-50" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No services found</h3>
                  <p className="text-gray-500">Try selecting a different category</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* CSS for 3D card flip effect - unchanged */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Services;
