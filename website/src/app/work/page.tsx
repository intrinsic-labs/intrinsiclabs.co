'use client';

import { motion } from 'framer-motion';
import WorkHero from '@/components/work/WorkHero';
import CaseStudies from '@/components/work/CaseStudies';
import ProjectsGallery from '@/components/work/ProjectsGallery';
import CallToAction from '@/components/home/CallToAction';

export default function WorkPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <WorkHero />
      <CaseStudies />
      <ProjectsGallery />
      <CallToAction />
    </motion.main>
  );
} 