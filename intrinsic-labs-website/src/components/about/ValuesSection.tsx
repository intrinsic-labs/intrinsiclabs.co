'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import FeatureCard from '@/components/ui/FeatureCard';

// Values data
const values = [
  {
    id: 1,
    title: 'Quality Over Quantity',
    description: 'We believe in doing fewer things exceptionally well rather than many things adequately. This philosophy guides our client selection and project approach.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Client-Focused Approach',
    description: 'We prioritize understanding our clients\' needs and goals, ensuring that every solution we deliver is tailored to their specific requirements and challenges.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Continuous Innovation',
    description: 'We stay at the forefront of technology trends, constantly exploring new tools and methodologies to enhance our development process and deliver cutting-edge solutions.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Transparency & Communication',
    description: 'We maintain open and honest communication throughout the development process, ensuring clients are informed and involved at every stage of their project.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Ethical AI Integration',
    description: 'We leverage AI tools responsibly to enhance our development process, focusing on using technology to amplify human creativity rather than replace it.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Long-Term Relationships',
    description: 'We aim to build lasting partnerships with our clients, providing ongoing support and evolving our solutions as their needs change and grow over time.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const ValuesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
      id="values"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background/80"></div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="terminal-text text-sm md:text-base tracking-wider mb-4 inline-block">
            <span className="terminal-text-purple">function</span>{" "}
            <span className="terminal-text-orange">getValues</span>() &#123;
          </span>
          
          <h2 className="heading-lg mb-6 font-display">Our Core Values</h2>
          
          <p className="paragraph text-secondary/80 max-w-2xl mx-auto">
            These principles guide everything we do, from how we work with clients to how we approach each project. They're the foundation of our company culture and our commitment to excellence.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {values.map((value) => (
            <div key={value.id} className="h-full">
              <FeatureCard
                title={value.title}
                description={value.description}
                icon={value.icon}
                variants={itemVariants}
                className="h-full"
              />
            </div>
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-neutral-900/30 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-primary/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-center">
              <div className="relative">
                <div className="bg-neutral-900/30 backdrop-blur-sm p-1 rounded-lg border border-primary/20 overflow-hidden">
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <PlaceholderImage 
                      text="How We Work" 
                      className="group"
                    />
                  </div>
                </div>
                
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent"></div>
              </div>
              
              <div>
                <h3 className="heading-sm font-display text-primary mb-4">How We Work</h3>
                <p className="text-secondary/80 mb-4">
                  Our values aren't just words on a page—they're reflected in how we approach every project. We start by deeply understanding your needs, then craft a tailored solution that addresses your specific challenges.
                </p>
                <p className="text-secondary/80 mb-6">
                  Throughout the development process, we maintain open communication, provide regular updates, and ensure you're involved in key decisions. Our goal is to build not just great software, but a great working relationship.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm text-secondary/70">Collaborative approach</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm text-secondary/70">Transparent process</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm text-secondary/70">Continuous improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-16">
          <span className="terminal-text text-sm md:text-base tracking-wider">
            <span className="terminal-text-green">return</span> values;
            &#125;
          </span>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection; 