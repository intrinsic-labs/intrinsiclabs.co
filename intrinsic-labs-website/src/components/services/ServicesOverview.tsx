"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Card from '../ui/Card';

// Service data
const services = [
  {
    id: 'mobile',
    title: 'Mobile Development',
    description:
      'Create beautiful, performant apps for iOS and Android that users love.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: 'web',
    title: 'Web Development',
    description:
      'Build responsive, modern web applications using the latest technologies.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'custom',
    title: 'Custom Software',
    description:
      'Tailored software solutions to address your unique business challenges.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v19" />
        <path d="M5 8h14" />
        <path d="M15 5l-3-3-3 3" />
        <path d="M5 16h14" />
        <path d="M15 19l-3 3-3-3" />
      </svg>
    ),
  }
];

// Development process steps
const processSteps = [
  {
    id: 1,
    title: 'Discovery',
    description: 'We start by understanding your needs, goals, and the problems you want to solve.',
    color: 'var(--accent)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Design',
    description: 'We create wireframes and designs that align with your brand and meet user expectations.',
    color: 'var(--accent)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Development',
    description: 'Our engineers build your solution using modern, scalable, and maintainable code.',
    color: 'var(--accent',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Testing',
    description: 'We thoroughly test to ensure your solution is robust, secure, and performs as expected.',
    color: 'var(--orange)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    )
  },
  {
    id: 5,
    title: 'Launch & Support',
    description: 'We deploy your solution and provide ongoing maintenance and support.',
    color: 'var(--green)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    )
  }
];

const ServicesOverview = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Add state for hovering on process steps
  const [hoveredProcessStep, setHoveredProcessStep] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      <div className="container-custom">
        {/* Services Introduction */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          style={{ y }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-6"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-800"
          >
            We specialize in creating digital solutions that are both beautiful
            and functional, tailored to your specific needs and business goals.
          </motion.p>
        </motion.div>

        {/* Service Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {services.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              isHovered={hoveredCard === service.id}
              onHover={setHoveredCard}
              className="p-8 h-full flex flex-col group"
              borderColors={['#8c72ff','#ff8c72']}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`text-primary mr-4 transition-transform duration-300 ${
                    hoveredCard === service.id ? 'scale-110' : ''
                  }`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-mono font-bold">{service.title}</h3>
              </div>
              <p className="text-neutral-800 mb-6 flex-grow">{service.description}</p>
              <Link
                href={`#${service.id}`}
                className="inline-flex items-center text-primary hover:text-accent transition-colors mt-auto"
              >
                <span>Learn more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-2 transition-transform duration-300 ${
                    hoveredCard === service.id ? 'translate-x-1' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </Card>
          ))}
        </motion.div>

        {/* Process Overview */}
        <div className="mt-24">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="heading-lg mb-6"
            >
              Our Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-neutral-800"
            >
              We follow a structured approach to ensure your project is delivered 
              on time, within budget, and exceeds expectations.
            </motion.p>
          </motion.div>

          {/* Process Steps Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              {/* Timeline line - hidden on mobile, visible on desktop */}
              <div className="absolute hidden md:block md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/30"></div>
              
              {/* Process steps */}
              {processSteps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  variants={itemVariants}
                  className={`relative mb-8 md:mb-12 ${
                    index % 2 === 0 ? 'md:pr-20 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-20 md:text-left md:mr-auto md:ml-1/2'
                  } md:w-[calc(50%-20px)] px-0 md:px-0`}
                  onMouseEnter={() => setHoveredProcessStep(step.id)}
                  onMouseLeave={() => setHoveredProcessStep(null)}
                >
                  {/* Flex container to position card and icon */}
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Card content */}
                    <div 
                      className="bg-background/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20 relative transition-all duration-300 flex-grow"
                      style={{
                        borderColor: hoveredProcessStep === step.id ? step.color : 'rgba(var(--primary-rgb), 0.2)',
                      }}
                    >
                      {/* Mobile icon - visible only on mobile */}
                      <div 
                        className="md:hidden flex items-center justify-left mb-4"
                        style={{
                          color: hoveredProcessStep === step.id ? step.color : 'var(--primary)',
                        }}
                      >
                        {step.icon}
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-2`}>{step.title}</h3>
                      <p className="text-neutral-800">{step.description}</p>
                    </div>
                    
                    {/* Desktop icon - hidden on mobile, positioned next to the card */}
                    <div 
                      className="hidden md:flex w-10 h-10 rounded-full bg-background border-2 items-center justify-center z-10 transition-all duration-300 shrink-0"
                      style={{
                        borderColor: hoveredProcessStep === step.id ? step.color : 'var(--primary)',
                        marginLeft: index % 2 === 0 ? '0' : '20px',
                        marginRight: index % 2 === 0 ? '20px' : '0',
                      }}
                    >
                      <div 
                        className="transition-colors duration-300"
                        style={{
                          color: hoveredProcessStep === step.id ? step.color : 'var(--primary)',
                        }}
                      >
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview; 