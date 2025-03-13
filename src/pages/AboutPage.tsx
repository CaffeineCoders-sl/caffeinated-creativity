import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, PenTool, Users, Rocket, Zap, Settings, Coffee } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // For interactive process steps
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Add state to track logo loading status
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Define development process steps
  const processSteps = [
    {
      icon: <PenTool size={24} />,
      title: "Discovery & Design",
      description: "We start by understanding your vision, goals, and requirements. Our designers then create wireframes and prototypes to visualize the solution.",
      benefits: ["User-centered approach", "Iterative design process", "Clear project scope"]
    },
    {
      icon: <Code size={24} />,
      title: "Development",
      description: "Our developers bring designs to life using the latest technologies and best practices. We maintain transparent communication throughout the build phase.",
      benefits: ["Clean, efficient code", "Regular progress updates", "Rigorous testing"]
    },
    {
      icon: <Rocket size={24} />,
      title: "Deployment",
      description: "We carefully launch your project, ensuring everything works perfectly in the live environment. Our deployment process minimizes downtime and risks.",
      benefits: ["Thorough pre-launch testing", "Smooth transition", "Performance optimization"]
    },
    {
      icon: <Settings size={24} />,
      title: "Maintenance & Growth",
      description: "Our relationship continues after launch with ongoing support, updates, and strategic improvements to help your digital product evolve.",
      benefits: ["Regular security updates", "Performance monitoring", "Data-driven improvements"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen bg-white text-black"
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="tag mb-3 bg-secondary/10 text-secondary">Our Story</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">About <span className="text-secondary">CaffeineCoders</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get to know the team behind the code and discover our journey from humble beginnings to industry excellence.
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Company Overview */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-black">Who We Are</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2024, CaffeineCoders started as a small team of passionate developers with a shared vision: to create innovative software solutions that fuel business growth and deliver exceptional user experiences.
                </p>
                <p className="text-gray-600 mb-4">
                  We're a young but rapidly growing team of developers, designers, strategists, and project managers who bring diverse skills and perspectives to every project we undertake.
                </p>
                <p className="text-gray-600">
                  Our name reflects our approach—we combine the energy and alertness that comes from a great cup of coffee with the precision and creativity of expert coding.
                </p>
              </div>
              <div className="relative flex items-center justify-center py-10">
                {/* Decorative background effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6b4226]/30 to-[#c0955a]/20 rounded-lg blur-xl opacity-50"></div>
                
                {/* Logo container */}
                <div className="relative z-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center">
                  {logoError ? (
                    <div className="flex items-center gap-4">
                      {/* Fallback logo if image fails to load */}
                      <div className="text-secondary">
                        <Coffee size={48} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight">
                          Caffeine<span className="text-secondary">Coders</span>
                        </h3>
                        <p className="text-sm text-gray-500">Brewing Digital Excellence</p>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src="/images/logo.png" 
                      alt="CaffeineCoders Logo" 
                      className="max-w-full h-auto max-h-84 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                      onLoad={() => setLogoLoaded(true)}
                      onError={() => setLogoError(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Values */}
          <section className="py-12 px-6 rounded-2xl bg-gray-50">
            <h2 className="text-3xl font-bold mb-10 text-center text-black">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We embrace emerging technologies and creative thinking to develop forward-looking solutions."
                },
                {
                  title: "Quality",
                  description: "We are committed to excellence in everything we build, from code architecture to user experience."
                },
                {
                  title: "Collaboration",
                  description: "We believe in the power of teamwork, both within our team and in partnership with our clients."
                }
              ].map((value, index) => (
                <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-secondary">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Our Process - New Section replacing Meet Our Team */}
          <section className="py-16 relative">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">How We Work</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-center mb-16">
              We follow a proven process that delivers exceptional results. Our methodology combines creativity, technical expertise, and strategic thinking to transform your ideas into reality.
            </p>
            
            {/* Process Timeline - Fixed */}
            <div className="max-w-5xl mx-auto relative">
              {/* Connecting line - Fixed positioning */}
              <div className="absolute top-[52px] left-0 right-0 h-1 bg-gray-200 z-0 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* Step number and icon - Improved */}
                    <div className="flex flex-col items-center mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 z-10 transition-all border-4 border-white ${
                        activeStep === index 
                          ? 'bg-secondary scale-110 shadow-lg' 
                          : 'bg-gray-700'
                      }`}>
                        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center border border-gray-200 shadow-sm">
                          {index + 1}
                        </span>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-center">{step.title}</h3>
                    </div>
                    
                    {/* Description */}
                    <div className={`p-6 rounded-lg transition-all ${
                      activeStep === index 
                        ? 'bg-gray-50 shadow-md' 
                        : 'bg-white'
                    }`}>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      {/* Benefits list */}
                      <ul className="space-y-1">
                        {step.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <Zap size={14} className="text-secondary mr-2 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Show arrows between steps on mobile */}
                    {index < processSteps.length - 1 && (
                      <div className="flex justify-center mt-4 mb-4 md:hidden">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-16">
              <p className="text-gray-600 mb-4">Ready to start your project with us?</p>
              <a 
                href="/contact" 
                className="inline-block px-8 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </section>
          
          {/* Timeline */}
          <section className="py-12">
            <h2 className="text-3xl font-bold mb-10 text-center text-black">Our Journey</h2>
            <div className="relative mx-auto max-w-3xl">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
              
              {[
                {
                  year: "2024",
                  title: "Foundation",
                  description: "CaffeineCoders was founded with a mission to create innovative digital solutions for modern businesses."
                },
                {
                  year: "Q3 2024",
                  title: "First Key Projects",
                  description: "Successfully delivered our initial client projects and established our core service offerings."
                },
                {
                  year: "2025",
                  title: "Team Expansion",
                  description: "Planning to grow our talented team and extend our capabilities across new technology domains."
                },
                {
                  year: "variable x",
                  title: "Future Vision",
                  description: "Aiming to become a recognized industry leader with a diverse portfolio of successful digital transformations."
                }
              ].map((milestone, index) => (
                <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'text-right left-timeline' : 'text-left right-timeline'}`}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-full mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold mb-2 text-black">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-secondary border-4 border-white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
