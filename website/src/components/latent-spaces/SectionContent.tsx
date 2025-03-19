import React from 'react';

interface SectionContentProps {
  children: React.ReactNode;
}

export default function SectionContent({ children }: SectionContentProps) {
  return (
    <div className="font-cardo text-[1.2rem] leading-[1.8] tracking-[0.01rem] text-white">
      {children}
    </div>
  );
} 