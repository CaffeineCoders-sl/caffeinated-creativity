import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, Smartphone, Database, Brain, Bot, LineChart,
  Camera, AlertTriangle, FileText, Zap, ArrowRight,
  MessageSquare, Monitor, Coffee, Globe, ChevronDown,
  X, Check, Filter, PlusCircle, MinusCircle,
  Heart, Clock, DollarSign, Star, ThumbsUp, Settings,
  HelpCircle, Send, Bookmark, Info, ChevronUp,
  Lock, CreditCard, BarChart, Link2
} from 'lucide-react';
// Remove Search from the imports

import { useServiceCategory } from '../contexts/ServiceCategoryContext';
import ServiceFilter from '../components/ServiceFilter';
import InnovativeApproach from '../components/InnovativeApproach';
import Services from '../components/Services';

interface ComparisonItem {
  id: string;
  title: string;
  icon: JSX.Element;
}

const ServicesPage: React.FC = () => {
  // State variables
  const { activeCategory: activeTab, setActiveCategory } = useServiceCategory();
  const [isDarkBackground, setIsDarkBackground] = useState(true); // Initialize as true since hero section is black
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  // Remove these search-related state variables
  // const [searchTerm, setSearchTerm] = useState('');
  // const [showSearch, setShowSearch] = useState(false);
  const [showFAQ, setShowFAQ] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    {text: "Hi there! 👋 How can I help you with our services today?", sender: 'bot'}
  ]);
  const [chatInput, setChatInput] = useState('');
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs
  const textRef = useRef(null);
  const heroRef = useRef(null);
  // Remove the search input ref
  // const searchInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });
  const heroSectionRef = useRef<HTMLDivElement>(null);
  
  // For parallax effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  // Service categories
  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: <Globe size={16} /> },
    { id: 'web', name: 'Web & Mobile', icon: <Code size={16} /> }, 
    { id: 'ai', name: 'AI & ML', icon: <Brain size={16} /> },
    { id: 'data', name: 'Data Services', icon: <Database size={16} /> },
    { id: 'design', name: 'Design', icon: <Camera size={16} /> }
  ];

  // Featured services
  const featuredServices = [
    {
      id: "web-dev",
      title: "Web Development",
      icon: <Code size={32} strokeWidth={1.5} />,
      color: "from-indigo-600 to-blue-800",
      description: "Create stunning responsive websites and web applications with modern frameworks and technologies.",
      link: "/services/web-development",
      tags: ["React", "Node.js", "Responsive Design"],
      features: ["Responsive Design", "SEO Optimization", "High Performance", "CMS Integration"],
      price: "From $5,000",
      timeline: "4-8 weeks",
      benefits: ["Increased visibility", "Better user engagement", "Higher conversion rates"]
    },
    {
      id: "mobile-apps",
      title: "Mobile Applications",
      icon: <Smartphone size={32} strokeWidth={1.5} />,
      color: "from-emerald-500 to-teal-700",
      description: "Native and cross-platform mobile apps that deliver exceptional experiences to your customers.",
      link: "/services/mobile-development",
      tags: ["iOS", "Android", "React Native"],
      features: ["Cross-platform", "Native Performance", "Offline Mode", "Push Notifications"],
      price: "From $10,000",
      timeline: "8-12 weeks",
      benefits: ["Direct customer access", "Brand loyalty", "New revenue streams"]
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: <Brain size={32} strokeWidth={1.5} />,
      color: "from-violet-600 to-purple-800", 
      description: "Leverage the power of artificial intelligence to gain insights and automate processes.",
      link: "/services/ai-ml",
      tags: ["Neural Networks", "NLP", "Computer Vision"],
      features: ["Custom Algorithms", "Data Processing", "Model Training", "Deployment"],
      price: "From $15,000",
      timeline: "8-16 weeks",
      benefits: ["Business automation", "Predictive insights", "Competitive advantage"]
    },
    {
      id: "data-eng",
      title: "Data Engineering",
      icon: <Database size={32} strokeWidth={1.5} />,
      color: "from-amber-500 to-orange-700",
      description: "Build robust data pipelines and infrastructure to store, process, and analyze your data.",
      link: "/services/data-engineering",
      tags: ["Big Data", "ETL", "Data Lakes"],
      features: ["Data Warehousing", "ETL Pipelines", "Real-time Processing", "Visualization"],
      price: "From $12,000",
      timeline: "6-12 weeks",
      benefits: ["Data-driven decisions", "Centralized information", "Improved efficiency"]
    }
  ];

  // Innovative services
  const innovativeServices = [
    {
      title: "Recommendation Engines",
      icon: <Bot className="text-white" size={32} strokeWidth={1.5} />,
      description: "Our machine learning models analyze user behavior and preferences to offer personalized product or content suggestions, increasing conversion rates and user engagement.",
      stats: ["30% Higher engagement", "25% Increased sales", "Personalized experiences"],
      category: "ai"
    },
    {
      title: "Smart Chatbots",
      icon: <MessageSquare className="text-white" size={32} strokeWidth={1.5} />,
      description: "We create intelligent conversational interfaces that understand natural language, providing 24/7 customer support, lead generation, and sales assistance for your business.",
      stats: ["98% Customer satisfaction", "60% Reduced support costs", "24/7 Availability"],
      category: "ai"
    },
    {
      title: "Predictive Analytics",
      icon: <LineChart className="text-white" size={32} strokeWidth={1.5} />,
      description: "Forecast future trends and behaviors with our advanced machine learning models and data science expertise.",
      stats: ["95% Prediction accuracy", "40% Better decision making", "3x Faster insights"],
      category: "data"
    }
  ];

  // FAQs
  const faqs = [
    {
      id: 'faq1',
      question: "What technologies do you use for web development?",
      answer: "We leverage modern technologies like React, Angular, Vue.js, Node.js, and Next.js, tailored to your specific project needs. Our tech stack is regularly updated to ensure we're using the best tools for each job.",
      category: "web"
    },
    {
      id: 'faq2',
      question: "How long does it typically take to develop a mobile app?",
      answer: "Mobile app development typically takes 8-12 weeks from concept to launch, depending on complexity. Simple apps may be completed in 6-8 weeks, while complex applications with extensive features could take 4-6 months.",
      category: "web"
    },
    {
      id: 'faq3',
      question: "Do you provide AI model training with our own data?",
      answer: "Yes, we can train AI models using your proprietary data. Our team helps establish secure data pipelines, implement proper preprocessing, and develop models tailored specifically to your business needs and datasets.",
      category: "ai"
    },
    {
      id: 'faq4',
      question: "How do you handle data security in your projects?",
      answer: "Data security is paramount in all our projects. We implement encryption, secure authentication, regular security audits, and follow industry best practices like GDPR and CCPA compliance to ensure your data remains protected.",
      category: "data"
    },
    {
      id: 'faq5',
      question: "What support do you provide after project completion?",
      answer: "We offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and ongoing maintenance. We also provide various support packages tailored to your needs, from basic monitoring to full 24/7 support.",
      category: "all"
    }
  ];

  // Effect hooks
  useEffect(() => {
    // Scroll to top only when component first mounts
    const hasScrolled = sessionStorage.getItem('hasScrolledToServicesPage');
    if (!hasScrolled) {
      window.scrollTo(0, 0);
      sessionStorage.setItem('hasScrolledToServicesPage', 'true');
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check if navbar is over hero section
      if (heroSectionRef.current) {
        const heroBottom = heroSectionRef.current.getBoundingClientRect().bottom;
        // Assuming navbar height is around 80px (adjust as needed)
        const navbarOverHero = heroBottom > 80;
        setIsDarkBackground(navbarOverHero);
      }
    };
    
    // Initialize correct background state
    setIsDarkBackground(true);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when search is shown
  // useEffect(() => {
  //   if (showSearch && searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, [showSearch]);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Event handlers
  const scrollToContent = () => {
    const element = document.getElementById('services-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Remove the toggleSearch function
  // const toggleSearch = () => {
  //   setShowSearch(!showSearch);
  //   if (showSearch) {
  //     setSearchTerm('');
  //   }
  // };

  const toggleFAQ = (id: string) => {
    setShowFAQ(showFAQ === id ? null : id);
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (compareMode) {
      setComparisonItems([]);
      setShowComparisonTable(false);
    }
  };

  const toggleComparisonItem = (service: any) => {
    if (comparisonItems.find(item => item.id === service.id)) {
      setComparisonItems(comparisonItems.filter(item => item.id !== service.id));
    } else {
      if (comparisonItems.length < 3) {
        setComparisonItems([
          ...comparisonItems, 
          { 
            id: service.id, 
            title: service.title, 
            icon: service.icon 
          }
        ]);
      }
    }
  };

  const isInComparison = (serviceId: string) => {
    return comparisonItems.some(item => item.id === serviceId);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages([
      ...chatMessages,
      { text: chatInput, sender: 'user' }
    ]);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Thank you for your message! One of our service specialists will get back to you shortly.";
      
      // Simple keyword matching for demo purposes
      if (chatInput.toLowerCase().includes('price') || chatInput.toLowerCase().includes('cost')) {
        botResponse = "Our pricing varies based on project requirements. For web development, prices start at $5,000, mobile apps from $10,000, and AI solutions from $15,000. Would you like a custom quote?";
      } else if (chatInput.toLowerCase().includes('time') || chatInput.toLowerCase().includes('timeline')) {
        botResponse = "Project timelines depend on complexity. Typically, web projects take 4-8 weeks, mobile apps 8-12 weeks, and AI solutions 8-16 weeks.";
      } else if (chatInput.toLowerCase().includes('ai') || chatInput.toLowerCase().includes('machine learning')) {
        botResponse = "Our AI services include recommendation engines, predictive analytics, computer vision solutions, and natural language processing. What specific AI capability are you interested in?";
      }
      
      setChatMessages(prevMessages => [
        ...prevMessages,
        { text: botResponse, sender: 'bot' }
      ]);
    }, 1000);
    
    setChatInput('');
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId as any);
    
    // Scroll to services section
    const servicesSection = document.getElementById('services-content');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroCategoryClick = (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    
    // Capture current scroll position
    const currentPosition = window.scrollY;
    
    setActiveCategory(categoryId as any);
    
    // Update URL hash without scrolling
    window.history.replaceState(
      {}, 
      '', 
      `${window.location.pathname}${window.location.search}#${categoryId}`
    );
    
    // Restore scroll position
    setTimeout(() => {
      window.scrollTo({
        top: currentPosition,
        behavior: 'auto'
      });
    }, 10);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-main-component');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Remove Fixed Search Button */}
      
      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[100vh] flex items-center justify-center bg-black text-white overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 z-0 grid-lines"
          style={{ y, opacity }}
        ></motion.div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div 
            className="max-w-5xl mx-auto text-center space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="block">Our</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white">
                Services
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              From web development to AI solutions, we offer a comprehensive suite of digital services to transform your ideas into powerful, market-ready products.
            </motion.p>
            
            {/* Category buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="relative flex flex-wrap md:flex-nowrap gap-2 md:gap-4 justify-center bg-white/5 p-1 rounded-full backdrop-blur-sm border border-white/10">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={(e) => handleHeroCategoryClick(e, category.id)}
                    className={`px-4 md:px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 relative z-10 ${
                      activeTab === category.id
                        ? 'text-black'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    {category.name}
                    {activeTab === category.id && (
                      <motion.div
                        layoutId="categoryIndicator"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-16"
            >
              <button 
                onClick={scrollToServices}
                className="group inline-flex items-center px-10 py-5 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300 overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center tracking-wide">
                  View All Services
                  <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowRight size={20} />
                  </span>
                </span>
                <span className="absolute inset-0 z-0 button-shine"></span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8">Featured Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with creative thinking to deliver digital solutions that drive results.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                viewport={{ once: true, margin: "-50px" }}
                className="group h-[400px] relative"
                whileHover={{ y: compareMode ? 0 : -10 }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
              >
                <Link to={service.link} className="block h-full">
                  <motion.div 
                    className="bg-white rounded-2xl overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col relative z-10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-full h-32 bg-gradient-to-r ${service.color} p-8 flex justify-between items-start`}>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                        {service.tags[0]}
                      </div>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    <div className="flex-grow p-8">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-black/80 transition-colors">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="mt-auto flex items-center text-black font-medium">
                        <span>Learn more</span>
                        <motion.div
                          className="ml-2 w-4 h-4"
                          initial={false}
                          animate={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          <ArrowRight />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Component */}
      <div id="services-main-component" className="bg-white py-32 relative overflow-hidden" data-category={activeTab}>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center">Complete Service Offerings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              Explore our full range of services designed to help your business thrive in the digital landscape.
            </p>
          </motion.div>
          <ServiceFilter />
          <Services initialCategory={activeTab} showFilter={false} />
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="py-32 relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Ideas Into Reality?
            </motion.h2>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/contact" 
                className="group inline-flex items-center px-10 py-5 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center tracking-wide">
                  Get in Touch
                  <span className="ml-3 group-hover:ml-5 transition-all duration-300">
                    <ArrowRight size={20} />
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Debug indicator - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
          {isDarkBackground ? 'Dark BG' : 'Light BG'} | {isScrolled ? 'Scrolled' : 'Top'}
        </div>
      )}
      
      {/* Button shine effect */}
      <style>{`
        .button-shine:after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
          transform: skewX(-25deg);
          transition: all 0.75s;
        }
        
        .group:hover .button-shine:after {
          left: 100%;
          transition: 0.75s;
        }
      `}</style>
    </motion.div>
  );
};

export default ServicesPage;
