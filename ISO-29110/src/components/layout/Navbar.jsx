import { motion } from 'framer-motion';
import { BookOpen, Menu, X, RotateCcw, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { isoSections } from '../../data/iso29110Data';

const colorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  warning: 'text-warning',
};

export default function Navbar({ progressPercent, isVisited, onReset, activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(15,18,28,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(217,91%,60%), hsl(262,83%,65%))' }}>
            <BookOpen size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">
            <span className="gradient-text">ISO 29110</span>
            <span className="text-text-muted text-sm font-normal ml-1">Guía</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {isoSections.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeSection === s.id ? 'bg-surface-3 text-text-primary' : 'text-text-muted hover:text-text-primary hover:bg-surface-2'
              }`}
            >
              {isVisited(s.id) && <CheckCircle size={10} className="text-accent" />}
              {s.shortTitle}
            </button>
          ))}
        </div>

        {/* Progress + actions */}
        <div className="flex items-center gap-3">
          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-surface-2">
            <div className="w-20 h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(217,91%,60%), hsl(262,83%,65%))' }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <span className="text-xs text-text-muted font-medium">{progressPercent}%</span>
          </div>

          <button
            onClick={onReset}
            title="Reiniciar progreso"
            className="p-2 rounded-lg text-text-muted hover:text-warning hover:bg-surface-2 transition-all"
          >
            <RotateCcw size={15} />
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-text-muted hover:bg-surface-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Progress bar bottom */}
      <div className="h-0.5 bg-surface-3">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, hsl(217,91%,60%), hsl(262,83%,65%), hsl(172,66%,50%))' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-border-subtle"
          style={{ background: 'rgba(15,18,28,0.97)' }}
        >
          <div className="p-3 grid grid-cols-2 gap-1">
            {isoSections.map((s) => (
              <button
                key={s.id}
                onClick={() => { onNavigate(s.id); setMenuOpen(false); }}
                className={`px-3 py-2 rounded-lg text-sm text-left flex items-center gap-2 transition-all ${
                  activeSection === s.id ? 'bg-surface-3 text-text-primary' : 'text-text-muted hover:bg-surface-2'
                }`}
              >
                <span>{s.emoji}</span>
                {isVisited(s.id) && <CheckCircle size={10} className="text-accent" />}
                {s.shortTitle}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
