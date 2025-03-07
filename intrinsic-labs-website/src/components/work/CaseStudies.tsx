"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '../ui/PlaceholderImage';
import AspectRatio from '../ui/AspectRatio';
import Card from '../ui/Card';

// Case studies data (placeholder)
const caseStudies = [
  {
    id: 'fitness-app',
    title: 'FitTrack Pro',
    category: 'Mobile App',
    description: 'A comprehensive fitness tracking application for iOS and Android with real-time workout analytics and personalized training plans.',
    challenge: 'Create an intuitive fitness app that provides personalized workout plans while maintaining high performance with real-time analytics.',
    solution: 'We built a native app using Swift for iOS and Kotlin for Android, with a shared backend using Firebase for real-time data synchronization.',
    results: ['200,000+ downloads in first 3 months', '4.8 average rating across app stores', '85% user retention after 30 days'],
    image: '/images/placeholder-project-1.jpg',
    technologies: ['Swift', 'Kotlin', 'Firebase', 'Cloud Functions', 'Machine Learning'],
    link: '/work/fitness-app',
  },
  {
    id: 'ecommerce-platform',
    title: 'ShopSmart',
    category: 'Web Application',
    description: 'A full-featured e-commerce platform with inventory management, payment processing, and customer analytics.',
    challenge: 'Build a scalable e-commerce platform that could handle high traffic volumes while providing detailed analytics for business owners.',
    solution: 'We developed a Next.js application with server-side rendering for SEO and performance, backed by a robust API and Supabase database.',
    results: ['40% increase in conversion rate', '60% reduction in page load time', '$2.3M in sales processed in first year'],
    image: '/images/placeholder-project-2.jpg',
    technologies: ['React', 'Next.js', 'Supabase', 'Stripe', 'Vercel'],
    link: '/work/ecommerce-platform',
  },
  {
    id: 'healthcare-system',
    title: 'MediConnect',
    category: 'Custom Software',
    description: 'A secure and compliant healthcare management system for patient records, appointment scheduling, and billing.',
    challenge: 'Create a HIPAA-compliant system that streamlines healthcare workflows while maintaining the highest security standards.',
    solution: 'We built a custom solution with end-to-end encryption, role-based access control, and automated compliance reporting.',
    results: ['Reduced administrative time by 35%', 'Improved appointment adherence by 28%', 'Saved $450K annually in operational costs'],
    image: '/images/placeholder-project-3.jpg',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    link: '/work/healthcare-system',
  },
];

const CaseStudies = () => {
  const [hoveredStudy, setHoveredStudy] = useState<string | null>(null);
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Toggle expanded state for case study
  const toggleExpand = (id: string) => {
    if (expandedStudy === id) {
      setExpandedStudy(null);
    } else {
      // First set the expanded state
      setExpandedStudy(id);
      
      // Wait for the next frame to ensure the DOM has updated
      requestAnimationFrame(() => {
        // Then wait a bit longer for the animation to start
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const yOffset = -120; // Adjusted for better positioning
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            
            // Use a longer duration for smoother scrolling
            window.scrollTo({ 
              top: y, 
              behavior: 'smooth' 
            });
          }
        }, 100); // Slightly longer delay
      });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
      </div> */}

      <motion.div 
        className="container-custom relative z-10"
        style={{ y, opacity }}
      >
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-4 md:mb-6"
          >
            Case Studies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-neutral-800"
          >
            Dive deep into our most impactful projects and discover how we solve complex challenges.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                id={study.id}
                isHovered={hoveredStudy === study.id}
                onHover={setHoveredStudy}
                className={`p-6 sm:p-8 transition-all duration-700 ease-in-out ${
                  expandedStudy === study.id 
                    ? 'scale-[1.01] shadow-xl shadow-primary/5 z-10' 
                    : 'scale-100'
                }`}
              >
                <div id={study.id} className="flex flex-col gap-8 transition-all duration-500">
                  {/* Header with title and category */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 sm:mb-2 ${hoveredStudy === study.id ? 'text-accent' : 'text-neutral-800'}`}>
                        {study.category}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold">
                        {study.title}
                      </h3>
                    </div>
                    <button 
                      onClick={() => toggleExpand(study.id)}
                      className={`self-start px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                        expandedStudy === study.id 
                          ? 'border-accent text-accent bg-accent/10' 
                          : 'border-neutral-600 text-neutral-800 hover:border-primary hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <span className="flex items-center">
                        {expandedStudy === study.id ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                            Show Less
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                            Show More
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Project Image */}
                  <div className="w-full relative overflow-hidden rounded-lg">
                    <AspectRatio ratio={21/9} className="w-full">
                      <PlaceholderImage 
                        text={`${study.title} Preview`}
                        className={`w-full h-full ${hoveredStudy === study.id ? 'hovered' : ''}`}
                      />
                    </AspectRatio>
                  </div>

                  {/* Basic info always visible */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-semibold mb-2 text-primary">Overview</h4>
                      <p className="text-neutral-800">{study.description}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-primary">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs transition-colors duration-300 text-secondary ${
                              hoveredStudy === study.id ? 'bg-accent' : 'bg-neutral-800'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content with AnimatePresence for proper exit animation */}
                  <AnimatePresence mode="wait">
                    {expandedStudy === study.id && (
                      <motion.div
                        key={`expanded-${study.id}`}
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ 
                          opacity: 1, 
                          maxHeight: 500, // Use a fixed max height that's larger than content
                          transition: { 
                            opacity: { duration: 0.3 },
                            maxHeight: { duration: 0.5 }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          maxHeight: 0,
                          transition: { 
                            opacity: { duration: 0.2 },
                            maxHeight: { duration: 0.4 }
                          }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-800 overflow-hidden"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(200, 162, 124, 0.03), transparent)'
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <h4 className="text-lg font-semibold mb-2 text-primary">The Challenge</h4>
                          <p className="text-neutral-800">{study.challenge}</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <h4 className="text-lg font-semibold mb-2 text-primary">Our Solution</h4>
                          <p className="text-neutral-800">{study.solution}</p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <h4 className="text-lg font-semibold mb-2 text-primary">Results</h4>
                          <ul className="text-neutral-800 space-y-2">
                            {study.results.map((result, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-accent mr-2">•</span>
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Call to action */}
                  <div className="flex justify-end">
                    <Link
                      href={study.link}
                      className="inline-flex items-center text-primary hover:text-accent transition-colors"
                    >
                      <span>View Full Case Study</span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{
                          x: hoveredStudy === study.id ? 5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </motion.svg>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudies; 