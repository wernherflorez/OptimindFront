import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Globe, Code2, Database, BarChart3, Calendar, ChevronRight, X } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'AgenDIA',
    tagline: 'Sistema de Gestión de Citas',
    description:
      'Plataforma integral para negocios que necesitan controlar su agenda, clientes y métricas de ingresos. Genera reportes automáticos de citas atendidas, servicios más vendidos y promedios de ingreso.',
    icon: Calendar,
    preview: '/projects/agendia.png',
    color: 'from-blue-500 to-blue-400',
    accent: 'rgba(59,130,246,0.5)',
    tags: ['React', 'Node.js', 'SQL Server', 'Azure'],
    category: 'SaaS',
    status: 'Próximamente',
    demo: null,
    features: ['Gestión de citas', 'Control de clientes', 'Reportes de ingresos', 'Dashboard BI'],
  },
  {
    id: 2,
    name: 'Visor Titan',
    tagline: 'Plataforma de consulta financiera',
    description:
      'Sistema que permite a equipos comerciales consultar información financiera de clientes de forma autónoma, eliminando la dependencia del área de datos y acelerando la toma de decisiones.',
    icon: BarChart3,
    color: 'from-violet-500 to-violet-400',
    accent: 'rgba(139,92,246,0.5)',
    tags: ['React', 'Node.js', 'Azure'],
    category: 'Enterprise',
    status: 'En producción',
    demo: 'https://consultastitan.azurewebsites.net/Ingreso',
    features: ['Consulta de cartera', 'Roles y permisos', 'Reportes en tiempo real', 'Integración core'],
  },
  {
    id: 3,
    name: 'Visor Felix',
    tagline: 'Gestión centralizada de cuentas',
    description:
      'Herramienta de visualización y gestión que centraliza las operaciones del equipo alrededor de cada cuenta cliente, mejorando la coordinación y visibilidad del negocio.',
    icon: Globe,
    color: 'from-cyan-500 to-cyan-400',
    accent: 'rgba(6,182,212,0.5)',
    tags: ['React', 'Node.js', 'Azure'],
    category: 'Enterprise',
    status: 'En producción',
    demo: 'https://visorfelixmaduro.azurewebsites.net/Ingreso',
    features: ['Vista 360° del cliente', 'Gestión de cuentas', 'Colaboración en equipo', 'Alertas automáticas'],
  },
  {
    id: 4,
    name: 'IME',
    tagline: 'Incident Management Epik',
    description:
      'Sistema de gestión de tickets con soporte para proyectos, roles, permisos, dashboards de analítica y tableros Scrum/Kanban configurables con backlogs y sprints ágiles.',
    icon: Code2,
    color: 'from-purple-600 to-violet-500',
    accent: 'rgba(168,85,247,0.5)',
    tags: ['React', 'Angular', 'Node.js', 'Azure'],
    category: 'Enterprise',
    status: 'En producción',
    demo: 'https://ime-front.azurewebsites.net/',
    features: ['Tickets y soporte', 'Scrum/Kanban', 'Roles y permisos', 'Analítica avanzada'],
  },
  {
    id: 5,
    name: 'Gestión SAC',
    tagline: 'ERP para servicio al cliente',
    description:
      'Sistema ERP para equipos de atención al cliente que integra gestión de procedimientos, información crediticia y procesos de desembolso automatizados, conectado al sistema de crédito Epik.',
    icon: Database,
    color: 'from-orange-500 to-amber-400',
    accent: 'rgba(249,115,22,0.5)',
    tags: ['React', 'Node.js', '.NET', 'SQL Server', 'Azure'],
    category: 'Enterprise',
    status: 'En producción',
    demo: 'https://gestion-back-front.azurewebsites.net/login',
    features: ['Gestión de procedimientos', 'Info crediticia', 'Desembolsos automáticos', 'Integración SAC'],
  },
]

const statusStyles = {
  'En producción': 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  'Próximamente':  'bg-violet-500/15 text-violet-400 border border-violet-500/25',
  'Disponible':    'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
}

function ProjectCard({ project, index, onClick }) {
  const Icon = project.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onClick(project)}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 50px ${project.accent}` }}
      />

      {/* Accent top bar */}
      <div className={`h-0.5 bg-gradient-to-r ${project.color}`} />

      {/* Screenshot or icon banner */}
      {project.preview ? (
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.preview}
            alt={`${project.name} preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1220] via-transparent to-transparent" />
          <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>
      ) : (
        <div className={`h-28 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <Icon size={48} className="text-white/80 relative z-10" />
          <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>
      )}

      <div className="p-6 relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-black text-lg leading-tight group-hover:text-violet-300 transition-colors">
              {project.name}
            </h3>
            <p
              className="text-xs font-semibold mt-0.5 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${project.accent.replace('0.5', '1')}, #22d3ee)` }}
            >
              {project.tagline}
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

        {/* Features */}
        <ul className="space-y-1.5 mb-4">
          {project.features.slice(0, 3).map(f => (
            <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} shrink-0`} />
              {f}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/8 font-medium">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-slate-600">{project.category}</span>
          <div className="flex items-center gap-1 text-violet-400 text-xs font-semibold group-hover:gap-2 transition-all">
            Ver detalles <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  const Icon = project.icon
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="glass-card rounded-2xl w-full max-w-lg overflow-hidden relative"
        style={{ boxShadow: `0 0 80px ${project.accent}` }}
      >
        <div className={`h-1 bg-gradient-to-r ${project.color}`} />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <X size={15} />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
              <Icon size={30} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-black text-2xl">{project.name}</h2>
              <p
                className="font-semibold text-sm bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(to right, ${project.accent.replace('0.5', '1')}, #22d3ee)` }}
              >
                {project.tagline}
              </p>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed mb-6 text-sm">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-white font-bold text-sm mb-3">Funcionalidades clave</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} shrink-0`} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <h4 className="text-white font-bold text-sm mb-3">Stack tecnológico</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(t => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 border border-white/10 text-slate-400 hover:text-white py-3 rounded-xl font-medium hover:bg-white/5 transition-colors">
              Cerrar
            </button>
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${project.color} text-white py-3 rounded-xl font-semibold shadow-lg transition-opacity hover:opacity-90`}>
                <ExternalLink size={16} />
                Ver demo
              </a>
            ) : (
              <button
                onClick={() => { onClose(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white py-3 rounded-xl font-semibold transition-all"
              >
                Solicitar acceso
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [selected, setSelected] = useState(null)

  return (
    <>
      <section id="proyectos" className="py-28 relative overflow-hidden" style={{ background: '#060A14' }}>
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-violet-700/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-700/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-violet-400 text-xs font-bold uppercase tracking-[4px] block mb-4">
              Lo que ya construimos
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Proyectos
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Soluciones reales, en producción, generando valor para empresas colombianas.
              Esto es lo que podemos construir para ti.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-center mt-14"
          >
            <p className="text-slate-600 text-sm mb-5">¿Tienes una idea? La convertimos en producto.</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(124,58,237,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-violet-500/25 transition-all"
            >
              Comienza tu proyecto
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
