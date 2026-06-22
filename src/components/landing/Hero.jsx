import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Code2, Zap, Globe, BarChart3 } from 'lucide-react'
import { TextureButton } from '../ui/texture-button'

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
]

const stats = [
  { n: '4–6',     label: 'semanas al MVP' },
  { n: 'Demos',   label: 'quincenales de avance' },
  { n: 'Soporte', label: 'post-lanzamiento incluido' },
  { n: '5+',      label: 'proyectos en producción' },
]

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  const word = useWordCycle(WORDS)

  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden bg-ink pt-32">

      {/* Subtle technical grid — no decorative blobs (DESIGN.md) */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* ── Content — asymmetric editorial layout, not centered ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-end">

          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-ink-border bg-ink-surface mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-white/70 text-sm font-mono">Disponible para nuevos proyectos</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6"
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
                  className="inline-block text-lime"
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
              className="text-white/50 text-lg leading-relaxed max-w-xl mb-10"
            >
              Transformamos Pymes latinoamericanas con plataformas web, automatizaciones,
              BI y pasarelas de pago. <span className="text-white font-semibold">MVP en 4–6 semanas.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <TextureButton variant="lime" size="lg" onClick={() => scrollTo('#contacto')} className="!w-auto px-8">
                Diagnóstico gratuito
                <ArrowRight size={18} />
              </TextureButton>
              <button
                onClick={() => scrollTo('#proyectos')}
                className="flex items-center gap-2 px-8 py-3 text-white/80 hover:text-white rounded-md border border-ink-border hover:border-lime/40 hover:bg-lime/5 font-semibold text-base transition-all"
              >
                <Code2 size={18} />
                Ver proyectos
              </button>
            </motion.div>
          </div>

          {/* Mono stats sidebar — replaces centered stat row */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="border-l-2 border-ink-border pl-6 hidden lg:block"
          >
            <div className="space-y-5 font-mono">
              {stats.map(({ n, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white tnum">{n}</div>
                  <div className="text-white/40 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile stats row */}
        <div className="grid grid-cols-2 gap-6 mt-12 lg:hidden">
          {stats.map(({ n, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white tnum font-mono">{n}</div>
              <div className="text-white/40 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating cards (desktop) ── */}
      {floatingCards.map(({ icon: Icon, label, sub, x, y: fy, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 + delay, type: 'spring', stiffness: 100 }}
          className={`hidden lg:flex absolute ${x} ${fy} surface-card rounded-lg px-4 py-3 items-center gap-3`}
        >
          <div className="w-8 h-8 rounded-md bg-lime/15 flex items-center justify-center shrink-0">
            <Icon size={16} className="text-lime" />
          </div>
          <div>
            <div className="text-white text-sm font-semibold leading-none">{label}</div>
            <div className="text-white/40 text-xs mt-0.5">{sub}</div>
          </div>
        </motion.div>
      ))}

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-lime/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
