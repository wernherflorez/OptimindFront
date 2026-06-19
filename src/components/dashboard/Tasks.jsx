import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, X, CheckCircle2, Circle, Clock } from 'lucide-react'

const statusOptions = ['Pendiente', 'En progreso', 'Completada']
const priorityOptions = ['Alta', 'Media', 'Baja']

const statusColors = {
  'Pendiente': 'bg-gray-100 text-gray-600',
  'En progreso': 'bg-blue-100 text-blue-700',
  'Completada': 'bg-green-100 text-green-700',
}

const priorityColors = {
  Alta: 'text-red-500 bg-red-50',
  Media: 'text-yellow-600 bg-yellow-50',
  Baja: 'text-gray-500 bg-gray-50',
}

const columns = ['Pendiente', 'En progreso', 'Completada']

function Modal({ task, projects, onClose, onSave }) {
  const [form, setForm] = useState(task || {
    title: '', project: projects[0]?.name || '', assignee: '',
    status: 'Pendiente', priority: 'Media', due: '',
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
      onClose()
    } catch (err) {
      setSaveError(err.response?.data?.error || err.message || 'Error guardando')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-bold text-navy text-lg">{task ? 'Editar tarea' : 'Nueva tarea'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-navy mb-1 block">Título *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy mb-1 block">Proyecto</label>
              <select name="project" value={form.project} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-white">
                {projects.map(p => <option key={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-navy mb-1 block">Responsable</label>
              <input name="assignee" value={form.assignee} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-navy mb-1 block">Estado</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-white">
                {statusOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-navy mb-1 block">Prioridad</label>
              <select name="priority" value={form.priority} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-white">
                {priorityOptions.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-navy mb-1 block">Fecha límite</label>
              <input name="due" type="date" value={form.due} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
            </div>
          </div>
          {saveError && <div className="text-red-500 text-sm">{saveError}</div>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-teal-500 hover:bg-teal-400 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
              {saving
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : (task ? 'Guardar' : 'Crear tarea')
              }
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 group hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-2 mb-2">
        <button
          onClick={() => onStatusChange(task.id, task.status === 'Completada' ? 'Pendiente' : 'Completada')}
          className="mt-0.5 shrink-0"
        >
          {task.status === 'Completada'
            ? <CheckCircle2 size={16} className="text-teal-500" />
            : <Circle size={16} className="text-gray-300 hover:text-teal-400 transition-colors" />
          }
        </button>
        <p className={`text-sm font-medium flex-1 ${task.status === 'Completada' ? 'text-gray-400 line-through' : 'text-navy'}`}>
          {task.title}
        </p>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="text-gray-300 hover:text-teal-500"><Edit3 size={13} /></button>
          <button onClick={() => onDelete(task.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={13} /></button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3 ml-6">{task.project}</p>

      <div className="flex items-center justify-between ml-6">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          {task.assignee && (
            <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-1">
              <span className="text-teal-600 text-xs font-bold">{task.assignee[0]}</span>
            </div>
          )}
          {task.due && (
            <>
              <Clock size={11} />
              {task.due}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Tasks({ tasks, projects, addTask, updateTask, deleteTask }) {
  const [modal, setModal] = useState(null)

  const getByStatus = s => tasks.filter(t => t.status === s)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy">Tareas</h1>
          <p className="text-gray-400 text-sm mt-0.5">{tasks.length} tareas · {tasks.filter(t => t.status === 'Completada').length} completadas</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setModal('new')}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-teal-500/25 transition-colors"
        >
          <Plus size={16} /> Nueva tarea
        </motion.button>
      </div>

      {/* Kanban board */}
      <div className="grid md:grid-cols-3 gap-5">
        {columns.map(col => (
          <div key={col} className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2.5 h-2.5 rounded-full ${
                col === 'Completada' ? 'bg-green-400' : col === 'En progreso' ? 'bg-blue-400' : 'bg-gray-300'
              }`} />
              <span className="font-semibold text-navy text-sm">{col}</span>
              <span className="ml-auto text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                {getByStatus(col).length}
              </span>
            </div>
            <div className="space-y-3 min-h-[120px]">
              <AnimatePresence>
                {getByStatus(col).map(t => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onEdit={t => setModal(t)}
                    onDelete={deleteTask}
                    onStatusChange={(id, status) => updateTask(id, { status })}
                  />
                ))}
              </AnimatePresence>
              {getByStatus(col).length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl h-20 flex items-center justify-center">
                  <span className="text-gray-300 text-xs">Sin tareas</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <Modal
            task={modal === 'new' ? null : modal}
            projects={projects}
            onClose={() => setModal(null)}
            onSave={t => modal === 'new' ? addTask(t) : updateTask(modal.id, t)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
