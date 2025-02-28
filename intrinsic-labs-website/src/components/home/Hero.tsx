"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Debug values for parallax
  const [debugValues, setDebugValues] = useState({ scrollY: 0, y1: 0, y2: 0 });
  
  useEffect(() => {
    const unsubscribeY = scrollY.onChange(v => {
      setDebugValues(prev => ({ ...prev, scrollY: Math.round(v) }));
    });
    
    const unsubscribeY1 = y1.onChange(v => {
      setDebugValues(prev => ({ ...prev, y1: Math.round(v) }));
    });
    
    const unsubscribeY2 = y2.onChange(v => {
      setDebugValues(prev => ({ ...prev, y2: Math.round(v) }));
    });
    
    return () => {
      unsubscribeY();
      unsubscribeY1();
      unsubscribeY2();
    };
  }, [scrollY, y1, y2]);

  // Ensure component is mounted before animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // GSAP animation for the background gradient
  useEffect(() => {
    if (!heroRef.current || !isLoaded) return;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    tl.to(heroRef.current, {
      backgroundPosition: '100% 100%',
      duration: 15,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [isLoaded]);

  // Text animation variants for Framer Motion
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Render a simple placeholder while loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="heading-xl">Intrinsic Labs</h1>
          <p className="paragraph">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background parallax-section"
    >
      {/* Debug display - comment out in production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="parallax-debug">
          scrollY: {debugValues.scrollY}px<br />
          y1: {debugValues.y1}px<br />
          y2: {debugValues.y2}px
        </div>
      )} */}
      
      {/* Decorative elements with parallax effect */}
      <motion.div 
        ref={decorRef}
        className="absolute inset-0 overflow-hidden"
        style={{ y: y1, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/25 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/25 blur-3xl"></div>
      </motion.div>

      <motion.div 
        className="container-custom relative z-10 pt-20 pb-16 md:py-32 parallax-content"
        style={{ y: y2 }}
      >
        <div className="max-w-4xl mx-auto text-center" ref={textRef}>
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="inline-block bg-gradient-to-r from-brown to-accent bg-clip-text text-transparent text-lg md:text-xl font-semibold mb-6"
          >
            Mobile & Web Development Studio
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="heading-xl mb-6 leading-tight"
          >
            We build exceptional digital experiences that solve real problems.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl md:text-2xl text-neutral-200 mb-10 max-w-3xl mx-auto terminal-cursor"
          >
            From native mobile apps to full-stack web applications, we craft
            beautiful, functional solutions that users love.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/work" className="btn-primary">
              View Our Work
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 