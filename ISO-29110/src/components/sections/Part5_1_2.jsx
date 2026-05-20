import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { pmBasicActivities, siBasicActivities, artifactTemplates } from '../../data/iso29110Data';
import ActivityStep from '../ui/ActivityStep';
import { FileText, Download, BookOpen } from 'lucide-react';

const tabStyle = (active) =>
  `px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
    active
      ? 'text-white shadow-glow-primary'
      : 'text-text-muted hover:text-text-primary hover:bg-surface-3'
  }`;

export default function Part5_1_2({ markVisited }) {
  useEffect(() => { markVisited('part5_2'); }, []);
  const [activeTab, setActiveTab] = useState('pm');
  const [completedActivities, setCompletedActivities] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const toggleActivity = (id) => {
    setCompletedActivities((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const activities = activeTab === 'pm' ? pmBasicActivities : siBasicActivities;
  const totalActivities = pmBasicActivities.length + siBasicActivities.length;
  const totalProgress = Math.round((completedActivities.length / totalActivities) * 100);

  const pmTemplates = artifactTemplates.filter((t) => t.category === 'PM');
  const siTemplates = artifactTemplates.filter((t) => t.category === 'SI');

  return (
    <section id="part5_2" className="py-20 bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="badge-secondary mb-4">⭐ ISO 29110 — Parte 5-1-2</span>
          <h2 className="section-title mb-3">Perfil Básico</h2>
          <p className="section-subtitle max-w-3xl">
            El perfil más importante para VSEs de <strong className="text-text-primary">6 a 25 personas</strong>.
            Define en detalle los procesos de <strong className="text-primary">Gestión de Proyectos (PM)</strong> e{' '}
            <strong className="text-accent">Implementación de Software (SI)</strong>.
          </p>
        </motion.div>

        {/* Overall progress */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="glass-card p-5 mb-8 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-muted">Progreso total del Perfil Básico</span>
              <span className="font-bold gradient-text">{completedActivities.length} / {totalActivities} actividades</span>
            </div>
            <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(217,91%,60%), hsl(262,83%,65%), hsl(172,66%,50%))' }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold gradient-text w-14 text-right">{totalProgress}%</div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-surface-2 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('pm')}
            className={tabStyle(activeTab === 'pm')}
            style={activeTab === 'pm' ? { background: 'linear-gradient(135deg, hsl(217,91%,60%), hsl(262,83%,65%))' } : {}}
          >
            🗂️ Gestión de Proyectos (PM)
          </button>
          <button
            onClick={() => setActiveTab('si')}
            className={tabStyle(activeTab === 'si')}
            style={activeTab === 'si' ? { background: 'linear-gradient(135deg, hsl(172,66%,50%), hsl(217,91%,60%))' } : {}}
          >
            💻 Implementación de Software (SI)
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activities Timeline */}
          <div className="lg:col-span-2">
            <motion.div key={activeTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <div className="space-y-2">
                {activities.map((activity, i) => (
                  <ActivityStep
                    key={activity.id}
                    activity={activity}
                    index={i}
                    total={activities.length}
                    completed={completedActivities.includes(activity.id)}
                    onToggle={toggleActivity}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar: Templates */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <FileText size={18} className="text-warning" /> Plantillas de Artefactos
            </h3>

            {/* PM Templates */}
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Gestión de Proyecto</p>
              <div className="space-y-2">
                {pmTemplates.map((t) => (
                  <button key={t.id} onClick={() => setSelectedTemplate(selectedTemplate?.id === t.id ? null : t)}
                    className={`w-full text-left glass-card p-3 transition-all ${selectedTemplate?.id === t.id ? 'border-primary/40' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{t.icon}</span>
                      <span className="text-sm font-medium text-text-primary">{t.name}</span>
                    </div>
                    {selectedTemplate?.id === t.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2">
                        <p className="text-xs text-text-muted mb-2">Secciones:</p>
                        <ul className="space-y-1">
                          {t.sections.map((s, i) => (
                            <li key={i} className="text-xs text-primary flex items-center gap-1">
                              <span>▸</span>{s}
                            </li>
                          ))}
                        </ul>
                        <button className="mt-3 text-xs flex items-center gap-1 text-accent hover:text-accent-light">
                          <Download size={12} /> Descargar plantilla
                        </button>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* SI Templates */}
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Implementación de Software</p>
              <div className="space-y-2">
                {siTemplates.map((t) => (
                  <button key={t.id} onClick={() => setSelectedTemplate(selectedTemplate?.id === t.id ? null : t)}
                    className={`w-full text-left glass-card p-3 transition-all ${selectedTemplate?.id === t.id ? 'border-accent/40' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{t.icon}</span>
                      <span className="text-sm font-medium text-text-primary">{t.name}</span>
                    </div>
                    {selectedTemplate?.id === t.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2">
                        <p className="text-xs text-text-muted mb-2">Secciones:</p>
                        <ul className="space-y-1">
                          {t.sections.map((s, i) => (
                            <li key={i} className="text-xs text-accent flex items-center gap-1">
                              <span>▸</span>{s}
                            </li>
                          ))}
                        </ul>
                        <button className="mt-3 text-xs flex items-center gap-1 text-accent hover:text-accent-light">
                          <Download size={12} /> Descargar plantilla
                        </button>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick reference */}
            <div className="glass-card p-4 border-l-4 border-secondary">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <BookOpen size={14} className="text-secondary" /> ¿Por dónde empezar?
              </h4>
              <ol className="text-xs text-text-muted space-y-1 list-decimal list-inside">
                <li>Completa primero PM.1 (Plan del Proyecto)</li>
                <li>Luego SI.1 (Inicio) y SI.2 (Requisitos)</li>
                <li>Desarrolla con SI.3 y SI.4</li>
                <li>Prueba con SI.5 y entrega con SI.6</li>
                <li>Cierra formalmente con PM.4</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
