import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FileText, Download} from 'lucide-react';
const genericProfiles = [
  {
    name: 'Perfil de Entrada',
    iso12207: ['SWE.1 Análisis de Requisitos', 'SWE.3 Diseño de Software', 'SWE.4 Construcción'],
    applies: 'VSEs que están empezando (Start-ups), o que desarrollan proyectos muy simples y pequeños: 6-month-person.',
    color: 'accent',
  },
  {
    name: 'Perfil Básico',
    iso12207: ['SWE.1 al SWE.6', 'SPL.2 Gestión del Portafolio', 'MAN.3 Gestión de Proyectos'],
    applies: 'VSEs que desarrollan solo un proyecto por equipo de trabajo. Es decir, un proyecto a la vez por equipo.',
    color: 'primary',
  },
  {
    name: 'Perfil Intermedio',
    iso12207: ['Todos los del Básico', 'RIN.1 Gestión de Riesgos', 'QUA.3 Aseguramiento de Calidad'],
    applies: 'VSEs que desarrollan varios proyectos en paralelo con más de un equipo.',
    color: 'secondary',
  },
  {
    name: 'Perfil Avanzado',
    iso12207: ['Todos los del Intermedio', 'PIM.3 Mejora de Procesos', 'MAN.5 Medición'],
    applies: 'VSEs que buscan mantenerse y crecer como empresas de desarrollo de SW independientes y competitivas.',
    color: 'warning',
  },
];

const PROFILES = [
  {
    name: 'Perfil de Entrada',
    short: 'Entrada',
    color: 'hsl(172,66%,40%)',
    dot: 'hsl(172,66%,45%)',
    scope: genericProfiles[0].applies,
    note: 'Punto de partida para VSEs pequeñas',
    noteColor: 'hsl(172,66%,35%)',
    noteBg: 'hsla(172,66%,50%,0.1)',
    noteBorder: 'hsla(172,66%,50%,0.3)',
    isos: [
      { code: 'MAN.1, PM.1', label: 'Planificación del Proyecto' },
      { code: 'SWE.1.2', label: 'Análisis de Requisitos del Software' },
      { code: 'SWE.3', label: 'Diseño de la Arquitectura y Detalle del Software' },
      { code: 'SWE.4', label: 'Construcción del Software' },
      { code: 'SWE.5', label: 'Integración del Software' },
      { code: 'SWE.6', label: 'Pruebas de Calificación del Software' },
    ],
  },
  {
    name: 'Perfil Básico',
    short: 'Básico',
    color: 'hsl(217,91%,55%)',
    dot: 'hsl(217,91%,55%)',
    scope: genericProfiles[1].applies,
    note: 'Incluye todo lo del Perfil de Entrada',
    noteColor: 'hsl(217,91%,55%)',
    noteBg: 'hsla(217,91%,60%,0.05)',
    noteBorder: 'hsla(217,91%,60%,0.3)',
    isos: [
      { code: 'MAN.3', label: 'Gestión de Riesgos' },
      { code: 'SCM.1', label: 'Gestión de Configuración del Software' },
      { code: 'SCM.2', label: 'Versionamiento' },
    ],
  },
  {
    name: 'Perfil Intermedio',
    short: 'Intermedio',
    color: 'hsl(262,83%,58%)',
    dot: 'hsl(262,83%,60%)',
    scope: genericProfiles[2].applies,
    note: 'Incluye todo lo del Perfil Básico',
    noteColor: 'hsl(262,83%,60%)',
    noteBg: 'hsla(262,83%,65%,0.05)',
    noteBorder: 'hsla(262,83%,65%,0.3)',
    isos: [
      { code: 'QUA.3', label: 'Aseguramiento de Calidad del Producto' },
      { code: 'MAN.5', label: 'Gestión de la Calidad' },
      { code: 'SUC.1', label: 'Gestión de la Adquisición de Software' },
      { code: 'SUC.2', label: 'Gestión de la Provisión de Software' },
      { code: 'BU.1', label: 'Gestión de Negocios' },
    ],
  },
  {
    name: 'Perfil Avanzado',
    short: 'Avanzado',
    color: 'hsl(38,92%,50%)',
    dot: 'hsl(38,92%,48%)',
    scope: genericProfiles[3].applies,
    note: 'Incluye todo lo del Perfil Intermedio',
    noteColor: 'hsl(38,92%,50%)',
    noteBg: 'hsla(38,92%,55%,0.1)',
    noteBorder: 'hsla(38,92%,55%,0.3)',
    isos: [
      { code: 'PIM.3', label: 'Mejora de Procesos' },
      { code: 'MAN.5', label: 'Medición Cuantitativa de Procesos' },
      { code: 'SWE.8', label: 'Mantenimiento' },
      { code: 'INM.1', label: 'Gestión del Conocimiento' },
    ],
  },
];

const RING_COLORS = [
  'hsla(172,66%,44%,0.82)',
  'hsla(217,91%,55%,0.80)',
  'hsla(262,83%,58%,0.78)',
  'hsla(38,92%,50%,0.82)',
];
const RING_RADII = [84, 66, 48, 30];
const RING_LABELS = ['Avanzado', 'Intermedio', 'Básico', 'Entrada'];

const colorMap = {
  accent:    { bg: 'bg-accent/10',    border: 'border-accent/30',    text: 'text-accent' },
  primary:   { bg: 'bg-primary/10',   border: 'border-primary/30',   text: 'text-primary' },
  secondary: { bg: 'bg-secondary/10', border: 'border-secondary/30', text: 'text-secondary' },
  warning:   { bg: 'bg-warning/10',   border: 'border-warning/30',   text: 'text-warning' },
};

const correspondence = [
  { requirement: 'Planificación del Proyecto', iso12207: 'MAN.3.BP1', profile: 'Entrada' },
  { requirement: 'Gestión de Riesgos',         iso12207: 'MAN.3.BP4', profile: 'Básico' },
  { requirement: 'Análisis de Requisitos',     iso12207: 'SWE.1.BP1', profile: 'Entrada' },
  { requirement: 'Diseño de Arquitectura',     iso12207: 'SWE.3.BP1', profile: 'Básico' },
  { requirement: 'Pruebas de Software',        iso12207: 'SWE.4.BP2', profile: 'Entrada' },
  { requirement: 'Control de Versiones',       iso12207: 'SCM.1',     profile: 'Básico' },
  { requirement: 'Revisión de Calidad',        iso12207: 'QUA.3',     profile: 'Intermedio' },
  { requirement: 'Mejora de Procesos',         iso12207: 'PIM.3',     profile: 'Avanzado' },
];

const profileColor = {
  'Entrada':    'text-accent',
  'Básico':     'text-primary',
  'Intermedio': 'text-secondary',
  'Avanzado':   'text-warning',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function VennDiagram({ current }) {
  const cx = 110, cy = 110, W = 220, H = 220;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img">
      <title>Diagrama Stacked Venn de perfiles ISO 29110</title>
      <desc>
        Anillos concéntricos mostrando perfiles acumulativos. Perfil activo:{' '}
        {PROFILES[current].name}
      </desc>

      {/* Rings — largest first so smaller ones paint on top */}
      {[0, 1, 2, 3].map((i) => {
        const r = RING_RADII[i];
        const isActive = 3 - i <= current;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill={isActive ? RING_COLORS[3 - i] : 'transparent'}
            stroke={isActive ? RING_COLORS[3 - i] : 'rgba(255,255,255,0.12)'}
            strokeWidth={isActive ? 1.5 : 0.7}
          />
        );
      })}

      {/* Labels */}
      {[0, 1, 2, 3].map((i) => {
        const r = RING_RADII[i];
        const isActive = 3 - i <= current;
        const ly =
          i === 0
            ? cy - (r - 16)
            : cy - (RING_RADII[i - 1] + r) / 2;
        return (
          <text
            key={i}
            x={cx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={i === 0 ? 9 : 10}
            fontWeight={isActive ? 500 : 400}
            fill={isActive ? '#fff' : 'rgba(255,255,255,0.35)'}
            fontFamily="inherit"
          >
            {RING_LABELS[i]}
          </text>
        );
      })}
    </svg>
  );
}

function ProfileInfo({ current }) {
  const p = PROFILES[current];

  // Collect ISOs from all levels up to and including current
  const allIsos = [];
  p.isos.forEach((iso) => allIsos.push({ ...iso, fromIndex: current }));

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: p.dot }}
          />
          <span className="text-lg font-semibold text-text-primary">{p.name}</span>
        </div>
        <p className="text-sm text-text-muted leading-relaxed">{p.scope}</p>
      </div>

      {/* Accumulation note */}
      {current > 0 && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium w-fit"
          style={{
            color: p.noteColor,
            background: p.noteBg,
            borderColor: p.noteBorder,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v6M6 9.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {p.note}
        </div>
      )}

      {/* ISO list */}
      <div>
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Procesos ISO 12207 requeridos
        </p>
        <div className="flex flex-col gap-2">
          {allIsos.map((iso, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 px-3 py-2 rounded-lg border border-border-subtle bg-surface-3/50 text-xs leading-snug"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
                style={{ background: PROFILES[iso.fromIndex].dot }}
              />
              <div>
                <span className="font-semibold text-text-primary">{iso.code}</span>
                <span className="text-text-muted"> — {iso.label}</span>
                {iso.fromIndex < current && (
                  <div className="text-text-muted/60 mt-0.5">
                    Heredado de: {PROFILES[iso.fromIndex].short}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Part4({ markVisited }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    markVisited('part4');
  }, []);

  return (
    <section id="part4" className="py-20 bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="badge-warning mb-4">📋 ISO 29110 — Parte 4-1</span>
          <h2 className="section-title mb-3">Especificaciones de Perfil</h2>
          <p className="section-subtitle max-w-3xl">
            La Parte 4-1 define diferentes perfiles para el ciclo de vida del desarrollo de
            software para las VSEs. Según el perfil de la VSE, se definen qué procesos de{' '}
            <strong className="text-text-primary">ISO 12207</strong> deben cumplirse, y qué
            elementos o productos de la{' '}
            <strong className="text-text-primary">ISO 15289</strong> deben crearse.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-display font-bold mb-4">Perfiles Genéricos</h3>
          <p className="section-subtitle max-w-3xl">
            Actualmente el estándar define 4 perfiles:{' '}
            <strong className="text-accent">Entrada</strong>,{' '}
            <strong className="text-primary">Básico</strong>,{' '}
            <strong className="text-secondary">Intermedio</strong> y{' '}
            <strong className="text-warning">Avanzado</strong>. Cada perfil tiene un conjunto
            específico de procesos según su complejidad.{' '}
            <strong className="text-text-primary">Los perfiles son acumulativos</strong>, es decir
            que cada perfil toma como base los procesos y productos del anterior.
          </p>
        </motion.div>

        {/* Important banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-5 mb-10 border border-warning/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'hsla(30,83%,53%,0.06)' }}
        >
          <p className="text-warning">
            💡 <strong>Importante: </strong> Todos estos perfiles aplican siempre y cuando la VSE
            no desarrolle software crítico.
          </p>
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
            <h4 className="font-semibold text-text-primary">ISO/IEC 29110-4 — Documento Oficial</h4>
            <p className="text-text-muted text-sm">Perfiles genéricos en VSEs</p>
          </div>
        </div>
        <a
          href="/ISO-29110-4.pdf"
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 flex-shrink-0"
          style={{ background: 'hsl(221,83%,53%)', color: 'white' }}
        >
          <Download size={16} />
          Descargar PDF
        </a>
      </motion.div>

        {/* Profile toggle cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {genericProfiles.map((p, i) => {
            const c = colorMap[p.color];
            const isActive = current === i;
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                data-i={i}
                transition={{ delay: i * 0.1 }}
                onClick={() => setCurrent(i)}
                className={`tab-btn${
                  isActive ? ' active' : ''
                }`}
                style={isActive ? { boxShadow: `0 0 0 1.5px ${PROFILES[i].color}40` } : {}}
              >
                <h3 className={`font-bold mb-2 ${!isActive ? c.text : 'text-text-primary'}`}>
                  {p.name}
                </h3>
              </motion.button>
            );
          })}
        </div>

        {/* Visualizer: info panel + venn diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 mb-12 grid lg:grid-cols-[1fr_auto] gap-8 items-start"
        >
          <ProfileInfo current={current} />
          <div className="flex justify-center lg:justify-end">
            <VennDiagram current={current} />
          </div>
        </motion.div>

        {/* Correspondence table */}
        

      </div>
    </section>
  );
}
