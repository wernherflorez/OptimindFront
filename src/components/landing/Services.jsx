import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Cpu, BarChart3, CreditCard, Wrench, ArrowUpRight } from 'lucide-react'
import {
  MinimalCard,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
} from '../ui/minimal-card'

const services = [
  { icon: Globe,      n: '01', title: 'Plataformas Web & APIs',     desc: 'Aplicaciones web robustas con React, Node.js y arquitecturas cloud escalables. Desde MVPs hasta sistemas empresariales.', tags: ['React', 'Node.js', 'Azure'] },
  { icon: Cpu,        n: '02', title: 'Automatización de Procesos', desc: 'Eliminamos tareas manuales y cuellos de botella. Flujos inteligentes que reducen tiempos operativos hasta un 30%.', tags: ['Workflows', 'RPA', 'APIs'] },
  { icon: BarChart3,  n: '03', title: 'Business Intelligence',      desc: 'Dashboards Power BI personalizados con KPIs en tiempo real. Decisiones basadas en datos reales, no intuición.', tags: ['Power BI', 'SQL Server', 'Analytics'] },
  { icon: CreditCard, n: '04', title: 'Pasarelas de Pago PSE',      desc: 'Integración completa con PSE, tarjetas crédito/débito. Reduce fricción en cobros y aumenta conversiones +10%.', tags: ['PSE', 'PCI-DSS', 'Checkout'] },
  { icon: Wrench,     n: '05', title: 'Soporte & Mantenimiento',    desc: 'SLA garantizado, monitoreo 24/7, actualizaciones evolutivas. Tu software siempre funcionando al 99.9% de uptime.', tags: ['SLA', 'Monitoreo', 'DevOps'] },
]

export default function Services() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="servicios" className="py-28 relative overflow-hidden bg-ink-surface">
      <div className="absolute inset-0 bg-grid-sm pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="inline-block text-lime text-xs font-bold uppercase tracking-[4px] mb-4 font-mono">
            Lo que hacemos
          </span>
          <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Servicios que transforman
          </h2>
          <p className="text-white/50 text-lg">
            Soluciones digitales a la medida. Entregamos resultados medibles, no promesas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <MinimalCard className="bg-ink border-ink-border h-full p-0">
                  <MinimalCardContent className="p-7">
                    <div className="flex items-start justify-between mb-5">
                      <Icon size={24} className="text-lime" />
                      <span className="font-mono text-xs text-white/25">{s.n}</span>
                    </div>

                    <MinimalCardTitle className="px-0 mt-0 text-white font-display">{s.title}</MinimalCardTitle>
                    <MinimalCardDescription className="px-0 text-white/50">{s.desc}</MinimalCardDescription>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {s.tags.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-sm bg-ink-surface2 border border-ink-border text-white/50 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-1 text-xs font-semibold text-lime hover:gap-2 transition-all"
                    >
                      Saber más <ArrowUpRight size={13} />
                    </button>
                  </MinimalCardContent>
                </MinimalCard>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-[24px] bg-lime/10 border border-lime/30 p-7 flex flex-col justify-between cursor-pointer hover:bg-lime/15 transition-colors"
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div>
              <div className="font-display text-3xl font-black text-white mb-2 leading-tight">
                ¿Tienes un proyecto en mente?
              </div>
              <p className="text-white/50 text-sm">Cuéntanos tu reto. El diagnóstico es gratuito.</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-lime font-semibold text-sm">
              Agendar diagnóstico <ArrowUpRight size={16} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
