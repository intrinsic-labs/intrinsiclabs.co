import React from 'react';

interface CodeChipProps {
  children: React.ReactNode;
  size?: 'small' | 'large';
}

export default function CodeChip({ children, size = 'small' }: CodeChipProps) {
    const sizeClass = size === 'small' ? 'text-[0.95em]' : 'text-[1.25em]';
    return (
        <span className={`font-calling-code text-ls-yellowLight ${sizeClass} bg-ls-yellowLight/10 px-[0.3em] py-[0.1em] rounded`}>
            {children}
        </span>
    )
}