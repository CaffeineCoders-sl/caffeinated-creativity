
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight } from 'lucide-react';

const About = () => {
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const startCounting = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const duration = 2000; // ms
      const step = target / (duration / 16); // 60fps approx
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current).toString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toString();
        }
      };
      
      updateCounter();
    });
  };
  
  return (
    <section id="about" className="section-container overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-lg blur opacity-30"></div>
            <div className="relative rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=800" 
                  alt="Team collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/20 to-transparent opacity-40"></div>
              <div className="absolute bottom-0 right-0 m-6 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                <div className="flex items-center justify-center space-x-1">
                  <Coffee className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium text-gray-800">Brewing excellence since 2016</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 space-y-6">
          <div className="tag">About Us</div>
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            We're a team of <span className="text-secondary">caffeinated</span> tech enthusiasts
          </h2>
          
          <p className="text-gray-600">
            CaffeineCoders was founded on a simple principle: combine the energy of coffee with the precision of code to create exceptional digital solutions. Our team of passionate developers, designers, and strategists work together to bring your ideas to life.
          </p>
          
          <p className="text-gray-600">
            With expertise in modern technologies and a commitment to quality, we deliver projects that exceed expectations. Whether you're a startup looking to disrupt the market or an established business seeking digital transformation, we have the skills and experience to help you succeed.
          </p>
          
          <div className="pt-4">
            <Link to="/about" className="group inline-flex items-center text-secondary font-medium hover:underline">
              Learn more about our story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div 
        ref={counterRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 py-12 rounded-xl bg-gray-50 backdrop-blur-sm"
      >
        {[
          { value: 120, label: "Projects Completed" },
          { value: 45, label: "Happy Clients" },
          { value: 6, label: "Years Experience" },
          { value: 15, label: "Team Members" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center">
              <span 
                className="counter text-4xl font-bold text-secondary" 
                data-target={stat.value}
              >
                0
              </span>
              <span className="text-4xl font-bold text-secondary">+</span>
            </div>
            <div className="text-gray-600 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
