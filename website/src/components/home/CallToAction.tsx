"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="pb-20 md:py-32 relative overflow-hidden parallax-section">
      {/* Background with gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/30"></div> */}

      {/* Decorative elements with parallax */}
      {/* <motion.div 
        ref={bgRef}
        className="absolute inset-0 overflow-hidden parallax-bg"
        style={{ y: y1, opacity, rotate }}
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/25 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-secondary/25 blur-3xl"></div>
      </motion.div> */}

      <motion.div
        className="container-custom relative z-10 parallax-content"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-6"
          >
            This website is under construction.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-800 mb-10 max-w-3xl mx-auto"
          >
            Check back soon for updates!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="https://x.com/intrinsic_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full block text-center max-w-xl mx-auto">
              Connect on X
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction; 