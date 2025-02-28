"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '../ui/PlaceholderImage';
import AspectRatio from '../ui/AspectRatio';

// Featured projects data (placeholder)
const featuredProjects = [
  {
    id: 'project1',
    title: 'Fitness Tracking App',
    category: 'Mobile App',
    description:
      'A comprehensive fitness tracking application for iOS and Android with real-time workout analytics and personalized training plans.',
    image: '/images/placeholder-project-1.jpg',
    technologies: ['Swift', 'Kotlin', 'Firebase'],
    link: '/work/fitness-app',
  },
  {
    id: 'project2',
    title: 'E-commerce Platform',
    category: 'Web Application',
    description:
      'A full-featured e-commerce platform with inventory management, payment processing, and customer analytics.',
    image: '/images/placeholder-project-2.jpg',
    technologies: ['React', 'Next.js', 'Supabase'],
    link: '/work/ecommerce-platform',
  },
  {
    id: 'project3',
    title: 'Healthcare Management System',
    category: 'Custom Software',
    description:
      'A secure and compliant healthcare management system for patient records, appointment scheduling, and billing.',
    image: '/images/placeholder-project-3.jpg',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    link: '/work/healthcare-system',
  },
];

const FeaturedWork = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Make parallax more pronounced
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  // Add rotation for more dynamic effect
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-20 lg:py-32 bg-background relative overflow-hidden parallax-section">
      {/* Background decorative elements with parallax */}
      <motion.div 
        ref={bgRef}
        className="absolute inset-0 overflow-hidden parallax-bg"
        style={{ y: y1, opacity, rotate }}
      >
        <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl"></div>
      </motion.div>

      <motion.div 
        className="container-custom relative z-10 parallax-content"
        style={{ y: y2, scale }}
      >
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-4 md:mb-6"
          >
            Featured Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300"
          >
            Explore some of our recent projects and see how we've helped our
            clients achieve their goals.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 md:gap-12"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <div
                className={`flex flex-col lg:flex-row gap-6 md:gap-8 p-4 sm:p-6 rounded-xl transition-all duration-300 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="w-full lg:w-1/2 relative overflow-hidden">
                  <AspectRatio ratio={16/9} className="w-full" withBorder={true}>
                    <PlaceholderImage 
                      text={`${project.title} Preview`}
                      className={`w-full h-full card ${hoveredProject === project.id ? 'hovered' : ''}`}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"
                      initial={{ opacity: 0.6 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 0.3 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </AspectRatio>
                </div>

                {/* Project Info */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center mt-4 lg:mt-0">
                  <div className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 sm:mb-2 ${hoveredProject === project.id ? 'text-accent' : 'text-neutral-300'}`}>
                    {project.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal mb-2 sm:mb-4 font-display">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 mb-4 sm:mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-colors duration-300 ${
                          hoveredProject === project.id ? 'bg-accent/75' : 'bg-neutral-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.link}
                    className="inline-flex items-center text-primary hover:text-primary-400 transition-colors text-sm sm:text-base"
                  >
                    <span>View Case Study</span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{
                        x: hoveredProject === project.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </motion.svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 md:mt-16"
        >
          <Link href="/work" className="btn-outline">
            View All Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedWork; 