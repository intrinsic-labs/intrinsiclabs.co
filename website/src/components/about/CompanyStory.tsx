'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Image from 'next/image';
import Terminal from '../ui/Terminal';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CompanyStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  useEffect(() => {
    if (timelineRef.current && typeof window !== 'undefined') {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0,
            y: 30
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1
          }
        );
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="company-story"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >

      <div className="container-custom relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Right side: Image */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="h-[500px] md:h-auto rounded-lg overflow-hidden border border-primary/20 md:border-0 flex items-center justify-center">
                <Image
                  src="/images/about/bluetooth-keyboard.jpeg"
                  alt="Bluetooth keyboard used to learn coding"
                  width={600}
                  height={800}
                  className="rounded-lg overflow-hidden object-cover w-full h-full saturate-0"
                  priority
                />
              </div>
              
              <div className="absolute -bottom-4 mx-4 md:mx-0 md:-bottom-6 md:-left-6 w-auto md:w-96 h-auto md:h-24 bg-accent/40 backdrop-blur-md rounded-lg p-3 md:p-4 flex items-center justify-center md:justify-start lg:-left-6 z-10">
                <span className="terminal-text text-sm">
                  The iPad keyboard Asher learned to code on<br />(now owned and operated by his kids)
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="heading-lg font-display text-primary">
                <span className="relative">
                  The Short Version:
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-[4px] bg-orange"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1}}
                  />
                </span>
              </h2>
              <h2 className="heading-lg font-display text-primary pt-2">We build custom solutions that reduce friction to great work.</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2 pb-8">
              <p className="paragraph text-neutral-800">
                Intrinsic Labs LLC was founded in 2024 with the conviction that serious people shouldn't have to jerry rig off-the-shelf solutions that don't fully understand their needs.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="heading-sm font-display text-primary">Humble Beginnings</h3>
              <p className="paragraph text-neutral-800">
                Asher Pope (founder) started poking around with code in highschool. Slightly obsessed with optimizing workflows and efficiency, Asher finally got tired of having pipe dreams about improving the tools he was using. He decided to buckle down and learn to write software in 2021. 
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <p className="paragraph text-neutral-800">
                Armed with an iPad Mini and a bluetooth keyboard, Asher taught himself to build iOS apps. Today, he runs Intrinsic Labs, solving problems with code full-time.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div ref={timelineRef} className="max-w-4xl mx-auto pt-0 md:pt-12">
          <h3 className="heading-md font-display text-center mb-12">Company Timeline</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-primary/30"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">

            <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <span className="terminal-text-primary text-md tracking-wider">1997</span>
                  <h4 className="text-2xl font-display mt-1 mb-2">Existence Enabled</h4>
                  <p className="text-neutral-800 text-md">
                    Asher is born.
                  </p>
                </div>
                
                <div className="hidden md:block"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>

              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="hidden md:block"></div>
                
                <div className="md:pl-8">
                  <span className="terminal-text-primary text-md tracking-wider">2022</span>
                  <h4 className="text-2xl font-display mt-1 mb-2">iOS Dev</h4>
                  <p className="text-neutral-800 text-md">
                    Asher gets serious about coding, gets a few contracts, and makes a few bucks. Also gets hooked on dopamine from solving code problems.
                  </p>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
              
              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <span className="terminal-text-primary text-md tracking-wider">2023</span>
                  <h4 className="text-2xl font-display mt-1 mb-2">Cross Platform</h4>
                  <p className="text-neutral-800 text-md">
                    Asher learns Android and collaborates with some other developers. Uses his new skills to create an Android-based 43" global missions kiosk for a local church.
                  </p>
                </div>
                
                <div className="hidden md:block"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
              
              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="hidden md:block"></div>
                
                <div className="md:pl-8">
                  <span className="terminal-text-primary text-md tracking-wider">2024</span>
                  <h4 className="text-2xl font-display mt-1 mb-2">Intrinsic Labs</h4>
                  <p className="text-neutral-800 text-md">
                    Asher decides to take the leap to full time developer and founds Intrinsic Labs LLC, focused on building stable, secure, scalable solutions that solve real problems.
                  </p>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
              
              <div className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <span className="terminal-text-primary text-md tracking-wider">Today</span>
                  <h4 className="text-2xl font-display mt-1 mb-2">Full Speed Ahead</h4>
                  <p className="text-neutral-800 text-md">
                    Intrinsic Labs is growing and evolving quickly, adding two new team members in early 2025.
                  </p> 
                </div>
                
                <div className="hidden md:block"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory; 