"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Make parallax more pronounced
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);
  
  // Add rotation for more dynamic effect
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden parallax-section">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10"></div>

      {/* Decorative elements with parallax */}
      <motion.div 
        ref={bgRef}
        className="absolute inset-0 overflow-hidden parallax-bg"
        style={{ y: y1, opacity, rotate }}
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"></div>
      </motion.div>

      <motion.div 
        className="container-custom relative z-10 parallax-content"
        style={{ y: y2, scale }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-6"
          >
            Ready to bring your ideas to life?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto"
          >
            Whether you're looking to build a new mobile app, create a web
            application, or develop custom software, we're here to help you
            achieve your goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative dots pattern with parallax
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 20]) }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="grid grid-cols-12 gap-4 w-full">
            {Array.from({ length: 48 }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white"
              ></div>
            ))}
          </div>
        </div>
      </motion.div> */}
    </section>
  );
};

export default CallToAction; 