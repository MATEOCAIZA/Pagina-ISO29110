import { motion } from 'framer-motion';
import { BookOpen, Menu, X, RotateCcw, CheckCircle, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isoSections } from '../../data/iso29110Data';
import ThemeToggle from '../ui/ThemeToggle';

const ROUTE_MAP = {
  part1: '/parte/1',
  part2: '/parte/2',
  part3: '/parte/3',
  part4: '/parte/4',
  part5_1: '/parte/5-1',
  part5_2: '/parte/5-2',
};

export default function Navbar({ progressPercent, isVisited, isUnlocked, onReset, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNav = (sectionId) => {
    if (!isUnlocked(sectionId)) return;
    navigate(ROUTE_MAP[sectionId]);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--navbar-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(217,91%,60%), hsl(262,83%,65%))' }}>
            <BookOpen size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">
            <span className="gradient-text">ISO 29110</span>
            <span className="text-text-muted text-sm font-normal ml-1">Guía</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {isoSections.map((s) => {
            const unlocked = isUnlocked(s.id);
            const visited  = isVisited(s.id);
            const active   = pathname === ROUTE_MAP[s.id];

            return (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                disabled={!unlocked}
                title={!unlocked ? 'Completa la sección anterior para desbloquear' : s.title}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  !unlocked
                    ? 'text-text-muted/40 cursor-not-allowed'
                    : active
                      ? 'bg-surface-3 text-text-primary'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-2'
                }`}
              >
                {visited
                  ? <CheckCircle size={10} className="text-accent" />
                  : !unlocked
                    ? <Lock size={10} className="text-text-muted/40" />
                    : null}
                {s.shortTitle}
              </button>
            );
          })}
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

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <button
            onClick={onReset}
            title="Reiniciar progreso"
            className="p-2 rounded-lg text-text-muted hover:text-warning hover:bg-surface-2 transition-all"
          >
            <RotateCcw size={15} />
          </button>

          {/* Mobile toggle */}
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
          style={{ background: 'var(--mobile-menu-bg)' }}
        >
          <div className="p-3 grid grid-cols-2 gap-1">
            {isoSections.map((s) => {
              const unlocked = isUnlocked(s.id);
              const visited  = isVisited(s.id);
              const active   = pathname === ROUTE_MAP[s.id];

              return (
                <button
                  key={s.id}
                  onClick={() => handleNav(s.id)}
                  disabled={!unlocked}
                  className={`px-3 py-2 rounded-lg text-sm text-left flex items-center gap-2 transition-all ${
                    !unlocked
                      ? 'text-text-muted/40 cursor-not-allowed'
                      : active
                        ? 'bg-surface-3 text-text-primary'
                        : 'text-text-muted hover:bg-surface-2'
                  }`}
                >
                  <span>{s.emoji}</span>
                  {visited
                    ? <CheckCircle size={10} className="text-accent" />
                    : !unlocked
                      ? <Lock size={10} className="text-text-muted/40" />
                      : null}
                  {s.shortTitle}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
