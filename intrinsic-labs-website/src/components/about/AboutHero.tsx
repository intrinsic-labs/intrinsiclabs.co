'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AboutHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && textRef.current) {
      // Create a timeline for the hero animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Animate the hero section
      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
      
      // Animate the text elements
      tl.fromTo(
        textRef.current.querySelectorAll('.animate-text'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
        '-=0.5'
      );
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 md:py-32"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
        
        {/* Animated grain effect */}
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] bg-repeat opacity-[0.03] animate-[pulse_2s_ease-in-out_infinite]"></div>
      </div>

      <div className="container-custom relative z-10 pb-12">
        <div ref={textRef} className="max-w-4xl mx-auto text-center">
         

          <h1 className="animate-text heading-xl mb-6 font-display">
            We Build Digital Experiences That Matter
          </h1>

          <p className="animate-text paragraph text-secondary/80 mb-8 max-w-2xl mx-auto">
            Intrinsic Labs is a boutique software development studio specializing in high-end website design and native mobile app development. We focus on quality over quantity, giving our full attention to each client.
          </p>

          <div className="animate-text flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8">
            <a href="#company-story" className="btn-primary">
              Our Story
            </a>
            <a href="#team" className="btn-secondary">
              Meet the Team
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-secondary/50 text-sm mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-secondary/50"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero; 