"use client";

import { FC, ReactNode } from 'react';

interface AspectRatioProps {
  ratio?: string | number;
  className?: string;
  children: ReactNode;
}

const AspectRatio: FC<AspectRatioProps> = ({
  ratio = '16/9',
  className = '',
  children
}) => {
  // Calculate padding based on ratio type
  const getPaddingBottom = () => {
    if (typeof ratio === 'number') {
      // If ratio is a number (e.g., 16/9 = 1.777...)
      return `${(1 / ratio) * 100}%`;
    } else if (typeof ratio === 'string' && ratio.includes('/')) {
      // If ratio is a string like "16/9"
      const [width, height] = ratio.split('/').map(Number);
      return `${(height / width) * 100}%`;
    }
    // Default fallback
    return '56.25%'; // 16:9 ratio
  };

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ 
        paddingBottom: getPaddingBottom()
      }}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};

export default AspectRatio; 