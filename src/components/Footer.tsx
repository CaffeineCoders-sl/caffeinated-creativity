
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
    <footer className="bg-white pt-16 pb-8 relative border-t border-gray-100">
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
              <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 transition-all duration-300 group-hover:shadow-lg border border-gray-200">
                <img 
                  src="/lovable-uploads/5c9e8331-194f-4d58-8b01-bb4dbb6018a7.png" 
                  alt="CaffeineCoders Logo" 
                  className="w-full h-full object-cover scale-[0.7] transform group-hover:scale-[0.75] transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-secondary">Caffeine</span>
                <span className="text-black">Coders</span>
              </span>
            </Link>
            
            <p className="text-gray-600">
              Fueling innovation, one line of code at a time. We blend technology expertise with creative thinking to deliver exceptional digital solutions.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <h3 className="text-lg font-bold mb-4 text-black">Quick Links</h3>
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
                    className="text-gray-600 hover:text-secondary transition-colors flex items-center group"
                  >
                    <span className="w-0 h-[1px] bg-secondary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <h3 className="text-lg font-bold mb-4 text-black">Services</h3>
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
                    className="text-gray-600 hover:text-secondary transition-colors flex items-center group"
                  >
                    <span className="w-0 h-[1px] bg-secondary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <h3 className="text-lg font-bold mb-4 text-black">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:hello@caffeinecoders.com"
                  className="flex items-center text-gray-600 hover:text-secondary transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5 text-secondary" />
                 caffeinecoders.sl@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+94767319134"
                  className="flex items-center text-gray-600 hover:text-secondary transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5 text-secondary" />
                  +94 76 731 9134
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} CaffeineCoders. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
