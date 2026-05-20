import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Shield, TrendingUp, ChevronDown } from 'lucide-react';

const stats = [
  { value: '95%', label: 'de empresas de software son VSEs', icon: Users },
  { value: '40%', label: 'menos errores en entrega', icon: Shield },
  { value: '3x', label: 'mayor satisfacción del cliente', icon: TrendingUp },
];

const floatingOrbs = [
  { size: 300, x: '10%', y: '20%', color: 'hsl(217,91%,60%)', delay: 0 },
  { size: 200, x: '80%', y: '60%', color: 'hsl(262,83%,65%)', delay: 1 },
  { size: 150, x: '60%', y: '10%', color: 'hsl(172,66%,50%)', delay: 2 },
];

export default function HeroSection({ onStart }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6 + orb.delay, repeat: Infinity, delay: orb.delay }}
        />
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(217,91%,60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217,91%,60%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="badge-primary text-sm px-4 py-1.5">
            <Zap size={12} /> Norma Internacional ISO/IEC 29110
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
        >
          Implementa{' '}
          <span className="gradient-text">ISO 29110</span>
          <br />
          en tu empresa de software
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text-muted max-w-2xl mx-auto mb-10 text-balance"
        >
          Guía interactiva y visual diseñada para <strong className="text-text-primary">pequeñas empresas de software</strong> (hasta 25 personas). Sin tecnicismos, paso a paso.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button onClick={onStart} className="btn-primary text-base px-8 py-4">
            Comenzar Guía <ArrowRight size={18} />
          </button>
          <button
            onClick={() => document.getElementById('part3')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-base px-8 py-4"
          >
            Autoevalúate ahora
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <stat.icon size={20} className="text-primary mx-auto mb-2" />
              <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
              <div className="text-text-muted text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-text-muted text-sm"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Explora las secciones</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
