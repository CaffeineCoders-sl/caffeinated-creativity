
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Laptop, Server, Database, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Code className="w-12 h-12 text-coffee" />,
    title: "Custom Software Development",
    description: "Tailored solutions designed to address your unique business challenges and optimize operations.",
    link: "/services#software"
  },
  {
    icon: <Smartphone className="w-12 h-12 text-coffee" />,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    link: "/services#mobile"
  },
  {
    icon: <Laptop className="w-12 h-12 text-coffee" />,
    title: "Web Development",
    description: "Responsive, high-performance websites and web applications with cutting-edge technologies.",
    link: "/services#web"
  },
  {
    icon: <Server className="w-12 h-12 text-coffee" />,
    title: "Cloud Solutions",
    description: "Scalable, secure cloud infrastructure and migration services to optimize your digital operations.",
    link: "/services#cloud"
  },
  {
    icon: <Database className="w-12 h-12 text-coffee" />,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics and visualization tools.",
    link: "/services#data"
  },
  {
    icon: <Users className="w-12 h-12 text-coffee" />,
    title: "IT Consulting",
    description: "Strategic guidance to align technology with your business goals and maximize ROI.",
    link: "/services#consulting"
  }
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      <Link 
        to={service.link}
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-coffee to-coffee-light opacity-0 group-hover:opacity-100 rounded-xl blur transition duration-500"></div>
          <div className="relative h-full flex flex-col p-6 bg-card rounded-lg border border-border transition-all duration-300 hover:shadow-xl">
            <div className="p-3 rounded-full bg-coffee/10 w-fit mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-muted-foreground flex-1">{service.description}</p>
            <div className={`mt-4 text-coffee-dark font-medium flex items-center transition-all duration-300 ${isHovered ? 'translate-x-2' : ''}`}>
              <span>Learn more</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-container">
      <div className="text-center mb-16">
        <div className="tag mb-3">What We Do</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Brewing <span className="text-coffee-dark">Services</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We blend technology expertise with creative thinking to deliver solutions that drive business growth and user engagement.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link to="/services" className="btn-primary button-shine">
          View All Services
        </Link>
      </div>
    </section>
  );
};

export default Services;
