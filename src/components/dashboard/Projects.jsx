import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, X, TrendingUp, Calendar, FolderOpen } from 'lucide-react'

const statusOptions  = ['Pendiente', 'En progreso', 'Revisión', 'Completado']
const priorityOptions = ['Alta', 'Media', 'Baja']

const statusColors = {
  'En progreso': 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  'Revisión':    'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25',
  'Pendiente':   'bg-slate-500/15 text-slate-400 border border-slate-500/25',
  'Completado':  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
}

const priorityDot = { Alta: 'bg-red-500', Media: 'bg-yellow-400', Baja: 'bg-slate-600' }

const inp = 'w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all'
const inpStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
const inpFocus = { border: '1px solid rgba(200,255,77,0.5)' }

function DarkInput({ name, value, onChange, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input name={name} value={value} onChange={onChange}
      className={inp}
      style={focused ? { ...inpStyle, ...inpFocus } : inpStyle}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      {...props}
    />
  )
}

function DarkSelect({ name, value, onChange, children }) {
  return (
    <select name={name} value={value} onChange={onChange}
      className={inp}
      style={{ ...inpStyle, background: '#131315' }}
    >
      {children}
    </select>
  )
}

function DarkTextarea({ name, value, onChange, rows }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea name={name} value={value} onChange={onChange} rows={rows}
      className={inp + ' resize-none'}
      style={focused ? { ...inpStyle, ...inpFocus } : inpStyle}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    />
  )
}

function Modal({ project, onClose, onSave }) {
  const [form, setForm] = useState(project || {
    name: '', client: '', status: 'Pendiente', priority: 'Media',
    budget: '', deadline: '', progress: 0, tags: '', description: '',
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true)
    try {
      await onSave({
        ...form,
        budget: Number(form.budget),
        progress: Number(form.progress),
        tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags,
      })
      onClose()
    } catch (err) {
      setSaveError(err.response?.data?.error || err.message || 'Error guardando')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: '#131315', border: '1px solid rgba(200,255,77,0.2)', boxShadow: '0 0 60px rgba(200,255,77,0.2)' }}
      >
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-bold text-lg">{project ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Nombre *</label>
              <DarkInput name="name" value={form.name} onChange={handleChange} required placeholder="Nombre del proyecto" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Cliente *</label>
              <DarkInput name="client" value={form.client} onChange={handleChange} required placeholder="Empresa cliente" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Estado</label>
              <DarkSelect name="status" value={form.status} onChange={handleChange}>
                {statusOptions.map(s => <option key={s}>{s}</option>)}
              </DarkSelect>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Prioridad</label>
              <DarkSelect name="priority" value={form.priority} onChange={handleChange}>
                {priorityOptions.map(p => <option key={p}>{p}</option>)}
              </DarkSelect>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Progreso %</label>
              <DarkInput name="progress" type="number" min="0" max="100" value={form.progress} onChange={handleChange} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Presupuesto (COP)</label>
              <DarkInput name="budget" type="number" value={form.budget} onChange={handleChange} placeholder="0" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Fecha límite</label>
              <DarkInput name="deadline" type="date" value={form.deadline} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Tags (separados por coma)</label>
            <DarkInput name="tags" value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags}
              onChange={handleChange} placeholder="React, Node.js, Azure" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Descripción</label>
            <DarkTextarea name="description" value={form.description} onChange={handleChange} rows={3} />
          </div>
          {saveError && <div className="text-red-400 text-sm">{saveError}</div>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-gradient-to-r from-lime-dim to-lime hover:from-lime hover:to-lime text-ink py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {saving
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : (project ? 'Guardar cambios' : 'Crear proyecto')
              }
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function Projects({ projects, addProject, updateProject, deleteProject }) {
  const [modal, setModal]   = useState(null)
  const [filter, setFilter] = useState('Todos')

  const formatCOP = n =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Proyectos</h1>
          <p className="text-slate-500 text-sm mt-0.5">{projects.length} proyectos en total</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(200,255,77,0.4)' }} whileTap={{ scale: 0.97 }}
          onClick={() => setModal('new')}
          className="flex items-center gap-2 bg-gradient-to-r from-lime-dim to-lime text-ink px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-lime/25 transition-all"
        >
          <Plus size={16} /> Nuevo proyecto
        </motion.button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['Todos', ...statusOptions].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={filter === s
              ? { background: 'linear-gradient(to right, #C8FF4D, #8FB838)', color: '#0A0A0B' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 rounded-2xl" style={{ border: '1px dashed rgba(255,255,255,0.08)' }}>
          <FolderOpen size={40} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No hay proyectos {filter !== 'Todos' ? `con estado "${filter}"` : 'registrados'}</p>
          <button onClick={() => setModal('new')} className="mt-4 text-lime text-sm hover:text-lime transition-colors">
            + Crear primer proyecto
          </button>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl p-5 transition-all hover:border-lime/20"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${priorityDot[p.priority]}`} />
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[p.status] || 'bg-slate-500/15 text-slate-400'}`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setModal(p)} className="text-slate-500 hover:text-lime transition-colors">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => deleteProject(p.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 className="text-white font-bold text-base mb-0.5">{p.name}</h3>
              <p className="text-slate-500 text-xs mb-3">{p.client}</p>

              {p.description && (
                <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{p.description}</p>
              )}

              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                  <span>Progreso</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="bg-gradient-to-r from-lime to-lime h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar size={11} />
                  {p.deadline || '—'}
                </div>
                <div className="flex items-center gap-1 text-lime font-semibold">
                  <TrendingUp size={11} />
                  {formatCOP(p.budget || 0)}
                </div>
              </div>

              {p.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {p.tags.map(t => (
                    <span key={t} className="text-xs bg-lime/10 text-lime border border-lime/20 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modal && (
          <Modal
            project={modal === 'new' ? null : modal}
            onClose={() => setModal(null)}
            onSave={p => modal === 'new' ? addProject(p) : updateProject(modal.id, p)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
