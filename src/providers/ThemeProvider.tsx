'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  isDarkTheme: boolean;
  setDarkTheme: (isDark: boolean) => void;
};

const defaultContext: ThemeContextType = {
  isDarkTheme: false,
  setDarkTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Sync the 'dark' class on <html> whenever isDarkTheme changes
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    // Check for system preference and set initial theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkTheme(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setDarkTheme = (isDark: boolean) => {
    setIsDarkTheme(isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 