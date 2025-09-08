
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: "Finance Management App",
    description: "Mobile application for personal finance tracking with expense categorization and budget planning features.",
    tags: ["Mobile", "React Native", "Firebase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
  // link removed: products are shown but not linked
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A fully responsive online shopping platform with advanced product filtering and secure checkout.",
    tags: ["Web Development", "React", "Node.js"],
  // use placeholder image (SVGs removed)
  image: "public/images/ecommerce.jpg",
  },
  {
    id: 3,
    title: "Healthcare Dashboard",
    description: "Interactive analytics dashboard for healthcare providers to monitor patient data and outcomes.",
    tags: ["Data Visualization", "Vue.js", "D3.js"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=500",
  // link removed: products are shown but not linked
  },
  {
    id: 4,
    title: "AI-Powered Chatbot",
    description: "Intelligent customer service chatbot that leverages machine learning to provide accurate responses.",
    tags: ["AI", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800&h=500",
  // link removed: products are shown but not linked
  },
  {
    id: 5,
    title: "Productivity Suite",
    description: "Comprehensive task management and productivity application with team collaboration features.",
    tags: ["SaaS", "Angular", "MongoDB"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=500",
  // link removed: products are shown but not linked
  },
  {
    id: 6,
    title: "Real Estate Platform",
    description: "Property listing and management platform with virtual tours and advanced search capabilities.",
    tags: ["Web App", "Next.js", "GraphQL"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800&h=500",
  // link removed: products are shown but not linked
  }
  ,
  {
    id: 7,
    title: "Automation Applications",
    description: "Custom automation and workflow applications to streamline business processes and reduce manual work.",
    tags: ["Automation", "Node.js", "Integrations"],
  // use placeholder image (SVGs removed)
  image: "public/images/automation.jpg",
  },
  {
    id: 8,
    title: "Learning Management System (LMS)",
    description: "Scalable LMS platforms for delivering online courses, tracking progress, and managing learners.",
    tags: ["Education", "LMS", "React"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800&h=500",
    // link removed
  }
  ,
  {
    id: 9,
    title: "POS Systems",
    description: "Point-of-sale solutions for retail and hospitality, including inventory, payments, and reporting features.",
    tags: ["POS", "Retail", "Payments"],
  // use placeholder image (SVGs removed)
  image: "public/images/pos.jpg",
  }
];

const PortfolioPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const staggerAnimation = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen relative bg-white"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg z-0"></div>
      
      {/* Noise overlay */}
      <div className="noise-overlay"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tag mb-3"
          >
            Our Work
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-black"
          >
            Our <span className="gradient-text">Portfolio</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Explore our past projects and discover how we've helped businesses achieve their digital goals.
          </motion.p>
        </div>
        
        <motion.div 
          variants={staggerAnimation}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemAnimation}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link 
            to="/contact" 
            className="btn-secondary neon-border px-6 py-3 inline-flex items-center space-x-2"
          >
            <span>Start Your Project</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="overflow-hidden rounded-lg bg-white border border-gray-200 h-full group relative shadow-md hover:shadow-xl transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${project.image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Tags */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag text-xs py-1 bg-secondary/30">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-black transition-colors group-hover:text-secondary">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {project.description}
        </p>
        
  {/* project action removed - cards are static and not linked */}
      </div>
      
      {/* Hover effect border */}
      <div className={`absolute inset-0 border-2 border-secondary/0 rounded-lg transition-all duration-300 pointer-events-none ${isHovered ? 'border-secondary/50 scale-[0.98]' : 'scale-100'}`}></div>
    </div>
  );
};

export default PortfolioPage;
