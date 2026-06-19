import { motion } from 'framer-motion'
import { DollarSign, FolderOpen, CheckSquare, Users, TrendingUp, Clock, AlertCircle, ArrowUpRight, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const statusColors = {
  'En progreso': 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  'Revisión':    'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25',
  'Pendiente':   'bg-slate-500/15 text-slate-400 border border-slate-500/25',
  'Completado':  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
}

const priorityColors = {
  Alta: 'text-red-400', Media: 'text-yellow-400', Baja: 'text-slate-500',
}

function StatCard({ label, value, icon: Icon, gradient, delta, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-6 overflow-hidden group cursor-default"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at top right, ${gradient.split(' ')[1].replace('to-', '')}15, transparent 70%)` }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-500 text-sm font-medium">{label}</span>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon size={18} className="text-white" />
          </div>
        </div>
        <div className="text-3xl font-black text-white mb-1">{value}</div>
        {delta !== undefined && (
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <ArrowUpRight size={12} className="text-emerald-400" />
            <span className="text-emerald-400 font-medium">{delta}</span>
            <span>este mes</span>
          </div>
        )}
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
        className="relative rounded-3xl overflow-hidden p-8"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.08) 100%)', border: '1px solid rgba(139,92,246,0.2)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-cyan-600/8 rounded-full blur-[60px]" />
        </div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-slate-500 text-sm mb-1">{greeting},</p>
            <h1 className="text-3xl font-black text-white">
              {user?.full_name?.split(' ')[0] || 'Equipo'} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {projects.length === 0
                ? 'Empieza creando tu primer proyecto desde la sección Proyectos.'
                : `Tienes ${stats.activeProjects} proyecto${stats.activeProjects !== 1 ? 's' : ''} activo${stats.activeProjects !== 1 ? 's' : ''} y ${stats.pendingTasks} tarea${stats.pendingTasks !== 1 ? 's' : ''} pendiente${stats.pendingTasks !== 1 ? 's' : ''}.`
              }
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
            <Zap size={14} className="text-violet-400" />
            <span className="text-violet-300 text-sm font-semibold">OptiMind Solutions</span>
          </div>
        </div>
      </motion.div>

      {/* ── Stats row ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ingresos totales"  value={formatCOP(stats.totalRevenue)}  icon={DollarSign}  gradient="from-violet-600 to-violet-500" delay={0.05} />
        <StatCard label="Proyectos activos" value={stats.activeProjects}           icon={FolderOpen}  gradient="from-blue-600 to-blue-500"     delay={0.1}  />
        <StatCard label="Tareas pendientes" value={stats.pendingTasks}             icon={CheckSquare} gradient="from-orange-500 to-amber-500"   delay={0.15} />
        <StatCard label="Clientes activos"  value={stats.activeClients}            icon={Users}       gradient="from-cyan-600 to-cyan-500"      delay={0.2}  />
      </div>

      {/* ── Main grid ── */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Active projects — 3 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-3 rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-white">Proyectos activos</h2>
              <p className="text-slate-600 text-xs mt-0.5">{activeProjects.length} en curso</p>
            </div>
            <TrendingUp size={17} className="text-violet-400" />
          </div>

          {activeProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen size={32} className="text-slate-700 mx-auto mb-2" />
              <p className="text-slate-600 text-sm">Sin proyectos activos</p>
            </div>
          ) : (
            <div className="space-y-5">
              {activeProjects.slice(0, 4).map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.07 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-white font-semibold text-sm truncate">{p.name}</span>
                      <span className="text-slate-600 text-xs shrink-0">· {p.client}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status] || 'bg-slate-500/15 text-slate-400'}`}>
                        {p.status}
                      </span>
                      <span className="text-slate-600 text-xs">{p.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ delay: 0.6 + i * 0.07, duration: 0.7 }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                    />
                  </div>
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {p.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-xs bg-violet-500/10 text-violet-400 border border-violet-500/15 px-1.5 py-0.5 rounded-full">{t}</span>
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
          className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-white">Tareas recientes</h2>
              <p className="text-slate-600 text-xs mt-0.5">{tasks.length} en total</p>
            </div>
            <Clock size={17} className="text-violet-400" />
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare size={32} className="text-slate-700 mx-auto mb-2" />
              <p className="text-slate-600 text-sm">Sin tareas registradas</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentTasks.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 + i * 0.06 }}
                  className="flex items-start gap-3 p-3 rounded-xl transition-colors"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                    t.status === 'Completada'  ? 'bg-emerald-400' :
                    t.status === 'En Progreso' ? 'bg-blue-400'    : 'bg-slate-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate leading-tight">{t.title}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <AlertCircle size={10} className={priorityColors[t.priority] || 'text-slate-500'} />
                      <span className="text-slate-600 text-xs truncate">{t.assignee || '—'}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[t.status] || 'bg-slate-500/15 text-slate-400'}`}>
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
