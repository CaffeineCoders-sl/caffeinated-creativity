
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: "Finance Management App",
    description: "Mobile application for personal finance tracking with expense categorization and budget planning features.",
    tags: ["Mobile", "React Native", "Firebase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
    link: "/portfolio/finance-app"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A fully responsive online shopping platform with advanced product filtering and secure checkout.",
    tags: ["Web Development", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1561997968-aa846c2bf9ba?auto=format&fit=crop&q=80&w=800&h=500",
    link: "/portfolio/ecommerce"
  },
  {
    id: 3,
    title: "Healthcare Dashboard",
    description: "Interactive analytics dashboard for healthcare providers to monitor patient data and outcomes.",
    tags: ["Data Visualization", "Vue.js", "D3.js"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=500",
    link: "/portfolio/healthcare"
  },
  {
    id: 4,
    title: "AI-Powered Chatbot",
    description: "Intelligent customer service chatbot that leverages machine learning to provide accurate responses.",
    tags: ["AI", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800&h=500",
    link: "/portfolio/ai-chatbot"
  },
  {
    id: 5,
    title: "Productivity Suite",
    description: "Comprehensive task management and productivity application with team collaboration features.",
    tags: ["SaaS", "Angular", "MongoDB"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=500",
    link: "/portfolio/productivity-suite"
  },
  {
    id: 6,
    title: "Real Estate Platform",
    description: "Property listing and management platform with virtual tours and advanced search capabilities.",
    tags: ["Web App", "Next.js", "GraphQL"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800&h=500",
    link: "/portfolio/real-estate"
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
      className="pt-20 min-h-screen relative"
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
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="gradient-text">Portfolio</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
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
      className="overflow-hidden rounded-lg neo-card border border-white/10 h-full group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out grayscale hover:grayscale-0"
          style={{
            backgroundImage: `url(${project.image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
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
        <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-secondary">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        
        <Link 
          to={project.link} 
          className="inline-flex items-center text-secondary font-medium hover:underline"
        >
          <span>View Project</span>
          <ExternalLink className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1 translate-y-[-2px]' : ''}`} />
        </Link>
      </div>
      
      {/* Hover effect border */}
      <div className={`absolute inset-0 border-2 border-secondary/0 rounded-lg transition-all duration-300 pointer-events-none ${isHovered ? 'border-secondary/50 scale-[0.98]' : 'scale-100'}`}></div>
    </div>
  );
};

export default PortfolioPage;
