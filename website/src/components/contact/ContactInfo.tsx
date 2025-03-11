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
    <div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-display font-medium mb-8"
      >
        Contact Information
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-neutral-800 mb-8"
      >
        Reach out to us directly or connect on social media.
      </motion.p>
      
      <Card className="p-6 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiMail size={20} />
              </div>
              <div className="ml-4">
                <a 
                  href="mailto:helloworld@intrinsiclabs.co" 
                  className="text-primary hover:text-accent transition-colors"
                >
                  helloworld@intrinsiclabs.co
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiClock size={20} />
              </div>
              <div className="ml-4">
                <p className="text-neutral-800">We typically respond within 24-48 hours during business days.</p>
              </div>
            </div>
          </motion.div>
          
          <div className="h-px w-full bg-neutral-800/50 my-6"></div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/intrinsic-labs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary transition-colors duration-300 flex items-center justify-center text-neutral-800"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a 
                href="https://twitter.com/intrinsic_labs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary transition-colors duration-300 flex items-center justify-center text-neutral-800"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a 
                href="https://instagram.com/intrinsiclabs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary transition-colors duration-300 flex items-center justify-center text-neutral-800"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-medium text-primary mb-2">Availability</h3>
            <p className="text-neutral-800">
              We're currently accepting new projects for Q2-3 2025. Get in touch early to secure your spot in our development schedule.
            </p>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
};

export default ContactInfo; 