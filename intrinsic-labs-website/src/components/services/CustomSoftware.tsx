"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import PlaceholderImage from '../ui/PlaceholderImage';

// Industry solutions
const industrySolutions = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'HIPAA-compliant solutions for patient management and telehealth.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Secure financial software for transactions and data analysis.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Custom online shopping experiences and inventory management.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    )
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Learning management systems and interactive educational tools.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  }
];

const CustomSoftware = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
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
  
  return (
    <section 
      id="custom" 
      ref={sectionRef} 
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-brown/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 items-center mb-8 md:mb-40">
          {/* Left side: Content */}
          <motion.div 
            className="order-2 lg:order-1"
            style={{ y, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg mb-6">Custom Software</h2>
              <p className="text-xl text-neutral-300 mb-8">
                We develop bespoke software solutions tailored to your unique business needs,
                helping you solve complex challenges and achieve your goals.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
              <p className="text-neutral-300 mb-6">
                We take the time to understand your business processes, challenges, and objectives
                to create software that streamlines operations, improves efficiency,
                and provides a competitive advantage.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">Solutions We Provide</h3>
              <ul className="text-neutral-300 mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">›</span>
                  <span>Enterprise Resource Planning (ERP) systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">›</span>
                  <span>Customer Relationship Management (CRM) tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">›</span>
                  <span>Data analytics and business intelligence platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">›</span>
                  <span>Workflow automation systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">›</span>
                  <span>Industry-specific applications</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          
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
                  height={500} 
                  className="rounded-lg overflow-hidden object-cover w-full h-full"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>
              <div className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 w-auto h-auto md:h-28 bg-brown/10 backdrop-blur-md rounded-lg p-3 md:p-4 flex items-center justify-center z-10">
                <span className="terminal-text text-xs">
                  <span className="text-primary">func</span> <span className="text-accent">customSolution</span>() {'{...}'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Industry Solutions */}
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h3 className="heading-md mb-6">Industry-Specific Solutions</h3>
            <p className="text-xl text-neutral-300">
              We have experience developing solutions across various industries, 
              each with their unique requirements and challenges.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {industrySolutions.map((solution) => (
              <motion.div
                key={solution.id}
                variants={itemVariants}
                className="bg-background/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="text-primary mb-4">
                  {solution.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{solution.title}</h4>
                <p className="text-neutral-300">{solution.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 w-full"
            >
              <Link href="/contact" className="btn-secondary w-full block text-center max-w-xl mx-auto">
                Discuss Your Custom Solution
              </Link>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomSoftware; 