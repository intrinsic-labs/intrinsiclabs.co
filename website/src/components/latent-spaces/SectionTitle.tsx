import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  size?: 'small' | 'large';
  className?: string;
}

export default function SectionTitle({ children, size = 'large', className }: SectionTitleProps) {
  const sizeClass = size === 'small' ? 'text-[2rem]' : 'text-[3rem]';
  return (
    <h2 className={`font-cardo ${sizeClass} mb-10 font-normal leading-[1.2] text-white relative after:content-[''] after:absolute after:bottom-[-1.2rem] after:left-0 after:w-36 after:h-[1px] after:bg-white/30 ${className}`}>
      {children}
    </h2>
  );
} 