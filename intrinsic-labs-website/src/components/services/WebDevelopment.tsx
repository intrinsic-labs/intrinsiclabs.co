"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import PlaceholderImage from '../ui/PlaceholderImage';

// Technologies used
const frontendTech = [
  { name: 'React', icon: '/images/icons/react.svg', color: '#61DAFB' },
  { name: 'Next.js', icon: '/images/icons/nextjs.svg', color: '#FFFFFF' },
  { name: 'TypeScript', icon: '/images/icons/typescript.svg', color: '#3178C6' },
  { name: 'Tailwind CSS', icon: '/images/icons/tailwind.svg', color: '#38B2AC' },
];

const backendTech = [
  { name: 'Node.js', icon: '/images/icons/nodejs.svg', color: '#339933' },
  { name: 'Supabase', icon: '/images/icons/supabase.svg', color: '#3ECF8E' },
  { name: 'PostgreSQL', icon: '/images/icons/postgresql.svg', color: '#336791' },
  { name: 'GraphQL', icon: '/images/icons/graphql.svg', color: '#E10098' },
];

const WebDevelopment = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section 
      id="web" 
      ref={sectionRef} 
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div> */}
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 items-center">
          {/* Left side: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="h-[500px] md:h-auto rounded-lg overflow-hidden border border-primary/20 md:border-0 flex items-center justify-center">
                <PlaceholderImage 
                  width={600} 
                  height={400} 
                  className="rounded-lg overflow-hidden object-cover w-full h-full"
                  style={{ objectPosition: '50% 50%', height: '100%' }}
                />
              </div>
              <div className="absolute top-4 right-4 md:-top-6 md:-right-6 w-auto md:w-24 h-auto md:h-24 bg-neutral-600/30 backdrop-blur-md rounded-lg p-3 md:p-4 flex items-center justify-center z-10">
                <span className="terminal-text-secondary text-xs">
                  &lt;<span className="text-orange">web</span>/&gt;
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Right side: Content */}
          <motion.div style={{ y, opacity }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg mb-6">Web Development</h2>
              <p className="text-xl text-neutral-800 mb-8">
                We build responsive, modern web applications that engage users and drive business results, 
                combining cutting-edge technology with thoughtful design.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">Frontend Development</h3>
              <p className="text-neutral-800 mb-6">
                Our frontend development focuses on creating intuitive, performant user interfaces 
                that work seamlessly across all devices and browsers. We use React, Next.js, and 
                other modern frameworks to build interactive experiences.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {frontendTech.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-background/70 backdrop-blur-sm p-4 rounded-lg border border-primary/20 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300"
                  >
                    <div 
                      className="w-12 h-12 mb-2 flex items-center justify-center" 
                      style={{ color: tech.color }}
                    >
                      <div className="w-8 h-8 rounded-md bg-current opacity-60"></div>
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">Backend Development</h3>
              <p className="text-neutral-800 mb-6">
                Our backend solutions are scalable, secure, and built to handle complex business logic. 
                We leverage Node.js, PostgreSQL, and modern infrastructure to create robust API services 
                and data management systems.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {backendTech.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-background/70 backdrop-blur-sm p-4 rounded-lg border border-primary/20 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300"
                  >
                    <div 
                      className="w-12 h-12 mb-2 flex items-center justify-center" 
                      style={{ color: tech.color }}
                    >
                      <div className="w-8 h-8 rounded-md bg-current opacity-60"></div>
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 w-full"
            >
              <Link href="/contact" className="btn-secondary w-full block text-center">
                Discuss Your Web Project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebDevelopment; 