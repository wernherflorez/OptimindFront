import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import LogoBadge from '../LogoBadge'

const links = [
  { label: 'Servicios',  href: '#servicios'  },
  { label: 'Proyectos',  href: '#proyectos'  },
  { label: 'Equipo',     href: '#equipo'     },
  { label: 'Contacto',   href: '#contacto'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (href) => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className={`
          flex items-center gap-2 px-3 py-2 rounded-2xl
          transition-all duration-500
          ${scrolled
            ? 'bg-[#060A14]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-violet-900/20'
            : 'bg-white/[0.03] backdrop-blur-md border border-white/[0.06]'
          }
        `}>
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer mr-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <LogoBadge size="sm" dark spin={false} text />
          </motion.div>

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 hidden md:block" />

          {/* Links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button key={l.href} onClick={() => go(l.href)}
                className="relative px-4 py-1.5 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200 group">
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full group-hover:w-4 transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 hidden md:block" />

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/dashboard"
              className="px-4 py-1.5 text-sm font-medium text-violet-300 hover:text-white rounded-xl border border-violet-500/30 hover:border-violet-400/60 hover:bg-violet-500/10 transition-all duration-200">
              Dashboard
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go('#contacto')}
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-cyan-500 rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-300">
              Diagnóstico gratis
              <ArrowRight size={14} />
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-white/70 hover:text-white ml-1"
            onClick={() => setOpen(p => !p)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={  { opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-50 bg-[#0D0B1E]/95 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-5 shadow-2xl shadow-violet-900/30"
          >
            <nav className="flex flex-col gap-2 mb-4">
              {links.map(l => (
                <button key={l.href} onClick={() => go(l.href)}
                  className="text-left px-4 py-3 text-white/70 hover:text-white hover:bg-violet-500/10 rounded-xl text-sm font-medium transition-all">
                  {l.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-3 border-t border-white/8">
              <Link to="/dashboard" onClick={() => setOpen(false)}
                className="text-center py-2.5 text-sm font-medium text-violet-300 border border-violet-500/30 rounded-xl">
                Dashboard
              </Link>
              <button onClick={() => go('#contacto')}
                className="py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-violet-500 rounded-xl">
                Diagnóstico gratuito
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
