import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Building2, Users, Target, Clock } from 'lucide-react';
import { useEffect } from 'react';

const withIso = [
  'Procesos claros y documentados',
  'Entregas puntuales y dentro del presupuesto',
  'Clientes satisfechos y fidelizados',
  'Roles y responsabilidades bien definidos',
  'Gestión de riesgos profesional',
  'Calidad del software demostrable',
];

const withoutIso = [
  'Proyectos sin control ni documentación',
  'Retrasos frecuentes y sobrecostos',
  'Quejas y pérdida de clientes',
  'Confusión en responsabilidades',
  'Problemas imprevistos que detienen el proyecto',
  'Código difícil de mantener y escalar',
];

const benefits = [
  { icon: Target, title: 'Procesos Claros', desc: 'Cada miembro sabe qué hacer, cuándo y cómo.' },
  { icon: Users, title: 'Trabajo en Equipo', desc: 'Roles definidos y comunicación efectiva.' },
  { icon: Building2, title: 'Credibilidad', desc: 'Diferénciate de la competencia con un sello de calidad.' },
  { icon: CheckCircle, title: 'Mejora Continua', desc: 'Aprende de cada proyecto para mejorar el siguiente.' },
];

const timeline = [
  { step: 'Diagnóstico', desc: 'Identificar el estado actual de procesos.' },
  { step: 'Documentación', desc: 'Formalizar roles, entregables y riesgos.' },
  { step: 'Aplicación', desc: 'Implementar prácticas y controles definidos.' },
  { step: 'Mejora Continua', desc: 'Evaluar y optimizar tras cada proyecto.' },
];

export default function Part1({ markVisited }) {
  useEffect(() => { markVisited('part1'); }, [markVisited]);

  return (
    <section id="part1" className="py-20 max-w-7xl mx-auto px-4">
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center relative"
      >
        {/* Badge superior */}
        <span className="badge-primary mb-4 inline-block px-4 py-1 rounded-full shadow-sm">
          📌 ISO 29110 — Parte 1
        </span>

        {/* Título elegante */}
        <h2 className="section-title mb-4 text-3xl font-display font-bold tracking-wide text-primary">
          ¿Qué es la ISO 29110?
        </h2>

        {/* Bloque narrativo con fondo sutil */}
        <div className="glass-card p-6 max-w-3xl mx-auto shadow-lg border border-primary/20 rounded-xl">
          <p className="section-subtitle leading-relaxed text-lg text-text-muted">
            La <strong className="text-text-primary">ISO/IEC 29110</strong> no es solo un estándar técnico,
            sino una guía internacional diseñada <strong className="text-text-primary">exclusivamente</strong>
            para pequeñas empresas de software (VSEs — Very Small Entities) con hasta 25 personas.
            Su propósito es ofrecer un marco claro y confiable que permita a estas organizaciones
            estructurar sus procesos, demostrar calidad y proyectar credibilidad en un mercado competitivo.
          </p>
        </div>

        {/* Línea decorativa */}
        <div className="mt-6 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
      </motion.div>


      {/* Definición de alcance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-card p-6 mb-10 border-l-4 border-primary"
      >
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Building2 className="text-primary" size={22} /> Alcance de la norma
        </h3>
        <p className="text-text-muted">
          La ISO 29110 está pensada para organizaciones de desarrollo de software con
          <strong className="text-primary"> menos de 25 integrantes</strong>. Esto incluye equipos pequeños
          de desarrolladores, diseñadores y gestores de proyecto. Su objetivo es ofrecer un marco adaptado
          a la realidad de las empresas que no cuentan con grandes estructuras, pero que necesitan
          procesos confiables y resultados de calidad.
        </p>
      </motion.div>

      {/* Comparación Con vs Sin ISO */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold text-accent mb-4 flex items-center gap-2">
            <CheckCircle size={18} /> Con ISO 29110
          </h3>
          <ul className="space-y-3">
            {withIso.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle size={14} className="text-accent mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold text-danger mb-4 flex items-center gap-2">
            <XCircle size={18} /> Sin ISO 29110
          </h3>
          <ul className="space-y-3">
            {withoutIso.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                <XCircle size={14} className="text-danger mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Beneficios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-display font-bold mb-6">Beneficios clave para tu empresa</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 text-center hover:border-primary/30 transition-all group"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'linear-gradient(135deg, hsla(217,91%,60%,0.2), hsla(262,83%,65%,0.2))' }}
              >
                <b.icon size={22} className="text-primary" />
              </div>
              <h4 className="font-semibold mb-1">{b.title}</h4>
              <p className="text-text-muted text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Línea de tiempo enriquecida ISO 29110 */}
      <motion.div
        className="glass-card p-10 mt-12 border-t-4 border-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-display font-bold text-center mb-10">
          Camino de Adopción de la ISO 29110
        </h3>

        <div className="relative flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Paso 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 w-full md:w-1/4 text-center"
          >
            <CheckCircle className="text-primary mx-auto mb-3" size={28} />
            <h4 className="font-semibold mb-2">Diagnóstico</h4>
            <p className="text-sm text-text-muted">
              Evaluar la situación actual de la empresa, identificar debilidades y fortalezas.
            </p>
          </motion.div>

          {/* Paso 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 w-full md:w-1/4 text-center"
          >
            <Building2 className="text-accent mx-auto mb-3" size={28} />
            <h4 className="font-semibold mb-2">Documentación</h4>
            <p className="text-sm text-text-muted">
              Definir roles, responsabilidades y procesos claros para cada proyecto.
            </p>
          </motion.div>

          {/* Paso 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 w-full md:w-1/4 text-center"
          >
            <Users className="text-success mx-auto mb-3" size={28} />
            <h4 className="font-semibold mb-2">Aplicación</h4>
            <p className="text-sm text-text-muted">
              Implementar las prácticas definidas y asegurar la comunicación efectiva del equipo.
            </p>
          </motion.div>

          {/* Paso 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 w-full md:w-1/4 text-center"
          >
            <Target className="text-danger mx-auto mb-3" size={28} />
            <h4 className="font-semibold mb-2">Mejora Continua</h4>
            <p className="text-sm text-text-muted">
              Evaluar resultados, optimizar procesos y aprender de cada proyecto.
            </p>
          </motion.div>
        </div>

        {/* Texto elegante de cierre */}
        <p className="text-lg text-text-muted max-w-4xl mx-auto leading-relaxed mt-12 text-center">
          La adopción de la ISO 29110 es un viaje progresivo: comienza con el diagnóstico,
          se fortalece con la documentación, se consolida en la aplicación y se perfecciona
          con la mejora continua. Este camino asegura que incluso las organizaciones más
          pequeñas puedan crecer con orden, calidad y visión de futuro.
        </p>
      </motion.div>
    </section>
  );
}
