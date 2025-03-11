"use client";

import { motion } from 'framer-motion';

const LocalVisibilityHero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] z-0"></div>
      <div className="absolute inset-0 grain-overlay opacity-30 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-accent text-lg font-medium tracking-wide">
              Free Local Business Tool
            </span>
          </motion.div>
          
          {/* Main title */}
          <motion.h1 
            className="heading-xl mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Local Visibility Decoder™
          </motion.h1>
          
          {/* Hero description */}
          <motion.p 
            className="paragraph-serif text-xl md:text-2xl text-neutral-800 mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover why local customers aren't finding your business online, even though you're right there.
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-4 rounded-lg bg-neutral-300/50">
              <div className="text-3xl font-medium text-primary mb-1">93%</div>
              <p className="text-sm text-neutral-700">of local businesses have critical errors in their online listings</p>
            </div>
            <div className="p-4 rounded-lg bg-neutral-300/50">
              <div className="text-3xl font-medium text-primary mb-1">68%</div>
              <p className="text-sm text-neutral-700">of consumers would stop using a business with incorrect information</p>
            </div>
            <div className="p-4 rounded-lg bg-neutral-300/50">
              <div className="text-3xl font-medium text-primary mb-1">2 min</div>
              <p className="text-sm text-neutral-700">is all it takes to check your business visibility across 5+ platforms</p>
            </div>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="#visibility-form" 
              className="btn-primary inline-flex items-center"
            >
              Check My Local Visibility
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocalVisibilityHero; 