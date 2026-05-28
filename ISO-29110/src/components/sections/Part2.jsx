import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profiles } from '../../data/iso29110Data';
import { ArrowRight, FileText, Download } from 'lucide-react';

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
      className="mb-16 text-center relative"
    >
      {/* Badge superior */}
      <span className="badge-secondary mb-4 inline-block px-4 py-1 rounded-full shadow-sm">
        🗂️ ISO 29110 — Parte 2
      </span>

      {/* Título elegante */}
      <h2 className="section-title mb-4 text-3xl font-display font-bold tracking-wide text-accent">
        Marco y Taxonomía
      </h2>

      {/* Bloque narrativo con fondo sutil */}
      <div className="glass-card p-6 max-w-3xl mx-auto shadow-lg border border-accent/20 rounded-xl">
        <p className="section-subtitle leading-relaxed text-lg text-text-muted">
          La norma establece perfiles de procesos que se ajustan al tamaño y complejidad de cada organización. Estos perfiles permiten 
          aplicar la ISO 29110 de manera práctica en equipos pequeños de desarrollo, asegurando 
          que cada proyecto tenga un marco claro, adaptable y orientado a la calidad.
        </p>
      </div>

  
      <div className="mt-6 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
      </div>
    </motion.div>

    {/* Download banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-5 mb-10 border border-primary/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: 'hsla(221,83%,53%,0.06)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'hsla(221,83%,53%,0.15)' }}>
            <FileText size={22} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-text-primary">ISO/IEC 29110-2 — Documento Oficial</h4>
            <p className="text-text-muted text-sm">Términos generales y Taxonomía</p>
          </div>
        </div>
        <a
          href="/ISO-29110-2.pdf"
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 flex-shrink-0"
          style={{ background: 'hsl(221,83%,53%)', color: 'white' }}
        >
          <Download size={16} />
          Descargar PDF
        </a>
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
  className="mb-10"
>
          <h3 className="text-2xl font-display font-bold mb-6 text-center">Terminología Clave</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {taxonomy.map((t, i) => (
              <div key={i} className="glass-card p-4 flex items-start gap-3">
                <span className="badge-primary text-xs font-mono font-bold px-2 py-1 flex-shrink-0">{t.term}</span>
                <span className="text-text-muted text-sm">{t.def}</span>
              </div>
            ))}
          </div>
        </motion.div>

{/* Ejemplo práctico */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mb-6"
>
  <h3 className="text-2xl font-display font-bold mb-6 text-center">Ejemplo de Aplicación</h3>
  <div className="glass-card p-6 max-w-4xl mx-auto shadow-lg border border-primary/20 rounded-xl space-y-4">
    <p className="text-text-muted leading-relaxed text-lg">
      Imagina una empresa de software con <strong className="text-primary">10 integrantes</strong> que desarrolla 
      una aplicación móvil. Al aplicar la ISO 29110:
    </p>
    <ul className="space-y-2 text-sm text-text-muted">
      <li>✅ Se documentan roles y responsabilidades (PM, desarrolladores, testers).</li>
      <li>✅ Se definen entregables claros: prototipo, versión beta, versión final.</li>
      <li>✅ Se implementa un proceso de control de calidad en cada sprint.</li>
      <li>✅ Se realizan retrospectivas para mejorar continuamente.</li>
    </ul>
    {/* Cierre elegante */}
    <div className="glass-card p-4 border-l-4 border-accent text-center">
      <p className="text-base text-text-muted italic">
        Más allá de cumplir con un proyecto puntual, este enfoque siembra una cultura de 
        calidad y aprendizaje que acompaña a la organización en cada nuevo desafío.
      </p>
    </div>
  </div>
</motion.div>


      </div>
    </section>
  );
}
