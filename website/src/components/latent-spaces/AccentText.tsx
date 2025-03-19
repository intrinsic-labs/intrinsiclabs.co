import React from 'react';

interface AccentTextProps {
  children: React.ReactNode;
  color?: string;
}

export default function AccentText({ children, color = 'text-ls-accentLight' }: AccentTextProps) {
 return (
    <p className={`bold text-[2.2rem] leading-[1.2] ${color}`}>
      {children}
    </p>
  );
}