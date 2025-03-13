import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Send, 
  Check, 
  X, 
  MessageSquare, 
  User, 
  Briefcase, 
  Calendar,
  Clock,
  DollarSign,
  Coffee,
  ChevronRight,
  ChevronLeft,
  FileText,
  Code,
  Smartphone,
  Brain,
  Paintbrush,
  ShoppingCart,
  Globe,
  Database,
  Camera,
  AlertTriangle,
  MessageCircle, 
  Sparkles,
  Rocket,
  Smile,
  ThumbsUp,
  Gift,
  Info,
  ChevronDown
} from 'lucide-react';
import BudgetCalculator from '../components/BudgetCalculator';
import QuotationBuilder from '../components/QuotationBuilder';

const ContactPage = () => {
  // Basic form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimatedBudget, setEstimatedBudget] = useState<{min: number; max: number} | null>(null);
  const [preferredContactMethod, setPreferredContactMethod] = useState('email');
  const [availableForMeeting, setAvailableForMeeting] = useState<string[]>([]);
  const [showBudgetEstimator, setShowBudgetEstimator] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'map'>('form');
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Enhanced form state
  const [formStep, setFormStep] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [quotationVisible, setQuotationVisible] = useState(false);
  const [quotationItems, setQuotationItems] = useState<any[]>([]);
  const [quotationTotal, setQuotationTotal] = useState(0);
  const [formCompleteness, setFormCompleteness] = useState(0);
  const [useCustomQuotation, setUseCustomQuotation] = useState(false);
  
  // Form animation state
  const [formAnimDirection, setFormAnimDirection] = useState<'next' | 'prev'>('next');

  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Available meeting times options
  const availableTimes = [
    'Weekday mornings',
    'Weekday afternoons',
    'Weekday evenings',
    'Weekends'
  ];

  // Service options with more details
  const serviceOptions = [
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: <Code size={24} />,
      description: 'Custom websites and web applications',
      basePrice: 8000,  // Updated from 5000 to 8000
      image: '/images/services/web-dev.jpg'
    },
    {
      id: 'mobile-dev',
      name: 'Mobile App Development',
      icon: <Smartphone size={24} />,
      description: 'Native and cross-platform mobile apps',
      basePrice: 15000,  // Updated from 8000 to 15000
      image: '/images/services/mobile-dev.jpg'
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: <Brain size={24} />,
      description: 'Custom AI solutions and integrations',
      basePrice: 18000,  // Updated from 12000 to 18000
      image: '/images/services/ai-ml.jpg'
    },
    {
      id: 'ui-design',
      name: 'UI/UX Design',
      icon: <Paintbrush size={24} />,
      description: 'User-centered design and prototyping',
      basePrice: 6000,  // Updated from 4000 to 6000
      image: '/images/services/ui-design.jpg'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Solutions',
      icon: <ShoppingCart size={24} />,
      description: 'Online stores and payment systems',
      basePrice: 12000,  // Updated from 7000 to 12000
      image: '/images/services/ecommerce.jpg'
    },
    {
      id: 'data',
      name: 'Data Engineering',
      icon: <Database size={24} />,
      description: 'Data pipelines and analytics platforms',
      basePrice: 14000,  // Updated from 9000 to 14000
      image: '/images/services/data.jpg'
    }
  ];

  const budgetOptions = [
    { value: '10k-20k', label: '$10,000 - $20,000', icon: <DollarSign size={16} /> },
    { value: '20k-50k', label: '$20,000 - $50,000', icon: <DollarSign size={16} /> },
    { value: '50k-100k', label: '$50,000 - $100,000', icon: <DollarSign size={16} /> },
    { value: '100k-200k', label: '$100,000 - $200,000', icon: <DollarSign size={16} /> },
    { value: '200k+', label: '$200,000+', icon: <DollarSign size={16} /> }
  ];

  const timelineOptions = [
    { value: '1-3', label: '1-3 months', icon: <Calendar size={16} /> },
    { value: '3-6', label: '3-6 months', icon: <Calendar size={16} /> },
    { value: '6-12', label: '6-12 months', icon: <Calendar size={16} /> },
    { value: '12+', label: '12+ months', icon: <Calendar size={16} /> }
  ];

  // Define a type for quotation items
  type QuotationItem = {
    id?: string;
    name: string;
    price: number;
    description?: string;
    serviceName?: string;
  };

  // Handle quotation data from QuotationBuilder component
  const handleQuoteGenerated = (items: QuotationItem[], total: number) => {
    setQuotationItems(items);
    setQuotationTotal(total);
    setQuotationVisible(true);
    
    // Estimate budget based on total
    setEstimatedBudget({
      min: Math.round(total * 0.9),
      max: Math.round(total * 1.1)
    });
    
    // Set project type based on services
    if (items.length > 0) {
      setProjectType(items.map(item => item.serviceName).join(', '));
    }
  };

  // Toggle service selection
  const toggleServiceSelection = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // Form navigation
  const nextFormStep = () => {
    setFormAnimDirection('next');
    const nextStep = Math.min(formStep + 1, 4);
    setFormStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateFormProgress(nextStep);
  };

  const prevFormStep = () => {
    setFormAnimDirection('prev');
    const prevStep = Math.max(formStep - 1, 1);
    setFormStep(prevStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateFormProgress(prevStep);
  };

  // Update form progress based on current step and completeness
  const updateFormProgress = (step: number) => {
    const baseProgress = (step - 1) * 25;
    setFormProgress(baseProgress);
  };

  // Calculate form completeness to provide feedback
  useEffect(() => {
    let completeness = 0;
    
    // Step 1 completeness (services selection)
    if (selectedServices.length > 0) {
      completeness += 25;
    }
    
    // Step 2 completeness (budget and timeline)
    if (selectedBudget) completeness += 12.5;
    if (selectedTimeline) completeness += 12.5;
    
    // Step 3 completeness (contact details)
    if (name) completeness += 8.33;
    if (email) completeness += 8.33;
    if (message) completeness += 8.33;
    
    setFormCompleteness(completeness);
  }, [selectedServices, selectedBudget, selectedTimeline, name, email, message]);

  // Generate quotation based on selections
  const generateQuotation = () => {
    const items = selectedServices.map(serviceId => {
      const service = serviceOptions.find(s => s.id === serviceId);
      return {
        id: service?.id,
        name: service?.name,
        price: service?.basePrice || 0,
        description: service?.description
      };
    });
    
    const total = items.reduce((sum, item) => sum + item.price, 0);
    
    setQuotationItems(items);
    setQuotationTotal(total);
    setQuotationVisible(true);
  };

  // Enhanced form submission with quotation data
  const handleEnhancedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setError(null);
    setSubmitting(true);
    
    // Prepare final data including quotation
    const finalData = {
      contactInfo: {
        name,
        email,
        phone,
        company: companyName
      },
      projectDetails: {
        services: selectedServices.map(id => serviceOptions.find(s => s.id === id)?.name),
        budget: selectedBudget,
        timeline: selectedTimeline,
        message
      },
      quotation: {
        items: quotationItems,
        total: quotationTotal
      }
    };
    
    // Simulate API call with delay
    setTimeout(() => {
      console.log('Submitting form with data:', finalData);
      setSubmitting(false);
      setSubmitted(true);
      setShowThankYou(true);
      
      // Reset form after successful submission
      setName('');
      setEmail('');
      setMessage('');
      setPhone('');
      setCompanyName('');
      setProjectType('');
      setAvailableForMeeting([]);
      setEstimatedBudget(null);
      setSelectedServices([]);
      setSelectedBudget('');
      setSelectedTimeline('');
      setQuotationVisible(false);
      setQuotationItems([]);
      setQuotationTotal(0);
      setFormStep(1);
      
      // Reset submission status after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setError(null);
    setSubmitting(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setShowThankYou(true);
      
      // Reset form after successful submission
      setName('');
      setEmail('');
      setMessage('');
      setPhone('');
      setCompanyName('');
      setProjectType('');
      setAvailableForMeeting([]);
      setEstimatedBudget(null);
      
      // Reset submission status after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };
  
  // Handle budget calculation from calculator component
  const handleBudgetCalculation = (budget: {min: number; max: number}) => {
    setEstimatedBudget(budget);
    setShowBudgetEstimator(false);
    
    // Set project type based on budget
    if (budget.min >= 8000) {
      setProjectType('Enterprise-level project');
    } else if (budget.min >= 5000) {
      setProjectType('Mid-size project');
    } else {
      setProjectType('Starter project');
    }
    
    // Scroll to form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  // Toggle meeting availability times
  const toggleAvailability = (time: string) => {
    if (availableForMeeting.includes(time)) {
      setAvailableForMeeting(availableForMeeting.filter(t => t !== time));
    } else {
      setAvailableForMeeting([...availableForMeeting, time]);
    }
  };
  
  // Initialize Google Maps when component mounts
  useEffect(() => {
    // This would be where you'd initialize a real Google Map
    // For this example, we'll just leave a placeholder
    if (mapRef.current) {
      // Map initialization code would go here
    }
  }, []);

  // Enhanced multi-step form rendering
  const renderFormStep = () => {
    switch(formStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: formAnimDirection === 'next' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: formAnimDirection === 'next' ? -50 : 50 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-6">What services are you interested in?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceOptions.map((service) => (
                <motion.div 
                  key={service.id}
                  className={`relative rounded-xl border-2 p-1 cursor-pointer overflow-hidden transition-all ${
                    selectedServices.includes(service.id) 
                      ? 'border-blue-500 bg-blue-50/10' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleServiceSelection(service.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full ${
                        selectedServices.includes(service.id) 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      } flex items-center justify-center mr-3`}>
                        {service.icon}
                      </div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                    <p className="text-gray-800 font-medium">From ${service.basePrice.toLocaleString()}</p>
                    
                    {selectedServices.includes(service.id) && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <Check size={14} />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-end pt-4">
              <motion.button
                type="button"
                onClick={nextFormStep}
                disabled={selectedServices.length === 0}
                className={`px-8 py-3 rounded-lg flex items-center font-medium transition-all ${
                  selectedServices.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-black/90'
                }`}
                whileHover={selectedServices.length > 0 ? { scale: 1.02 } : {}}
                whileTap={selectedServices.length > 0 ? { scale: 0.98 } : {}}
              >
                Next Step
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: formAnimDirection === 'next' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: formAnimDirection === 'next' ? -50 : 50 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-2">Project scope</h3>
            <p className="text-gray-600 mb-8">Help us understand your project timeline and budget.</p>
            
            <div className="space-y-8">
              <div>
                <label className="block mb-4 text-lg font-medium">What's your budget range?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {budgetOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                        selectedBudget === option.value
                          ? 'border-blue-500 bg-blue-50/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedBudget(option.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${
                            selectedBudget === option.value
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-600'
                          } flex items-center justify-center mr-3`}>
                            {option.icon}
                          </div>
                          <span className="font-medium">{option.label}</span>
                        </div>
                        
                        {selectedBudget === option.value && (
                          <Check size={18} className="text-blue-500" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block mb-4 text-lg font-medium">What's your timeline?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {timelineOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                        selectedTimeline === option.value
                          ? 'border-blue-500 bg-blue-50/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTimeline(option.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${
                            selectedTimeline === option.value
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-600'
                          } flex items-center justify-center mr-3`}>
                            {option.icon}
                          </div>
                          <span className="font-medium">{option.label}</span>
                        </div>
                        
                        {selectedTimeline === option.value && (
                          <Check size={18} className="text-blue-500" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <motion.button
                type="button"
                onClick={prevFormStep}
                className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 flex items-center font-medium hover:bg-gray-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Previous
              </motion.button>
              
              <motion.button
                type="button"
                onClick={nextFormStep}
                disabled={!selectedBudget || !selectedTimeline}
                className={`px-8 py-3 rounded-lg flex items-center font-medium transition-all ${
                  !selectedBudget || !selectedTimeline
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-black/90'
                }`}
                whileHover={(selectedBudget && selectedTimeline) ? { scale: 1.02 } : {}}
                whileTap={(selectedBudget && selectedTimeline) ? { scale: 0.98 } : {}}
              >
                Next Step
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: formAnimDirection === 'next' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: formAnimDirection === 'next' ? -50 : 50 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-2">Contact information</h3>
            <p className="text-gray-600 mb-8">Let us know how to reach you and more about your project.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User size={18} />
                  </span>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    required 
                    placeholder="Your name"
                  />
                </div>
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    required 
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              {/* Phone field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Phone size={18} />
                  </span>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              {/* Company field */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Briefcase size={18} />
                  </span>
                  <input 
                    type="text" 
                    id="companyName" 
                    name="companyName" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    placeholder="Your company name"
                  />
                </div>
              </div>
            </div>
            
            {/* Message field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Project details *</label>
              <div className="relative">
                <span className="absolute top-3 left-3 text-gray-400">
                  <FileText size={18} />
                </span>
                <textarea 
                  id="message" 
                  name="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  rows={4} 
                  className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                  required 
                  placeholder="Tell us more about your project goals, requirements, and any specific features you need..."
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <motion.button
                type="button"
                onClick={prevFormStep}
                className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 flex items-center font-medium hover:bg-gray-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Previous
              </motion.button>
              
              <motion.button
                type="button"
                onClick={() => {
                  generateQuotation();
                  nextFormStep();
                }}
                disabled={!name || !email || !message}
                className={`px-8 py-3 rounded-lg flex items-center font-medium transition-all ${
                  !name || !email || !message
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-black/90'
                }`}
                whileHover={(name && email && message) ? { scale: 1.02 } : {}}
                whileTap={(name && email && message) ? { scale: 0.98 } : {}}
              >
                Generate Quote
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: formAnimDirection === 'next' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: formAnimDirection === 'next' ? -50 : 50 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-2">Your Custom Quote</h3>
            <p className="text-gray-600 mb-8">Review your project quote and submit to get started.</p>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-4">Quote Summary</h4>
              
              {/* Services list with costs */}
              <div className="space-y-4 mb-6">
                {quotationItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <p className="font-medium">${item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              
              {/* Selected project parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Budget Range</p>
                  <p className="font-medium">{budgetOptions.find(b => b.value === selectedBudget)?.label}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-medium">{timelineOptions.find(t => t.value === selectedTimeline)?.label}</p>
                </div>
              </div>
              
              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">Estimated Total</p>
                  <p className="font-bold text-lg">${quotationTotal.toLocaleString()}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  * This is a preliminary estimate. Final pricing may vary based on detailed requirements.
                </p>
              </div>
            </div>
            
            {/* Contact info review */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-4 text-blue-800">Your Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-600">Name</p>
                  <p className="font-medium">{name}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
                {phone && (
                  <div>
                    <p className="text-sm text-blue-600">Phone</p>
                    <p className="font-medium">{phone}</p>
                  </div>
                )}
                {companyName && (
                  <div>
                    <p className="text-sm text-blue-600">Company</p>
                    <p className="font-medium">{companyName}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <motion.button
                type="button"
                onClick={prevFormStep}
                className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 flex items-center font-medium hover:bg-gray-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Previous
              </motion.button>
              
              <motion.button
                type="submit"
                onClick={handleEnhancedSubmit}
                className="px-8 py-3 rounded-lg flex items-center font-medium bg-black text-white hover:bg-black/90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit
                <Send size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  // Conversation UI State
  const [conversation, setConversation] = useState([
    { 
      type: 'bot', 
      content: "Hi there! I'm here to help you get a quote for your project. What services are you interested in?",
      options: [],
      showTypingIndicator: false
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [conversationStep, setConversationStep] = useState('services');
  const [showOptionButtons, setShowOptionButtons] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    if (conversationEndRef.current && scrollToBottom) {
      // Instead of automatically scrolling, only scroll when explicitly requested
      // This prevents jumping when user selects an option
      const isNearBottom = conversationEndRef.current.getBoundingClientRect().top <= window.innerHeight + 100;
      
      if (isNearBottom || isTyping) {
        conversationEndRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest'
        });
      }
      
      setScrollToBottom(false);
    }
  }, [conversation, scrollToBottom, isTyping]);

  // Define the type for conversation options
  type ConversationOption = {
    label: string;
    action: string;
    icon?: React.ReactNode;
  };

  // Add bot message with typing effect
  const addBotMessage = (message: string, options: ConversationOption[] = [], delay: number = 500) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        { type: 'bot', content: message, options, showTypingIndicator: false }
      ]);
      setIsTyping(false);
      
      // Only force scroll on system-initiated messages, not user selections
      if (!options.some(opt => opt.action.startsWith('select-'))) {
        setScrollToBottom(true);
      }
    }, delay);
  };

  // Handle service selection in conversation
  const handleServiceSelect = (serviceId: string) => {
    const service = serviceOptions.find(s => s.id === serviceId);
    
    if (service) {
      // Add user message without forcing scroll
      setConversation(prev => [
        ...prev,
        { type: 'user', content: `I'm interested in ${service.name}`, options: [], showTypingIndicator: false }
      ]);
      
      // Toggle the service selection
      toggleServiceSelection(serviceId);
      
      // Add bot response with controlled scrolling
      setIsTyping(true);
      setTimeout(() => {
        setConversation(prev => [
          ...prev,
          { 
            type: 'bot', 
            content: `Great choice! ${service.name} starts at $${service.basePrice.toLocaleString()}. Would you like to add more services?`,
            options: [
              { label: 'Yes, add more', action: 'add-more-services' },
              { label: 'No, continue', action: 'continue-to-budget' }
            ],
            showTypingIndicator: false 
          }
        ]);
        setIsTyping(false);
      }, 500);
    }
  };

  // Handle action buttons in conversation
  const handleConversationAction = (action: string) => {
    switch (action) {
      case 'add-more-services':
        setConversation(prev => [
          ...prev,
          { type: 'user', content: "Yes, I'd like to add more services", options: [], showTypingIndicator: false }
        ]);
        
        addBotMessage(
          "What other services are you interested in?",
          serviceOptions.map(service => ({
            label: service.name,
            action: `select-service-${service.id}`,
            icon: service.icon
          }))
        );
        break;
        
      case 'continue-to-budget':
        setConversation(prev => [
          ...prev,
          { type: 'user', content: "I'm ready to continue", options: [], showTypingIndicator: false }
        ]);
        
        setConversationStep('budget');
        
        addBotMessage(
          "What's your budget range for this project?",
          budgetOptions.map(option => ({
            label: option.label,
            action: `select-budget-${option.value}`,
            icon: option.icon
          }))
        );
        break;
        
      default:
        if (action.startsWith('select-service-')) {
          const serviceId = action.replace('select-service-', '');
          handleServiceSelect(serviceId);
        }
        else if (action.startsWith('select-budget-')) {
          const budgetValue = action.replace('select-budget-', '');
          setSelectedBudget(budgetValue);
          
          const budgetOption = budgetOptions.find(b => b.value === budgetValue);
          
          setConversation(prev => [
            ...prev,
            { type: 'user', content: `My budget is ${budgetOption?.label}`, options: [], showTypingIndicator: false }
          ]);
          
          setConversationStep('timeline');
          
          addBotMessage(
            "Great! What timeline are you looking at?",
            timelineOptions.map(option => ({
              label: option.label,
              action: `select-timeline-${option.value}`,
              icon: option.icon
            }))
          );
        }
        else if (action.startsWith('select-timeline-')) {
          const timelineValue = action.replace('select-timeline-', '');
          setSelectedTimeline(timelineValue);
          
          const timelineOption = timelineOptions.find(t => t.value === timelineValue);
          
          setConversation(prev => [
            ...prev,
            { type: 'user', content: `My timeline is ${timelineOption?.label}`, options: [], showTypingIndicator: false }
          ]);
          
          setConversationStep('contact');
          
          addBotMessage(
            "Perfect! Now, let's get your contact details so we can prepare a personalized quote.",
            [{ label: 'Enter my details', action: 'show-contact-form' }]
          );
        }
        else if (action === 'show-contact-form') {
          setShowOptionButtons(false);
          
          setConversation(prev => [
            ...prev,
            { type: 'user', content: "I'll provide my details now", options: [], showTypingIndicator: false },
            { type: 'form', content: "", options: [], showTypingIndicator: false }
          ]);
          
          setScrollToBottom(true);
        }
        else if (action === 'submit-quote') {
          setConversation(prev => [
            ...prev,
            { type: 'user', content: "I'm ready for my quote", options: [], showTypingIndicator: false }
          ]);
          
          // Generate the quote
          generateQuotation();
          
          addBotMessage("Great! I've generated a quote based on your requirements:", [], 800);
          
          setTimeout(() => {
            setConversation(prev => [
              ...prev,
              { type: 'quote', content: "", options: [], showTypingIndicator: false }
            ]);
            setScrollToBottom(true);
          }, 1300);
        }
        else if (action === 'submit-form') {
          // Create a synthetic React form event instead of using native Event
          const syntheticEvent = {
            preventDefault: () => {},
            target: document.createElement('form'),
            currentTarget: document.createElement('form'),
            nativeEvent: new Event('submit'),
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            isDefaultPrevented: () => false,
            isPropagationStopped: () => false,
            isTrusted: true,
            stopPropagation: () => {},
            persist: () => {},
            timeStamp: Date.now(),
            type: 'submit'
          } as unknown as React.FormEvent<HTMLFormElement>;
          
          handleEnhancedSubmit(syntheticEvent);
        }
        break;
    }
  };

  // Handle form input in conversation
  const handleContactInputChange = (field: string, value: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'company':
        setCompanyName(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };

  // Check if contact form is valid
  const isContactFormValid = () => {
    return name.trim() !== '' && email.trim() !== '' && message.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Initialize conversation on first render
  useEffect(() => {
    // Wait a bit then show service options
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        { 
          type: 'bot', 
          content: "Here are the services we offer. Which one(s) are you interested in?",
          options: serviceOptions.map(service => ({
            label: service.name,
            action: `select-service-${service.id}`,
            icon: service.icon
          })),
          showTypingIndicator: false
        }
      ]);
      setScrollToBottom(true);
    }, 1000);
  }, []);

  // Add a scroll indicator button that appears when new messages are below view
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  // Add scroll position detection
  useEffect(() => {
    const chatContainer = document.querySelector('.conversation-area');
    if (!chatContainer) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const isBottomVisible = scrollTop + clientHeight >= scrollHeight - 100;
      setShowScrollIndicator(!isBottomVisible && conversation.length > 3);
    };
    
    chatContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, [conversation.length]);

  // Render the conversational UI
  const renderConversationUI = () => {
    return (
      <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[700px] relative">
        {/* Header */}
        <div className="bg-black text-white p-5 flex items-center justify-between">
          <div className="flex items-center">
            <Coffee size={20} className="mr-2" />
            <h2 className="font-bold">Project Assistant</h2>
          </div>
          <div className="flex items-center text-xs text-white/60">
            <Sparkles size={14} className="mr-1" />
            <span>Generating quotes in seconds</span>
          </div>
        </div>
        
        {/* Conversation Area - add the conversation-area class for scroll detection */}
        <div className="flex-grow overflow-y-auto p-5 bg-gray-50 conversation-area">
          <div className="space-y-6">
            {conversation.map((message, index) => (
              <div key={index} className={`max-w-[80%] ${message.type === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                {message.type === 'bot' && (
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mr-2 flex-shrink-0">
                      <Rocket size={16} />
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-gray-800">{message.content}</p>
                      {message.options && message.options.length > 0 && showOptionButtons && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.options.map((option, optionIndex) => (
                            <motion.button 
                              key={optionIndex}
                              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm flex items-center"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleConversationAction(option.action)}
                            >
                              {option.icon && <span className="mr-2">{option.icon}</span>}
                              {option.label}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {message.type === 'user' && (
                  <div className="flex items-start justify-end">
                    <div className="bg-blue-500 rounded-xl p-4 text-white">
                      <p>{message.content}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-2 flex-shrink-0">
                      <User size={16} />
                    </div>
                  </div>
                )}
                
                {message.type === 'form' && (
                  <div className="bg-white rounded-xl p-4 shadow-sm w-full max-w-xl mx-auto">
                    <h3 className="font-medium text-lg mb-4 flex items-center">
                      <FileText size={18} className="mr-2" />
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input 
                          type="text"
                          value={name}
                          onChange={(e) => handleContactInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input 
                          type="email"
                          value={email}
                          onChange={(e) => handleContactInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="you@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input 
                          type="tel"
                          value={phone}
                          onChange={(e) => handleContactInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Optional"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input 
                          type="text"
                          value={companyName}
                          onChange={(e) => handleContactInputChange('company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Optional"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
                        <textarea 
                          value={typeof message === 'string' ? message : ''}
                          onChange={(e) => handleContactInputChange('message', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Tell us more about your project..."
                        />
                      </div>
                      
                      <motion.button
                        type="button"
                        onClick={() => handleConversationAction('submit-quote')}
                        disabled={!isContactFormValid()}
                        className={`w-full px-4 py-2 rounded-md flex items-center justify-center font-medium ${
                          isContactFormValid()
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        whileHover={isContactFormValid() ? { scale: 1.02 } : {}}
                        whileTap={isContactFormValid() ? { scale: 0.98 } : {}}
                      >
                        Generate My Quote
                      </motion.button>
                    </div>
                  </div>
                )}
                
                {message.type === 'quote' && (
                  <div className="bg-white rounded-xl p-6 shadow-sm w-full max-w-xl mx-auto">
                    <h3 className="font-bold text-lg mb-6 flex items-center text-blue-700">
                      <Gift size={18} className="mr-2" />
                      Your Custom Quote
                    </h3>
                    
                    <div className="space-y-4">
                      {quotationItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between pb-3 border-b">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <p className="font-medium">${item.price.toLocaleString()}</p>
                        </div>
                      ))}
                      
                      <div className="flex justify-between pt-2 font-bold">
                        <p>Total Estimate</p>
                        <p>${quotationTotal.toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 flex items-start mt-2">
                        <Info size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                        <p>This is an estimate based on your selections. The final price may vary based on project specifics.</p>
                      </div>
                      
                      <motion.button
                        type="button"
                        onClick={() => handleConversationAction('submit-form')}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium flex items-center justify-center mt-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ThumbsUp className="mr-2" size={18} />
                        Submit Request
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mr-2 flex-shrink-0">
                  <Rocket size={16} />
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={conversationEndRef} />
          </div>
        </div>
        
        {/* Add scroll indicator button */}
        {showScrollIndicator && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 right-4 bg-black text-white p-2 rounded-full shadow-lg"
            onClick={() => setScrollToBottom(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown size={20} />
          </motion.button>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="noise-effect"></div>
        </div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 10 + 10,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 backdrop-blur-sm space-x-2 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Coffee size={16} />
              <span className="text-sm tracking-wide">CAFFEINATED CREATIVITY</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Let's Bring Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Ideas to Life</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready to start your project? Contact us for a consultation or get an instant estimate with our project calculator.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.button 
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setActiveTab('form');
                }}
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
              
              <motion.button 
                onClick={() => setShowBudgetEstimator(!showBudgetEstimator)}
                className="px-8 py-4 bg-transparent border border-white rounded-full font-medium hover:bg-white/10 transition-all flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showBudgetEstimator ? 'Hide Calculator' : 'Project Calculator'}
                <DollarSign className="ml-2" size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Budget Estimator Section */}
      <AnimatePresence>
        {showBudgetEstimator && (
          <motion.section 
            className="py-20 bg-black text-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Project Budget Calculator</h2>
                  <p className="text-xl text-gray-300">
                    Get an instant estimate for your project. Adjust the options below to see how they affect the budget.
                  </p>
                </div>
                
                <BudgetCalculator onGetQuote={handleBudgetCalculation} />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      
      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowThankYou(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 w-full max-w-lg m-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  We've received your message and will get back to you soon. 
                  A confirmation has been sent to your email address.
                </p>
                <button
                  className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                  onClick={() => setShowThankYou(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Innovative Conversational Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50" ref={formRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="mb-4 inline-flex items-center px-4 py-2 rounded-full bg-black/5 text-black/70 space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MessageCircle size={16} />
              <span className="text-sm font-medium">INTERACTIVE EXPERIENCE</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get Your Project Quote
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Chat with our project assistant to get an instant quote based on your specific requirements.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              {renderConversationUI()}
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full">
                <div className="bg-black text-white p-5">
                  <h2 className="font-bold flex items-center">
                    <Info size={18} className="mr-2" />
                    How It Works
                  </h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3 flex-shrink-0">
                      <span className="font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Select Your Services</h3>
                      <p className="text-gray-600 text-sm">Choose the services you need for your project.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3 flex-shrink-0">
                      <span className="font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Specify Project Details</h3>
                      <p className="text-gray-600 text-sm">Tell us about your budget and timeline preferences.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3 flex-shrink-0">
                      <span className="font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Contact Information</h3>
                      <p className="text-gray-600 text-sm">Provide your details so we can prepare your personalized quote.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3 flex-shrink-0">
                      <span className="font-semibold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Get Your Quote</h3>
                      <p className="text-gray-600 text-sm">Receive an instant estimate for your project.</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mt-6">
                    <h4 className="font-medium flex items-center mb-2">
                      <ThumbsUp size={16} className="mr-2" />
                      Benefits
                    </h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-600" />
                        <span>Instant price estimates</span>
                      </li>
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-600" />
                        <span>Customized to your specific needs</span>
                      </li>
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-600" />
                        <span>No commitment required</span>
                      </li>
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-600" />
                        <span>Detailed breakdown of costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Vision</span> Into Reality?
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our team of experts is ready to help you bring your ideas to life.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button 
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
              
              <a href="tel:+15551234567" className="px-8 py-4 border border-white rounded-full text-white hover:bg-white/10 transition-all flex items-center">
                <Phone className="mr-2" size={20} />
                Call Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer navigation cue */}
      <div className="bg-gray-100 py-8 text-center">
        <p className="text-gray-500 mb-4">Explore more about what we do</p>
        <div className="flex justify-center gap-4">
          <motion.a 
            href="/services" 
            className="text-black hover:text-gray-800 flex items-center"
            whileHover={{ x: 5 }}
          >
            <span>Services</span>
            <ArrowRight size={14} className="ml-1" />
          </motion.a>
          
          <motion.a 
            href="/portfolio" 
            className="text-black hover:text-gray-800 flex items-center"
            whileHover={{ x: 5 }}
          >
            <span>Portfolio</span>
            <ArrowRight size={14} className="ml-1" />
          </motion.a>
          
          <motion.a 
            href="/about" 
            className="text-black hover:text-gray-800 flex items-center"
            whileHover={{ x: 5 }}
          >
            <span>About Us</span>
            <ArrowRight size={14} className="ml-1" />
          </motion.a>
        </div>
      </div>
      
      {/* Add any necessary style for animations */}
      <style>
        {`
          .typing-indicator {
            display: inline-flex;
            align-items: center;
          }
          
          @keyframes blink {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
          }
        `}
      </style>
    </motion.div>
  );
};

export default ContactPage;

