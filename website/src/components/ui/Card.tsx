"use client";

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  isHovered?: boolean;
  onHover?: (id: string | null) => void;
  borderColors?: string[];
}

const Card = ({
  children,
  className = '',
  onClick,
  id = '',
  isHovered = false,
  onHover,
  borderColors = ['#6C5CE7','#E07A55'] // Default colors
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    if (cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    
    const handleResize = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse move to update gradient position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (onHover && id) {
      onHover(id);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (onHover) {
      onHover(null);
    }
  };

  // Calculate gradient position based on mouse position
  const gradientPosition = isMounted ? {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${borderColors.join(', ')})`,
  } : {};

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Border gradient effect */}
      <div 
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          padding: '1px',
          background: isHovered && isMounted ? gradientPosition.background : 'transparent',
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none',
        }}
      />
      
      {/* Background with hover effect */}
      <div 
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isHovered 
            ? 'bg-secondary/60 shadow-lg shadow-primary/5' 
            : 'bg-neutral-300/50'
        }`}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card; 