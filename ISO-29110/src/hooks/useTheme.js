import { useState, useEffect } from 'react';

/**
 * useTheme – manages the light / dark theme for the app.
 *
 * Priority order for initial theme:
 *   1. Value saved in localStorage  →  persists user choice across reloads
 *   2. OS-level prefers-color-scheme → respects system preference on first visit
 *   3. Fallback: 'light'
 *
 * The chosen theme is applied as a `data-theme` attribute on <html>
 * so that all CSS custom-property blocks pick it up.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) { /* localStorage not available */ }

    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (_) { /* ignore */ }
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
