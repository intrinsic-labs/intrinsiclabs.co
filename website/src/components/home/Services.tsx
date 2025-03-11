"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Card from '../ui/Card';

// Service card data
const services = [
  {
    id: 'mobile',
    title: 'Mobile Development',
    description:
      'Native iOS and Android apps built with Swift, SwiftUI, Kotlin, and Jetpack Compose.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    link: '/services/mobile',
  },
  {
    id: 'web',
    title: 'Web Development',
    description:
      'Full-stack web applications with modern frameworks like React, Next.js, and more.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    link: '/services/web',
  },
  {
    id: 'custom',
    title: 'Custom Software',
    description:
      'Bespoke software solutions tailored to your specific business needs and challenges.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v19" />
        <path d="M5 8h14" />
        <path d="M15 5l-3-3-3 3" />
        <path d="M5 16h14" />
        <path d="M15 19l-3 3-3-3" />
      </svg>
    ),
    link: '/services/custom',
  },
];

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Make parallax more pronounced
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  // Add rotation for more dynamic effect
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden parallax-section">
      {/* Background decorative elements with parallax */}
      {/* <motion.div 
        ref={bgRef}
        className="absolute inset-0 overflow-hidden parallax-bg"
        style={{ y: y1, opacity, rotate }}
      >
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"></div>
      </motion.div> */}

      <motion.div 
        className="container-custom relative z-10 parallax-content"
        style={{ y: y2, scale }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-800"
          >
            We specialize in creating digital solutions that are both beautiful
            and functional, tailored to your specific needs.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              isHovered={hoveredCard === service.id}
              onHover={setHoveredCard}
              className="p-8 group"
              borderColors={['#8c72ff','#ff8c72']}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`text-primary mr-4 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium">{service.title}</h3>
              </div>
              <p className="text-neutral-800 mb-6">{service.description}</p>
              <Link
                href={service.link}
                className="inline-flex items-center text-primary hover:text-accent transition-colors"
              >
                <span>Learn more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-2 transition-transform duration-300 ${
                    hoveredCard === service.id ? 'translate-x-1' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-outline">
            View All Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services; 