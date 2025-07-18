import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Calculator, ChevronDown, Plus, X, Download, Mail, Phone, MapPin,
  Check, Clock, Coffee, Share2, Send, MessageSquare, ChevronRight,
  Zap, Globe, PenTool, Shield, Users, BookOpen, Brain, Smartphone,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Types and interfaces
interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: JSX.Element;
  options?: {
    name: string;
    price: number;
    description: string;
  }[];
}

interface InvoiceItem {
  id: string;
  serviceName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  options: string[];
  total: number;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  budget: string;
  timeline: string;
  services: string[];
  hearAboutUs: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  email: string;
}

// Custom hook for animations
function useAnimatedCounter(value: number, duration: number = 1) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        countRef.current = Math.floor(progress * value);
        setCount(countRef.current);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(step);
    }
  }, [inView, value, duration]);
  
  return { ref, count };
}

const Contact = () => {
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [showInvoiceBuilder, setShowInvoiceBuilder] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
    timeline: '',
    services: [],
    hearAboutUs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Quote builder state
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const [invoiceTax, setInvoiceTax] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  
  // Interactive elements state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showChatIndicator, setShowChatIndicator] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeMember, setActiveMember] = useState<number | null>(null);
  
  // Animated counters
  const { ref: projectsRef, count: projectsCount } = useAnimatedCounter(250);
  const { ref: clientsRef, count: clientsCount } = useAnimatedCounter(120);
  const { ref: yearsRef, count: yearsCount } = useAnimatedCounter(15);
  const { ref: awardsRef, count: awardsCount } = useAnimatedCounter(18);
  
  // Page scroll tracking
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: false });

  // Example services with icons
  const services: Service[] = [
    {
      id: "web-dev",
      name: "Web Development",
      description: "Custom website development with modern frameworks",
      basePrice: 5000,
      icon: <Globe className="w-6 h-6" />,
      options: [
        { name: "E-commerce functionality", price: 2000, description: "Full online store with payment processing" },
        { name: "CMS integration", price: 1500, description: "Easy content management for non-technical users" },
        { name: "SEO optimization", price: 1000, description: "Technical SEO setup for better rankings" },
        { name: "Progressive Web App", price: 1800, description: "Mobile app-like experience for web users" },
      ]
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android",
      basePrice: 8000,
      icon: <Smartphone className="w-6 h-6" />,
      options: [
        { name: "iOS development", price: 4000, description: "Native app for Apple devices" },
        { name: "Android development", price: 4000, description: "Native app for Android devices" },
        { name: "Push notifications", price: 800, description: "Real-time alerts and user engagement" },
        { name: "In-app purchases", price: 1500, description: "Monetization through in-app purchases" },
      ]
    },
    {
      id: "ui-design",
      name: "UI/UX Design",
      description: "User interface and experience design with user testing",
      basePrice: 3000,
      icon: <PenTool className="w-6 h-6" />,
      options: [
        { name: "Brand identity", price: 1500, description: "Logo, color palette, and brand guidelines" },
        { name: "Interactive prototypes", price: 1000, description: "Clickable prototypes for user testing" },
        { name: "User testing", price: 1200, description: "Real user feedback and usability improvements" },
        { name: "Motion design", price: 1800, description: "Custom animations and micro-interactions" },
      ]
    },
    {
      id: "digital-marketing",
      name: "Digital Marketing",
      description: "Marketing strategy and implementation for growth",
      basePrice: 2500,
      icon: <Zap className="w-6 h-6" />,
      options: [
        { name: "Social media management", price: 1200, description: "Content creation and community management" },
        { name: "Content creation", price: 1500, description: "Blog posts, videos, and graphics" },
        { name: "PPC campaign", price: 2000, description: "Google and social media advertising" },
        { name: "SEO content strategy", price: 1700, description: "Keyword research and content optimization" },
      ]
    },
    {
      id: "ai-solutions",
      name: "AI & ML Solutions",
      description: "Custom AI integration for business automation",
      basePrice: 7000,
      icon: <Brain className="w-6 h-6" />,
      options: [
        { name: "Chatbot development", price: 2500, description: "Custom AI assistant for customer service" },
        { name: "Predictive analytics", price: 3500, description: "Data-driven business forecasting" },
        { name: "Computer vision", price: 4000, description: "Image recognition and processing" },
        { name: "ML model training", price: 3000, description: "Custom algorithms for your business needs" },
      ]
    },
    {
      id: "maintenance",
      name: "Maintenance & Support",
      description: "Ongoing technical support and maintenance",
      basePrice: 1000,
      icon: <Shield className="w-6 h-6" />,
      options: [
        { name: "24/7 support", price: 1500, description: "Round-the-clock technical assistance" },
        { name: "Performance monitoring", price: 800, description: "Automated alerts and optimizations" },
        { name: "Regular updates", price: 600, description: "Security patches and feature enhancements" },
        { name: "Cloud infrastructure", price: 1200, description: "Scalable hosting and CDN services" },
      ]
    },
  ];

  // FAQ data
  const faqs: FAQ[] = [
    {
      question: "What is your typical project timeline?",
      answer: "Our timelines vary based on project complexity. Simple websites typically take 4-6 weeks, while complex applications may take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements."
    },
    {
      question: "How do you handle project management and communication?",
      answer: "We use Agile methodology with regular sprints and check-ins. You'll have access to our project management tool where you can track progress in real-time. We schedule weekly video calls for updates and use a dedicated Slack channel for day-to-day communication."
    },
    {
      question: "Do you offer maintenance after the project is complete?",
      answer: "Yes, we offer various maintenance packages to ensure your digital product remains secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security patches, performance monitoring, and technical support."
    },
    {
      question: "What is your pricing structure?",
      answer: "We typically work on either a fixed-price basis for well-defined projects or a time and materials basis for more complex or evolving projects. We provide detailed estimates before starting work and ensure transparent billing throughout the project."
    },
    {
      question: "Can you scale your team based on our project needs?",
      answer: "Absolutely! Our flexible team structure allows us to scale resources up or down based on project requirements. Whether you need a full development team or specialized expertise in a specific area, we can adapt our resources to meet your needs."
    }
  ];

  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "NexGen Solutions",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "Working with the Caffeinated Creativity team transformed our online presence. Their attention to detail and innovative approach to our website redesign resulted in a 40% increase in conversion rates within the first month.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "TechFlow Inc",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      quote: "Their AI integration solutions streamlined our customer service operations dramatically. The chatbot they developed handles over 70% of our inquiries automatically, and customers have repeatedly praised the intuitive interface.",
      rating: 5
    },
    {
      id: 3,
      name: "Aisha Patel",
      position: "Product Manager",
      company: "EcoVenture",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "The mobile app developed by Caffeinated Creativity exceeded our expectations. Their team's technical expertise and creative problem-solving helped us navigate complex challenges while staying on schedule and within budget.",
      rating: 4
    }
  ];

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Rivera",
      position: "Technical Director",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Alex leads our technical strategy with over 15 years of experience in software architecture and development. Specialized in AI systems and scalable cloud infrastructure.",
      email: "alex@caffeinatedcreativity.com"
    },
    {
      id: 2,
      name: "Jasmine Wong",
      position: "Creative Director",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Jasmine brings vision and creativity to every project with her background in design thinking and user experience. Her work has been recognized with multiple industry awards.",
      email: "jasmine@caffeinatedcreativity.com"
    },
    {
      id: 3,
      name: "Marcus Okonjo",
      position: "Project Manager",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "Marcus ensures our projects run smoothly with his exceptional organizational skills and client-focused approach. Certified in Agile methodologies and digital transformation.",
      email: "marcus@caffeinatedcreativity.com"
    }
  ];

  // Generate invoice number on component mount
  useEffect(() => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const date = new Date();
    setInvoiceNumber(`INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}-${randomNum}`);
    
    // Simulate chat indicator appearing after a delay
    const timer = setTimeout(() => {
      setShowChatIndicator(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Calculate totals when invoice items change
  useEffect(() => {
    const subtotal = invoiceItems.reduce((total, item) => total + item.total, 0);
    const tax = subtotal * 0.1; // Example: 10% tax
    const total = subtotal + tax;
    
    setInvoiceSubtotal(subtotal);
    setInvoiceTax(tax);
    setInvoiceTotal(total);
  }, [invoiceItems]);

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter(s => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quote builder handlers
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedOptions([]);
    setQuantity(1);
  };

  const handleOptionToggle = (optionName: string) => {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter(option => option !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };

  const handleAddToInvoice = () => {
    if (!selectedService) return;
    
    const service = services.find(s => s.id === selectedService);
    if (!service) return;
    
    // Calculate total based on base price, selected options, and quantity
    let itemTotal = service.basePrice;
    const selectedOptionDetails: string[] = [];
    
    selectedOptions.forEach(optionName => {
      const option = service.options?.find(o => o.name === optionName);
      if (option) {
        itemTotal += option.price;
        selectedOptionDetails.push(optionName);
      }
    });
    
    itemTotal *= quantity;
    
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      serviceName: service.name,
      description: service.description,
      quantity,
      unitPrice: service.basePrice,
      options: selectedOptionDetails,
      total: itemTotal
    };
    
    setInvoiceItems([...invoiceItems, newItem]);
    setSelectedService(null);
    setSelectedOptions([]);
    setQuantity(1);
  };

  const handleRemoveItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowThankYouModal(true);
    }, 1500);
  };

  // Map configuration
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };
  
  const center = {
    lat: 37.7749,
    lng: -122.4194
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Fix the Stats Section
  const StatsSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            <motion.div 
              variants={itemVariants} 
              className="text-center p-6"
              ref={projectsRef}
            >
              <p className="text-5xl font-bold mb-2">{projectsCount}+</p>
              <p className="text-gray-600">Happy Clients</p>
            </motion.div>
              
            <motion.div 
              variants={itemVariants} 
              className="text-center p-6"
              ref={clientsRef}
            >
              <p className="text-5xl font-bold mb-2">{clientsCount}+</p>
              <p className="text-gray-600">Happy Clients</p>
            </motion.div>
              
            <motion.div 
              variants={itemVariants} 
              className="text-center p-6"
              ref={yearsRef}
            >
              <p className="text-5xl font-bold mb-2">{yearsCount}</p>
              <p className="text-gray-600">Years Experience</p>
            </motion.div>
              
            <motion.div 
              variants={itemVariants} 
              className="text-center p-6"
              ref={awardsRef}
            >
              <p className="text-5xl font-bold mb-2">{awardsCount}</p>
              <p className="text-gray-600">Awards Won</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Fix the Contact Info Section
  const ContactInfo = () => (
    <div className="bg-black text-white p-8 lg:p-12">
      <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <a href="mailto:hello@caffeinatedcreativity.com" className="hover:text-white/70 transition-colors">
              hello@caffeinatedcreativity.com
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <a href="tel:+15555555555" className="hover:text-white/70 transition-colors">
              +1 (555) 555-5555
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Address</p>
            <address className="not-italic">
              123 Innovation Drive<br />
              Tech City, CA 94107
            </address>
          </div>
        </div>
      </div>
      
      <div className="mt-10 pt-10 border-t border-white/20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMap(!showMap)}
          className="flex items-center text-white/70 hover:text-white transition-colors"
        >
          <MapPin className="w-5 h-5 mr-2" />
          <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
        </motion.button>
        
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden rounded-lg"
            >
              <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={14}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-16 space-y-6">
        <h4 className="text-lg font-semibold">Follow Us</h4>
        <div className="flex space-x-4">
          {['twitter', 'linkedin', 'instagram', 'github'].map(social => (
            <motion.a
              key={social}
              href={`https://${social}.com/caffeinatedcreativity`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">{social}</span>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                {/* Simplified icon placeholders */}
                <rect width="24" height="24" fillOpacity="0" />
                <circle cx="12" cy="12" r="8" fillOpacity="0.6" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );

  // Interactive Form Section Based on Step
  const FormSection = () => (
    <div className="p-8 lg:p-12 lg:col-span-2">
      {showInvoiceBuilder ? (
        <InvoiceBuilder />
      ) : (
        <MultiStepForm />
      )}
    </div>
  );

  // Multi-step Form Component
  const MultiStepForm = () => (
    <div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">
          {currentStep === 1 && "Tell us about your project"}
          {currentStep === 2 && "Your contact information"}
          {currentStep === 3 && "Additional details"}
        </h3>
        <p className="text-gray-600">
          {currentStep === 1 && "Help us understand your vision and requirements."}
          {currentStep === 2 && "Let us know how to reach out to you."}
          {currentStep === 3 && "Just a few more details to tailor our solution."}
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="flex mb-12">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex-1 relative">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 relative ${
                step < currentStep ? 'bg-black border-black text-white' : 
                step === currentStep ? 'border-black text-black' : 
                'border-gray-300 text-gray-300'
              }`}
            >
              {step < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            
            {step < 3 && (
              <div 
                className={`absolute top-4 h-[2px] w-full ${
                  step < currentStep ? 'bg-black' : 'bg-gray-300'
                }`}
              ></div>
            )}
            
            <span 
              className={`absolute -bottom-6 left-0 right-0 text-xs text-center ${
                step === currentStep ? 'text-black font-medium' : 'text-gray-500'
              }`}
            >
              {step === 1 && "Project"}
              {step === 2 && "Contact"}
              {step === 3 && "Details"}
            </span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <label className="block mb-2 text-sm font-medium">What services are you interested in?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <div 
                      key={service.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.services.includes(service.id) 
                          ? 'border-black bg-black/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-4 text-black">{service.icon}</div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">${service.basePrice.toLocaleString()}+</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Project description</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block mb-2 text-sm font-medium">Budget range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select a range</option>
                    <option value="< $5,000">Less than $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="timeline" className="block mb-2 text-sm font-medium">Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="< 1 month">Less than 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors flex items-center"
                >
                  <span>Next</span>
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Your name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block mb-2 text-sm font-medium">Company name <span className="text-gray-500 font-normal">(optional)</span></label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="Acme Inc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="hearAboutUs" className="block mb-2 text-sm font-medium">How did you hear about us?</label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="Google">Google Search</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Referral">Client Referral</option>
                  <option value="Blog">Blog or Article</option>
                  <option value="Event">Event or Conference</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-3 border border-black text-black font-medium rounded-lg hover:bg-black/5 transition-colors"
                >
                  Back
                </button>
                
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors flex items-center"
                >
                  <span>Next</span>
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h4 className="font-medium mb-4">Project Summary</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Selected Services:</p>
                      <p className="font-medium">
                        {formData.services.length > 0 
                          ? formData.services.map(id => services.find(s => s.id === id)?.name).join(', ')
                          : 'None selected'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Budget Range:</p>
                      <p className="font-medium">{formData.budget || 'Not specified'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Timeline:</p>
                      <p className="font-medium">{formData.timeline || 'Not specified'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Company:</p>
                      <p className="font-medium">{formData.company || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border border-gray-300 rounded accent-black"
                  />
                  <span className="text-gray-700">Subscribe to our newsletter for industry insights and tips</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border border-gray-300 rounded accent-black"
                    required
                  />
                  <span className="text-gray-700">I agree to the <a href="#" className="text-black underline hover:no-underline">Terms of Service</a> and <a href="#" className="text-black underline hover:no-underline">Privacy Policy</a></span>
                </label>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-3 border border-black text-black font-medium rounded-lg hover:bg-black/5 transition-colors"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-black text-white font-medium rounded-lg transition-colors flex items-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black/90'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );

  // Invoice Builder Component
  const InvoiceBuilder = () => (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold">Custom Quote Builder</h3>
        <button 
          onClick={() => setShowInvoiceBuilder(false)}
          className="text-gray-500 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Select a service</label>
            <select
              value={selectedService || ''}
              onChange={(e) => handleServiceSelect(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Choose a service...</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.basePrice.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
          
          {selectedService && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium">Select options</label>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {services.find(s => s.id === selectedService)?.options?.map(option => (
                    <div 
                      key={option.name}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedOptions.includes(option.name)
                          ? 'border-black bg-black/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleOptionToggle(option.name)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <p className="font-medium whitespace-nowrap">${option.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Quantity</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToInvoice}
                className="w-full px-4 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center"
              >
                <Plus className="mr-2 w-5 h-5" />
                Add to Quote
              </button>
            </>
          )}
        </div>
        
        <div className="lg:w-1/2 border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg">Your Quote</h4>
            <span className="text-sm text-gray-500">{invoiceNumber}</span>
          </div>
          
          {invoiceItems.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Calculator className="w-10 h-10 mx-auto mb-3 text-gray-400" />
              <p>Add services to build your custom quote</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {invoiceItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.serviceName}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        {item.options.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {item.options.map((option, idx) => (
                              <li key={idx} className="text-xs text-gray-500 flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <p>${item.total.toLocaleString()}</p>
                        <div className="text-xs text-gray-500">
                          {item.quantity} × ${item.unitPrice.toLocaleString()}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${invoiceSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (10%)</span>
                  <span>${invoiceTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${invoiceTotal.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center bg-black text-white overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black to-black"></div>
          
          {/* Grid pattern */}
          <div className="grid-lines opacity-20"></div>
          
          {/* Floating elements */}
          {[1, 2, 3, 4, 5].map((item, index) => (
            <motion.div
              key={index}
              className="absolute w-32 h-32 border border-white/10 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: heroInView ? 1 : 0.5, 
              y: heroInView ? 0 : 20
            }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6"
            >
              <Coffee size={16} className="mr-2" />
              <span className="text-sm font-medium tracking-wide">LET'S COLLABORATE</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
            >
              Turn Your Ideas Into <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                Digital Reality
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10"
            >
              Ready to start your next project? Get in touch with our team of experts and let's create something extraordinary together.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button 
                onClick={() => {
                  setShowInvoiceBuilder(false);
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors group flex items-center justify-center"
              >
                <span>Contact Us</span>
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => {
                  setShowInvoiceBuilder(true);
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <Calculator className="mr-2 w-5 h-5" />
                <span>Get a Quote</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2"
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{
                y: [0, 6, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Main Contact Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 text-sm bg-black/5 rounded-full text-black/70 mb-4 font-medium tracking-wide">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have a project in mind? Fill out the form below or generate a custom quote instantly.
              </p>
            </motion.div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Contact info sidebar */}
                <ContactInfo />
                
                {/* Form section */}
                <FormSection />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 text-sm bg-black/5 rounded-full text-black/70 mb-4 font-medium tracking-wide">
              CLIENT FEEDBACK
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. See what some of our clients have to say about working with us.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  currentTestimonial === index && (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-serif text-black/10 mb-6">"</div>
                      
                      <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                        {testimonial.quote}
                      </p>
                      
                      <div className="flex justify-center items-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg">{testimonial.name}</p>
                          <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              
              {/* Testimonial navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-0 md:left-[-30px] md:right-[-30px]">
                <button 
                  onClick={() => setCurrentTestimonial(prev => 
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setCurrentTestimonial(prev => 
                    (prev + 1) % testimonials.length
                  )}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Testimonial indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentTestimonial 
                        ? 'bg-black w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet Our Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 text-sm bg-black/5 rounded-full text-black/70 mb-4 font-medium tracking-wide">
              OUR EXPERTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our talented team brings together diverse skills, expertise, and perspectives to deliver exceptional results.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
              >
                <div 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                    activeMember === member.id 
                      ? 'scale-105 shadow-xl z-10' 
                      : 'hover:shadow-xl hover:scale-[1.02]'
                  }`}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-600 mb-4">{member.position}</p>
                    
                    <button
                      onClick={() => setActiveMember(activeMember === member.id ? null : member.id)}
                      className="flex items-center text-sm font-medium text-black hover:underline"
                    >
                      <span>{activeMember === member.id ? 'Show less' : 'About me'}</span>
                      <ChevronDown 
                        className={`ml-1 w-4 h-4 transition-transform ${
                          activeMember === member.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {activeMember === member.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-gray-100">
                            <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                            <a 
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center text-sm font-medium text-black hover:underline"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              {member.email}
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 text-sm bg-black/5 rounded-full text-black/70 mb-4 font-medium tracking-wide">
              QUESTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? We've got answers. If you don't see what you're looking for, feel free to contact us.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="mb-6"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className={`w-full text-left px-6 py-5 flex justify-between items-center rounded-xl transition-colors ${
                    expandedFAQ === index 
                      ? 'bg-black text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 bg-gray-50 rounded-b-xl border-t border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-600 mb-6">Still have questions?</p>
            <a 
              href="mailto:hello@caffeinatedcreativity.com" 
              className="inline-flex items-center px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
            >
              <Mail className="mr-2 w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="grid-lines opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-8"
            >
              Let's Create Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Extraordinary</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Ready to transform your digital vision into reality? Let's start a conversation about your project.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a 
                href="#contact-form" 
                className="group relative px-10 py-5 bg-white text-black font-medium rounded-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <span className="absolute inset-0 z-0 button-shine"></span>
              </a>
              
              <a 
                href="tel:+15555555555"
                className="px-10 py-5 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Us Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Chat indicator */}
      <AnimatePresence>
        {showChatIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative flex items-center">
              <div className="absolute right-16 max-w-xs bg-white p-4 rounded-lg shadow-xl border border-gray-100">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Support Agent" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Need help with your project?</p>
                    <p className="text-sm text-gray-600 mt-1">I'm Jasmine. Click to chat!</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowChatIndicator(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                onClick={() => setShowChatIndicator(false)}
              >
                <MessageSquare className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Thank you modal */}
      <AnimatePresence>
        {showThankYouModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-md w-full p-8 relative"
            >
              <button
                onClick={() => setShowThankYouModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Your message has been sent successfully. We'll get back to you shortly.
                </p>
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setShowThankYouModal(false)}
                    className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
                  >
                    Close
                  </button>
                  
                  <a
                    href="/portfolio"
                    className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Our Work
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;