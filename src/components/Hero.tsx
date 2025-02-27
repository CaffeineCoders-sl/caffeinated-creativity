
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CodeLineProps {
  delay: number;
  children: React.ReactNode;
}

const CodeLine = ({ delay, children }: CodeLineProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`font-mono text-sm md:text-base text-left mb-2 opacity-0 transform translate-y-2 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : ''
      }`}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Innovation', 'Efficiency', 'Solutions', 'Excellence'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with grid pattern */}
      <div className="absolute inset-0 grid-bg z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent z-10"></div>
      </div>
      
      {/* Noise texture overlay */}
      <div className="noise-overlay"></div>
      
      {/* Animated particles */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-secondary/70"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.5 + 0.3 
            }}
            animate={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                yoyo: true
              }
            }}
            style={{
              width: (2 + Math.random() * 4) + "px",
              height: (2 + Math.random() * 4) + "px",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        <motion.div 
          className="flex-1 space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <motion.div 
              className="tag inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-secondary/20 text-secondary rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Fueling Innovation
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Brewing Digital</span>
                <span className="absolute bottom-0 left-0 w-full h-[8px] bg-secondary/30 -z-10 transform skew-x-12"></span>
              </span>
              {" "}
              <span className="gradient-text font-bold relative">
                {words.map((word, i) => (
                  <span
                    key={word}
                    className={`absolute transition-opacity duration-500 ${
                      i === currentWord ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {word}
                  </span>
                ))}
                <span className="invisible">{words[0]}</span>
              </span>
            </h1>
          </div>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            We infuse energy and creativity into every line of code, crafting solutions that transform ideas into powerful digital experiences.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link 
              to="/services" 
              className="btn-secondary button-shine w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 text-base"
            >
              <Code size={18} />
              <span>Explore Services</span>
            </Link>
            <Link 
              to="/portfolio" 
              className="btn-ghost w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 text-base group"
            >
              <span>View Our Work</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Animated code block */}
        <motion.div 
          className="flex-1 max-w-md mx-auto lg:mx-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-secondary/50 to-secondary/80 rounded-lg blur opacity-30"></div>
            <div className="neo-card neon-border relative rounded-lg p-6 shadow-2xl backdrop-blur-xl border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm font-mono text-muted-foreground">main.ts</div>
              </div>
              
              <div className="space-y-1 font-mono text-sm">
                <CodeLine delay={200}>
                  <span className="text-secondary">class</span> <span className="text-white">CaffeineCoders</span> {'{'}
                </CodeLine>
                <CodeLine delay={700}>
                  <span className="pl-4 text-secondary">constructor</span>() {'{'}
                </CodeLine>
                <CodeLine delay={1200}>
                  <span className="pl-8 text-muted-foreground">this</span>.<span className="text-white">energy</span> = <span className="text-secondary">'unlimited'</span>;
                </CodeLine>
                <CodeLine delay={1700}>
                  <span className="pl-8 text-muted-foreground">this</span>.<span className="text-white">experience</span> = <span className="text-secondary">'exceptional'</span>;
                </CodeLine>
                <CodeLine delay={2200}>
                  <span className="pl-4">{'}'}</span>
                </CodeLine>
                <CodeLine delay={2700}>
                  <span className="pl-4 text-secondary">brew</span>(<span className="text-muted-foreground">idea</span>) {'{'}
                </CodeLine>
                <CodeLine delay={3200}>
                  <span className="pl-8 text-secondary">return</span> <span className="text-secondary">'amazing solution'</span>;
                </CodeLine>
                <CodeLine delay={3700}>
                  <span className="pl-4">{'}'}</span>
                </CodeLine>
                <CodeLine delay={4200}>{'}'}</CodeLine>
              </div>
              
              {/* Blinking cursor */}
              <div className="mt-2 h-5 w-2 bg-secondary animate-pulse-subtle"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute right-0 -bottom-20 w-24 h-24 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="hidden md:block absolute right-20 -top-10 w-20 h-20 bg-secondary/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
