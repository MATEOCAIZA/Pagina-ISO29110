import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Building2, Users, Target } from 'lucide-react';
import { useEffect } from 'react';

const withIso = [
  'Procesos documentados y repetibles',
  'Entregas a tiempo y dentro del presupuesto',
  'Clientes satisfechos y fidelizados',
  'Equipo con roles y responsabilidades claras',
  'Gestión profesional de riesgos',
  'Calidad del software demostrable',
];

const withoutIso = [
  'Proyectos caóticos sin documentación',
  'Retrasos frecuentes y sobrecostos',
  'Quejas y pérdida de clientes',
  'Confusión de responsabilidades',
  'Problemas imprevistos que frenan el proyecto',
  'Código difícil de mantener y escalar',
];

const benefits = [
  { icon: Target, title: 'Procesos Claros', desc: 'Cada miembro sabe qué hacer, cuándo y cómo.' },
  { icon: Users, title: 'Trabajo en Equipo', desc: 'Roles definidos y comunicación efectiva.' },
  { icon: Building2, title: 'Credibilidad', desc: 'Diferénciate de la competencia con un sello de calidad.' },
  { icon: CheckCircle, title: 'Mejora Continua', desc: 'Aprende de cada proyecto para hacer el siguiente mejor.' },
];

export default function Part1({ markVisited }) {
  useEffect(() => { markVisited('part1'); }, []);

  return (
    <section id="part1" className="py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <span className="badge-primary mb-4">📌 ISO 29110 — Parte 1</span>
        <h2 className="section-title mb-3">¿Qué es la ISO 29110?</h2>
        <p className="section-subtitle max-w-3xl">
          Es una norma internacional diseñada <strong className="text-text-primary">exclusivamente</strong> para
          pequeñas empresas de software (VSEs — Very Small Entities) con hasta 25 personas. No es para grandes corporaciones.
          Es para empresas <em>como la tuya</em>.
        </p>
      </motion.div>

      {/* VSE Definition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass-card p-6 mb-10 border-l-4 border-primary"
      >
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Building2 className="text-primary" size={22} /> ¿Eres una VSE?
        </h3>
        <p className="text-text-muted">
          Una <strong className="text-text-primary">Very Small Entity (VSE)</strong> es una organización, departamento o proyecto de software
          con <strong className="text-primary">hasta 25 personas</strong>. Si tu empresa tiene menos de 25 desarrolladores,
          diseñadores o gestores de proyecto, esta norma está hecha para ti.
        </p>
      </motion.div>

      {/* Con vs Sin ISO */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-6">
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
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-6">
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

      {/* Benefits */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h3 className="text-2xl font-display font-bold mb-6">Beneficios clave para tu empresa</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-5 text-center hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'linear-gradient(135deg, hsla(217,91%,60%,0.2), hsla(262,83%,65%,0.2))' }}>
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
