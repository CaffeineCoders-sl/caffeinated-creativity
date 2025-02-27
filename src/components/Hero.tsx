
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Code, ArrowRight } from 'lucide-react';

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
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-coffee-light/10 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      {/* Floating coffee beans (decorative) */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 rounded-full bg-coffee-dark opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 7}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        <div className="flex-1 space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div className="space-y-2">
            <div className="tag inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-coffee-light/20 text-coffee-dark rounded-full">
              Fueling Innovation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Brewing Digital <span className="text-coffee-dark">
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
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
            We infuse energy and creativity into every line of code, crafting solutions that transform ideas into powerful digital experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link 
              to="/services" 
              className="btn-primary button-shine w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 text-base"
            >
              <Coffee size={18} />
              <span>Explore Services</span>
            </Link>
            <Link 
              to="/portfolio" 
              className="btn-ghost w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 text-base"
            >
              <span>View Our Work</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        {/* Animated code block */}
        <div className="flex-1 max-w-md mx-auto lg:mx-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-coffee-dark via-coffee to-code-blue rounded-lg blur opacity-25"></div>
            <div className="glass-card relative rounded-lg p-6 shadow-xl bg-card/50 backdrop-blur-xl border border-coffee/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm font-mono text-muted-foreground">main.js</div>
              </div>
              
              <div className="space-y-1 font-mono text-sm">
                <CodeLine delay={200}>
                  <span className="text-purple-500">class</span> <span className="text-yellow-500">CaffeineCoders</span> {'{'}
                </CodeLine>
                <CodeLine delay={700}>
                  <span className="pl-4 text-purple-500">constructor</span>() {'{'}
                </CodeLine>
                <CodeLine delay={1200}>
                  <span className="pl-8 text-blue-500">this</span>.<span className="text-green-500">energy</span> = <span className="text-orange-500">'unlimited'</span>;
                </CodeLine>
                <CodeLine delay={1700}>
                  <span className="pl-8 text-blue-500">this</span>.<span className="text-green-500">experience</span> = <span className="text-orange-500">'exceptional'</span>;
                </CodeLine>
                <CodeLine delay={2200}>
                  <span className="pl-4">{'}'}</span>
                </CodeLine>
                <CodeLine delay={2700}>
                  <span className="pl-4 text-purple-500">brew</span>(<span className="text-blue-500">idea</span>) {'{'}
                </CodeLine>
                <CodeLine delay={3200}>
                  <span className="pl-8 text-purple-500">return</span> <span className="text-orange-500">'amazing solution'</span>;
                </CodeLine>
                <CodeLine delay={3700}>
                  <span className="pl-4">{'}'}</span>
                </CodeLine>
                <CodeLine delay={4200}>{'}'}</CodeLine>
              </div>
              
              {/* Blinking cursor */}
              <div className="mt-2 h-5 w-2 bg-foreground/70 animate-pulse-subtle"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute right-0 -bottom-20 w-24 h-24 bg-coffee-light/10 rounded-full blur-3xl"></div>
          <div className="hidden md:block absolute right-20 -top-10 w-20 h-20 bg-code-blue/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
