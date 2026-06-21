import { motion } from 'framer-motion'
import { DollarSign, FolderOpen, CheckSquare, Users, TrendingUp, Clock, AlertCircle, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { AnimatedNumber } from '../ui/animated-number'

const statusColors = {
  'En progreso': 'bg-info/15 text-info border border-info/25',
  'Revisión':    'bg-warning/15 text-warning border border-warning/25',
  'Pendiente':   'bg-white/10 text-white/50 border border-white/15',
  'Completado':  'bg-success/15 text-success border border-success/25',
}

const priorityColors = {
  Alta: 'text-error', Media: 'text-warning', Baja: 'text-white/40',
}

function StatCard({ label, value, format, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative rounded-lg p-6 surface-card"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/40 text-sm font-medium">{label}</span>
        <div className="w-10 h-10 rounded-md bg-ink-surface2 border border-ink-border flex items-center justify-center">
          <Icon size={18} className="text-lime" />
        </div>
      </div>
      <div className="text-3xl font-black text-white mb-1 font-display tnum">
        <AnimatedNumber value={value} format={format} />
      </div>
    </motion.div>
  )
}

export default function Overview({ data }) {
  const { user } = useAuth()
  const { projects, tasks, clients, stats } = data

  const recentTasks    = [...tasks].slice(-5).reverse()
  const activeProjects = projects.filter(p => ['En progreso', 'Revisión', 'Pendiente'].includes(p.status))

  const formatCOP = (n) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="space-y-8">

      {/* ── Welcome banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-lg overflow-hidden p-8 bg-ink-surface border border-ink-border"
      >
        <div className="absolute inset-0 bg-grid-sm pointer-events-none opacity-50" />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/40 text-sm mb-1">{greeting},</p>
            <h1 className="font-display text-3xl font-black text-white">
              {user?.full_name?.split(' ')[0] || 'Equipo'} 👋
            </h1>
            <p className="text-white/50 text-sm mt-2">
              {projects.length === 0
                ? 'Empieza creando tu primer proyecto desde la sección Proyectos.'
                : `Tienes ${stats.activeProjects} proyecto${stats.activeProjects !== 1 ? 's' : ''} activo${stats.activeProjects !== 1 ? 's' : ''} y ${stats.pendingTasks} tarea${stats.pendingTasks !== 1 ? 's' : ''} pendiente${stats.pendingTasks !== 1 ? 's' : ''}.`
              }
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-lime/15 border border-lime/25">
            <Zap size={14} className="text-lime" />
            <span className="text-lime text-sm font-semibold">OptiMind Solutions</span>
          </div>
        </div>
      </motion.div>

      {/* ── Stats row ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ingresos totales"  value={stats.totalRevenue}  format={formatCOP}     icon={DollarSign}  delay={0.05} />
        <StatCard label="Proyectos activos" value={stats.activeProjects}                        icon={FolderOpen}  delay={0.1}  />
        <StatCard label="Tareas pendientes" value={stats.pendingTasks}                          icon={CheckSquare} delay={0.15} />
        <StatCard label="Clientes activos"  value={stats.activeClients}                         icon={Users}       delay={0.2}  />
      </div>

      {/* ── Main grid ── */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Active projects — 3 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-3 rounded-lg p-6 surface-card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-white font-display">Proyectos activos</h2>
              <p className="text-white/30 text-xs mt-0.5">{activeProjects.length} en curso</p>
            </div>
            <TrendingUp size={17} className="text-lime" />
          </div>

          {activeProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen size={32} className="text-white/15 mx-auto mb-2" />
              <p className="text-white/30 text-sm">Sin proyectos activos</p>
            </div>
          ) : (
            <div className="space-y-5">
              {activeProjects.slice(0, 4).map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.07 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-white font-semibold text-sm truncate">{p.name}</span>
                      <span className="text-white/30 text-xs shrink-0">· {p.client}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status] || 'bg-white/10 text-white/50'}`}>
                        {p.status}
                      </span>
                      <span className="text-white/30 text-xs font-mono">{p.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full rounded-full h-1.5 bg-ink-surface2">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ delay: 0.6 + i * 0.07, duration: 0.7 }}
                      className="h-1.5 rounded-full bg-lime"
                    />
                  </div>
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {p.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-xs bg-ink-surface2 text-white/40 border border-ink-border px-1.5 py-0.5 rounded-full font-mono">{t}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent tasks — 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="lg:col-span-2 rounded-lg p-6 surface-card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-white font-display">Tareas recientes</h2>
              <p className="text-white/30 text-xs mt-0.5">{tasks.length} en total</p>
            </div>
            <Clock size={17} className="text-lime" />
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare size={32} className="text-white/15 mx-auto mb-2" />
              <p className="text-white/30 text-sm">Sin tareas registradas</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentTasks.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 + i * 0.06 }}
                  className="flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-ink-surface2"
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                    t.status === 'Completada'  ? 'bg-success' :
                    t.status === 'En Progreso' ? 'bg-info'    : 'bg-white/20'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate leading-tight">{t.title}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <AlertCircle size={10} className={priorityColors[t.priority] || 'text-white/30'} />
                      <span className="text-white/30 text-xs truncate">{t.assignee || '—'}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[t.status] || 'bg-white/10 text-white/50'}`}>
                    {t.status}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

    </div>
  )
}
