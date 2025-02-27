
import { Link } from 'react-router-dom';
import { Coffee, Twitter, Instagram, Linkedin, Github, Heart, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <footer className="bg-black pt-16 pb-8 relative">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-bg opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div className="space-y-4" variants={fadeInUpVariants}>
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 overflow-hidden rounded-full bg-white/5 transition-all duration-300 group-hover:shadow-lg border border-white/10">
                <img 
                  src="/lovable-uploads/5c9e8331-194f-4d58-8b01-bb4dbb6018a7.png" 
                  alt="CaffeineCoders Logo" 
                  className="w-full h-full object-cover scale-[0.7] transform group-hover:scale-[0.75] transition-transform duration-300 brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-secondary">Caffeine</span>
                <span className="text-white">Coders</span>
              </span>
            </Link>
            
            <p className="text-muted-foreground">
              Fueling innovation, one line of code at a time. We blend technology expertise with creative thinking to deliver exceptional digital solutions.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-white hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-white hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-white hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-white hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { text: "Home", link: "/" },
                { text: "About Us", link: "/about" },
                { text: "Services", link: "/services" },
                { text: "Portfolio", link: "/portfolio" },
                { text: "Contact", link: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link}
                    className="text-muted-foreground hover:text-secondary transition-colors flex items-center group"
                  >
                    <span className="w-0 h-[1px] bg-secondary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                { text: "Custom Software", link: "/services#software" },
                { text: "Mobile Apps", link: "/services#mobile" },
                { text: "Web Development", link: "/services#web" },
                { text: "Cloud Solutions", link: "/services#cloud" },
                { text: "Data Analytics", link: "/services#data" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link}
                    className="text-muted-foreground hover:text-secondary transition-colors flex items-center group"
                  >
                    <span className="w-0 h-[1px] bg-secondary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Coffee className="mr-2 h-5 w-5 mt-0.5 text-secondary" />
                <span className="text-muted-foreground">
                  123 Tech Brew Lane<br />
                  San Francisco, CA 94105
                </span>
              </li>
              <li>
                <a 
                  href="mailto:hello@caffeinecoders.com"
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5 text-secondary" />
                  hello@caffeinecoders.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+11234567890"
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5 text-secondary" />
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} CaffeineCoders. All rights reserved.
            </p>
            
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-muted-foreground text-sm flex items-center">
                Crafted with <Heart className="mx-1 h-4 w-4 text-secondary animate-pulse-subtle" /> and lots of code
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
