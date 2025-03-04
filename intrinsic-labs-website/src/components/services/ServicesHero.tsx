"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ServicesHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section 
      ref={sectionRef} 
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden pt-28 bg-background"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/50 to-background/95"></div>
      
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
      </div> */}
      
      <div className="container-custom relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-xl mb-6 max-w-4xl mx-auto"
        >
          Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto mb-8"
        >
          We build digital solutions that solve real problems, focusing on user experience,
          performance, and scalability.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block"
        >
          <div className="terminal-text-green terminal-cursor">
            let services = [&#39;mobile&#39;, &#39;web&#39;, &#39;custom_software&#39;]
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero; 