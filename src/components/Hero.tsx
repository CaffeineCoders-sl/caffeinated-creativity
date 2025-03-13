import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code, CheckCircle, Zap, Clock, Cloud, 
  GitBranch, Smartphone, Link2, Layout, Shield,
  Sparkles, Lightbulb, UserCheck
} from 'lucide-react';

const Hero = () => {
  // Core expertise areas with descriptions - expanded to 8 items (2 rows)
  const expertise = [
    { 
      name: 'Custom Development',
      icon: <Code size={24} className="text-black" />,
      description: 'Tailor-made applications designed specifically for your unique business requirements.'
    },
    { 
      name: 'AI Integration',
      icon: <Zap size={24} className="text-black" />,
      description: 'Intelligent features that transform your data into actionable insights and automation.'
    },
    { 
      name: 'Cloud Architecture',
      icon: <Cloud size={24} className="text-black" />,
      description: 'Scalable infrastructure that grows with your business and optimizes operational costs.'
    },
    { 
      name: 'Rapid Delivery',
      icon: <Clock size={24} className="text-black" />,
      description: 'Efficient development processes that bring your ideas to market faster.'
    },
    // New expertise items
    { 
      name: 'DevOps Automation',
      icon: <GitBranch size={24} className="text-black" />,
      description: 'Streamlined deployment pipelines that automate testing, integration, and delivery for faster releases.'
    },
    { 
      name: 'Mobile Development',
      icon: <Smartphone size={24} className="text-black" />,
      description: 'Native and cross-platform mobile applications that provide seamless experiences across all devices.'
    },
    { 
      name: 'API Integration',
      icon: <Link2 size={24} className="text-black" />,
      description: 'Connecting systems and services through robust APIs that enable powerful data exchange and functionality.'
    },
    { 
      name: 'UI/UX Design',
      icon: <Layout size={24} className="text-black" />,
      description: 'User-centered design that creates intuitive, engaging, and accessible digital experiences.'
    }
  ];

  // Updated tech stack array with all requested technologies
  const techStack = [
    'React', 
    'Angular',
    'Node.js', 
    'Python', 
    'AWS', 
    'TypeScript', 
    '.NET',
    'Spring Boot',
    'PHP',
    'TensorFlow',
    'Docker'
  ];
  
  // Features for checklist
  const features = [
    {
      title: "Transformative Solutions",
      icon: <Sparkles size={24} className="text-black" />,
      headline: "We transform complex business challenges into powerful software solutions.",
      benefits: [
        "Custom-built applications for your specific business needs",
        "Scalable architecture that grows with your business",
        "Integrated systems that streamline your operations"
      ]
    },
    {
      title: "Future-Ready Engineering",
      icon: <Lightbulb size={24} className="text-black" />,
      headline: "With deep expertise across multiple industries and technologies.",
      benefits: [
        "Future-proof technologies that evolve with your needs",
        "Collaborative approach for tailored solutions",
        "Optimized for performance and scalability"
      ]
    },
    {
      title: "Security & Compliance",
      icon: <Shield size={24} className="text-black" />,
      headline: "Enterprise-grade security built into every solution we deliver.",
      benefits: [
        "Robust security measures against modern threats",
        "Compliance with industry standards and regulations",
        "Data protection that builds customer trust"
      ]
    },
    {
      title: "User-Centered Design",
      icon: <UserCheck size={24} className="text-black" />,
      headline: "Beautiful interfaces that prioritize the user experience.",
      benefits: [
        "Intuitive interfaces that users love to engage with",
        "Accessibility built into every design decision",
        "Balanced aesthetics and functionality"
      ]
    }
  ];

  return (
    <section className="pt-28 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Full-width hero content - with extra space above the heading */}
          <div className="max-w-3xl mx-auto lg:max-w-none mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-black mb-12 leading-tight">
              Engineering exceptional <span className="text-black">digital experiences</span>
            </h1>
            
            {/* Simple text description replacing feature cards */}
            <div className="mb-20 max-w-4xl">
              <p className="text-xl text-black mb-8 leading-relaxed">
                We transform complex business challenges into powerful software solutions that drive real business impact. 
                Our expert team designs, builds, and scales applications with a focus on your unique requirements and future growth.
              </p>
              
              <p className="text-xl text-black mb-8 leading-relaxed">
                With deep expertise across multiple industries and technologies, we deliver custom software that evolves with your business. 
                Our collaborative approach ensures solutions that are not only tailored to your needs but optimized for performance and security.
              </p>
              
              <p className="text-xl text-black leading-relaxed">
                From enterprise-grade security to user-centered design, we build applications that your team will love to use and your 
                customers will trust. Our balanced approach to aesthetics and functionality creates digital experiences that truly stand out.
              </p>
            </div>
            
            {/* Key value propositions in 2 columns on larger screens */}
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 mb-10">
              {['Industry-leading expertise across the full technology stack', 
                'Proven track record of delivering on time and within budget',
                'Strategic partnership approach focused on your long-term success',
                'Continuous innovation that keeps you ahead of the competition'].map((point, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle size={20} className="text-black mr-3 mt-1 flex-shrink-0" />
                  <p className="text-black font-medium">{point}</p>
                </div>
              ))}
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-md shadow-lg hover:bg-gray-900 transition-colors font-medium text-lg"
              >
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/portfolio" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-black text-black rounded-md hover:bg-gray-50 transition-colors font-medium text-lg"
              >
                View Our Work
              </Link>
            </div>
          </div>
          
          {/* HORIZONTAL Expertise areas - full width - now with 2 rows */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-black mb-8 text-center">Our Services & Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertise.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-black">{item.name}</h3>
                  </div>
                  <p className="text-black">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Full-width tech showcase - Updated */}
          <div className="pt-12 border-t border-gray-100">
            <h3 className="text-xl font-bold text-black mb-6">Our Tech Stack</h3>
            <div className="flex flex-wrap gap-4">
              {techStack.map((tech, idx) => (
                <div 
                  key={idx} 
                  className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-black font-medium hover:shadow-sm transition-shadow"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
