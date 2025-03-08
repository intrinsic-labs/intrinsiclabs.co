"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

const ContactHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Text animation with GSAP
  useEffect(() => {
    if (!textRef.current) return;
    
    const elements = textRef.current.querySelectorAll('.animate-text');
    
    gsap.fromTo(elements, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.15, 
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      }
    );
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20 md:pt-32"
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
            Let's Build Something Amazing Together
          </h1>

          <p className="animate-text paragraph text-neutral-800 mb-8 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about possibilities? We're here to help turn your ideas into reality.
          </p>

          <div className="animate-text inline-block mt-6">
            <div className="terminal-text-accent terminal-cursor">
              const contact = await intrinsicLabs.connect()
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero; 