import { useState, useEffect } from 'react';

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    if (savedTheme) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = (): void => {
    setIsDark((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', String(newMode));
      return newMode;
    });
  };

  return { isDark, toggleTheme };
};