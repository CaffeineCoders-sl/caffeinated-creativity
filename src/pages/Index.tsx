import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import { motion, useInView } from 'framer-motion';
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

  // Featured services data for homepage teaser
  const featuredServices = [
    {
      icon: <Code className="text-white" size={24} />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies.",
      color: "from-blue-600 to-indigo-800",
      link: "/services#web-dev"
    },
    {
      icon: <Smartphone className="text-white" size={24} />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      color: "from-emerald-500 to-teal-700",
      link: "/services#mobile-apps"
    },
    {
      icon: <Brain className="text-white" size={24} />,
      title: "AI Solutions",
      description: "Intelligent systems that learn, adapt, and solve complex problems.",
      color: "from-purple-600 to-violet-800",
      link: "/services#ai-ml"
    },
    {
      icon: <Paintbrush className="text-white" size={24} />,
      title: "UI/UX Design",
      description: "User-centered design that creates meaningful and relevant experiences.",
      color: "from-rose-500 to-pink-700",
      link: "/services#ui-design"
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
      
      {/* Featured Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-black/5 text-black/70 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              OUR EXPERTISE
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Innovative Digital Services
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We combine creativity and technical expertise to deliver exceptional digital solutions.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -8 }}
              >
                <Link to={service.link} className="block h-full">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                    <div className={`w-full h-24 bg-gradient-to-r ${service.color} p-6 flex items-center`}>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        {service.icon}
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                    </div>
                    <div className="px-6 pb-6">
                      <div className="flex items-center text-black group-hover:text-blue-600 transition-colors">
                        <span className="font-medium">Learn more</span>
                        <ChevronRight size={16} className="ml-1 group-hover:ml-3 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
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
              to="/services" 
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
            >
              <span>Explore All Services</span>
              <ArrowRight size={18} className="ml-2" />
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
