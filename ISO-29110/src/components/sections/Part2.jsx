import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profiles } from '../../data/iso29110Data';
import { ArrowRight } from 'lucide-react';

const colorMap = {
  accent: { bg: 'bg-accent/10', border: 'border-accent/30', text: 'text-accent', glow: 'shadow-glow-accent' },
  primary: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary', glow: 'shadow-glow-primary' },
  secondary: { bg: 'bg-secondary/10', border: 'border-secondary/30', text: 'text-secondary', glow: 'shadow-glow-secondary' },
  warning: { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', glow: '' },
};

const taxonomy = [
  { term: 'VSE', def: 'Organización pequeña de software (menos de 25 integrantes).' },
  { term: 'Perfil', def: 'Agrupación de procesos y actividades adaptados al tamaño del equipo.' },
  { term: 'Proceso', def: 'Secuencia de actividades que transforman entradas en resultados.' },
  { term: 'Artefacto', def: 'Documento o entregable generado en el desarrollo.' },
  { term: 'PM', def: 'Project Management — gestión de proyectos.' },
  { term: 'SI', def: 'Software Implementation — implementación de software.' },
];

export default function Part2({ markVisited }) {
  useEffect(() => { markVisited('part2'); }, [markVisited]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <section id="part2" className="py-20 bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="badge-secondary mb-4">🗂️ ISO 29110 — Parte 2</span>
          <h2 className="section-title mb-3">Marco y Taxonomía</h2>
          <p className="section-subtitle max-w-3xl">
            La norma establece <strong className="text-text-primary">perfiles de procesos</strong> que se ajustan
            al tamaño y complejidad de cada organización. Estos perfiles permiten aplicar la ISO 29110 de manera
            práctica en equipos pequeños de desarrollo.
          </p>
        </motion.div>

        {/* Perfiles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {profiles.map((p, i) => {
            const c = colorMap[p.color];
            const isSelected = selectedProfile === p.id;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedProfile(isSelected ? null : p.id)}
                className={`glass-card p-5 cursor-pointer transition-all duration-300 border ${isSelected ? `${c.border} ${c.glow}` : 'border-border-subtle'}`}
              >
                <div className={`text-3xl mb-3 w-12 h-12 rounded-xl flex items-center justify-center ${c.bg}`}>{p.icon}</div>
                <h3 className={`font-bold text-lg mb-1 ${isSelected ? c.text : 'text-text-primary'}`}>{p.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>{p.team}</span>
                <p className="text-text-muted text-sm mt-3">{p.description}</p>
                {isSelected && (
                  <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-1">
                    {p.features.map((f, fi) => (
                      <li key={fi} className={`text-xs flex items-center gap-1.5 ${c.text}`}>
                        <ArrowRight size={10} />{f}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Escalera de madurez */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-display font-bold mb-6 text-center">Niveles de Madurez</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {profiles.map((p, i) => {
              const c = colorMap[p.color];
              const widths = ['w-full md:w-40', 'w-full md:w-52', 'w-full md:w-64', 'w-full md:w-80'];
              return (
                <div key={p.id} className="flex flex-col md:flex-row items-center">
                  <div className={`${widths[i]} glass-card p-4 text-center border ${c.border}`}>
                    <div className="text-2xl mb-1">{p.icon}</div>
                    <div className={`font-semibold text-sm ${c.text}`}>{p.name}</div>
                    <div className="text-xs text-text-muted">{p.team}</div>
                  </div>
                  {i < profiles.length - 1 && (
                    <div className="text-2xl text-text-muted mx-2 rotate-90 md:rotate-0">→</div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Terminología */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold mb-4">Terminología Clave</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {taxonomy.map((t, i) => (
              <div key={i} className="glass-card p-4 flex items-start gap-3">
                <span className="badge-primary text-xs font-mono font-bold px-2 py-1 flex-shrink-0">{t.term}</span>
                <span className="text-text-muted text-sm">{t.def}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
