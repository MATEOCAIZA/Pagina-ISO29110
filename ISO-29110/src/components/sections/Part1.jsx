import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Building2, Users, Target } from 'lucide-react';
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

export default function Part1({ markVisited }) {
  useEffect(() => { markVisited('part1'); }, [markVisited]);

  return (
    <section id="part1" className="py-20 max-w-7xl mx-auto px-4">
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="badge-primary mb-4">📌 ISO 29110 — Parte 1</span>
        <h2 className="section-title mb-3">¿Qué es la ISO 29110?</h2>
        <p className="section-subtitle max-w-3xl">
          La <strong className="text-text-primary">ISO/IEC 29110</strong> es una norma internacional diseñada
          <strong className="text-text-primary"> exclusivamente </strong> para pequeñas empresas de software
          (VSEs — Very Small Entities) con hasta 25 personas. Su propósito es ayudar a estas organizaciones
          a estructurar sus procesos y demostrar calidad en sus proyectos.
        </p>
      </motion.div>

      {/* Definición de alcance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
    </section>
  );
}
