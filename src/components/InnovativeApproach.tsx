import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Rocket, ChevronRight, Globe, Shield, Star } from 'lucide-react';

const InnovativeApproach = () => {
  const [activeTab, setActiveTab] = useState<string>('ai');
  
  const approaches = {
    ai: {
      title: "AI-First Design Philosophy",
      description: "We integrate artificial intelligence at the core of our solutions, not as an afterthought. This approach ensures that intelligence is built into every aspect of your digital products.",
      bullets: [
        "Machine learning models trained on your specific business context",
        "Continuous learning systems that improve over time",
        "Ethical AI implementation with human oversight",
        "Explainable AI that provides transparency in decision making"
      ],
      icon: <Brain className="text-blue-500" size={64} strokeWidth={1} />,
      image: "/images/ai-approach.jpg"
    },
    innovation: {
      title: "Rapid Innovation Cycles",
      description: "We employ short, focused innovation sprints to quickly test new ideas and approaches before full implementation, reducing risk while accelerating breakthrough solutions.",
      bullets: [
        "2-week innovation sprints to test concepts",
        "Cross-functional innovation teams",
        "Data-driven decision making",
        "Fail fast, learn faster methodology"
      ],
      icon: <Rocket className="text-purple-500" size={64} strokeWidth={1} />,
      image: "/images/innovation-approach.jpg"
    },
    future: {
      title: "Future-Proofing Strategy",
      description: "Our solutions are built with scalability and adaptation in mind, ensuring your investment continues to deliver value as technologies and markets evolve.",
      bullets: [
        "Modular architecture that adapts to new technologies",
        "API-first design for maximum integration potential",
        "Regular technology stack assessments",
        "Continuous modernization roadmap"
      ],
      icon: <Globe className="text-green-500" size={64} strokeWidth={1} />,
      image: "/images/future-approach.jpg"
    },
    security: {
      title: "Security By Design",
      description: "We integrate advanced security methodologies throughout the development process, not just as a final step, ensuring your digital assets are protected at every layer.",
      bullets: [
        "Zero-trust architecture implementation",
        "Regular penetration testing and security audits",
        "Automated vulnerability scanning in CI/CD pipeline",
        "Compliance-ready design patterns"
      ],
      icon: <Shield className="text-red-500" size={64} strokeWidth={1} />,
      image: "/images/security-approach.jpg"
    }
  };
  
  type ApproachKey = keyof typeof approaches;
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Star size={16} className="mr-2" />
            <span className="text-sm font-medium">INNOVATION AT CORE</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Approach Is Different
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We don't just implement technologies; we reimagine what's possible through innovative methodologies and forward-thinking strategies.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {Object.keys(approaches).map((key) => (
              <motion.button
                key={key}
                className={`w-full text-left p-5 rounded-xl transition-all ${
                  activeTab === key 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                    : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm'
                }`}
                onClick={() => setActiveTab(key as ApproachKey)}
                whileHover={{ x: activeTab === key ? 0 : 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{approaches[key as ApproachKey].title}</h3>
                  {activeTab === key && <ChevronRight />}
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-2xl p-1 overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="absolute inset-0 rounded-xl overflow-hidden p-8 flex flex-col justify-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                  <div className="mb-6">
                    {approaches[activeTab as ApproachKey].icon}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {approaches[activeTab as ApproachKey].title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    {approaches[activeTab as ApproachKey].description}
                  </p>
                  
                  <ul className="space-y-3">
                    {approaches[activeTab as ApproachKey].bullets.map((bullet, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start text-white/80"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Zap size={16} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Abstract shapes for visual interest */}
            <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovativeApproach;
