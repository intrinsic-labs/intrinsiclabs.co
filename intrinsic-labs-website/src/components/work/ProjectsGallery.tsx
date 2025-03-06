"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import PlaceholderImage from '../ui/PlaceholderImage';
import AspectRatio from '../ui/AspectRatio';
import Card from '../ui/Card';

// Project data (placeholder)
const projects = [
  {
    id: 'project1',
    title: 'FitTrack Pro',
    category: 'Mobile App',
    description: 'Fitness tracking app with personalized training plans',
    image: '/images/placeholder-project-1.jpg',
    technologies: ['Swift', 'Kotlin', 'Firebase'],
    link: '/work/fitness-app',
  },
  {
    id: 'project2',
    title: 'ShopSmart',
    category: 'Web Application',
    description: 'E-commerce platform with inventory management',
    image: '/images/placeholder-project-2.jpg',
    technologies: ['React', 'Next.js', 'Supabase'],
    link: '/work/ecommerce-platform',
  },
  {
    id: 'project3',
    title: 'MediConnect',
    category: 'Custom Software',
    description: 'Healthcare management system for patient records',
    image: '/images/placeholder-project-3.jpg',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    link: '/work/healthcare-system',
  },
  {
    id: 'project4',
    title: 'TaskMaster',
    category: 'Mobile App',
    description: 'Productivity app for team collaboration',
    image: '/images/placeholder-project-4.jpg',
    technologies: ['React Native', 'Firebase', 'Redux'],
    link: '/work/taskmaster',
  },
  {
    id: 'project5',
    title: 'FinTrack',
    category: 'Web Application',
    description: 'Personal finance tracking and budgeting tool',
    image: '/images/placeholder-project-5.jpg',
    technologies: ['Vue.js', 'Express', 'MongoDB'],
    link: '/work/fintrack',
  },
  {
    id: 'project6',
    title: 'SmartHome Hub',
    category: 'Custom Software',
    description: 'IoT control system for smart home devices',
    image: '/images/placeholder-project-6.jpg',
    technologies: ['Python', 'React', 'MQTT', 'Raspberry Pi'],
    link: '/work/smarthome',
  },
  {
    id: 'project7',
    title: 'TravelBuddy',
    category: 'Mobile App',
    description: 'Travel planning and itinerary management app',
    image: '/images/placeholder-project-7.jpg',
    technologies: ['Flutter', 'Firebase', 'Google Maps API'],
    link: '/work/travelbuddy',
  },
  {
    id: 'project8',
    title: 'ContentFlow',
    category: 'Web Application',
    description: 'Content management system for digital publishers',
    image: '/images/placeholder-project-8.jpg',
    technologies: ['React', 'GraphQL', 'Prisma'],
    link: '/work/contentflow',
  },
  {
    id: 'project9',
    title: 'SupplyChain Pro',
    category: 'Custom Software',
    description: 'Supply chain management and logistics platform',
    image: '/images/placeholder-project-9.jpg',
    technologies: ['Angular', 'Node.js', 'PostgreSQL'],
    link: '/work/supplychain',
  },
];

// Categories for filtering
const categories = ['All', 'Mobile App', 'Web Application', 'Custom Software'];

const ProjectsGallery = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <motion.div 
        className="container-custom relative z-10"
        style={{ y, opacity }}
      >
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-4 md:mb-6"
          >
            Projects Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300"
          >
            Browse our complete portfolio of projects across different categories.
          </motion.p>
        </div>

        {/* Category filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-background font-medium'
                  : 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                exit="exit"
                layout
              >
                <Card
                  id={project.id}
                  isHovered={hoveredProject === project.id}
                  onHover={setHoveredProject}
                  className="h-full"
                >
                  <Link href={project.link} className="block p-4 h-full">
                    <div className="flex flex-col h-full">
                      {/* Project Image */}
                      <div className="w-full relative overflow-hidden rounded-lg mb-4">
                        <AspectRatio ratio={16/9} className="w-full">
                          <PlaceholderImage 
                            text={`${project.title} Preview`}
                            className={`w-full h-full ${hoveredProject === project.id ? 'hovered' : ''}`}
                          />
                        </AspectRatio>
                      </div>
                      
                      {/* Project Info */}
                      <div className="flex-grow">
                        <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${hoveredProject === project.id ? 'text-accent' : 'text-neutral-300'}`}>
                          {project.category}
                        </div>
                        <h3 className="text-lg font-mono font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-neutral-300 mb-4">{project.description}</p>
                      </div>
                      
                      {/* Technologies */}
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-1 rounded-full text-xs transition-colors duration-300 ${
                                hoveredProject === project.id ? 'bg-accent/75' : 'bg-neutral-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 rounded-full text-xs bg-neutral-800">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when no projects match filter */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-neutral-300 text-lg">No projects found in this category.</p>
            <button 
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-primary hover:text-primary-400 transition-colors"
            >
              View all projects
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ProjectsGallery; 