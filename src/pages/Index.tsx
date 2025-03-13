import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Paintbrush, 
  ArrowRight, 
  ChevronRight,
  Coffee,
  Star,
  LineChart,
  Users,
  Clock,
  CheckCircle,
  Award,
  Globe,
  Zap,
  Building2,
  ShoppingBag,
  HeartPulse,
  Pill,
  GraduationCap,
  Plane,
  Car,
  DollarSign,
  BarChart4,
  Lightbulb,
  Sparkles,
  Network,
  Lock,
  Tv,
  Share2,
  Factory,
  Hammer
} from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const detailsRef = useRef(null);
  const isDetailsInView = useInView(detailsRef, { once: true, margin: "-100px" });

  // Core service offerings - with enhanced descriptions
  const coreServices = [
    {
      title: "Web Development",
      description: "Custom websites and web applications that meet modern web standards, provide excellent user experiences, and adapt to your business needs. We build solutions that are performant, secure, and scalable.",
      technologies: "React, Vue, Node.js, Django, Laravel",
      icon: <Code size={28} className="text-black" />,
      accent: "left-[10%] w-[30%] bg-blue-100"
    },
    {
      title: "Mobile Applications",
      description: "Native and cross-platform mobile solutions designed for engagement and usability. From concept to App Store, we deliver apps that users love and that drive measurable business results.",
      technologies: "React Native, Flutter, Swift, Kotlin",
      icon: <Smartphone size={28} className="text-black" />,
      accent: "left-[25%] w-[45%] bg-emerald-100"
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent systems that transform raw data into business insights. We help you implement AI solutions that solve complex problems, automate processes, and unlock new opportunities.",
      technologies: "TensorFlow, PyTorch, NLP, Computer Vision",
      icon: <Brain size={28} className="text-black" />,
      accent: "left-[15%] w-[25%] bg-purple-100"
    },
    {
      title: "SaaS Solutions",
      description:
        "Scalable and secure software-as-a-service solutions designed for rapid deployment and seamless integration. Our SaaS offerings empower businesses with flexible, subscription-based models to reduce overhead and drive ROI.",
      technologies: "Cloud, Microservices, API Integration, DevOps",
      icon: <Globe size={28} className="text-black" />,
      accent: "left-[5%] w-[40%] bg-indigo-100"
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We begin by understanding your business, goals, and requirements."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Our team develops a comprehensive plan tailored to your needs."
    },
    {
      number: "03",
      title: "Creation",
      description: "We bring your vision to life with cutting-edge development."
    },
    {
      number: "04",
      title: "Launch",
      description: "Your project goes live with our continued support and optimization."
    }
  ];

  // Industries we work with - updated with innovative approaches and impact descriptions
  const industries = [
    {
      icon: <Building2 size={32} />,
      name: "Finance & Banking",
      description: "Digital-first banking solutions focusing on security and customer experience.",
      impact: "Our fintech innovations reduce operational costs by 40% and increase customer satisfaction scores by 60%.",
      color: "from-blue-500 to-blue-700",
      projects: 47
    },
    {
      icon: <ShoppingBag size={32} />,
      name: "Retail & E-commerce",
      description: "Omnichannel experiences that merge online and offline shopping journeys.",
      impact: "Clients using our solutions report 32% higher conversion rates and 45% improved customer retention.",
      color: "from-emerald-500 to-teal-700",
      projects: 63
    },
    {
      icon: <HeartPulse size={32} />,
      name: "Healthcare",
      description: "Patient-centered digital platforms that modernize care delivery and management.",
      impact: "Our healthcare systems reduce administrative burden by 53% while improving patient engagement metrics 3x.",
      color: "from-red-500 to-rose-700",
      projects: 38
    },
    {
      icon: <Pill size={32} />,
      name: "Pharmaceuticals",
      description: "Digital transformation solutions for research, trials, and distribution networks.",
      impact: "Our platforms have helped accelerate drug development cycles by 28% through intelligent data processing.",
      color: "from-purple-500 to-indigo-700",
      projects: 25
    },
    {
      icon: <GraduationCap size={32} />,
      name: "Education",
      description: "Immersive learning environments that transform how knowledge is delivered and retained.",
      impact: "Students using our digital learning tools show 34% better knowledge retention and 45% higher engagement.",
      color: "from-amber-500 to-orange-700",
      projects: 42
    },
    {
      icon: <Plane size={32} />,
      name: "Travel & Hospitality",
      description: "Experience-enhancing platforms that personalize travel from booking to return.",
      impact: "Our solutions have helped partners increase direct bookings by 57% and boost ancillary revenue by 29%.",
      color: "from-cyan-500 to-sky-700",
      projects: 31
    },
    {
      icon: <Factory size={32} />,
      name: "Manufacturing",
      description: "Smart factory systems integrating IoT and AI for optimized production.",
      impact: "Manufacturers implementing our solutions report 38% improved efficiency and 27% reduced maintenance costs.",
      color: "from-slate-600 to-slate-800",
      projects: 34
    },
    {
      icon: <Zap size={32} />,
      name: "Energy & Utilities",
      description: "Digital transformation solutions for smart grids and renewable energy management.",
      impact: "Our platforms enable 24% better resource allocation and have helped reduce carbon footprints by 31%.",
      color: "from-green-500 to-emerald-700",
      projects: 23
    },
  ];

  // Innovative technologies
  const innovations = [
    {
      icon: <Network size={32} strokeWidth={1.5} />,
      title: "Neural Networks",
      description: "Advanced machine learning models that mimic the human brain.",
      bgColor: "bg-gradient-to-br from-violet-500 to-purple-700"
    },
    {
      icon: <Globe size={32} strokeWidth={1.5} />,
      title: "Edge Computing",
      description: "Processing data closer to where it's created for faster response times.",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      icon: <Lock size={32} strokeWidth={1.5} />,
      title: "Blockchain",
      description: "Secure, decentralized data management for transparent transactions.",
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      icon: <Tv size={32} strokeWidth={1.5} />,
      title: "Augmented Reality",
      description: "Blending digital content with the physical world for enhanced experiences.",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      icon: <Share2 size={32} strokeWidth={1.5} />,
      title: "IoT Platforms",
      description: "Connecting smart devices for data-driven decision making.",
      bgColor: "bg-gradient-to-br from-rose-500 to-pink-600"
    },
    {
      icon: <Zap size={32} strokeWidth={1.5} />,
      title: "API-First Design",
      description: "Building flexible, scalable systems with API integration at the core.",
      bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Caffeinated Creativity transformed our business with a website that truly represents our brand and drives real results.",
      author: "Sarah Johnson",
      position: "CEO, TechVision",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "Their expertise in AI development helped us create an intelligent solution that has revolutionized our customer service.",
      author: "Michael Chen",
      position: "CTO, Innovate Inc.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "From concept to execution, the team delivered a mobile app that exceeded our expectations and delighted our users.",
      author: "Elena Rodriguez",
      position: "Product Manager, AppWorks",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    }
  ];

  // Company stats
  const stats = [
    { value: 250, label: "Projects Completed", icon: <CheckCircle size={24} className="text-green-500" /> },
    { value: 50, label: "Team Members", icon: <Users size={24} className="text-blue-500" /> },
    { value: 15, label: "Years of Experience", icon: <Clock size={24} className="text-amber-500" /> },
    { value: 18, label: "Industry Awards", icon: <Award size={24} className="text-purple-500" /> }
  ];

  // Core expertise areas
  const expertiseAreas = [
    {
      title: "Cutting-Edge Technology",
      description: "We're constantly researching and implementing the latest technologies to ensure your project is future-proof.",
      icon: <Lightbulb size={28} />,
      highlight: "Our engineering team includes specialists in React, Node.js, Python, and Flutter"
    },
    {
      title: "User-Centered Design",
      description: "Every pixel matters. Our design approach focuses on creating intuitive, accessible, and delightful user experiences.",
      icon: <Paintbrush size={28} />,
      highlight: "Our designs have won multiple industry awards for innovation and usability"
    },
    {
      title: "Agile Methodology",
      description: "We work in focused sprints with regular reviews and feedback cycles to keep projects on track and adaptable.",
      icon: <BarChart4 size={28} />,
      highlight: "Clients receive regular updates and working demos throughout the development process"
    },
    {
      title: "Custom Strategy",
      description: "No cookie-cutter solutions. We develop unique strategies aligned with your specific business goals and challenges.",
      icon: <Sparkles size={28} />,
      highlight: "Our strategic approach has helped clients increase conversion rates by an average of 40%"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {/* Innovative Text Information Field - replacing simple layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background pattern elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="grid grid-cols-6 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-black"></div>
            ))}
          </div>
          <div className="grid grid-rows-6 w-full absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-b border-black"></div>
            ))}
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gray-50 rounded-full"
              style={{
                width: `${80 + Math.random() * 120}px`,
                height: `${80 + Math.random() * 120}px`,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                opacity: 0.4,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 10 + Math.random() * 10,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Section headline with creative typography */}
            <motion.div 
              className="relative inline-block mb-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-black/5 text-black/70 text-sm font-medium">
                OUR SERVICES
              </span>
            </motion.div>
            
            <motion.div
              className="relative z-10 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 text-black tracking-tight">Digital Solutions</span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 h-3 bg-gray-100 w-full" 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </span>{" "}
                for Modern Businesses
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-xl text-black/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We combine technical expertise and creative thinking to deliver exceptional 
              digital products that help businesses thrive in today's competitive landscape.
            </motion.p>
          </motion.div>

          {/* Innovative Service Display */}
          <div className="space-y-32">
            {coreServices.map((service, idx) => (
              <motion.div 
                key={idx}
                className={`relative ${idx % 2 === 0 ? "" : "md:text-right"}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Background accent shape */}
                <motion.div 
                  className={`absolute h-[80%] top-[10%] ${service.accent} rounded-full opacity-[0.15] blur-xl`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                
                {/* Service Number - Large background */}
                <div className={`absolute top-0 ${idx % 2 === 0 ? 'left-0' : 'right-0'} -z-0 leading-none`}>
                  <span className="text-[180px] font-black text-black opacity-[0.03]">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <div className={`max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative`}>
                  {/* Icon and Title Section */}
                  <div className={`md:col-span-4 flex ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end md:order-last'}`}>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={`relative ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}
                    >
                      <div className="bg-white shadow-xl rounded-xl p-6 inline-block">
                        <div className="w-16 h-16 flex items-center justify-center mb-4">
                          {service.icon}
                        </div>
                        
                        <h3 className="text-3xl font-bold text-black relative mb-1">
                          {service.title}
                        </h3>
                        
                        <div className="w-8 h-1 bg-black mx-auto mt-2 mb-4"></div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {service.technologies.split(', ').map((tech, i) => (
                            <motion.span 
                              key={i}
                              className="inline-block text-xs font-medium bg-gray-100 px-2 py-1 rounded-md text-black"
                              initial={{ opacity: 0, x: idx % 2 === 0 ? -10 : 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.3 + (i * 0.05) }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Description Section */}
                  <motion.div 
                    className={`md:col-span-8 ${idx % 2 === 0 ? '' : 'md:text-right'}`}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <div className="relative">
                      {/* Decorative elements */}
                      <div className={`absolute ${idx % 2 === 0 ? 'left-0' : 'right-0'} top-0 w-12 h-12 border-t-2 border-l-2 border-black opacity-10 ${idx % 2 === 0 ? '' : 'rotate-90'}`}></div>
                      
                      <div className={`pl-8 ${idx % 2 === 0 ? 'border-l-2' : 'border-r-2 pr-8'} border-black/10 py-4`}>
                        <p className="text-xl text-black leading-relaxed mb-8">
                          {service.description.split('. ').map((sentence, i, arr) => (
                            <span key={i}>
                              {i === 0 ? <strong>{sentence}.</strong> : `${sentence}${i < arr.length - 1 ? '.' : ''}`}
                              {i < arr.length - 1 && ' '}
                            </span>
                          ))}
                        </p>
                      </div>
                      
                      <div className={`absolute ${idx % 2 === 0 ? 'right-0' : 'left-0'} bottom-0 w-12 h-12 border-b-2 border-r-2 border-black opacity-10 ${idx % 2 === 0 ? 'rotate-180' : 'rotate-90'}`}></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link 
              to="/services" 
              className="group inline-flex items-center relative overflow-hidden px-10 py-5 border-2 border-black rounded-full"
            >
              <span className="relative z-10 text-lg font-medium text-black group-hover:text-white transition-colors duration-500">
                Explore Our Services In Depth
              </span>
              <ArrowRight size={20} className="ml-3 relative z-10 text-black group-hover:text-white transition-colors duration-500" />
              
              <span className="absolute inset-0 w-full h-full bg-white group-hover:bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Detailed Section with Beautiful UI */}
      <section ref={detailsRef} className="py-32 bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="noise-effect"></div>
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-48 h-48 rounded-full bg-white/5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                repeat: Infinity,
                duration: 15 + Math.random() * 10,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 backdrop-blur-sm space-x-2 mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Coffee size={16} />
              <span className="text-sm tracking-wide">OUR MISSION</span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Brewing Digital Excellence
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We blend creativity with technical expertise to craft digital solutions that captivate users and deliver measurable business results.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-2xl">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-violet-800 rounded-2xl p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    {/* Browser mockup */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="w-full ml-2 bg-white rounded-full h-5"></div>
                      </div>
                      <div className="p-4">
                        {/* Just visual elements */}
                        <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-3"></div>
                        <div className="h-20 bg-gray-100 rounded-lg w-full mb-3 flex items-center justify-center">
                          <Code size={24} className="text-gray-400" />
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full w-4/5 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                      </div>
                    </div>
                    
                    {/* Mobile mockup overlapped */}
                    <div className="absolute -bottom-6 -right-6 w-1/3 bg-white rounded-2xl overflow-hidden shadow-2xl">
                      <div className="bg-gray-900 px-2 py-1 flex justify-center">
                        <div className="w-10 h-1 rounded-full bg-gray-700"></div>
                      </div>
                      <div className="p-2">
                        <div className="h-2 bg-gray-200 rounded-full w-full mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-2/3 mb-2"></div>
                        <div className="h-10 bg-gray-100 rounded-lg w-full mb-2 flex items-center justify-center">
                          <Smartphone size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -right-8 -top-8 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-700 rounded-full blur-3xl opacity-20"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-8">Our Approach to Digital Excellence</h3>
              
              <div className="space-y-8">
                {expertiseAreas.map((area, index) => (
                  <motion.div 
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start">
                      <div className="mr-4 p-3 rounded-full bg-white/10 text-white">
                        {area.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">{area.title}</h4>
                        <p className="text-gray-300 mb-3">{area.description}</p>
                        <div className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">
                          {area.highlight}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link 
              to="/about" 
              className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              <span>Learn More About Us</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="grid-lines-light"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-black/5 text-black/70 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              OUR APPROACH
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How We Work
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our proven process delivers consistent results and exceptional experiences.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 relative">
            {/* Connection lines (visible on lg screens only) */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/10 hidden lg:block -translate-y-1/2"></div>
            
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              >
                <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-8 h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white text-2xl font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Step indicators on the line (visible on lg screens only) */}
                <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full hidden lg:flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Work With - Enhanced with innovation focus */}
      <section className="py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="grid-lines-light"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-black/5 text-black/70 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              INDUSTRY INNOVATION
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transforming Industries
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our digital solutions revolutionize how industries operate, creating measurable impact and driving transformation across sectors.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="h-full flex flex-col">
                  <div className={`w-full p-6 bg-gradient-to-r ${industry.color}`}>
                    <div className="text-white">{industry.icon}</div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
                    <p className="text-gray-600 mb-4">{industry.description}</p>
                    
                    <div className="mt-auto">
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-black">
                        <p className="text-sm text-gray-700 italic">{industry.impact}</p>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <CheckCircle size={16} className="text-green-500 mr-2" />
                        {industry.projects} projects completed
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link 
              to="/portfolio" 
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
            >
              <span>See Industry Case Studies</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
