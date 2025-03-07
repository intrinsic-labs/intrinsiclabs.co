"use client";

import { motion } from 'framer-motion';

const BlogHero = () => {
  return (
    <section className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight mb-8">
            Researching<br />
            at the frontier
          </h1>
          <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto leading-relaxed">
            At Intrinsic Labs, we develop innovative software solutions, 
            and our research helps us create safer, more intuitive, and more 
            reliable applications.
          </p>
        </motion.div>
      </div>
      
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.3), transparent 70%)',
        }}
      />
    </section>
  );
};

export default BlogHero; 