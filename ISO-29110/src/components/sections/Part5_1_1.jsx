import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle, Circle, Download, FileText, Users, Clock, Target, AlertCircle, BookOpen, Layers } from 'lucide-react';

const entryPM = [
  {
    code: 'PM-E.1',
    name: 'Planificación básica del Proyecto',
    desc: 'Definir el alcance, las tareas y un cronograma simple. Incluye identificar los recursos necesarios y los riesgos iniciales.',
    artifacts: ['Plan de Proyecto (simple)', 'Registro de Riesgos', 'Cronograma de Actividades'],
    tasks: [
      'Definir el alcance y los objetivos del proyecto',
      'Estimar esfuerzo y duración de las tareas',
      'Identificar los recursos necesarios',
      'Registrar riesgos iniciales del proyecto',
    ],
  },
  {
    code: 'PM-E.2',
    name: 'Ejecución y Seguimiento',
    desc: 'Ejecutar las tareas planificadas y revisar semanalmente el avance. Registrar el progreso real vs lo planificado.',
    artifacts: ['Lista de tareas actualizada', 'Registro de Reuniones', 'Reporte de Avance'],
    tasks: [
      'Asignar tareas a los miembros del equipo',
      'Realizar reuniones de seguimiento periódicas',
      'Registrar el avance real vs planificado',
      'Gestionar cambios al alcance si aparecen',
    ],
  },
  {
    code: 'PM-E.3',
    name: 'Cierre del Proyecto',
    desc: 'Entregar el producto al cliente, documentar brevemente las lecciones aprendidas y archivar los documentos del proyecto.',
    artifacts: ['Acta de Entrega', 'Lecciones Aprendidas', 'Evaluación del Proyecto'],
    tasks: [
      'Obtener la aceptación formal del cliente',
      'Archivar documentos del proyecto',
      'Documentar lecciones aprendidas',
      'Liberar los recursos del equipo',
    ],
  },
];

const entrySI = [
  {
    code: 'SI-E.1',
    name: 'Inicio de la Implementación',
    desc: 'Entender el problema del cliente y configurar el entorno de desarrollo. Definir roles básicos del equipo.',
    artifacts: ['Descripción del Producto', 'Configuración del Entorno', 'Lista de Tareas Técnicas'],
    tasks: [
      'Revisar y comprender los requisitos del cliente',
      'Configurar el entorno de desarrollo y control de versiones',
      'Asignar roles técnicos al equipo',
      'Identificar los componentes de software a desarrollar',
    ],
  },
  {
    code: 'SI-E.2',
    name: 'Requisitos Básicos',
    desc: 'Documentar de forma simple qué debe hacer el software. Los requisitos deben ser revisados y aprobados por el cliente.',
    artifacts: ['Lista de Requisitos', 'Casos de Uso Simples', 'Prototipo de Interfaz (opcional)'],
    tasks: [
      'Realizar entrevistas con el cliente',
      'Documentar requisitos funcionales y no funcionales',
      'Crear casos de uso o historias de usuario simples',
      'Validar y aprobar los requisitos con el cliente',
    ],
  },
  {
    code: 'SI-E.3',
    name: 'Desarrollo del Software',
    desc: 'Codificar los componentes, hacer pruebas básicas y controlar versiones. Integrar progresivamente el sistema.',
    artifacts: ['Código Fuente', 'Resultados de Pruebas Unitarias', 'Versión Integrada del SW'],
    tasks: [
      'Codificar los componentes según los requisitos',
      'Realizar pruebas unitarias de cada componente',
      'Integrar progresivamente los componentes',
      'Gestionar el código con control de versiones (Git)',
    ],
  },
  {
    code: 'SI-E.4',
    name: 'Entrega del Producto',
    desc: 'Instalar el software en el entorno del cliente, capacitar a los usuarios y obtener la conformidad formal del cliente.',
    artifacts: ['Software Entregado', 'Manual de Usuario (básico)', 'Conformidad del Cliente'],
    tasks: [
      'Instalar el software en el entorno del cliente',
      'Capacitar a los usuarios finales',
      'Entregar la documentación básica',
      'Obtener la firma de aceptación del cliente',
    ],
  },
];

const keyCharacteristics = [
  { icon: '👥', label: 'Tamaño del equipo', value: '1 a 6 personas' },
  { icon: '📁', label: 'Proyectos simultáneos', value: '1 proyecto a la vez' },
  { icon: '⏱️', label: 'Complejidad', value: 'Baja — proyectos simples' },
  { icon: '📝', label: 'Documentación', value: 'Mínima y enfocada' },
  { icon: '🎯', label: 'Objetivo principal', value: 'Formalizar procesos básicos' },
  { icon: '🔄', label: 'Ciclo de vida', value: 'Lineal o incremental simple' },
];

const roles = [
  {
    title: 'Líder de Proyecto (LP)',
    icon: '🧑‍💼',
    color: 'primary',
    responsibilities: [
      'Planifica y controla el proyecto',
      'Comunica el avance al cliente',
      'Gestiona los riesgos básicos',
      'Coordina al equipo de trabajo',
    ],
  },
  {
    title: 'Analista-Programador (AP)',
    icon: '💻',
    color: 'accent',
    responsibilities: [
      'Levanta y documenta los requisitos',
      'Diseña y codifica el software',
      'Ejecuta las pruebas básicas',
      'Realiza la entrega al cliente',
    ],
  },
];

const differences511vs512 = [
  { aspect: 'Tamaño del equipo', entry: '1–6 personas', basic: '6–25 personas' },
  { aspect: 'Proyectos', entry: '1 a la vez', basic: 'Múltiples proyectos' },
  { aspect: 'Gestión de riesgos', entry: 'Básica / informal', basic: 'Formal y documentada' },
  { aspect: 'Control de cambios', entry: 'Simple', basic: 'Proceso formal' },
  { aspect: 'Métricas', entry: 'Mínimas', basic: 'Definidas y medidas' },
  { aspect: 'Documentación', entry: 'Ligera', basic: 'Completa y trazable' },
];

export default function Part5_1_1({ markVisited }) {
  useEffect(() => { markVisited('part5_1'); }, []);
  const [completedPM, setCompletedPM] = useState([]);
  const [completedSI, setCompletedSI] = useState([]);
  const [expandedPM, setExpandedPM] = useState(null);
  const [expandedSI, setExpandedSI] = useState(null);

  const toggle = (list, setList, id) =>
    setList((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const renderList = (activities, completed, setCompleted, expanded, setExpanded, color, borderClass, bgClass) => (
    <div className="space-y-3">
      {activities.map((a, i) => {
        const done = completed.includes(a.code);
        const isExpanded = expanded === a.code;
        return (
          <motion.div
            key={a.code}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card border transition-all ${done ? borderClass + ' opacity-80' : 'border-border-subtle'}`}
          >
            {/* Header row */}
            <div
              className="p-4 cursor-pointer flex items-start gap-3"
              onClick={() => setExpanded(isExpanded ? null : a.code)}
            >
              <button
                onClick={(e) => { e.stopPropagation(); toggle(completed, setCompleted, a.code); }}
                className="mt-0.5 flex-shrink-0"
              >
                {done
                  ? <CheckCircle size={18} className={color} />
                  : <Circle size={18} className="text-text-muted" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <code className="text-xs bg-surface-3 px-1.5 py-0.5 rounded text-text-muted">{a.code}</code>
                  <span className={`font-semibold text-sm ${done ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                    {a.name}
                  </span>
                </div>
                <p className="text-text-muted text-xs">{a.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {a.artifacts.map((art, j) => (
                    <span key={j} className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: 'hsla(38,92%,55%,0.12)', border: '1px solid hsla(38,92%,55%,0.25)', color: 'hsl(38,92%,65%)' }}>
                      📄 {art}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-text-muted text-xs mt-1 flex-shrink-0">{isExpanded ? '▲' : '▼'}</span>
            </div>

            {/* Expanded tasks */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`px-4 pb-4 pt-0 border-t border-border-subtle`}
              >
                <p className="text-xs font-semibold text-text-muted mt-3 mb-2 uppercase tracking-wide">Tareas principales:</p>
                <ul className="space-y-1.5">
                  {a.tasks.map((task, k) => (
                    <li key={k} className="flex items-start gap-2 text-xs text-text-muted">
                      <span className={`mt-0.5 flex-shrink-0 ${color}`}>✓</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  const pmProgress = Math.round((completedPM.length / entryPM.length) * 100);
  const siProgress = Math.round((completedSI.length / entrySI.length) * 100);
  const totalProgress = Math.round(((completedPM.length + completedSI.length) / (entryPM.length + entrySI.length)) * 100);

  return (
    <section id="part5_1" className="py-20 max-w-7xl mx-auto px-4">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <span className="badge-primary mb-4">🚀 ISO 29110 — Parte 5-1-1</span>
        <h2 className="section-title mb-3">Perfil de Entrada</h2>
        <p className="section-subtitle max-w-3xl">
          Guía de gestión e ingeniería para equipos de <strong className="text-text-primary">1 a 6 personas</strong> con un solo
          proyecto a la vez. Procesos simplificados para organizaciones que inician con calidad de software formal.
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
            <h4 className="font-semibold text-text-primary">ISO/IEC 29110-5-1-1 — Documento Oficial</h4>
            <p className="text-text-muted text-sm">Perfil de Entrada: Guía de Gestión e Ingeniería de Software</p>
          </div>
        </div>
        <a
          href="/ISO-29110-5-1-1.pdf"
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 flex-shrink-0"
          style={{ background: 'hsl(221,83%,53%)', color: 'white' }}
        >
          <Download size={16} />
          Descargar PDF
        </a>
      </motion.div>

      {/* What is it banner */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="glass-card p-5 mb-8 border-l-4 border-accent flex gap-4">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="font-semibold text-accent mb-1">¿Para quién es el Perfil de Entrada?</h4>
          <p className="text-text-muted text-sm">
            Está diseñado para <strong className="text-text-primary">startups, freelancers con equipo pequeño</strong> o empresas
            que están formalizando sus primeros procesos de software. No necesitas grandes documentos: lo importante es que{' '}
            <strong className="text-text-primary">existan y se usen consistentemente</strong>. Este perfil es el punto de partida
            para escalar hacia el Perfil Básico (5-1-2).
          </p>
        </div>
      </motion.div>

      {/* Key characteristics */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h3 className="text-lg font-display font-bold text-text-primary mb-4 flex items-center gap-2">
          <Target size={18} className="text-primary" /> Características Clave del Perfil de Entrada
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {keyCharacteristics.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="glass-card p-4 flex items-start gap-3">
              <span className="text-xl">{c.icon}</span>
              <div>
                <p className="text-xs text-text-muted">{c.label}</p>
                <p className="text-sm font-semibold text-text-primary">{c.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Roles */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
        <h3 className="text-lg font-display font-bold text-text-primary mb-4 flex items-center gap-2">
          <Users size={18} className="text-primary" /> Roles Definidos en el Perfil de Entrada
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {roles.map((role, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-5 border border-border-subtle">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{role.icon}</span>
                <h4 className="font-semibold text-text-primary">{role.title}</h4>
              </div>
              <ul className="space-y-1.5">
                {role.responsibilities.map((r, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="text-primary mt-0.5">•</span> {r}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3 text-center">
          💡 En equipos muy pequeños, una misma persona puede desempeñar ambos roles simultáneamente.
        </p>
      </motion.div>

      {/* Overall progress */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="glass-card p-4 mb-8 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold text-text-primary">Progreso general del perfil</span>
            <span className="text-sm text-text-muted">{completedPM.length + completedSI.length}/{entryPM.length + entrySI.length} actividades</span>
          </div>
          <div className="w-full h-2 bg-surface-3 rounded-full">
            <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, hsl(221,83%,53%), hsl(38,92%,55%))' }}
              animate={{ width: `${totalProgress}%` }} transition={{ duration: 0.5 }} />
          </div>
        </div>
        <span className="text-xl font-bold text-primary">{totalProgress}%</span>
      </motion.div>

      {/* Activities grid */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* PM Entry */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-display font-bold flex items-center gap-2">
              🗂️ <span className="gradient-text">Gestión de Proyectos (PM)</span>
            </h3>
            <span className="text-sm text-text-muted">{completedPM.length}/{entryPM.length}</span>
          </div>
          <div className="w-full h-1.5 bg-surface-3 rounded-full mb-4">
            <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${pmProgress}%` }} />
          </div>
          {renderList(entryPM, completedPM, setCompletedPM, expandedPM, setExpandedPM, 'text-primary', 'border-primary/30', 'bg-primary/5')}
        </div>

        {/* SI Entry */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-display font-bold flex items-center gap-2">
              💻 <span className="gradient-text-accent">Implementación de SW (SI)</span>
            </h3>
            <span className="text-sm text-text-muted">{completedSI.length}/{entrySI.length}</span>
          </div>
          <div className="w-full h-1.5 bg-surface-3 rounded-full mb-4">
            <motion.div className="h-full bg-accent rounded-full" animate={{ width: `${siProgress}%` }} />
          </div>
          {renderList(entrySI, completedSI, setCompletedSI, expandedSI, setExpandedSI, 'text-accent', 'border-accent/30', 'bg-accent/5')}
        </div>
      </div>

      {/* Comparison table 5-1-1 vs 5-1-2 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14">
        <h3 className="text-lg font-display font-bold text-text-primary mb-4 flex items-center gap-2">
          <Layers size={18} className="text-primary" /> Perfil de Entrada vs Perfil Básico
        </h3>
        <div className="glass-card overflow-hidden border border-border-subtle">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'hsla(221,83%,53%,0.1)' }}>
                <th className="px-4 py-3 text-left text-text-muted font-semibold">Aspecto</th>
                <th className="px-4 py-3 text-center text-primary font-semibold">🚀 Entrada (5-1-1)</th>
                <th className="px-4 py-3 text-center text-secondary font-semibold">⭐ Básico (5-1-2)</th>
              </tr>
            </thead>
            <tbody>
              {differences511vs512.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-surface-2/30' : ''}>
                  <td className="px-4 py-3 text-text-muted font-medium">{row.aspect}</td>
                  <td className="px-4 py-3 text-center text-text-primary">{row.entry}</td>
                  <td className="px-4 py-3 text-center text-text-primary">{row.basic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Footer note */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="glass-card p-4 mt-8 border-l-4 border-primary/50 flex gap-3 items-start">
        <AlertCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <p className="text-text-muted text-sm">
          <strong className="text-text-primary">Importante:</strong> Haz clic en el título de cada actividad para expandir sus tareas detalladas.
          Marca el checkbox para registrar tu avance. El perfil de entrada es el <strong className="text-text-primary">primer escalón</strong> hacia
          la mejora continua de procesos en tu organización.
        </p>
      </motion.div>

    </section>
  );
}
