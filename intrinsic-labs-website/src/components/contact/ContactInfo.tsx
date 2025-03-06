"use client";

import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { FiMail, FiClock, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const ContactInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <Card className="p-6 md:p-8 h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col h-full"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="heading-md mb-2">Contact Information</h2>
          <p className="text-secondary/70">Reach out to us directly or connect on social media.</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6 flex-grow">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FiMail size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary">Email</h3>
              <a 
                href="mailto:helloworld@intrinsiclabs.co" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                helloworld@intrinsiclabs.co
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FiClock size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary">Response Time</h3>
              <p className="text-secondary/70">We typically respond within 24-48 hours during business days.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8">
          <h3 className="text-sm font-medium text-secondary mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/intrinsic-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary/20 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a 
              href="https://twitter.com/intrinsic_labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary/20 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300"
              aria-label="Twitter"
            >
              <FiTwitter size={18} />
            </a>
            <a 
              href="https://instagram.com/intrinsiclabs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary/20 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300"
              aria-label="Instagram"
            >
              <FiInstagram size={18} />
            </a>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <h3 className="text-sm font-medium text-primary mb-2">Availability</h3>
          <p className="text-secondary/70 text-sm">
            We're currently accepting new projects for Q2-3 2025. Get in touch early to secure your spot in our development schedule.
          </p>
        </motion.div>
      </motion.div>
    </Card>
  );
};

export default ContactInfo; 