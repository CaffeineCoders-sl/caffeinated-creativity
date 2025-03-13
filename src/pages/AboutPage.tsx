
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
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
                  Founded in 2016, CaffeineCoders started as a small team of passionate developers with a shared vision: to create innovative software solutions that fuel business growth and deliver exceptional user experiences.
                </p>
                <p className="text-gray-600 mb-4">
                  Today, we've grown into a versatile team of developers, designers, strategists, and project managers who bring diverse skills and perspectives to every project we undertake.
                </p>
                <p className="text-gray-600">
                  Our name reflects our approach—we combine the energy and alertness that comes from a great cup of coffee with the precision and creativity of expert coding.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-lg blur opacity-30"></div>
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                    alt="Team collaboration" 
                    className="w-full h-auto"
                  />
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
          
          {/* Team */}
          <section>
            <h2 className="text-3xl font-bold mb-10 text-center text-black">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Shamila Pramuditha",
                  role: "CEO",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300"
                },
                {
                  name: "Samantha Lee",
                  role: "CTO",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300"
                },
                {
                  name: "Michael Chen",
                  role: "Lead Developer",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300"
                },
                {
                  name: "Olivia Rodriguez",
                  role: "UX/UI Designer",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mx-auto w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
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
                  year: "2016",
                  title: "Foundation",
                  description: "CaffeineCoders was founded with a mission to create innovative digital solutions."
                },
                {
                  year: "2018",
                  title: "First Major Client",
                  description: "Secured our first enterprise client and expanded our team to 10 members."
                },
                {
                  year: "2020",
                  title: "International Expansion",
                  description: "Opened our first international office and diversified our service offerings."
                },
                {
                  year: "2023",
                  title: "Today",
                  description: "Continuing to grow and innovate with a team of 30+ professionals serving clients worldwide."
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
