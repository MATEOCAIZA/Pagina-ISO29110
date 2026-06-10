import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle – animated Sun / Moon button for switching light ↔ dark theme.
 *
 * Props:
 *   theme        {string}   – current theme: 'light' | 'dark'
 *   toggleTheme  {function} – callback to switch theme
 */
export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="relative p-2 rounded-lg transition-colors duration-200"
      style={{
        background: isDark
          ? 'rgba(255,255,255,0.07)'
          : 'rgba(0,0,0,0.06)',
        color: isDark
          ? 'hsl(38, 92%, 65%)'
          : 'hsl(217, 91%, 48%)',
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ display: 'flex' }}
          >
            <Moon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ display: 'flex' }}
          >
            <Sun size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
