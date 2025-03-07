"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import PlaceholderImage from '../ui/PlaceholderImage';

// Technologies used
const technologies = [
  { name: 'Swift', icon: '/images/icons/swift.svg', color: '#F05138' },
  { name: 'SwiftUI', icon: '/images/icons/swiftui.svg', color: '#2C68F6' },
  { name: 'UIKit', icon: '/images/icons/uikit.svg', color: '#2A82E4' },
  { name: 'Kotlin', icon: '/images/icons/kotlin.svg', color: '#7F52FF' },
  { name: 'Jetpack Compose', icon: '/images/icons/jetpack.svg', color: '#4285F4' },
  { name: 'React Native', icon: '/images/icons/react.svg', color: '#61DAFB' },
  { name: 'Firebase', icon: '/images/icons/firebase.svg', color: '#FFCA28' },
  { name: 'Supabase', icon: '/images/icons/supabase.svg', color: '#3ECF8E' },
];

const MobileDevelopment = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section 
      id="mobile" 
      ref={sectionRef} 
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div> */}
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 items-center">
          {/* Left side: Content */}
          <motion.div 
            ref={contentRef}
            style={{ y, opacity }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg mb-6">Mobile Development</h2>
              <p className="text-xl text-neutral-800 mb-8">
                We create beautiful, high-performance native applications for iOS and Android 
                that provide exceptional user experiences and help you connect with your audience.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">iOS Development</h3>
              <p className="text-neutral-800 mb-6">
                We build sleek, powerful iOS applications using Swift and SwiftUI, 
                taking advantage of the latest Apple technologies and design patterns to create 
                intuitive interfaces and smooth functionality.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">Android Development</h3>
              <p className="text-neutral-800 mb-6">
                Our Android applications are built with Kotlin and Jetpack Compose, 
                ensuring they're modern, maintainable, and provide a premium experience 
                across the diverse Android ecosystem.
              </p>
            </motion.div>

            {/* Technology Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {technologies.map((tech, index) => (
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
                      {/* Placeholder for actual icons */}
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
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 w-full"
            >
              <Link href="/contact" className="btn-secondary w-full block text-center">
                Discuss Your Mobile Project
              </Link>
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
                  height={800} 
                  className="rounded-lg overflow-hidden object-cover w-full h-full"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>
              
              <div className="absolute bottom-4 right-4 md:-bottom-6 md:-left-6 w-auto md:w-24 h-auto md:h-24 bg-neutral-600/30 backdrop-blur-md rounded-lg p-3 md:p-4 flex items-center justify-center md:justify-start lg:-left-6 z-10">
                <span className="terminal-text-secondary text-sm">
                  iOS <span className="text-orange">+</span> Android
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileDevelopment; 