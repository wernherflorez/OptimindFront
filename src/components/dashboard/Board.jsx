import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, X, Bug, BookOpen, CheckSquare,
  Zap, Clock, Edit3, Trash2, LayoutGrid, Target
} from 'lucide-react'
import api from '../../services/api'

// ─── Constants ────────────────────────────────────────────────────────────
const COLUMNS = [
  { id: 'Backlog',     label: 'Backlog',     dot: 'bg-slate-500',   header: 'rgba(100,116,139,0.15)' },
  { id: 'Por Hacer',   label: 'Por Hacer',   dot: 'bg-blue-500',    header: 'rgba(59,130,246,0.15)'  },
  { id: 'En Progreso', label: 'En Progreso', dot: 'bg-amber-500',   header: 'rgba(245,158,11,0.15)'  },
  { id: 'En Revisión', label: 'En Revisión', dot: 'bg-lime',  header: 'rgba(200,255,77,0.15)'  },
  { id: 'Completada',  label: 'Completada',  dot: 'bg-emerald-500', header: 'rgba(16,185,129,0.15)'  },
]

const TYPES = [
  { id: 'task',  label: 'Tarea',    icon: CheckSquare, accent: 'rgba(59,130,246,0.8)',   border: 'rgba(59,130,246,0.4)'   },
  { id: 'bug',   label: 'Bug',      icon: Bug,         accent: 'rgba(239,68,68,0.8)',    border: 'rgba(239,68,68,0.4)'    },
  { id: 'story', label: 'Historia', icon: BookOpen,    accent: 'rgba(200,255,77,0.8)',   border: 'rgba(200,255,77,0.4)'   },
]

const PRIORITIES = [
  { id: 'Alta',  dot: 'bg-red-500'    },
  { id: 'Media', dot: 'bg-amber-400'  },
  { id: 'Baja',  dot: 'bg-slate-600'  },
]

const SPRINT_STATUS = {
  planning:  'bg-slate-500/15 text-slate-400 border border-slate-500/25',
  active:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  completed: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
}

const typeInfo = id => TYPES.find(t => t.id === id) || TYPES[0]
const priDot   = id => PRIORITIES.find(p => p.id === id)?.dot || 'bg-slate-600'

// ─── Dark inputs ──────────────────────────────────────────────────────────
const dinpBase = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
const dinpFocus = { border: '1px solid rgba(200,255,77,0.5)' }
const dinpCls = 'w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all'

function DI({ name, value, onChange, ...p }) {
  const [f, setF] = useState(false)
  return <input name={name} value={value} onChange={onChange} className={dinpCls}
    style={f ? { ...dinpBase, ...dinpFocus } : dinpBase}
    onFocus={() => setF(true)} onBlur={() => setF(false)} {...p} />
}
function DS({ name, value, onChange, children }) {
  return <select name={name} value={value} onChange={onChange} className={dinpCls}
    style={{ ...dinpBase, background: '#131315' }}>{children}</select>
}
function DT({ name, value, onChange, rows }) {
  const [f, setF] = useState(false)
  return <textarea name={name} value={value} onChange={onChange} rows={rows} className={dinpCls + ' resize-none'}
    style={f ? { ...dinpBase, ...dinpFocus } : dinpBase}
    onFocus={() => setF(true)} onBlur={() => setF(false)} />
}

// ─── Task Card ────────────────────────────────────────────────────────────
function TaskCard({ task, onEdit, onDelete, onMove }) {
  const ti = typeInfo(task.type)
  const Ti = ti.icon

  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className="group rounded-xl p-3.5 transition-all cursor-default"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: `3px solid ${ti.border}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${ti.accent}20`, color: ti.accent, border: `1px solid ${ti.border}` }}>
          <Ti size={10} /> {ti.label}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button onClick={() => onEdit(task)} className="p-1 rounded hover:bg-lime/20 text-slate-500 hover:text-lime transition-colors">
            <Edit3 size={11} />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors">
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      <p className="text-white text-sm font-medium leading-snug mb-2 line-clamp-2">{task.title}</p>

      {task.description && (
        <p className="text-slate-500 text-xs leading-relaxed mb-2 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-3 pt-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${priDot(task.priority)}`} title={task.priority} />
          {task.story_points > 0 && (
            <span className="text-xs text-slate-500 px-1.5 py-0.5 rounded font-mono"
              style={{ background: 'rgba(255,255,255,0.06)' }}>{task.story_points}sp</span>
          )}
          {task.due && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={9} /> {task.due}
            </span>
          )}
        </div>
        {task.assignee && (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-lime-dim to-lime flex items-center justify-center shadow-md" title={task.assignee}>
            <span className="text-ink text-xs font-bold">{task.assignee[0]?.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Move buttons */}
      <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {COLUMNS.filter(c => c.id !== task.status).map(c => (
          <button key={c.id} onClick={() => onMove(task.id, c.id)}
            className="text-xs px-2 py-0.5 rounded-full transition-all text-slate-400 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            → {c.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Task Modal ────────────────────────────────────────────────────────────
function TaskModal({ task, projects, sprints, activeSprint, onClose, onSave }) {
  const [form, setForm] = useState(task || {
    title: '', description: '', project_id: projects[0]?.id || '',
    sprint_id: activeSprint?.id || '', assignee: '',
    status: 'Por Hacer', priority: 'Media', type: 'task', story_points: 1, due: '',
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const hc = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault(); setErr(''); setSaving(true)
    try {
      const proj = projects.find(p => p.id === Number(form.project_id))
      await onSave({
        ...form,
        project: proj?.name || '',
        project_id: Number(form.project_id) || null,
        sprint_id: form.sprint_id ? Number(form.sprint_id) : null,
        story_points: Number(form.story_points) || 1,
      })
      onClose()
    } catch (e) {
      setErr(e.response?.data?.error || 'Error guardando')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: '#131315', border: '1px solid rgba(200,255,77,0.2)', boxShadow: '0 0 60px rgba(200,255,77,0.2)' }}>
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="font-bold text-white text-lg">{task ? 'Editar ítem' : 'Nuevo ítem'}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {err && <p className="text-red-400 text-sm">{err}</p>}

          {/* Type selector */}
          <div className="flex gap-2">
            {TYPES.map(t => {
              const Icon = t.icon
              return (
                <button key={t.id} type="button"
                  onClick={() => setForm(p => ({ ...p, type: t.id }))}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-all"
                  style={form.type === t.id
                    ? { background: `${t.accent}20`, color: t.accent, border: `2px solid ${t.border}` }
                    : { background: 'rgba(255,255,255,0.03)', border: '2px solid rgba(255,255,255,0.08)', color: '#64748b' }
                  }
                >
                  <Icon size={14} /> {t.label}
                </button>
              )
            })}
          </div>

          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Título *</label>
            <DI name="title" value={form.title} onChange={hc} required placeholder="Describe la tarea..." />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Descripción</label>
            <DT name="description" value={form.description || ''} onChange={hc} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Proyecto</label>
              <DS name="project_id" value={form.project_id} onChange={hc}>
                <option value="">Sin proyecto</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </DS>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Sprint</label>
              <DS name="sprint_id" value={form.sprint_id || ''} onChange={hc}>
                <option value="">Backlog (sin sprint)</option>
                {sprints.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </DS>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Estado</label>
              <DS name="status" value={form.status} onChange={hc}>
                {COLUMNS.map(c => <option key={c.id}>{c.id}</option>)}
              </DS>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Prioridad</label>
              <DS name="priority" value={form.priority} onChange={hc}>
                {PRIORITIES.map(p => <option key={p.id}>{p.id}</option>)}
              </DS>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Story pts</label>
              <DI name="story_points" type="number" min="0" max="100" value={form.story_points} onChange={hc} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Responsable</label>
              <DI name="assignee" value={form.assignee || ''} onChange={hc} placeholder="Nombre" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Fecha límite</label>
              <DI name="due" type="date" value={form.due || ''} onChange={hc} />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-gradient-to-r from-lime-dim to-lime hover:from-lime hover:to-lime text-ink py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-all">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : task ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Sprint Modal ──────────────────────────────────────────────────────────
function SprintModal({ sprint, projectId, onClose, onSave }) {
  const [form, setForm] = useState(sprint || { name: '', goal: '', start_date: '', end_date: '', status: 'planning', project_id: projectId })
  const [saving, setSaving] = useState(false)
  const hc = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true)
    try { await onSave(form); onClose() } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: '#131315', border: '1px solid rgba(200,255,77,0.2)', boxShadow: '0 0 60px rgba(200,255,77,0.2)' }}>
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="font-bold text-white text-lg">{sprint ? 'Editar sprint' : 'Nuevo sprint'}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Nombre *</label>
            <DI name="name" value={form.name} onChange={hc} required placeholder="Sprint 1 · Módulo de Login" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Meta del sprint</label>
            <DT name="goal" value={form.goal || ''} onChange={hc} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Inicio</label>
              <DI name="start_date" type="date" value={form.start_date || ''} onChange={hc} />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Fin</label>
              <DI name="end_date" type="date" value={form.end_date || ''} onChange={hc} />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Estado</label>
            <DS name="status" value={form.status} onChange={hc}>
              <option value="planning">Planificación</option>
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
            </DS>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-gradient-to-r from-lime-dim to-lime text-ink py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 transition-all">
              {saving ? 'Guardando...' : sprint ? 'Guardar' : 'Crear sprint'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Main Board ────────────────────────────────────────────────────────────
export default function Board() {
  const [projects,    setProjects]    = useState([])
  const [sprints,     setSprints]     = useState([])
  const [tasks,       setTasks]       = useState([])
  const [selProject,  setSelProject]  = useState(null)
  const [selSprint,   setSelSprint]   = useState(null)
  const [filterType,  setFilterType]  = useState('all')
  const [loading,     setLoading]     = useState(true)
  const [modal,       setModal]       = useState(null)
  const [sprintModal, setSprintModal] = useState(null)

  useEffect(() => {
    api.get('/projects').then(r => {
      setProjects(r.data)
      if (r.data.length > 0) setSelProject(r.data[0])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selProject) { setSprints([]); setSelSprint(null); return }
    api.get(`/sprints?project_id=${selProject.id}`).then(r => {
      setSprints(r.data)
      const active = r.data.find(s => s.status === 'active') || r.data[0] || null
      setSelSprint(active)
    })
  }, [selProject])

  const fetchTasks = useCallback(async () => {
    if (!selProject) return
    let url = `/tasks?project_id=${selProject.id}`
    if (selSprint)       url += `&sprint_id=${selSprint.id}`
    else                 url += `&sprint_id=null`
    if (filterType !== 'all') url += `&type=${filterType}`
    const r = await api.get(url)
    setTasks(r.data)
  }, [selProject, selSprint, filterType])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const saveTask = async (data) => {
    if (data.id) {
      const r = await api.put(`/tasks/${data.id}`, data)
      setTasks(prev => prev.map(t => t.id === data.id ? r.data : t))
    } else {
      const r = await api.post('/tasks', data)
      setTasks(prev => [r.data, ...prev])
    }
  }

  const deleteTask = async (id) => {
    if (!confirm('¿Eliminar este ítem?')) return
    await api.delete(`/tasks/${id}`)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const moveTask = async (id, newStatus) => {
    const r = await api.put(`/tasks/${id}`, { status: newStatus })
    setTasks(prev => prev.map(t => t.id === id ? r.data : t))
  }

  const saveSprint = async (data) => {
    if (sprintModal?.id) {
      const r = await api.put(`/sprints/${sprintModal.id}`, data)
      setSprints(prev => prev.map(s => s.id === sprintModal.id ? r.data : s))
      if (selSprint?.id === sprintModal.id) setSelSprint(r.data)
    } else {
      const r = await api.post('/sprints', { ...data, project_id: selProject.id })
      setSprints(prev => [r.data, ...prev])
      setSelSprint(r.data)
    }
  }

  const deleteSprint = async (sprint) => {
    if (!confirm(`¿Eliminar "${sprint.name}"? Las tareas volverán al Backlog.`)) return
    await api.delete(`/sprints/${sprint.id}`)
    setSprints(prev => prev.filter(s => s.id !== sprint.id))
    if (selSprint?.id === sprint.id) setSelSprint(null)
    await fetchTasks()
  }

  const byColumn   = (col) => tasks.filter(t => t.status === col)
  const totalSP    = tasks.reduce((a, t) => a + (t.story_points || 0), 0)
  const doneSP     = tasks.filter(t => t.status === 'Completada').reduce((a, t) => a + (t.story_points || 0), 0)
  const bugsCount  = tasks.filter(t => t.type === 'bug').length

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-5 min-h-screen">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Board</h1>
          <p className="text-slate-500 text-sm mt-0.5">Scrum / Kanban · gestión de sprints y tareas</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setSprintModal({})} disabled={!selProject}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40 text-lime hover:text-white hover:bg-lime/15"
            style={{ border: '1px solid rgba(200,255,77,0.3)' }}>
            <Target size={14} /> Nuevo sprint
          </motion.button>
          <motion.button whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(200,255,77,0.4)' }} whileTap={{ scale: 0.97 }}
            onClick={() => setModal({})} disabled={!selProject}
            className="flex items-center gap-1.5 bg-gradient-to-r from-lime-dim to-lime text-ink px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-lime/25 transition-all disabled:opacity-40">
            <Plus size={15} /> Nuevo ítem
          </motion.button>
        </div>
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Project selector */}
        <select
          value={selProject?.id || ''}
          onChange={e => setSelProject(projects.find(p => p.id === Number(e.target.value)) || null)}
          className="rounded-xl px-3 py-2 text-sm focus:outline-none font-medium text-white"
          style={{ background: '#131315', border: '1px solid rgba(200,255,77,0.25)' }}
        >
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        {/* Sprint tabs */}
        <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => setSelSprint(null)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={!selSprint
              ? { background: 'rgba(200,255,77,0.2)', color: '#C8FF4D', border: '1px solid rgba(200,255,77,0.3)' }
              : { color: '#64748b' }}>
            📋 Backlog
          </button>
          {sprints.map(s => (
            <div key={s.id} className="flex items-center gap-0.5">
              <button onClick={() => setSelSprint(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={selSprint?.id === s.id
                  ? { background: 'rgba(200,255,77,0.2)', color: '#C8FF4D', border: '1px solid rgba(200,255,77,0.3)' }
                  : { color: '#64748b' }}>
                ⚡ {s.name}
              </button>
              {selSprint?.id === s.id && (
                <div className="flex gap-0.5">
                  <button onClick={() => setSprintModal(s)} className="p-1 rounded text-slate-600 hover:text-lime transition-colors">
                    <Edit3 size={11} />
                  </button>
                  <button onClick={() => deleteSprint(s)} className="p-1 rounded text-slate-600 hover:text-red-400 transition-colors">
                    <Trash2 size={11} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Type filter */}
        <div className="flex gap-1">
          {[{ id: 'all', label: 'Todos' }, ...TYPES].map(t => (
            <button key={t.id} onClick={() => setFilterType(t.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={filterType === t.id
                ? { background: 'rgba(200,255,77,0.2)', color: '#C8FF4D', border: '1px solid rgba(200,255,77,0.3)' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sprint banner ── */}
      {selSprint && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(200,255,77,0.2), rgba(6,182,212,0.08))', border: '1px solid rgba(200,255,77,0.25)' }}>
          <div>
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-lime" />
              <span className="text-white font-bold">{selSprint.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SPRINT_STATUS[selSprint.status] || ''}`}>
                {selSprint.status === 'planning' ? 'Planificación' : selSprint.status === 'active' ? 'Activo' : 'Completado'}
              </span>
            </div>
            {selSprint.goal && <p className="text-slate-500 text-xs mt-1">{selSprint.goal}</p>}
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-white font-black text-lg">{tasks.length}</div>
              <div className="text-slate-600 text-xs">ítems</div>
            </div>
            <div className="text-center">
              <div className="text-lime font-black text-lg">{doneSP}/{totalSP}</div>
              <div className="text-slate-600 text-xs">story points</div>
            </div>
            <div className="text-center">
              <div className={`font-black text-lg ${bugsCount > 0 ? 'text-red-400' : 'text-white'}`}>{bugsCount}</div>
              <div className="text-slate-600 text-xs">bugs</div>
            </div>
            {(selSprint.start_date || selSprint.end_date) && (
              <div className="text-center">
                <div className="text-slate-300 text-xs font-medium">{selSprint.start_date} → {selSprint.end_date}</div>
                <div className="text-slate-600 text-xs">período</div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── Kanban columns ── */}
      {projects.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <LayoutGrid size={40} className="mx-auto mb-3 opacity-30" />
          <p>Crea un proyecto para empezar a usar el board</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pb-8">
          {COLUMNS.map(col => {
            const colTasks = byColumn(col.id)
            return (
              <div key={col.id} className="flex flex-col gap-3">
                {/* Column header */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl"
                  style={{ background: col.header }}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <span className="font-semibold text-sm text-white">{col.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{colTasks.length}</span>
                </div>

                {/* Cards */}
                <div className="space-y-2.5 min-h-[120px]">
                  <AnimatePresence>
                    {colTasks.map(task => (
                      <TaskCard key={task.id} task={task} onEdit={t => setModal(t)} onDelete={deleteTask} onMove={moveTask} />
                    ))}
                  </AnimatePresence>

                  {colTasks.length === 0 && (
                    <div className="rounded-xl h-20 flex items-center justify-center"
                      style={{ border: '2px dashed rgba(255,255,255,0.06)' }}>
                      <span className="text-slate-700 text-xs">Sin ítems</span>
                    </div>
                  )}
                </div>

                {/* Quick add */}
                <button
                  onClick={() => setModal({ status: col.id, sprint_id: selSprint?.id || null, project_id: selProject?.id })}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-lime text-xs py-2 px-3 rounded-xl hover:bg-lime/10 transition-all">
                  <Plus size={13} /> Añadir ítem
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Modals ── */}
      <AnimatePresence>
        {modal !== null && (
          <TaskModal
            task={modal?.id ? modal : null}
            projects={projects} sprints={sprints} activeSprint={selSprint}
            onClose={() => setModal(null)} onSave={saveTask}
          />
        )}
        {sprintModal !== null && (
          <SprintModal
            sprint={sprintModal?.id ? sprintModal : null}
            projectId={selProject?.id}
            onClose={() => setSprintModal(null)} onSave={saveSprint}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
