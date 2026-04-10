/* ============================================
   Theme Context — Dark / Light mode toggle
   Persists preference in LocalStorage
   ============================================ */

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_theme');
      if (stored !== null) return stored === 'dark';
    } catch { /* ignore */ }
    // Default to dark
    return true;
  });

  // Apply class to <html> for Tailwind dark mode and body styling
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#020617';
      document.body.style.color = '#e2e8f0';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
    try {
      localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
    } catch { /* ignore */ }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
