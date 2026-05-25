'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

type Theme = 'light' | 'cyber' | 'luxury' | 'earth';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>('light');

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove('theme-light', 'theme-cyber', 'theme-luxury', 'theme-earth');
    // Add the new theme class
    root.classList.add(`theme-${newTheme}`);
    // Support dark mode flag if needed by any third-party tailwind packages
    if (newTheme === 'cyber' || newTheme === 'luxury') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Check if the user is authenticated (user object exists or auth token is present)
    const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');

    if (!user && !hasToken) {
      // Force default light theme for anonymous guests
      setThemeState('light');
      applyTheme('light');
    } else {
      // Restore the user's preferred theme
      const savedTheme = localStorage.getItem('appTheme') as Theme;
      if (savedTheme && ['light', 'cyber', 'luxury', 'earth'].includes(savedTheme)) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        setThemeState('light');
        applyTheme('light');
      }
    }
  }, [user]);

  const setTheme = (newTheme: Theme) => {
    // Only permit theme modification if logged in
    const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
    if (!user && !hasToken) return;

    setThemeState(newTheme);
    localStorage.setItem('appTheme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
