"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';
import ScrollIndicator from '../ui/ScrollIndicator';
import Image from 'next/image';
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

      <motion.div 
        className="container-custom relative z-10 pt-12 pb-16 md:py-32"
        style={{ y: y2 }}
      >
        <div className="max-w-4xl mx-auto text-center" ref={textRef}>

          <motion.div 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex justify-center items-center pb-8"
          >
            <Image 
              src="/images/logo/intrinsic-labs-logo-v2-accent.svg" 
              alt="Intrinsic Labs Logo" 
              width={300}
              height={300}
              className="w-[250px] h-[250px] md:w-[400px] md:h-[400px]"
            />
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="heading-xl mb-6 leading-tight"
          >
            We will fix your life with code.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl md:text-2xl text-neutral-800 mb-4 max-w-3xl mx-auto"
          >
            Imagine anything. Make it so.
          </motion.p>

          {/* <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="gap-4 justify-center"
          >
            <Link href="/work" className="btn-primary">
              View Our Work
            </Link>
          </motion.div> */}

          {/* <div className="h-16 flex-shrink-0" /> */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <ScrollIndicator text="" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 