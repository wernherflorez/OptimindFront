import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, X, Key, Shield, HelpCircle, CheckCircle, UserX, UserCheck } from 'lucide-react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const ROLES = ['admin', 'developer', 'viewer']
const roleColors = {
  admin:     'bg-violet-500/15 text-violet-400 border border-violet-500/25',
  developer: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  viewer:    'bg-slate-500/15 text-slate-400 border border-slate-500/25',
}
const roleLabels = { admin: 'Admin', developer: 'Developer', viewer: 'Viewer' }

const QUESTION_POOL = [
  '¿Cuál es el nombre de tu primera mascota?',
  '¿En qué ciudad naciste?',
  '¿Cuál es el nombre de tu escuela primaria?',
  '¿Cuál es el apellido de soltera de tu madre?',
  '¿Cuál era el nombre de tu mejor amigo de la infancia?',
  '¿Cuál es tu película favorita?',
  '¿En qué año se fundó OptiMind Solutions?',
  '¿Cuál es el nombre del fundador de OptiMind?',
  '¿Cuál es tu tecnología favorita?',
  '¿Cuál es tu meta profesional?',
  '¿En qué universidad estudias?',
]

// ─── Shared dark input styles ─────────────────────────────────────────────
const dinpCls = 'w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all'
const dinpStyle  = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
const dinpFocusS = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(139,92,246,0.5)' }

function DI({ name, value, onChange, disabled, ...p }) {
  const [f, setF] = useState(false)
  return (
    <input name={name} value={value} onChange={onChange} disabled={disabled}
      className={dinpCls}
      style={disabled ? { ...dinpStyle, opacity: 0.4 } : f ? dinpFocusS : dinpStyle}
      onFocus={() => setF(true)} onBlur={() => setF(false)} {...p} />
  )
}
function DS({ name, value, onChange, children }) {
  return (
    <select name={name} value={value} onChange={onChange}
      className={dinpCls} style={{ ...dinpStyle, background: '#0D1220' }}>
      {children}
    </select>
  )
}

// ─── Modal wrapper ────────────────────────────────────────────────────────
function DarkModal({ children, title, onClose, size = 'lg' }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full ${size === 'sm' ? 'max-w-sm' : size === 'md' ? 'max-w-md' : 'max-w-lg'} rounded-2xl overflow-hidden`}
        style={{ background: '#0D1220', border: '1px solid rgba(139,92,246,0.2)', boxShadow: '0 0 60px rgba(124,58,237,0.2)' }}>
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="font-bold text-white text-lg">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

// ─── Create / Edit User Modal ────────────────────────────────────────────
function UserModal({ user, onClose, onSaved }) {
  const isEdit = !!user
  const [form, setForm] = useState({
    username:  user?.username  || '',
    full_name: user?.full_name || '',
    email:     user?.email     || '',
    password:  '',
    role:      user?.role      || 'developer',
  })
  const [questions, setQuestions] = useState([
    { question: QUESTION_POOL[0], answer: '' },
    { question: QUESTION_POOL[1], answer: '' },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const hc = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const hq = (i, field, val) => setQuestions(prev => prev.map((q, idx) => idx === i ? { ...q, [field]: val } : q))

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const payload = { ...form, security_questions: isEdit ? undefined : questions.filter(q => q.answer) }
      if (isEdit && !form.password) delete payload.password
      const saved = isEdit
        ? await api.put(`/users/${user.id}`, payload)
        : await api.post('/users', payload)
      onSaved(saved.data, isEdit)
      onClose()
    } catch (err) {
      setError(err.response?.data?.error || 'Error guardando usuario')
    } finally { setLoading(false) }
  }

  return (
    <DarkModal title={isEdit ? 'Editar usuario' : 'Nuevo usuario'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
        {error && (
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-red-400"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <X size={14} /> {error}
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Username *</label>
            <DI name="username" value={form.username} onChange={hc} required disabled={isEdit} placeholder="usuario123" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Nombre completo *</label>
            <DI name="full_name" value={form.full_name} onChange={hc} required placeholder="Juan Pérez" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Email *</label>
            <DI name="email" type="email" value={form.email} onChange={hc} required placeholder="correo@empresa.com" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium block mb-1.5">Rol</label>
            <DS name="role" value={form.role} onChange={hc}>
              {ROLES.map(r => <option key={r} value={r}>{roleLabels[r]}</option>)}
            </DS>
          </div>
        </div>
        <div>
          <label className="text-slate-400 text-xs font-medium block mb-1.5">
            Contraseña {isEdit ? <span className="text-slate-600">(dejar vacío para no cambiar)</span> : '*'}
          </label>
          <DI name="password" type="password" value={form.password} onChange={hc}
            required={!isEdit} minLength={8} placeholder={isEdit ? '••••••••' : 'Mínimo 8 caracteres'} />
        </div>

        {!isEdit && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={14} className="text-violet-400" />
              <span className="text-slate-300 text-sm font-medium">Preguntas de seguridad</span>
              <span className="text-slate-600 text-xs">(para recuperar contraseña)</span>
            </div>
            {questions.map((q, i) => (
              <div key={i} className="rounded-xl p-4 mb-3 space-y-2"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label className="text-slate-500 text-xs font-medium">Pregunta {i + 1}</label>
                <DS name={`q${i}`} value={q.question} onChange={e => hq(i, 'question', e.target.value)}>
                  {QUESTION_POOL.map(p => <option key={p}>{p}</option>)}
                </DS>
                <DI name={`a${i}`} value={q.answer} onChange={e => hq(i, 'answer', e.target.value)}
                  placeholder="Respuesta (no distingue mayúsculas)" />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            Cancelar
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Guardando...</>
              : isEdit ? 'Guardar cambios' : 'Crear usuario'
            }
          </button>
        </div>
      </form>
    </DarkModal>
  )
}

// ─── Password Reset Modal ─────────────────────────────────────────────────
function ResetPwdModal({ user, onClose }) {
  const [pwd, setPwd]       = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)
  const [error, setError]   = useState('')

  const handleSubmit = async e => {
    e.preventDefault(); setError('')
    if (pwd !== confirm) { setError('Las contraseñas no coinciden'); return }
    if (pwd.length < 8)  { setError('Mínimo 8 caracteres'); return }
    setLoading(true)
    try { await api.put(`/users/${user.id}/password`, { newPassword: pwd }); setDone(true) }
    catch (err) { setError(err.response?.data?.error || 'Error') }
    finally { setLoading(false) }
  }

  return (
    <DarkModal title="Resetear contraseña" onClose={onClose} size="sm">
      <div className="p-6">
        {done ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-emerald-400" />
            </div>
            <p className="font-bold text-white mb-1">Contraseña actualizada</p>
            <p className="text-slate-500 text-sm mb-4">Se actualizó para {user.full_name}</p>
            <button onClick={onClose} className="text-violet-400 text-sm hover:text-violet-300 transition-colors">Cerrar</button>
          </div>
        ) : (
          <>
            <p className="text-slate-400 text-sm mb-4">Usuario: <span className="text-white font-semibold">{user.full_name}</span></p>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <DI name="pwd" type="password" value={pwd} onChange={e => setPwd(e.target.value)}
                required placeholder="Nueva contraseña" />
              <DI name="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                required placeholder="Confirmar contraseña" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 transition-all">
                  {loading ? 'Guardando...' : 'Actualizar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </DarkModal>
  )
}

// ─── Security Questions Modal ─────────────────────────────────────────────
function QuestionsModal({ user, onClose }) {
  const [questions, setQuestions] = useState([
    { question: QUESTION_POOL[0], answer: '' },
    { question: QUESTION_POOL[1], answer: '' },
  ])
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')

  const hq = (i, field, val) => setQuestions(prev => prev.map((q, idx) => idx === i ? { ...q, [field]: val } : q))

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await api.put(`/users/${user.id}/security-questions`, { security_questions: questions.filter(q => q.answer.trim()) })
      setDone(true)
    } catch (err) { setError(err.response?.data?.error || 'Error') }
    finally { setLoading(false) }
  }

  return (
    <DarkModal title="Preguntas de seguridad" onClose={onClose} size="md">
      <div className="p-6">
        {done ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-emerald-400" />
            </div>
            <p className="font-bold text-white mb-1">Preguntas actualizadas</p>
            <button onClick={onClose} className="mt-2 text-violet-400 text-sm hover:text-violet-300 transition-colors">Cerrar</button>
          </div>
        ) : (
          <>
            <p className="text-slate-400 text-sm mb-4">Usuario: <span className="text-white font-semibold">{user.full_name}</span></p>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="rounded-xl p-4 space-y-2"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <label className="text-slate-500 text-xs font-medium">Pregunta {i + 1}</label>
                  <DS name={`q${i}`} value={q.question} onChange={e => hq(i, 'question', e.target.value)}>
                    {QUESTION_POOL.map(p => <option key={p}>{p}</option>)}
                  </DS>
                  <DI name={`a${i}`} value={q.answer} onChange={e => hq(i, 'answer', e.target.value)}
                    required placeholder="Respuesta" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 transition-all">
                  {loading ? 'Guardando...' : 'Guardar preguntas'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </DarkModal>
  )
}

// ─── Main Users Component ─────────────────────────────────────────────────
export default function Users() {
  const { user: me } = useAuth()
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [modal,   setModal]   = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    try { const { data } = await api.get('/users'); setUsers(data) }
    catch { setError('Error cargando usuarios') }
    finally { setLoading(false) }
  }
  useEffect(() => { fetchUsers() }, [])

  const onSaved = (saved, isEdit) => {
    if (isEdit) setUsers(prev => prev.map(u => u.id === saved.id ? saved : u))
    else setUsers(prev => [saved, ...prev])
  }

  const toggleActive = async (user) => {
    try {
      const { data } = await api.put(`/users/${user.id}`, { active: !user.active })
      setUsers(prev => prev.map(u => u.id === user.id ? data : u))
    } catch { alert('Error actualizando estado') }
  }

  const deleteUser = async (user) => {
    if (!confirm(`¿Eliminar al usuario "${user.full_name}"?`)) return
    try {
      await api.delete(`/users/${user.id}`)
      setUsers(prev => prev.filter(u => u.id !== user.id))
    } catch (err) { alert(err.response?.data?.error || 'Error eliminando') }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Usuarios</h1>
          <p className="text-slate-500 text-sm mt-0.5">{users.length} usuarios registrados</p>
        </div>
        <motion.button whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(124,58,237,0.4)' }} whileTap={{ scale: 0.97 }}
          onClick={() => setModal('new')}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/25 transition-all">
          <Plus size={16} /> Nuevo usuario
        </motion.button>
      </div>

      {error && (
        <div className="text-red-400 rounded-xl px-4 py-3 text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide"
          style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="col-span-2">Usuario</div>
          <div>Rol</div>
          <div>Estado</div>
          <div>Preguntas</div>
          <div className="text-right">Acciones</div>
        </div>

        <div>
          <AnimatePresence>
            {users.map((u, i) => (
              <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className={`grid md:grid-cols-6 gap-4 px-6 py-4 items-center group transition-colors ${!u.active ? 'opacity-40' : ''}`}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* User info */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/25">
                    <span className="text-white font-bold text-sm">{u.full_name?.[0] || '?'}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                      {u.full_name}
                      {u.id === me?.id && <span className="text-xs text-violet-400 font-normal">(tú)</span>}
                    </div>
                    <div className="text-slate-500 text-xs">@{u.username} · {u.email}</div>
                    {u.last_login && <div className="text-slate-700 text-xs">Último: {new Date(u.last_login).toLocaleDateString()}</div>}
                  </div>
                </div>

                {/* Role */}
                <div className="hidden md:block">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[u.role]}`}>
                    {roleLabels[u.role]}
                  </span>
                </div>

                {/* Status */}
                <div className="hidden md:block">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    u.active
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : 'bg-slate-500/15 text-slate-400 border border-slate-500/25'
                  }`}>
                    {u.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                {/* Security questions */}
                <div className="hidden md:block">
                  {u.has_questions
                    ? <span className="flex items-center gap-1 text-xs text-emerald-400"><CheckCircle size={12} /> Configuradas</span>
                    : <span className="flex items-center gap-1 text-xs text-amber-400"><HelpCircle size={12} /> Sin configurar</span>
                  }
                </div>

                {/* Actions */}
                <div className="flex gap-1 md:justify-end opacity-0 group-hover:opacity-100 transition-opacity flex-wrap">
                  <button title="Editar" onClick={() => setModal({ type: 'edit', user: u })}
                    className="p-2 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors">
                    <Edit3 size={13} />
                  </button>
                  <button title="Resetear contraseña" onClick={() => setModal({ type: 'pwd', user: u })}
                    className="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <Key size={13} />
                  </button>
                  <button title="Preguntas de seguridad" onClick={() => setModal({ type: 'qs', user: u })}
                    className="p-2 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors">
                    <Shield size={13} />
                  </button>
                  {u.id !== me?.id && (
                    <>
                      <button title={u.active ? 'Desactivar' : 'Activar'} onClick={() => toggleActive(u)}
                        className="p-2 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors">
                        {u.active ? <UserX size={13} /> : <UserCheck size={13} />}
                      </button>
                      <button title="Eliminar" onClick={() => deleteUser(u)}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {modal === 'new' && <UserModal onClose={() => setModal(null)} onSaved={(u) => onSaved(u, false)} />}
        {modal?.type === 'edit' && <UserModal user={modal.user} onClose={() => setModal(null)} onSaved={(u) => onSaved(u, true)} />}
        {modal?.type === 'pwd' && <ResetPwdModal user={modal.user} onClose={() => setModal(null)} />}
        {modal?.type === 'qs' && <QuestionsModal user={modal.user} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  )
}
