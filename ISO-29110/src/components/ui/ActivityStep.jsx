import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

const colorStyles = {
  primary: {
    dot: 'bg-primary border-primary',
    dotText: 'text-white',
    badge: 'bg-primary/10 text-primary border-primary/30',
    connector: 'from-primary to-secondary',
  },
  secondary: {
    dot: 'bg-secondary border-secondary',
    dotText: 'text-white',
    badge: 'bg-secondary/10 text-secondary border-secondary/30',
    connector: 'from-secondary to-accent',
  },
  accent: {
    dot: 'bg-accent border-accent',
    dotText: 'text-white',
    badge: 'bg-accent/10 text-accent border-accent/30',
    connector: 'from-accent to-primary',
  },
  warning: {
    dot: 'bg-warning border-warning',
    dotText: 'text-surface',
    badge: 'bg-warning/10 text-warning border-warning/30',
    connector: 'from-warning to-primary',
  },
};

export default function ActivityStep({ activity, index, total, completed, onToggle }) {
  const styles = colorStyles[activity.phaseColor] || colorStyles.primary;
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-4"
    >
      {/* Connector column */}
      <div className="flex flex-col items-center">
        <div className={`timeline-dot border-2 ${styles.dot} ${styles.dotText} cursor-pointer`} onClick={() => onToggle && onToggle(activity.id)}>
          {completed ? <CheckCircle size={20} /> : <span className="text-xs font-bold">{index + 1}</span>}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 min-h-[24px] bg-gradient-to-b ${styles.connector} opacity-30 my-1`} />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-6 glass-card p-4 transition-all duration-300 ${completed ? 'opacity-60' : ''}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className={`badge border text-xs mr-2 ${styles.badge}`}>{activity.code}</span>
            <span className={`badge border text-xs ${styles.badge}`}>{activity.phase}</span>
          </div>
        </div>
        <h4 className={`font-semibold text-text-primary mb-1 ${completed ? 'line-through text-text-muted' : ''}`}>
          {activity.name}
        </h4>
        <p className="text-text-muted text-sm mb-3">{activity.description}</p>

        {/* Tasks */}
        <ul className="space-y-1.5 mb-3">
          {activity.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${styles.dot}`} />
              {task}
            </li>
          ))}
        </ul>

        {/* Artifacts */}
        <div className="flex flex-wrap gap-1.5">
          {activity.artifacts.map((art, i) => (
            <span key={i} className="badge-warning text-xs px-2 py-0.5 rounded-md" style={{ background: 'hsla(38,92%,55%,0.12)', border: '1px solid hsla(38,92%,55%,0.25)', color: 'hsl(38,92%,65%)' }}>
              📄 {art}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
