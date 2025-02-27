
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const ContactPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen"
    >
      <div className="section-container text-center mb-8">
        <div className="tag mb-3">Get In Touch</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact <span className="text-coffee-dark">Us</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you. Reach out to our team with any questions or inquiries.
        </p>
      </div>
      
      <Contact />
    </motion.div>
  );
};

export default ContactPage;
