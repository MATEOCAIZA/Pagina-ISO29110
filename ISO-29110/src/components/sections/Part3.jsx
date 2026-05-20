import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { evaluationQuestions } from '../../data/iso29110Data';
import { CheckCircle, Circle, BarChart3, RotateCcw } from 'lucide-react';

function getLevel(score) {
  if (score >= 85) return { label: 'Avanzado', color: 'text-accent', desc: '¡Excelente! Tu empresa ya tiene procesos maduros muy alineados con ISO 29110.' };
  if (score >= 60) return { label: 'Intermedio', color: 'text-primary', desc: 'Buen nivel. Hay oportunidades claras de mejora. Implementa los procesos faltantes.' };
  if (score >= 35) return { label: 'Básico', color: 'text-warning', desc: 'Nivel inicial. Empieza por documentar los proyectos y definir roles en el equipo.' };
  return { label: 'Inicial', color: 'text-danger', desc: 'Es momento de empezar. Esta guía te ayudará a implementar los procesos desde cero.' };
}

const categories = [...new Set(evaluationQuestions.map((q) => q.category))];

export default function Part3({ markVisited, setQuizResults, quizResults }) {
  useEffect(() => { markVisited('part3'); }, []);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(!!quizResults);
  const [result, setResult] = useState(quizResults);

  const toggle = (id) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    const totalWeight = evaluationQuestions.reduce((s, q) => s + q.weight, 0);
    const earned = evaluationQuestions.reduce((s, q) => s + (answers[q.id] ? q.weight : 0), 0);
    const score = Math.round((earned / totalWeight) * 100);
    const res = { score, answers };
    setResult(res);
    setSubmitted(true);
    setQuizResults(res);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setQuizResults(null);
  };

  const answered = Object.keys(answers).length;
  const canSubmit = answered === evaluationQuestions.length;

  return (
    <section id="part3" className="py-20 max-w-7xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <span className="badge-accent mb-4">📊 ISO 29110 — Parte 3</span>
        <h2 className="section-title mb-3">Guía de Evaluación</h2>
        <p className="section-subtitle max-w-3xl">
          Responde este cuestionario honestamente para conocer tu nivel actual de cumplimiento con la ISO 29110.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Questions */}
        <div className="lg:col-span-2 space-y-6">
          {categories.map((cat) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-semibold text-text-muted text-sm uppercase tracking-wider mb-3">{cat}</h3>
              <div className="space-y-2">
                {evaluationQuestions.filter((q) => q.category === cat).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => toggle(q.id)}
                    disabled={submitted}
                    className={`w-full text-left glass-card p-4 flex items-start gap-3 transition-all duration-200 ${
                      answers[q.id] ? 'border-accent/40 bg-accent/5' : 'hover:border-border-subtle'
                    } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    {answers[q.id]
                      ? <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
                      : <Circle size={18} className="text-text-muted mt-0.5 flex-shrink-0" />
                    }
                    <div>
                      <p className="text-sm text-text-primary">{q.text}</p>
                      <span className="text-xs text-text-muted">Peso: {q.weight === 2 ? 'Alto' : 'Medio'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}

          {!submitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-muted text-sm">{answered} / {evaluationQuestions.length} respondidas</span>
                <div className="w-32 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(answered / evaluationQuestions.length) * 100}%` }} />
                </div>
              </div>
              <button onClick={handleSubmit} disabled={!canSubmit} className={`btn-primary w-full justify-center ${!canSubmit ? 'opacity-40 cursor-not-allowed' : ''}`}>
                <BarChart3 size={16} /> Ver mi resultado
              </button>
            </motion.div>
          )}
        </div>

        {/* Result Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence>
            {submitted && result && (() => {
              const level = getLevel(result.score);
              return (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 sticky top-20">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BarChart3 size={18} className="text-primary" /> Tu Resultado
                  </h3>

                  {/* Score circle */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-28 h-28">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(220,16%,18%)" strokeWidth="10" />
                        <motion.circle
                          cx="50" cy="50" r="40" fill="none"
                          stroke={result.score >= 85 ? 'hsl(172,66%,50%)' : result.score >= 60 ? 'hsl(217,91%,60%)' : result.score >= 35 ? 'hsl(38,92%,55%)' : 'hsl(0,84%,60%)'}
                          strokeWidth="10" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - result.score / 100) }}
                          transition={{ duration: 1.2 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-2xl font-bold ${level.color}`}>{result.score}%</span>
                      </div>
                    </div>
                  </div>

                  <div className={`text-center font-bold text-xl mb-2 ${level.color}`}>{level.label}</div>
                  <p className="text-text-muted text-sm text-center mb-4">{level.desc}</p>

                  <button onClick={handleReset} className="btn-secondary w-full justify-center text-sm">
                    <RotateCcw size={14} /> Reiniciar evaluación
                  </button>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {!submitted && (
            <div className="glass-card p-5">
              <h4 className="font-semibold mb-2 text-text-muted">¿Cómo funciona?</h4>
              <ul className="text-sm text-text-muted space-y-2">
                <li className="flex gap-2"><span className="text-primary">→</span> Responde "Sí" solo si tu empresa lo hace habitualmente.</li>
                <li className="flex gap-2"><span className="text-primary">→</span> Las preguntas de alto peso impactan más el resultado.</li>
                <li className="flex gap-2"><span className="text-primary">→</span> El resultado se guarda automáticamente.</li>
                <li className="flex gap-2"><span className="text-primary">→</span> Puedes repetir el test después de implementar mejoras.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
