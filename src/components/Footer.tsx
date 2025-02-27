
import { Link } from 'react-router-dom';
import { Coffee, Twitter, Instagram, Linkedin, Github, Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 overflow-hidden rounded-full bg-coffee transition-all duration-300 group-hover:shadow-lg">
                <img 
                  src="/lovable-uploads/5c9e8331-194f-4d58-8b01-bb4dbb6018a7.png" 
                  alt="CaffeineCoders Logo" 
                  className="w-full h-full object-cover scale-[0.7] transform group-hover:scale-[0.75] transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-coffee-dark">Caffeine</span>
                <span>Coders</span>
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
                className="p-2 rounded-full bg-coffee-light/10 text-coffee-dark hover:bg-coffee-light/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-coffee-light/10 text-coffee-dark hover:bg-coffee-light/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-coffee-light/10 text-coffee-dark hover:bg-coffee-light/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-coffee-light/10 text-coffee-dark hover:bg-coffee-light/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
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
                    className="text-muted-foreground hover:text-coffee-dark transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
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
                    className="text-muted-foreground hover:text-coffee-dark transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Coffee className="mr-2 h-5 w-5 mt-0.5 text-coffee-dark" />
                <span className="text-muted-foreground">
                  123 Tech Brew Lane<br />
                  San Francisco, CA 94105
                </span>
              </li>
              <li>
                <a 
                  href="mailto:hello@caffeinecoders.com"
                  className="flex items-center text-muted-foreground hover:text-coffee-dark transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5 text-coffee-dark" />
                  hello@caffeinecoders.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+11234567890"
                  className="flex items-center text-muted-foreground hover:text-coffee-dark transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5 text-coffee-dark" />
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} CaffeineCoders. All rights reserved.
            </p>
            
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-muted-foreground text-sm flex items-center">
                Crafted with <Heart className="mx-1 h-4 w-4 text-destructive" /> and lots of coffee
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
