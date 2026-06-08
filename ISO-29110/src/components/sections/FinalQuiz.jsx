import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, Home, Trophy, BookOpen } from 'lucide-react';

const questions = [
  // Parte 1
  {
    id: 'q1', part: 'Parte 1 — Visión General',
    text: '¿Para cuántas personas máximo fue diseñada la ISO/IEC 29110?',
    options: ['10 personas', '25 personas', '50 personas', '100 personas'],
    correct: 1,
  },
  {
    id: 'q2', part: 'Parte 1 — Visión General',
    text: '¿Qué significa VSE en el contexto de la norma?',
    options: ['Very Secure Enterprise', 'Virtual Software Environment', 'Very Small Entity', 'Verified Software Engineer'],
    correct: 2,
  },
  {
    id: 'q3', part: 'Parte 1 — Visión General',
    text: '¿Cuál es el primer paso en el "Camino de Adopción" de la ISO 29110?',
    options: ['Documentación', 'Diagnóstico', 'Aplicación', 'Mejora Continua'],
    correct: 1,
  },
  // Parte 2
  {
    id: 'q4', part: 'Parte 2 — Marco y Taxonomía',
    text: '¿Qué significa la sigla PM en la ISO 29110?',
    options: ['Product Manager', 'Project Management', 'Process Monitoring', 'Program Module'],
    correct: 1,
  },
  {
    id: 'q5', part: 'Parte 2 — Marco y Taxonomía',
    text: '¿Cuál es el perfil de menor complejidad en ISO 29110?',
    options: ['Perfil Básico', 'Perfil Intermedio', 'Perfil de Entrada', 'Perfil Avanzado'],
    correct: 2,
  },
  {
    id: 'q6', part: 'Parte 2 — Marco y Taxonomía',
    text: '¿Qué significa SI en la ISO 29110?',
    options: ['System Integration', 'Software Inspection', 'Software Implementation', 'Security Information'],
    correct: 2,
  },
  // Parte 3
  {
    id: 'q7', part: 'Parte 3 — Guía de Evaluación',
    text: '¿Qué nivel obtiene una empresa con 85% o más en la evaluación?',
    options: ['Básico', 'Intermedio', 'Inicial', 'Avanzado'],
    correct: 3,
  },
  {
    id: 'q8', part: 'Parte 3 — Guía de Evaluación',
    text: '¿Cuántas preguntas tiene el cuestionario de evaluación de la Parte 3?',
    options: ['8 preguntas', '10 preguntas', '12 preguntas', '15 preguntas'],
    correct: 1,
  },
  // Parte 4
  {
    id: 'q9', part: 'Parte 4-1 — Especificaciones de Perfil',
    text: '¿Cuántos perfiles genéricos define la Parte 4-1 de la ISO 29110?',
    options: ['2 perfiles', '3 perfiles', '4 perfiles', '5 perfiles'],
    correct: 2,
  },
  {
    id: 'q10', part: 'Parte 4-1 — Especificaciones de Perfil',
    text: 'Los perfiles de la ISO 29110 son…',
    options: ['Independientes entre sí', 'Acumulativos (cada uno incluye al anterior)', 'Solo para empresas medianas', 'Opcionales en todos los casos'],
    correct: 1,
  },
  {
    id: 'q11', part: 'Parte 4-1 — Especificaciones de Perfil',
    text: '¿Qué proceso ISO 12207 se asocia a la Planificación del Proyecto en el Perfil de Entrada?',
    options: ['SWE.1', 'MAN.1 / PM.1', 'QUA.3', 'SCM.2'],
    correct: 1,
  },
  // Parte 5-1-1
  {
    id: 'q12', part: 'Parte 5-1-1 — Perfil de Entrada',
    text: '¿Cuántas personas componen el equipo en el Perfil de Entrada?',
    options: ['1 a 3 personas', '1 a 6 personas', '6 a 15 personas', '6 a 25 personas'],
    correct: 1,
  },
  {
    id: 'q13', part: 'Parte 5-1-1 — Perfil de Entrada',
    text: '¿Cuál es la actividad PM-E.3 del Perfil de Entrada?',
    options: ['Planificación básica del proyecto', 'Ejecución y seguimiento', 'Cierre del proyecto', 'Análisis de requisitos'],
    correct: 2,
  },
  // Parte 5-1-2
  {
    id: 'q14', part: 'Parte 5-1-2 — Perfil Básico',
    text: '¿Cuántas actividades de Gestión de Proyectos (PM) tiene el Perfil Básico?',
    options: ['2 actividades', '3 actividades', '4 actividades', '6 actividades'],
    correct: 2,
  },
  {
    id: 'q15', part: 'Parte 5-1-2 — Perfil Básico',
    text: '¿Qué artefacto se genera en la actividad SI.2 (Análisis de Requisitos)?',
    options: ['Plan del Proyecto', 'Código Fuente', 'Especificación de Requisitos (SRS)', 'Acta de Cierre'],
    correct: 2,
  },
];

function getResultLevel(pct) {
  if (pct >= 80) return { label: '¡Excelente!', color: 'text-accent', stroke: 'hsl(172,66%,50%)', emoji: '🏆', desc: 'Dominas los conceptos de la ISO/IEC 29110.' };
  if (pct >= 60) return { label: 'Muy bien', color: 'text-primary', stroke: 'hsl(217,91%,60%)', emoji: '⭐', desc: 'Tienes un buen manejo de la norma.' };
  if (pct >= 40) return { label: 'Regular', color: 'text-warning', stroke: 'hsl(38,92%,55%)', emoji: '📚', desc: 'Repasa las secciones con más detalle.' };
  return { label: 'Necesitas repasar', color: 'text-danger', stroke: 'hsl(0,84%,60%)', emoji: '💡', desc: 'Vuelve a recorrer la guía desde el inicio.' };
}

const CIRC_R = 42;
const CIRC = 2 * Math.PI * CIRC_R;

export default function FinalQuiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const canSubmit = answered === questions.length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    const correct = questions.filter(q => answers[q.id] === q.correct).length;
    return Math.round((correct / questions.length) * 100);
  }, [submitted, answers]);

  const level = getResultLevel(score);

  const grouped = useMemo(() => {
    const map = {};
    questions.forEach(q => {
      if (!map[q.part]) map[q.part] = [];
      map[q.part].push(q);
    });
    return Object.entries(map);
  }, []);

  const handleSelect = (qId, idx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const handleReset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-surface text-text-primary pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge-primary mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full">
            <BookOpen size={14} /> Cuestionario Final
          </span>
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Evaluación General ISO 29110
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            {questions.length} preguntas cubriendo todas las partes de la guía. Selecciona la respuesta correcta para cada una.
          </p>
        </motion.div>

        {/* Resultado (si ya envió) */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card p-8 mb-10 text-center border border-primary/20"
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r={CIRC_R} fill="none" stroke="hsl(220,16%,18%)" strokeWidth="10" />
                    <motion.circle
                      cx="50" cy="50" r={CIRC_R} fill="none"
                      stroke={level.stroke} strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={CIRC}
                      initial={{ strokeDashoffset: CIRC }}
                      animate={{ strokeDashoffset: CIRC * (1 - score / 100) }}
                      transition={{ duration: 1.4 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${level.color}`}>{score}%</span>
                  </div>
                </div>
              </div>
              <div className="text-4xl mb-2">{level.emoji}</div>
              <h2 className={`text-2xl font-bold mb-2 ${level.color}`}>{level.label}</h2>
              <p className="text-text-muted mb-6">{level.desc}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
                  <RotateCcw size={15} /> Intentar de nuevo
                </button>
                <button onClick={() => navigate('/')} className="btn-primary flex items-center gap-2">
                  <Home size={15} /> Volver al Inicio
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preguntas por sección */}
        <div className="space-y-10">
          {grouped.map(([part, qs], gi) => (
            <motion.div
              key={part}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.07 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4 border-b border-border-subtle pb-2">
                {part}
              </h2>
              <div className="space-y-5">
                {qs.map((q, qi) => {
                  const userAnswer = answers[q.id];
                  const isAnswered = userAnswer !== undefined;
                  const isCorrect = submitted && userAnswer === q.correct;
                  const isWrong = submitted && isAnswered && userAnswer !== q.correct;

                  return (
                    <div key={q.id} className={`glass-card p-5 border transition-all ${
                      isCorrect ? 'border-accent/40' : isWrong ? 'border-danger/40' : 'border-border-subtle'
                    }`}>
                      <p className="font-medium text-text-primary mb-4 flex items-start gap-2">
                        <span className="text-primary font-bold flex-shrink-0">{qi + 1}.</span>
                        {q.text}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = userAnswer === oi;
                          const isRight = submitted && oi === q.correct;
                          const isSelectedWrong = submitted && selected && oi !== q.correct;

                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(q.id, oi)}
                              disabled={submitted}
                              className={`text-left px-4 py-3 rounded-xl text-sm border transition-all flex items-center gap-2 ${
                                isRight
                                  ? 'border-accent/60 bg-accent/10 text-accent'
                                  : isSelectedWrong
                                    ? 'border-danger/60 bg-danger/10 text-danger'
                                    : selected
                                      ? 'border-primary/50 bg-primary/10 text-primary'
                                      : 'border-border-subtle hover:border-primary/30 hover:bg-surface-2 text-text-muted'
                              }`}
                            >
                              {submitted ? (
                                isRight ? <CheckCircle size={14} className="flex-shrink-0" /> :
                                isSelectedWrong ? <XCircle size={14} className="flex-shrink-0" /> :
                                <span className="w-3.5 h-3.5" />
                              ) : (
                                <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 ${selected ? 'bg-primary border-primary' : 'border-border-subtle'}`} />
                              )}
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barra inferior de envío */}
        {!submitted && (
          <div className="sticky bottom-0 mt-10 py-4 border-t border-border-subtle"
            style={{ background: 'rgba(15,18,28,0.95)', backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center justify-between max-w-4xl mx-auto px-0">
              <span className="text-text-muted text-sm">
                {answered} / {questions.length} respondidas
              </span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${(answered / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!canSubmit}
                  className={`btn-primary flex items-center gap-2 text-sm ${!canSubmit ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <Trophy size={15} /> Ver resultado
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
