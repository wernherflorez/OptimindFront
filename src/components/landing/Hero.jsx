import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Code2, Zap, Globe, BarChart3 } from 'lucide-react'

const WORDS = ['resultados', 'negocios', 'empresas', 'procesos']

function useWordCycle(words, interval = 2600) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words, interval])
  return words[i]
}

const floatingCards = [
  { icon: Zap,       label: 'MVP en 4–6 sem',    sub: 'Delivery rápido',   x: 'right-4 md:right-12', y: 'top-28 md:top-36',   delay: 0.2 },
  { icon: BarChart3, label: '+30% eficiencia',    sub: 'Power BI integrado', x: 'right-4 md:right-4',  y: 'bottom-36 md:bottom-44', delay: 0.5 },
  { icon: Globe,     label: 'Deploy en la nube',  sub: 'Azure · AWS · GCP',  x: 'left-4 md:left-[42%]', y: 'bottom-24 md:bottom-16', delay: 0.8 },
]

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  const word = useWordCycle(WORDS)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y  = useTransform(scrollYProgress, [0, 1], [0, 150])
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-deep">

      {/* ── Grid ── */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* ── Animated blobs ── */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-700/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px] animate-blob-2" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[80px] animate-blob-3" />
      </motion.div>

      {/* ── Floating orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + i * 2, height: 4 + i * 2,
              left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%`,
              background: i % 2 === 0 ? 'rgba(139,92,246,0.6)' : 'rgba(34,211,238,0.4)',
            }}
            animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <motion.div style={{ opacity: op }} className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-violet-300 text-sm font-medium">Disponible para nuevos proyectos</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Software que<br />
            impulsa{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0)' }}
                exit={   { opacity: 0, y: -16, filter: 'blur(8px)' }}
                transition={{ duration: 0.4 }}
                className="inline-block bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'gradient 4s ease infinite' }}
              >
                {word}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-slate-400 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Transformamos Pymes latinoamericanas con plataformas web, automatizaciones,
            BI y pasarelas de pago. <span className="text-white font-semibold">MVP en 4–6 semanas.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(124,58,237,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#contacto')}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold rounded-2xl shadow-xl shadow-violet-500/30 text-base transition-all"
            >
              Diagnóstico gratuito
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#proyectos')}
              className="flex items-center gap-2 px-8 py-4 text-white/80 hover:text-white rounded-2xl border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 font-semibold text-base transition-all"
            >
              <Code2 size={18} />
              Ver proyectos
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 lg:gap-16"
          >
            {[
              { n: '4–6',  label: 'semanas al MVP' },
              { n: '30%',  label: 'reducción de tiempos' },
              { n: '99.9%',label: 'uptime garantizado' },
              { n: '5+',   label: 'proyectos en producción' },
            ].map(({ n, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl font-black text-white mb-1">{n}</div>
                <div className="text-slate-500 text-sm">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Floating cards (desktop) ── */}
      {floatingCards.map(({ icon: Icon, label, sub, x, y: fy, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + delay, type: 'spring', stiffness: 100 }}
          className={`hidden lg:flex absolute ${x} ${fy} glass-card rounded-2xl px-4 py-3 items-center gap-3 animate-float`}
          style={{ animationDelay: `${delay}s` }}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0">
            <Icon size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-semibold leading-none">{label}</div>
            <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
          </div>
        </motion.div>
      ))}

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-violet-500/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
