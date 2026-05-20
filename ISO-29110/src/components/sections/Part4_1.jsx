import { motion } from 'framer-motion';
import { useEffect } from 'react';

const genericProfiles = [
  {
    name: 'Perfil de Entrada',
    iso12207: ['SWE.1 Análisis de Requisitos', 'SWE.3 Diseño de Software', 'SWE.4 Construcción'],
    applies: 'Equipos de 1-6 personas. 1 proyecto simple.',
    color: 'accent',
  },
  {
    name: 'Perfil Básico',
    iso12207: ['SWE.1 al SWE.6', 'SPL.2 Gestión del Portafolio', 'MAN.3 Gestión de Proyectos'],
    applies: 'Equipos de 6-25 personas. Proyectos de complejidad media.',
    color: 'primary',
  },
  {
    name: 'Perfil Intermedio',
    iso12207: ['Todos los del Básico', 'RIN.1 Gestión de Riesgos', 'QUA.3 Aseguramiento de Calidad'],
    applies: 'Organizaciones con procesos maduros (26-50 personas).',
    color: 'secondary',
  },
  {
    name: 'Perfil Avanzado',
    iso12207: ['Todos los del Intermedio', 'PIM.3 Mejora de Procesos', 'MAN.5 Medición'],
    applies: 'Grandes VSEs con gestión cuantitativa de procesos.',
    color: 'warning',
  },
];

const colorMap = {
  accent: { bg: 'bg-accent/10', border: 'border-accent/30', text: 'text-accent' },
  primary: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary' },
  secondary: { bg: 'bg-secondary/10', border: 'border-secondary/30', text: 'text-secondary' },
  warning: { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning' },
};

const correspondence = [
  { requirement: 'Planificación del Proyecto', iso12207: 'MAN.3.BP1', profile: 'Entrada' },
  { requirement: 'Gestión de Riesgos', iso12207: 'MAN.3.BP4', profile: 'Básico' },
  { requirement: 'Análisis de Requisitos', iso12207: 'SWE.1.BP1', profile: 'Entrada' },
  { requirement: 'Diseño de Arquitectura', iso12207: 'SWE.3.BP1', profile: 'Básico' },
  { requirement: 'Pruebas de Software', iso12207: 'SWE.4.BP2', profile: 'Entrada' },
  { requirement: 'Control de Versiones', iso12207: 'SCM.1', profile: 'Básico' },
  { requirement: 'Revisión de Calidad', iso12207: 'QUA.3', profile: 'Intermedio' },
  { requirement: 'Mejora de Procesos', iso12207: 'PIM.3', profile: 'Avanzado' },
];

const profileColor = { 'Entrada': 'text-accent', 'Básico': 'text-primary', 'Intermedio': 'text-secondary', 'Avanzado': 'text-warning' };

export default function Part4({ markVisited }) {
  useEffect(() => { markVisited('part4'); }, []);

  return (
    <section id="part4" className="py-20 bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="badge-warning mb-4">📋 ISO 29110 — Parte 4-1</span>
          <h2 className="section-title mb-3">Especificaciones de Perfil</h2>
          <p className="section-subtitle max-w-3xl">
            La Parte 4-1 define qué procesos de <strong className="text-text-primary">ISO 12207</strong> deben cumplirse para cada perfil de VSE.
          </p>
        </motion.div>

        {/* Profile cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {genericProfiles.map((p, i) => {
            const c = colorMap[p.color];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`glass-card p-5 border ${c.border}`}>
                <h3 className={`font-bold mb-2 ${c.text}`}>{p.name}</h3>
                <p className="text-text-muted text-xs mb-3">{p.applies}</p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">ISO 12207 aplicables:</p>
                  {p.iso12207.map((item, j) => (
                    <div key={j} className={`text-xs px-2 py-1 rounded-md ${c.bg} ${c.text}`}>{item}</div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Correspondence table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-display font-bold mb-4">Tabla de Correspondencia de Requisitos</h3>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-3">
                  <th className="text-left px-4 py-3 text-text-muted font-semibold">Requisito</th>
                  <th className="text-left px-4 py-3 text-text-muted font-semibold">ISO 12207 Ref.</th>
                  <th className="text-left px-4 py-3 text-text-muted font-semibold">Perfil mínimo</th>
                </tr>
              </thead>
              <tbody>
                {correspondence.map((row, i) => (
                  <tr key={i} className="border-b border-border-subtle hover:bg-surface-3/50 transition-colors">
                    <td className="px-4 py-3 text-text-primary">{row.requirement}</td>
                    <td className="px-4 py-3">
                      <code className="bg-surface-3 px-2 py-0.5 rounded text-xs text-text-muted">{row.iso12207}</code>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${profileColor[row.profile]}`}>{row.profile}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
