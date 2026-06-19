import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Search, Lightbulb, Code2, Rocket, HeartHandshake } from 'lucide-react'

const steps = [
  { icon: Search,       n: '01', title: 'Diagnóstico',    time: 'Día 1',      color: 'from-violet-500 to-violet-700',  desc: 'Auditoría gratuita de 30 min. Identificamos dolores, mapeamos tu stack actual y detectamos oportunidades de alto impacto.' },
  { icon: Lightbulb,    n: '02', title: 'Propuesta',      time: 'Semana 1',   color: 'from-cyan-500 to-blue-600',      desc: 'Alcance cerrado, precio definido, cronograma por sprints. Sin sorpresas, sin costos ocultos.' },
  { icon: Code2,        n: '03', title: 'Desarrollo',     time: 'Sem 2–5',    color: 'from-emerald-500 to-teal-500',   desc: 'Sprints de 2 semanas con demos quincenales. Ves avances reales, puedes retroalimentar en cada iteración.' },
  { icon: Rocket,       n: '04', title: 'Lanzamiento',    time: 'Semana 6',   color: 'from-amber-500 to-orange-500',   desc: 'Deploy, pruebas, capacitación y medición de KPIs. Tu MVP funcional antes de que la competencia termine de planear.' },
  { icon: HeartHandshake,n:'05', title: 'Soporte',        time: 'Ongoing',    color: 'from-pink-500 to-violet-600',    desc: 'Mantenimiento continuo, SLA garantizado y evolución del producto conforme crece tu negocio.' },
]

export default function Process() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="proceso" className="py-28 relative overflow-hidden bg-deep">
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="text-violet-400 text-xs font-bold uppercase tracking-[4px] block mb-4">
            Cómo trabajamos
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            De la idea al{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              MVP en 6 semanas
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px bg-white/5">
            <motion.div
              style={{ height: lineH }}
              className="w-full bg-gradient-to-b from-violet-500 to-cyan-500 rounded-full"
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isRight = i % 2 !== 0

              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`relative flex items-center gap-6 ${isRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex-row`}
                >
                  {/* Icon node */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#060A14] border border-white/10 rounded-full flex items-center justify-center">
                      <span className="text-white text-[9px] font-black">{i + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-2xl p-6 flex-1 max-w-md"
                  >
                    <div className={`inline-block text-xs font-mono px-2.5 py-1 rounded-full mb-3 bg-gradient-to-r ${step.color} text-white font-bold`}>
                      {step.time}
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>

                  {/* Spacer for alternating layout on lg */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(124,58,237,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold rounded-2xl shadow-xl shadow-violet-500/30 text-base"
          >
            Comenzar mi proyecto →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
