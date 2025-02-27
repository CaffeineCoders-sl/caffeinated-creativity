
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A fully responsive online shopping platform with advanced product filtering and secure checkout.",
    tags: ["Web Development", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1561997968-aa846c2bf9ba?auto=format&fit=crop&q=80&w=500&h=300",
    link: "/portfolio/ecommerce"
  },
  {
    id: 2,
    title: "Finance Management App",
    description: "Mobile application for personal finance tracking with expense categorization and budget planning.",
    tags: ["Mobile", "React Native", "Firebase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=300",
    link: "/portfolio/finance-app"
  },
  {
    id: 3,
    title: "Healthcare Dashboard",
    description: "Interactive analytics dashboard for healthcare providers to monitor patient data and outcomes.",
    tags: ["Data Visualization", "Vue.js", "D3.js"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500&h=300",
    link: "/portfolio/healthcare"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-muted/30 py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="tag mb-3">Our Work</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-coffee-dark">Projects</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our recent work and see how we've helped clients transform their ideas into reality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/portfolio" className="btn-primary button-shine">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${project.image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag text-xs py-1">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-coffee-dark">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        
        <Link 
          to={project.link} 
          className="inline-flex items-center text-coffee-dark font-medium hover:underline"
        >
          <span>View Project</span>
          <ArrowRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
