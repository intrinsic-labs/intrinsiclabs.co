'use client';

import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';

export default function ClientThemeBackground({ children }: { children: React.ReactNode }) {
  const { isDarkTheme } = useTheme();
  
  return (
    <body className={`min-h-screen flex flex-col ${isDarkTheme ? 'bg-ls-background' : ''}`}>
      {children}
    </body>
  );
} 