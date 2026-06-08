import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lock, Home, ClipboardList, ChevronDown } from 'lucide-react';

const PAGE_LABELS = {
  part1: { num: 1, label: 'Parte 1' },
  part2: { num: 2, label: 'Parte 2' },
  part3: { num: 3, label: 'Parte 3' },
  part4: { num: 4, label: 'Parte 4-1' },
  part5_1: { num: 5, label: 'Parte 5-1-1' },
  part5_2: { num: 6, label: 'Parte 5-1-2' },
};
const TOTAL_PAGES = 6;

/**
 * PageLayout — wrapper de cada página de la guía.
 *
 * Props:
 *  pageId           — identificador de la sección ('part1' … 'part5_2')
 *  prevPath         — ruta de la página anterior (string | null)
 *  nextPath         — ruta de la página siguiente (string | null)
 *  requiresScroll   — si true, el botón "Siguiente" se habilita al llegar al final
 *  canAdvance       — control externo de habilitación (para quiz / actividades)
 *  onNext           — callback ejecutado al avanzar (marca sección como visitada, etc.)
 *  isLast           — si true, muestra botones de cierre (Inicio + Cuestionario Final)
 *  children         — contenido de la sección
 */
export default function PageLayout({
  pageId,
  prevPath,
  nextPath,
  requiresScroll = false,
  canAdvance = true,
  onNext,
  isLast = false,
  children,
}) {
  const navigate = useNavigate();
  const [scrolledToBottom, setScrolledToBottom] = useState(!requiresScroll);
  const sentinelRef = useRef(null);

  // Volver al top al montar la página
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setScrolledToBottom(!requiresScroll);
  }, [pageId, requiresScroll]);

  // IntersectionObserver para detectar scroll hasta el final
  useEffect(() => {
    if (!requiresScroll) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setScrolledToBottom(true); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [requiresScroll, pageId]);

  // Para páginas scroll: el botón se habilita al llegar al final
  // Para páginas con actividades/quiz: se usa canAdvance externo
  const canGoNext = requiresScroll ? scrolledToBottom : canAdvance;

  const handlePrev = () => {
    if (prevPath) navigate(prevPath);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    onNext?.();
    if (nextPath) navigate(nextPath);
  };

  const handleFinish = () => {
    onNext?.();
    navigate('/cuestionario-final');
  };

  const { num: pageNum } = PAGE_LABELS[pageId] || { num: 0 };

  // Mensaje del botón bloqueado
  const lockedMsg = requiresScroll
    ? 'Desplázate hasta el final para continuar'
    : 'Completa las actividades para continuar';

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        {children}

        {/* Sentinel invisible al fondo para detectar scroll */}
        {requiresScroll && (
          <div ref={sentinelRef} aria-hidden="true" className="h-4" />
        )}

        {/* Hint de scroll (solo si aún no ha llegado al final) */}
        {requiresScroll && !scrolledToBottom && (
          <motion.div
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 text-text-muted text-xs"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <span>Continúa leyendo</span>
            <ChevronDown size={16} />
          </motion.div>
        )}

        {/* Barra de navegación inferior */}
        <div
          className="border-t border-border-subtle"
          style={{ background: 'rgba(15,18,28,0.92)', backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">

            {/* Botón Anterior */}
            {prevPath ? (
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <ArrowLeft size={15} /> Anterior
              </button>
            ) : <div />}

            {/* Indicador de página */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-text-muted text-xs">
                Página {pageNum} de {TOTAL_PAGES}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i + 1 === pageNum ? 24 : 8,
                      background: i + 1 <= pageNum
                        ? 'linear-gradient(90deg, hsl(217,91%,60%), hsl(262,83%,65%))'
                        : 'hsl(220,16%,22%)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Botones derecha */}
            {isLast ? (
              <div className="flex gap-2 flex-wrap justify-end">
                <button
                  onClick={() => { onNext?.(); navigate('/'); }}
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Home size={15} /> Inicio
                </button>
                <button
                  onClick={handleFinish}
                  disabled={!canGoNext}
                  className={`btn-primary flex items-center gap-2 text-sm ${!canGoNext ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ClipboardList size={15} /> Cuestionario Final
                </button>
              </div>
            ) : (
              <motion.button
                onClick={handleNext}
                disabled={!canGoNext}
                whileHover={canGoNext ? { scale: 1.03 } : {}}
                whileTap={canGoNext ? { scale: 0.97 } : {}}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  canGoNext
                    ? 'text-white'
                    : 'opacity-40 cursor-not-allowed text-text-muted bg-surface-3'
                }`}
                style={canGoNext ? {
                  background: 'linear-gradient(135deg, hsl(217,91%,60%), hsl(262,83%,65%))',
                  boxShadow: '0 0 20px hsla(217,91%,60%,0.3)',
                } : {}}
              >
                {canGoNext ? (
                  <> Siguiente <ArrowRight size={15} /> </>
                ) : (
                  <> <Lock size={13} /> {lockedMsg} </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
