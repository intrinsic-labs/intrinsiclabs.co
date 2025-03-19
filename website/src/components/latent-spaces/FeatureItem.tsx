'use client';

import { motion } from 'framer-motion';

interface FeatureItemProps {
  text: string;
  funded: boolean;
  delay?: number;
}

export default function FeatureItem({ text, funded, delay = 0 }: FeatureItemProps) {
  return (
    <motion.li 
      className="flex items-start mb-6 font-cardo"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className="flex-shrink-0 mr-4 mt-1">
        {funded ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3B9A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L11 15L16 9" stroke="#3B9A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div className={`font-cardo text-[1.2rem] leading-[1.6] tracking-[0.01rem] ${funded ? 'text-ls-accentLight' : 'text-white/80'}`}>
        {text}
      </div>
    </motion.li>
  );
} 