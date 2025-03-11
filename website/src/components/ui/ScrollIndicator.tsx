"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  text?: string;
  className?: string;
  duration?: number;
  yOffset?: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  text = "Scroll to explore",
  className = "absolute bottom-8 left-1/2 transform -translate-x-1/2",
  duration = 1.5,
  yOffset = 10
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-neutral-800 text-sm mb-2">{text}</span>
      <motion.div
        animate={{ y: [0, yOffset, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-neutral-800"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator; 