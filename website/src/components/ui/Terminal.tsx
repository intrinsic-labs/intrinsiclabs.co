import React from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  content: string;
  className?: string;
  initialY?: number;
  delay?: number;
}

const Terminal: React.FC<TerminalProps> = ({
  content,
  className = '',
  delay = 0,
  initialY = 10
}) => {
  // Split the content by newlines to handle multiline strings
  const lines = content.split('\n');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`inline-block text-left bg-neutral-900 border p-4 rounded-xl terminal-text text-xs md:text-sm tracking-wider font-light ${className}`}
    >
      <div className="flex flex-col items-start">
        {lines.map((line, index) => (
          <span 
            key={index} 
            className={index === lines.length - 1 ? "terminal-cursor" : ""}
          >
            {line}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default Terminal; 