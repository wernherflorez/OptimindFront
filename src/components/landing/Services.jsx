import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Cpu, BarChart3, CreditCard, Wrench, ArrowUpRight } from 'lucide-react'
import { TextureButton } from '../ui/texture-button'

const services = [
  { icon: Globe,      n: '01', title: 'Plataformas Web & APIs',     desc: 'Aplicaciones web robustas con React, Node.js y arquitecturas cloud escalables. Desde MVPs hasta sistemas empresariales.', tags: ['React', 'Node.js', 'Azure'] },
  { icon: Cpu,        n: '02', title: 'Automatización de Procesos', desc: 'Eliminamos tareas manuales y cuellos de botella. Flujos inteligentes que reducen tiempos operativos hasta un 30%.', tags: ['Workflows', 'RPA', 'APIs'] },
  { icon: BarChart3,  n: '03', title: 'Business Intelligence',      desc: 'Dashboards Power BI personalizados con KPIs en tiempo real. Decisiones basadas en datos reales, no intuición.', tags: ['Power BI', 'SQL Server', 'Analytics'] },
  { icon: CreditCard, n: '04', title: 'Pasarelas de Pago PSE',      desc: 'Integración completa con PSE, tarjetas crédito/débito. Reduce fricción en cobros y aumenta conversiones +10%.', tags: ['PSE', 'PCI-DSS', 'Checkout'] },
  { icon: Wrench,     n: '05', title: 'Soporte & Mantenimiento',    desc: 'SLA garantizado, monitoreo 24/7, actualizaciones evolutivas. Tu software siempre funcionando al 99.9% de uptime.', tags: ['SLA', 'Monitoreo', 'DevOps'] },
]

function ServiceRow({ service, inView, index }) {
  const [hover, setHover] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
      className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[100px_auto_1fr_auto] items-center gap-4 sm:gap-8 py-7 border-b border-ink-border cursor-pointer transition-colors hover:bg-ink-surface2/40 px-2 -mx-2"
    >
      <span className="hidden sm:block font-mono text-sm text-white/25 group-hover:text-lime transition-colors">{service.n}</span>

      <div className="w-11 h-11 rounded-md bg-ink-surface2 border border-ink-border flex items-center justify-center shrink-0 group-hover:border-lime/40 transition-colors">
        <Icon size={18} className="text-lime" />
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-white font-bold text-lg sm:text-xl leading-tight">{service.title}</h3>
        <p className="text-white/45 text-sm leading-relaxed mt-1 max-w-lg hidden sm:block">{service.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {service.tags.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-ink-surface2 border border-ink-border text-white/40 font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>

      <ArrowUpRight
        size={20}
        className={`text-white/30 shrink-0 transition-all ${hover ? 'text-lime translate-x-1 -translate-y-1' : ''}`}
      />
    </motion.div>
  )
}

export default function Services() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="servicios" className="py-28 relative overflow-hidden bg-ink-surface">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="inline-block text-lime text-xs font-bold uppercase tracking-[4px] mb-4 font-mono">
              Lo que hacemos
            </span>
            <h2 className="font-display text-4xl lg:text-6xl font-black text-white leading-tight">
              Servicios que transforman
            </h2>
          </div>
          <p className="text-white/50 text-base max-w-xs">
            Soluciones digitales a la medida. Entregamos resultados medibles, no promesas.
          </p>
        </motion.div>

        <div className="border-t border-ink-border">
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} inView={inView} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10"
        >
          <div>
            <p className="font-display text-2xl font-black text-white leading-tight">¿Tienes un proyecto en mente?</p>
            <p className="text-white/40 text-sm mt-1">Cuéntanos tu reto. El diagnóstico es gratuito.</p>
          </div>
          <TextureButton
            variant="lime"
            className="!w-auto px-8 shrink-0"
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Agendar diagnóstico <ArrowUpRight size={16} />
          </TextureButton>
        </motion.div>
      </div>
    </section>
  )
}
