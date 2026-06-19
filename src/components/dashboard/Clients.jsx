import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, X, Mail, Building2, TrendingUp, Globe } from 'lucide-react'

const sectorOptions = ['Retail', 'Fintech', 'Logística', 'Salud', 'Otro']
const statusOptions  = ['Activo', 'Inactivo', 'Prospecto']

const statusColors = {
  Activo:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  Inactivo:  'bg-slate-500/15 text-slate-400 border border-slate-500/25',
  Prospecto: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
}

const sectorIcons = {
  Retail: '🛍️', Fintech: '💰', Logística: '📦', Salud: '🏥', Otro: '🏢',
}

const inp = 'w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all'
const inpStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }

function DarkInput({ name, value, onChange, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input name={name} value={value} onChange={onChange}
      className={inp}
      style={focused ? { ...inpStyle, border: '1px solid rgba(139,92,246,0.5)' } : inpStyle}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      {...props}
    />
  )
}

function DarkSelect({ name, value, onChange, children }) {
  return (
    <select name={name} value={value} onChange={onChange}
      className={inp}
      style={{ ...inpStyle, background: '#0D1220' }}
    >
      {children}
    </select>
  )
}

function Modal({ client, onClose, onSave }) {
  const [form, setForm] = useState(client || {
    name: '', contact: '', email: '', sector: 'Retail', status: 'Prospecto', value: '', projects: 0,
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault(); setSaving(true)
    try {
      await onSave({ ...form, value: Number(form.value), projects: Number(form.projects) })
      onClose()
    } catch (err) {
      setSaveError(err.response?.data?.error || err.message || 'Error guardando')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: '#0D1220', border: '1px solid rgba(139,92,246,0.2)', boxShadow: '0 0 60px rgba(124,58,237,0.2)' }}
      >
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-bold text-lg">{client ? 'Editar cliente' : 'Nuevo cliente'}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Empresa *</label>
            <DarkInput name="name" value={form.name} onChange={handleChange} required placeholder="Nombre de la empresa" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Contacto</label>
              <DarkInput name="contact" value={form.contact} onChange={handleChange} placeholder="Nombre completo" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Email</label>
              <DarkInput name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Sector</label>
              <DarkSelect name="sector" value={form.sector} onChange={handleChange}>
                {sectorOptions.map(s => <option key={s}>{s}</option>)}
              </DarkSelect>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Estado</label>
              <DarkSelect name="status" value={form.status} onChange={handleChange}>
                {statusOptions.map(s => <option key={s}>{s}</option>)}
              </DarkSelect>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Valor contrato (COP)</label>
              <DarkInput name="value" type="number" value={form.value} onChange={handleChange} placeholder="0" />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">N° proyectos</label>
              <DarkInput name="projects" type="number" min="0" value={form.projects} onChange={handleChange} />
            </div>
          </div>
          {saveError && <div className="text-red-400 text-sm">{saveError}</div>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {saving
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : (client ? 'Guardar' : 'Agregar cliente')
              }
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function Clients({ clients, addClient, updateClient, deleteClient }) {
  const [modal, setModal]   = useState(null)
  const [filter, setFilter] = useState('Todos')

  const formatCOP = n =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

  const filtered = filter === 'Todos' ? clients : clients.filter(c => c.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Clientes</h1>
          <p className="text-slate-500 text-sm mt-0.5">{clients.length} clientes registrados</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(124,58,237,0.4)' }} whileTap={{ scale: 0.97 }}
          onClick={() => setModal('new')}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/25 transition-all"
        >
          <Plus size={16} /> Nuevo cliente
        </motion.button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['Todos', ...statusOptions].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={filter === s
              ? { background: 'linear-gradient(to right, #7C3AED, #6D28D9)', color: '#fff' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide"
          style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="col-span-2">Empresa</div>
          <div>Sector</div>
          <div>Estado</div>
          <div>Valor</div>
          <div className="text-right">Acciones</div>
        </div>

        <div>
          <AnimatePresence>
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.04 }}
                className="grid md:grid-cols-6 gap-4 px-6 py-4 items-center group transition-colors"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="md:col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {sectorIcons[c.sector] || '🏢'}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{c.name}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Mail size={10} /> {c.email || '—'}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <Globe size={12} className="text-violet-400" /> {c.sector}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{c.contact}</div>
                </div>

                <div className="hidden md:block">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[c.status] || 'bg-slate-500/15 text-slate-400'}`}>
                    {c.status}
                  </span>
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center gap-1 text-sm font-semibold text-violet-400">
                    <TrendingUp size={12} /> {c.value ? formatCOP(c.value) : '—'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{c.projects} proyecto(s)</div>
                </div>

                <div className="flex gap-1 md:justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setModal(c)}
                    className="p-2 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => deleteClient(c.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Building2 size={36} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No hay clientes {filter !== 'Todos' ? `con estado "${filter}"` : 'registrados'}</p>
            <button onClick={() => setModal('new')} className="mt-4 text-violet-400 text-sm hover:text-violet-300 transition-colors">
              + Agregar primer cliente
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <Modal
            client={modal === 'new' ? null : modal}
            onClose={() => setModal(null)}
            onSave={c => modal === 'new' ? addClient(c) : updateClient(modal.id, c)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
