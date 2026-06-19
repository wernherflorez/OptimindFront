import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Cpu, BarChart3, CreditCard, Wrench, ArrowUpRight } from 'lucide-react'

const services = [
  { icon: Globe,     title: 'Plataformas Web & APIs',    desc: 'Aplicaciones web robustas con React, Node.js y arquitecturas cloud escalables. Desde MVPs hasta sistemas empresariales.', tags: ['React', 'Node.js', 'Azure'], grad: 'from-violet-500 to-violet-700', glow: 'rgba(139,92,246,0.4)' },
  { icon: Cpu,       title: 'Automatización de Procesos', desc: 'Eliminamos tareas manuales y cuellos de botella. Flujos inteligentes que reducen tiempos operativos hasta un 30%.', tags: ['Workflows', 'RPA', 'APIs'], grad: 'from-cyan-500 to-blue-600', glow: 'rgba(6,182,212,0.4)' },
  { icon: BarChart3, title: 'Business Intelligence',      desc: 'Dashboards Power BI personalizados con KPIs en tiempo real. Decisiones basadas en datos reales, no intuición.', tags: ['Power BI', 'SQL Server', 'Analytics'], grad: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.4)' },
  { icon: CreditCard,title: 'Pasarelas de Pago PSE',      desc: 'Integración completa con PSE, tarjetas crédito/débito. Reduce fricción en cobros y aumenta conversiones +10%.', tags: ['PSE', 'PCI-DSS', 'Checkout'], grad: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.4)' },
  { icon: Wrench,    title: 'Soporte & Mantenimiento',    desc: 'SLA garantizado, monitoreo 24/7, actualizaciones evolutivas. Tu software siempre funcionando al 99.9% de uptime.', tags: ['SLA', 'Monitoreo', 'DevOps'], grad: 'from-pink-500 to-violet-600', glow: 'rgba(236,72,153,0.4)' },
]

export default function Services() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="servicios" className="py-28 relative overflow-hidden" style={{ background: '#080C18' }}>
      <div className="absolute inset-0 bg-grid-sm pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-violet-400 text-xs font-bold uppercase tracking-[4px] mb-4">
            Lo que hacemos
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Servicios que{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              transforman
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Soluciones digitales a la medida. Entregamos resultados medibles, no promesas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative glass-card rounded-2xl p-7 overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${s.glow}, transparent 70%)` }}
                />

                {/* Top border line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${s.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{s.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {s.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-cyan-400 transition-colors group-hover:gap-2"
                >
                  Saber más <ArrowUpRight size={13} />
                </button>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group glass-card-violet rounded-2xl p-7 flex flex-col justify-between cursor-pointer"
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div>
              <div className="text-3xl font-black text-white mb-2 leading-tight">
                ¿Tienes un<br />
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  proyecto en mente?
                </span>
              </div>
              <p className="text-slate-400 text-sm">Cuéntanos tu reto. El diagnóstico es gratuito.</p>
            </div>
            <motion.div whileHover={{ x: 4 }}
              className="mt-6 flex items-center gap-2 text-white font-semibold text-sm">
              Agendar diagnóstico <ArrowUpRight size={16} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
