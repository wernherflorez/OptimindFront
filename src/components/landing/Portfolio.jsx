import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Globe, Code2, Database, BarChart3, Calendar, ChevronRight, X } from 'lucide-react'
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
} from '../ui/minimal-card'
import { TextureButton } from '../ui/texture-button'

const projects = [
  {
    id: 1,
    name: 'AgenDIA',
    tagline: 'Sistema de Gestión de Citas',
    description:
      'Plataforma integral para negocios que necesitan controlar su agenda, clientes y métricas de ingresos. Genera reportes automáticos de citas atendidas, servicios más vendidos y promedios de ingreso.',
    icon: Calendar,
    preview: '/projects/agendia.png',
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
    tags: ['React', 'Node.js', '.NET', 'SQL Server', 'Azure'],
    category: 'Enterprise',
    status: 'En producción',
    demo: 'https://gestion-back-front.azurewebsites.net/login',
    features: ['Gestión de procedimientos', 'Info crediticia', 'Desembolsos automáticos', 'Integración SAC'],
  },
]

const statusStyles = {
  'En producción': 'bg-success/15 text-success border border-success/25',
  'Próximamente':  'bg-lime/15 text-lime border border-lime/25',
  'Disponible':    'bg-info/15 text-info border border-info/25',
}

function ProjectCard({ project, index, onClick }) {
  const Icon = project.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      className="cursor-pointer"
    >
      <MinimalCard className="bg-ink border-ink-border h-full">
        {project.preview ? (
          <MinimalCardImage src={project.preview} alt={`${project.name} preview`} />
        ) : (
          <div className="relative h-[190px] w-full rounded-[20px] mb-6 bg-ink-surface2 border border-ink-border flex items-center justify-center">
            <Icon size={40} className="text-lime/60" />
          </div>
        )}

        <MinimalCardContent className="px-1">
          <div className="flex items-start justify-between mb-1">
            <MinimalCardTitle className="px-0 mt-0 text-white font-display">{project.name}</MinimalCardTitle>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${statusStyles[project.status]}`}>
              {project.status}
            </span>
          </div>
          <p className="text-lime text-xs font-semibold mb-2 font-mono">{project.tagline}</p>
          <MinimalCardDescription className="px-0 line-clamp-3">{project.description}</MinimalCardDescription>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-ink-surface2 text-white/50 border border-ink-border font-mono">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-ink-border">
            <span className="text-xs text-white/30 font-mono">{project.category}</span>
            <div className="flex items-center gap-1 text-lime text-xs font-semibold">
              Ver detalles <ChevronRight size={14} />
            </div>
          </div>
        </MinimalCardContent>
      </MinimalCard>
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="surface-card rounded-lg w-full max-w-lg overflow-hidden relative"
      >
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-md bg-ink-surface2 hover:bg-ink-border flex items-center justify-center text-white/50 hover:text-white transition-all">
            <X size={15} />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-md bg-ink-surface2 border border-ink-border flex items-center justify-center">
              <Icon size={28} className="text-lime" />
            </div>
            <div>
              <h2 className="font-display text-white font-black text-2xl">{project.name}</h2>
              <p className="font-mono text-lime text-sm font-semibold">{project.tagline}</p>
            </div>
          </div>

          <p className="text-white/50 leading-relaxed mb-6 text-sm">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-white font-bold text-sm mb-3 font-mono uppercase tracking-wide">Funcionalidades clave</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <h4 className="text-white font-bold text-sm mb-3 font-mono uppercase tracking-wide">Stack tecnológico</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(t => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-full bg-ink-surface2 text-white/70 border border-ink-border font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 border border-ink-border text-white/60 hover:text-white py-3 rounded-md font-medium hover:bg-ink-surface2 transition-colors">
              Cerrar
            </button>
            {project.demo ? (
              <TextureButton variant="lime" className="flex-1" href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Ver demo
              </TextureButton>
            ) : (
              <TextureButton
                variant="lime"
                className="flex-1"
                onClick={() => { onClose(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Solicitar acceso
              </TextureButton>
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
      <section id="proyectos" className="py-28 relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-grid pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-2xl"
          >
            <span className="text-lime text-xs font-bold uppercase tracking-[4px] block mb-4 font-mono">
              Lo que ya construimos
            </span>
            <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              Nuestros Proyectos
            </h2>
            <p className="text-white/50 text-lg">
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
            <p className="text-white/30 text-sm mb-5">¿Tienes una idea? La convertimos en producto.</p>
            <TextureButton
              variant="lime"
              className="!w-auto px-8"
              onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Comienza tu proyecto
              <ChevronRight size={18} />
            </TextureButton>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
