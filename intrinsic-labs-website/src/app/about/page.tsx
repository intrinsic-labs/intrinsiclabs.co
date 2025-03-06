'use client';

import { motion } from 'framer-motion';
import AboutHero from '@/components/about/AboutHero';
import CompanyStory from '@/components/about/CompanyStory';
import TeamSection from '@/components/about/TeamSection';
import ValuesSection from '@/components/about/ValuesSection';
import CallToAction from '@/components/home/CallToAction';

export default function AboutPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <AboutHero />
      <CompanyStory />
      <TeamSection />
      <ValuesSection />
      <CallToAction />
    </motion.main>
  );
} 