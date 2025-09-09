import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Send, Mail, Phone, MapPin, User, Briefcase, FileText, Clock, ChevronDown, 
         Globe, Smartphone, Brain, PenTool, ShoppingCart, Database, Check, Coffee, Zap, MessageCircle, Layers,
         Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';

// Define service type without color property
interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const ContactPage = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customService, setCustomService] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FAQ state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const formRef = useRef<HTMLDivElement>(null);
  const emailFormRef = useRef<HTMLFormElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    // Use Vite environment variables: VITE_EMAILJS_PUBLIC_KEY
    const publicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.warn('EmailJS public key not found. Set VITE_EMAILJS_PUBLIC_KEY in your .env file.');
    }
  }, []);

  // Enhanced services array with icons and descriptions - removed colors
  const serviceOptions: ServiceOption[] = [
    {
      id: "web-dev",
      name: "Web Development",
      icon: <Globe size={24} />,
      description: "Custom websites and web applications"
    },
    {
      id: "mobile-dev",
      name: "Mobile App Development",
      icon: <Smartphone size={24} />,
      description: "iOS and Android mobile applications"
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      icon: <Brain size={24} />,
      description: "AI-powered solutions and algorithms"
    },
    {
      id: "ui-design",
      name: "UI/UX Design",
      icon: <PenTool size={24} />,
      description: "User-centered design and interfaces"
    },
    {
      id: "ecommerce",
      name: "E-commerce Solutions",
      icon: <ShoppingCart size={24} />,
      description: "Online stores and payment systems"
    },
    {
      id: "data-eng",
      name: "Data Engineering",
      icon: <Database size={24} />,
      description: "Data pipelines and analytics"
    }
  ];

  // Function to get service name from selected ID
  const getServiceNameById = (id: string) => {
    if (id === 'other') return customService ? customService : 'Other';
    const service = serviceOptions.find(service => service.id === id);
    return service ? service.name : id;
  };

  // Format 24-hour time string (HH:mm) into 12-hour with AM/PM
  const formatTimeTo12Hour = (time24: string) => {
    if (!time24) return 'Not specified';
    const parts = time24.split(':');
    if (parts.length === 0) return time24;
    const hour = parseInt(parts[0], 10);
    const minute = parts[1] || '00';
    if (Number.isNaN(hour)) return time24;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = ((hour + 11) % 12) + 1; // converts 0->12,13->1 etc.
    return `${hour12}:${minute} ${ampm}`;
  };

  // FAQ data
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a comprehensive range of digital services including web design, web development, mobile app development, UI/UX design, graphic design, digital marketing, and content creation. Our team specializes in creating custom solutions tailored to your specific business needs.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. During our initial consultation, we'll provide you with a detailed timeline based on your specific requirements.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer:
        "Yes, we provide comprehensive post-launch support and maintenance services. We offer various support packages that include regular updates, security monitoring, performance optimization, and content updates to ensure your digital product continues to perform optimally.",
    },
    {
      question: "How do you handle project communication?",
      answer:
        "We believe in transparent and regular communication. Depending on your preference, we set up weekly or bi-weekly progress meetings, provide access to our project management tools, and assign a dedicated project manager who serves as your main point of contact throughout the development process.",
    },
    {
      question: "What is your pricing structure?",
      answer:
        "Our pricing is project-based and depends on the scope, complexity, and timeline. We provide detailed quotes after understanding your requirements through an initial consultation. We also offer flexible payment schedules, typically with an initial deposit and milestone-based payments.",
    },
    {
      question: "Can you work with existing systems or designs?",
      answer:
        "Absolutely. We have extensive experience integrating with existing systems and working with established design guidelines. Whether you need to enhance an existing website, integrate with your CRM, or maintain brand consistency, our team can adapt to your current infrastructure and requirements.",
    },
  ];

  // Toggle FAQ expansion
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !message || selectedServices.length === 0) {
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
    // If 'other' selected, ensure the customService value was provided
    if (selectedServices.includes('other') && !customService.trim()) {
      setError('Please describe the custom service you selected.');
      setSubmitting(false);
      return;
    }
    
    // Prepare submission data
    const meetingDateString = selectedDate 
      ? selectedDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : 'Not specified';

    // Prepare template parameters
    const meetingTimeString = selectedTime ? formatTimeTo12Hour(selectedTime) : 'Not specified';

    const templateParams = {
      to_email: 'caffeinecoders.sl@gmail.com',
      from_name: name,
      from_email: email,
      phone: phone || 'Not provided',
      company: companyName || 'Not provided',
      service: selectedServices.length ? selectedServices.map(s => getServiceNameById(s)).join(', ') : 'Not specified',
      message: message,
      meeting_date: meetingDateString,
      meeting_time: meetingTimeString
    };
    
    // Send email using EmailJS (service and template IDs from Vite env)
    const serviceId = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      setError('Email service not configured. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID in your .env file.');
      setSubmitting(false);
      return;
    }

    emailjs.send(serviceId, templateId, templateParams)
      .then((response) => {
        console.log('Email sent successfully:', response);
        setSubmitting(false);
        setSubmitted(true);
        
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setCompanyName('');
        setSelectedServices([]);
        setMessage('');
        setSelectedDate(null);
        setSelectedTime('');
      })
      .catch((err) => {
        console.error('Email sending failed:', err);
        setError('Failed to send your message. Please try again later.');
        setSubmitting(false);
      });
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
          <div className="grid grid-cols-10 h-full">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full" />
            ))}
          </div>
          <div className="grid grid-rows-10 w-full absolute top-0 left-0">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="border-b border-white/10 w-full" />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 backdrop-blur-sm space-x-2 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Mail size={16} />
              <span className="text-sm tracking-wide">GET IN TOUCH</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Let's Talk About Your <span className="border-b-4 border-white">Project</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We're ready to help you bring your vision to life. Fill out the form below and let's start a conversation about your goals.
            </motion.p>
            
            <motion.button 
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-24 bg-white" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Innovative Contact Information */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
                
                <div className="space-y-10 mb-12">
                  <div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white mr-4">
                        <Layers size={20} />
                      </div>
                      <div>
                        <p className="text-lg font-medium mb-1">Instant Mockup</p>
                        <p className="text-gray-600">Share your idea and get a free visual concept within 48 hours. No commitment, just pure creativity to kick-start your vision.</p>
                      </div>
                    </div>
                    <div className="mt-3 ml-16">
                      <a href="#" className="text-black font-medium hover:underline inline-flex items-center">
                        <span>Request design concept</span>
                        <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white mr-4">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="text-lg font-medium mb-1">Rapid Response</p>
                        <p className="text-gray-600">Need answers fast? Our team typically responds within 2 hours during business hours. Try us!</p>
                      </div>
                    </div>
                    <div className="mt-3 ml-16">
                      <a href="mailto:rapid@caffeinatedcreativity.com" className="text-black font-medium hover:underline inline-flex items-center">
                        <span>Get rapid answers</span>
                        <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white mr-4">
                        <MessageCircle size={20} />
                      </div>
                      <div>
                        <p className="text-lg font-medium mb-1">Creative Collaboration</p>
                        <p className="text-gray-600">Have a project that needs some creative minds? Our design thinking sessions can spark innovation.</p>
                      </div>
                    </div>
                    <div className="mt-3 ml-16">
                      <a href="#" className="text-black font-medium hover:underline inline-flex items-center">
                        <span>Start collaborating</span>
                        <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">When We Create</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Brainstorming</p>
                      <p className="font-medium">9:00 AM - 1:00 PM</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Development</p>
                      <p className="font-medium">2:00 PM - 6:00 PM</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Creative Breaks</p>
                      <p className="font-medium">Always Welcome</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-16">
                  <h3 className="text-lg font-semibold mb-4">Join Our Community</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://twitter.com/company"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                      aria-label="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="https://linkedin.com/company"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="https://instagram.com/company"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="https://facebook.com/company"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
                  <p className="text-gray-600 mb-8">We'll get back to you as soon as possible.</p>
                  
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-white mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                      <p className="text-gray-600 mb-6">
                        Your message has been sent successfully to caffeinecoders.sl@gmail.com. <br />
                        We'll be in touch with you shortly.
                      </p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form ref={emailFormRef} onSubmit={handleSubmit} className="space-y-6">
                      {/* Form fields stay the same */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name field */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
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
                              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors" 
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
                              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors" 
                              required 
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Rest of the form fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
                              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors" 
                              placeholder="(123) 456-7890"
                            />
                          </div>
                        </div>
                        
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
                              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors" 
                              placeholder="Your company name"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Innovative service selection with monochrome styling */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Service Needed *</label>
                        <div className="space-y-3">
                          {/* Visible selected service */}
                          {selectedServices.length > 0 && (
                            selectedServices.map(serviceId => (
                              <motion.div 
                                key={serviceId}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-between mb-2 p-3 bg-black text-white rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  {serviceOptions.find(s => s.id === serviceId)?.icon}
                                  <span className="font-medium">{getServiceNameById(serviceId)}</span>
                                </div>
                                <button 
                                  type="button"
                                  className="text-white/70 hover:text-white"
                                  onClick={() => setSelectedServices(selectedServices.filter(s => s !== serviceId))}
                                >
                                  <Check size={18} />
                                </button>
                              </motion.div>
                            ))
                          )}

                          {/* Services grid - updated with monochrome styling */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {serviceOptions.map((service) => (
                              <motion.button
                                key={service.id}
                                type="button"
                                onClick={() => {
                                  if (selectedServices.includes(service.id)) {
                                    setSelectedServices(selectedServices.filter(id => id !== service.id));
                                    if (service.id === 'other') setCustomService('');
                                  } else {
                                    setSelectedServices([...selectedServices, service.id]);
                                  }
                                }}
                                className={`flex flex-col items-center text-center p-4 border rounded-lg transition-all ${
                                  selectedServices.includes(service.id) 
                                    ? 'border-black bg-black/5 shadow-md' 
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className={`w-12 h-12 mb-3 rounded-full ${
                                  selectedServices.includes(service.id) 
                                    ? 'bg-black text-white' 
                                    : 'bg-gray-100 text-black'
                                } flex items-center justify-center`}>
                                  {service.icon}
                                </div>
                                <span className="font-medium">{service.name}</span>
                                <span className="text-xs text-gray-500 mt-1">{service.description}</span>
                              </motion.button>
                            ))}
                            
                            {/* Other option */}
                            <motion.button
                              type="button"
                              onClick={() => {
                                if (selectedServices.includes('other')) {
                                  setSelectedServices(selectedServices.filter(id => id !== 'other'));
                                  setCustomService('');
                                } else {
                                  setSelectedServices([...selectedServices, 'other']);
                                }
                              }}
                              className={`flex flex-col items-center text-center p-4 border rounded-lg transition-all ${
                                selectedServices.includes('other') 
                                  ? 'border-black bg-black/5 shadow-md' 
                                  : 'border-gray-200 hover:border-gray-300 hover:shadow'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-12 h-12 mb-3 rounded-full ${
                                selectedServices.includes('other')
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-black'
                              } flex items-center justify-center`}>
                                <span className="text-2xl">+</span>
                              </div>
                              <span className="font-medium">Other</span>
                              <span className="text-xs text-gray-500 mt-1">Tell us what you need</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Custom service field appears when "Other" is selected */}
                      <AnimatePresence>
                          {selectedServices.includes('other') && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <label htmlFor="customService" className="block text-sm font-medium text-gray-700 mb-1">
                              Please specify
                            </label>
                            <input
                              type="text"
                              id="customService"
                              name="customService"
                              value={customService}
                              onChange={(e) => setCustomService(e.target.value)}
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                              placeholder="Describe the service you need"
                              required={selectedServices.includes('other')}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                        <div className="relative">
                          <span className="absolute top-3 left-3 text-gray-400">
                            <FileText size={18} />
                          </span>
                          <textarea 
                            id="message" 
                            name="message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            rows={5} 
                            className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors" 
                            required 
                            placeholder="Tell us about your project..."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <p className="block text-sm font-medium text-gray-700 mb-1">Schedule a Meeting (Optional)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Calendar size={18} />
                            </span>
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date: Date | null) => setSelectedDate(date)}
                              placeholderText="Select date"
                              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                              minDate={new Date()}
                            />
                          </div>
                          
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Clock size={18} />
                            </span>
                            <input
                              type="time"
                              id="time"
                              name="time"
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                          {error}
                        </div>
                      )}
                      
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={18} className="ml-2" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-gray-50" ref={faqRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-4"
            >
              FAQ
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Find answers to common questions about our services and processes.
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-6"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left p-6 flex justify-between items-center rounded-lg border transition-all ${
                    expandedFAQ === index 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  aria-expanded={expandedFAQ === index}
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white border border-t-0 border-gray-200 rounded-b-lg">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all inline-flex items-center"
            >
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
