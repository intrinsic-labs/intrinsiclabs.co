'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CompanyStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (timelineRef.current && typeof window !== 'undefined') {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0,
            y: 30
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1
          }
        );
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="company-story"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background elements */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/80"></div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
      </div> */}

      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >

          
          <h2 className="heading-lg mb-6 font-display">Our Journey</h2>
          
          <p className="paragraph text-neutral-800 max-w-2xl mx-auto">
            Intrinsic Labs was founded with a simple mission: create exceptional digital experiences that solve real problems. Our journey is defined by a commitment to quality, innovation, and client success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Right side: Image */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="h-[500px] md:h-auto rounded-lg overflow-hidden border border-primary/20 md:border-0 flex items-center justify-center">
                <PlaceholderImage 
                  width={600} 
                  height={800} 
                  className="rounded-lg overflow-hidden object-cover w-full h-full"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>
              
              {/* <div className="absolute bottom-4 right-4 md:-bottom-6 md:-left-6 w-auto md:w-24 h-auto md:h-24 bg-accent/10 backdrop-blur-md rounded-lg p-3 md:p-4 flex items-center justify-center md:justify-start lg:-left-6 z-10">
                <span className="terminal-text text-sm">
                  <span className="text-accent">iOS</span> + <span className="text-primary">Android</span>
                </span>
              </div> */}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="heading-sm font-display text-primary">Our Origin Story</h3>
              <p className="paragraph text-neutral-800">
                Based in Fort Mill, South Carolina, Intrinsic Labs was founded by Asher Pope, a software engineer with a passion for creating exceptional digital experiences. What started as a solo venture has grown into a small but mighty team dedicated to delivering best-in-class solutions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="heading-sm font-display text-primary">Our Approach</h3>
              <p className="paragraph text-neutral-800">
                We believe in quality over quantity. By taking on a limited number of clients, we ensure each project receives our full attention and expertise. This focused approach allows us to deliver solutions that truly meet our clients' needs and exceed their expectations.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="heading-sm font-display text-primary">AI-Enhanced Development</h3>
              <p className="paragraph text-neutral-800">
                We embrace cutting-edge AI tools to enhance our development process, allowing us to work more efficiently without compromising quality. This approach enables our small team to compete with larger agencies on both speed and quality of delivery.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div ref={timelineRef} className="max-w-4xl mx-auto">
          <h3 className="heading-sm font-display text-center mb-12">Company Timeline</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-primary/30"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <span className="terminal-text text-sm tracking-wider text-primary">2022</span>
                  <h4 className="text-xl font-display mt-1 mb-2">Foundation</h4>
                  <p className="text-neutral-800 text-sm">
                    Intrinsic Labs is established with a focus on mobile and web development.
                  </p>
                </div>
                
                <div className="hidden md:block"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
              
              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="hidden md:block"></div>
                
                <div className="md:pl-8">
                  <span className="terminal-text text-sm tracking-wider text-primary">2023</span>
                  <h4 className="text-xl font-display mt-1 mb-2">First Major Projects</h4>
                  <p className="text-neutral-800 text-sm">
                    Successfully delivered our first set of client projects, establishing our reputation for quality.
                  </p>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
              
              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <span className="terminal-text text-sm tracking-wider text-primary">2024</span>
                  <h4 className="text-xl font-display mt-1 mb-2">Team Expansion</h4>
                  <p className="text-neutral-800 text-sm">
                    Expanded our team and capabilities to better serve our growing client base.
                  </p>
                </div>
                
                <div className="hidden md:block"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
              
              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="hidden md:block"></div>
                
                <div className="md:pl-8">
                  <span className="terminal-text text-sm tracking-wider text-primary">Today</span>
                  <h4 className="text-xl font-display mt-1 mb-2">Looking Forward</h4>
                  <p className="text-neutral-800 text-sm">
                    Continuing to grow and innovate while maintaining our commitment to quality and client satisfaction.
                  </p>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory; 