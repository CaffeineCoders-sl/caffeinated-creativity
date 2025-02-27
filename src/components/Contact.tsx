
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Coffee, Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-16">
        <div className="tag mb-3">Get In Touch</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's <span className="text-coffee-dark">Talk Coffee</span> & Code</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or want to learn more about our services? We'd love to hear from you!
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-muted-foreground mb-8">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-start space-x-4"
          >
            <div className="mt-1 p-2 rounded-full bg-coffee-light/20 text-coffee-dark">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">Email</h4>
              <a href="mailto:hello@caffeinecoders.com" className="text-muted-foreground hover:text-coffee-dark transition-colors">
                hello@caffeinecoders.com
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-start space-x-4"
          >
            <div className="mt-1 p-2 rounded-full bg-coffee-light/20 text-coffee-dark">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">Phone</h4>
              <a href="tel:+11234567890" className="text-muted-foreground hover:text-coffee-dark transition-colors">
                +1 (123) 456-7890
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-start space-x-4"
          >
            <div className="mt-1 p-2 rounded-full bg-coffee-light/20 text-coffee-dark">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">Office</h4>
              <address className="text-muted-foreground not-italic">
                123 Tech Brew Lane<br />
                San Francisco, CA 94105
              </address>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="pt-6"
          >
            <div className="p-6 rounded-lg bg-coffee-light/10 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-3">
                <Coffee className="h-6 w-6 text-coffee-dark" />
                <h4 className="text-lg font-bold">Coffee Chat</h4>
              </div>
              <p className="text-muted-foreground">
                Book a virtual coffee chat with one of our experts to discuss your project ideas and explore how we can help.
              </p>
              <div className="mt-4">
                <a 
                  href="#schedule" 
                  className="inline-flex items-center space-x-2 text-coffee-dark font-medium hover:underline"
                >
                  <span>Schedule a call</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-coffee-light to-coffee opacity-25 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-coffee focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-coffee focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-coffee focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-coffee focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary button-shine w-full flex justify-center items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
