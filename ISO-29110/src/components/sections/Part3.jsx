import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { evaluationQuestions } from '../../data/iso29110Data';
import {
  CheckCircle,
  Circle,
  BarChart3,
  RotateCcw,
} from 'lucide-react';

function getLevel(score) {
  if (score >= 85) {
    return {
      label: 'Avanzado',
      color: 'text-accent',
      stroke: 'hsl(172,66%,50%)',
      desc: '¡Excelente! Tu empresa ya tiene procesos maduros muy alineados con ISO 29110.',
    };
  }

  if (score >= 60) {
    return {
      label: 'Intermedio',
      color: 'text-primary',
      stroke: 'hsl(217,91%,60%)',
      desc: 'Buen nivel. Hay oportunidades claras de mejora.',
    };
  }

  if (score >= 35) {
    return {
      label: 'Básico',
      color: 'text-warning',
      stroke: 'hsl(38,92%,55%)',
      desc: 'Nivel inicial. Empieza documentando procesos y definiendo roles.',
    };
  }

  return {
    label: 'Inicial',
    color: 'text-danger',
    stroke: 'hsl(0,84%,60%)',
    desc: 'Es momento de empezar. Esta guía te ayudará a implementar los procesos.',
  };
}

const categories = [...new Set(evaluationQuestions.map((q) => q.category))];

const circleRadius = 40;
const circumference = 2 * Math.PI * circleRadius;

export default function Part3({
  markVisited,
  setQuizResults,
  quizResults,
}) {
  useEffect(() => {
    markVisited('part3');
  }, [markVisited]);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (quizResults) {
      setSubmitted(true);
      setResult(quizResults);
    }
  }, [quizResults]);

  const answered = Object.keys(answers).length;

  const canSubmit = answered === evaluationQuestions.length;

  const progress = useMemo(
    () => (answered / evaluationQuestions.length) * 100,
    [answered]
  );

  const groupedQuestions = useMemo(() => {
    return categories.map((category) => ({
      category,
      questions: evaluationQuestions.filter(
        (q) => q.category === category
      ),
    }));
  }, []);

  const toggleAnswer = (id) => {
    if (submitted) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = true;
      }

      return updated;
    });
  };

  const handleSubmit = () => {
    const totalWeight = evaluationQuestions.reduce(
      (sum, q) => sum + q.weight,
      0
    );

    const earnedWeight = evaluationQuestions.reduce(
      (sum, q) => sum + (answers[q.id] ? q.weight : 0),
      0
    );

    const score = Math.round((earnedWeight / totalWeight) * 100);

    const quizData = {
      score,
      answers,
    };

    setResult(quizData);
    setSubmitted(true);
    setQuizResults(quizData);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setQuizResults(null);
  };

  const level = result ? getLevel(result.score) : null;

  return (
    <section
      id="part3"
      className="py-20 max-w-7xl mx-auto px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="badge-accent mb-4">
          📊 ISO 29110 — Parte 3
        </span>

        <h2 className="section-title mb-3">
          Guía de Evaluación
        </h2>

        <p className="section-subtitle max-w-3xl">
          Responde este cuestionario para conocer el nivel
          actual de cumplimiento de tu empresa con la norma
          ISO 29110.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Questions */}
        <div className="lg:col-span-2 space-y-8">
          {groupedQuestions.map(({ category, questions }) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-text-muted text-sm uppercase tracking-wider mb-3">
                {category}
              </h3>

              <div className="space-y-3">
                {questions.map((q) => {
                  const active = answers[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => toggleAnswer(q.id)}
                      disabled={submitted}
                      className={`
                        w-full
                        text-left
                        glass-card
                        p-4
                        flex
                        items-start
                        gap-3
                        transition-all
                        duration-200
                        border

                        ${
                          active
                            ? 'border-accent/40 bg-accent/5'
                            : 'hover:border-border-subtle'
                        }

                        ${
                          submitted
                            ? 'cursor-default'
                            : 'cursor-pointer hover:-translate-y-0.5'
                        }
                      `}
                    >
                      {active ? (
                        <CheckCircle
                          size={18}
                          className="text-accent mt-0.5 flex-shrink-0"
                        />
                      ) : (
                        <Circle
                          size={18}
                          className="text-text-muted mt-0.5 flex-shrink-0"
                        />
                      )}

                      <div className="flex-1">
                        <p className="text-sm text-text-primary leading-relaxed">
                          {q.text}
                        </p>

                        <span className="text-xs text-text-muted">
                          Peso:{' '}
                          {q.weight === 2
                            ? 'Alto'
                            : 'Medio'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Submit */}
          {!submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-muted text-sm">
                  {answered} / {evaluationQuestions.length}{' '}
                  respondidas
                </span>

                <div className="w-40 h-2 bg-surface-3 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`
                  btn-primary
                  w-full
                  justify-center
                  transition-all

                  ${
                    !canSubmit
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:scale-[1.01]'
                  }
                `}
              >
                <BarChart3 size={16} />
                Ver mi resultado
              </button>
            </motion.div>
          )}
        </div>

        {/* Result Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {submitted && result && level ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-6 sticky top-20"
              >
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <BarChart3
                    size={18}
                    className="text-primary"
                  />
                  Tu Resultado
                </h3>

                {/* Score Circle */}
                <div className="flex justify-center mb-5">
                  <div className="relative w-32 h-32">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full -rotate-90"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r={circleRadius}
                        fill="none"
                        stroke="hsl(220,16%,18%)"
                        strokeWidth="10"
                      />

                      <motion.circle
                        cx="50"
                        cy="50"
                        r={circleRadius}
                        fill="none"
                        stroke={level.stroke}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{
                          strokeDashoffset: circumference,
                        }}
                        animate={{
                          strokeDashoffset:
                            circumference *
                            (1 - result.score / 100),
                        }}
                        transition={{ duration: 1.2 }}
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-2xl font-bold ${level.color}`}
                      >
                        {result.score}%
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`text-center font-bold text-xl mb-2 ${level.color}`}
                >
                  {level.label}
                </div>

                <p className="text-text-muted text-sm text-center mb-6 leading-relaxed">
                  {level.desc}
                </p>

                <button
                  onClick={handleReset}
                  className="btn-secondary w-full justify-center text-sm"
                >
                  <RotateCcw size={14} />
                  Reiniciar evaluación
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-5"
              >
                <h4 className="font-semibold mb-3 text-text-muted">
                  ¿Cómo funciona?
                </h4>

                <ul className="text-sm text-text-muted space-y-3">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    Responde “Sí” solo si tu empresa lo
                    aplica habitualmente.
                  </li>

                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    Las preguntas de alto peso impactan más
                    el resultado.
                  </li>

                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    El resultado se guarda automáticamente.
                  </li>

                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    Puedes repetir la evaluación después de
                    implementar mejoras.
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}