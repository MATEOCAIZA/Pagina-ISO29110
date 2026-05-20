import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const entryPM = [
  { code: 'PM-E.1', name: 'Planificación básica', desc: 'Definir alcance, tareas y cronograma simple del proyecto.', artifacts: ['Plan de Proyecto (simple)'] },
  { code: 'PM-E.2', name: 'Ejecución y seguimiento', desc: 'Ejecutar tareas y revisar semanalmente el avance.', artifacts: ['Lista de tareas actualizadas'] },
  { code: 'PM-E.3', name: 'Cierre', desc: 'Entregar el producto y documentar brevemente lo aprendido.', artifacts: ['Acta de entrega'] },
];

const entrySI = [
  { code: 'SI-E.1', name: 'Inicio', desc: 'Entender el problema del cliente y configurar el entorno.', artifacts: ['Descripción del producto'] },
  { code: 'SI-E.2', name: 'Requisitos básicos', desc: 'Documentar de forma simple qué debe hacer el software.', artifacts: ['Lista de requisitos'] },
  { code: 'SI-E.3', name: 'Desarrollo', desc: 'Codificar, hacer pruebas básicas y controlar versiones.', artifacts: ['Código fuente', 'Resultados de pruebas'] },
  { code: 'SI-E.4', name: 'Entrega', desc: 'Instalar el software y obtener la conformidad del cliente.', artifacts: ['Software entregado', 'Conformidad del cliente'] },
];

export default function Part5_1_1({ markVisited }) {
  useEffect(() => { markVisited('part5_1'); }, []);
  const [completedPM, setCompletedPM] = useState([]);
  const [completedSI, setCompletedSI] = useState([]);

  const toggle = (list, setList, id) => setList((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const renderList = (activities, completed, setCompleted, color, borderClass) => (
    <div className="space-y-3">
      {activities.map((a, i) => {
        const done = completed.includes(a.code);
        return (
          <motion.div key={a.code} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            onClick={() => toggle(completed, setCompleted, a.code)}
            className={`glass-card p-4 cursor-pointer transition-all border ${done ? borderClass + ' opacity-70' : 'border-border-subtle'}`}>
            <div className="flex items-start gap-3">
              {done ? <CheckCircle size={18} className={color} /> : <Circle size={18} className="text-text-muted" />}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-xs bg-surface-3 px-1.5 py-0.5 rounded text-text-muted">{a.code}</code>
                  <span className={`font-semibold text-sm ${done ? 'line-through text-text-muted' : 'text-text-primary'}`}>{a.name}</span>
                </div>
                <p className="text-text-muted text-xs">{a.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {a.artifacts.map((art, j) => (
                    <span key={j} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'hsla(38,92%,55%,0.12)', border: '1px solid hsla(38,92%,55%,0.25)', color: 'hsl(38,92%,65%)' }}>
                      📄 {art}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const pmProgress = Math.round((completedPM.length / entryPM.length) * 100);
  const siProgress = Math.round((completedSI.length / entrySI.length) * 100);

  return (
    <section id="part5_1" className="py-20 max-w-7xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <span className="badge-primary mb-4">🚀 ISO 29110 — Parte 5-1-1</span>
        <h2 className="section-title mb-3">Perfil de Entrada</h2>
        <p className="section-subtitle max-w-3xl">
          Para equipos de <strong className="text-text-primary">1 a 6 personas</strong> con un solo proyecto a la vez. Procesos simplificados
          para organizaciones que recién inician con calidad de software.
        </p>
      </motion.div>

      {/* Context banner */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="glass-card p-5 mb-10 border-l-4 border-accent flex gap-4">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="font-semibold text-accent mb-1">¿Para quién es el Perfil de Entrada?</h4>
          <p className="text-text-muted text-sm">
            Startups, freelancers con equipo pequeño, o empresas que están formalizando sus primeros procesos.
            No necesitas grandes documentos: lo importante es que <strong className="text-text-primary">existan y se usen</strong>.
          </p>
        </div>
      </motion.div>

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
          {renderList(entryPM, completedPM, setCompletedPM, 'text-primary', 'border-primary/30')}
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
          {renderList(entrySI, completedSI, setCompletedSI, 'text-accent', 'border-accent/30')}
        </div>
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-text-muted text-sm mt-8">
        💡 Haz clic en cada actividad para marcarla como completada. Tu progreso se guarda automáticamente.
      </motion.p>
    </section>
  );
}
