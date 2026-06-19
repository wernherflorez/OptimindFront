import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, AlertCircle, CheckCircle2, ArrowLeft, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LogoBadge from '../components/LogoBadge'

const perks = [
  'Gestión de proyectos y clientes en tiempo real',
  'Tablero Kanban de tareas por equipo',
  'Control de ingresos y métricas del negocio',
]

export default function Login() {
  const { login, user } = useAuth()
  const navigate   = useNavigate()
  const [form, setForm]       = useState({ username: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username.trim(), form.password)
      navigate('/dashboard')
    } catch (err) {
      if (!err.response) {
        setError('No se pudo conectar al servidor. ¿Está corriendo el API en el puerto 3001?')
      } else {
        setError(err.response?.data?.error || 'Credenciales incorrectas')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-mint-light">

      {/* ── Panel izquierdo ── solo desktop ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-navy flex-col justify-between p-12"
      >
        {/* Blob decorativo */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(14,157,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,157,163,1) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Logo + back to landing */}
        <div className="relative z-10 flex items-center justify-between">
          <LogoBadge size="lg" dark text spin />
          <Link to="/"
            className="flex items-center gap-1.5 text-white/40 hover:text-teal-400 text-xs transition-colors">
            <ArrowLeft size={13} /> Landing
          </Link>
        </div>

        {/* Texto central */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-black text-4xl leading-tight mb-4"
          >
            Gestiona tu equipo<br />
            <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
              desde un solo lugar
            </span>
          </motion.h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm">
            El dashboard interno de OptiMind Solutions para coordinar proyectos, clientes y equipo.
          </p>

          <div className="space-y-3">
            {perks.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={18} className="text-teal-400 mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer branding */}
        <div className="relative z-10">
          <p className="text-white/20 text-xs italic">"Pensar diferente nunca fue tan Optimind"</p>
        </div>
      </motion.div>

      {/* ── Panel derecho — Formulario ─────────────────────────────── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >

          {/* Logo + navegación móvil */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <LogoBadge size="md" dark={false} text spin={false} />
            <Link to="/" className="flex items-center gap-1 text-gray-400 hover:text-teal-500 text-xs transition-colors">
              <ArrowLeft size={13} /> Inicio
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-teal-900/10 border border-teal-100/60 p-8 lg:p-10">

            <div className="mb-8">
              <h1 className="text-navy font-black text-3xl mb-1">Bienvenido</h1>
              <p className="text-gray-400 text-sm">Inicia sesión en tu cuenta para continuar</p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm"
              >
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-navy font-semibold text-sm block mb-2">Usuario</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  placeholder="tu_usuario"
                  className="w-full border-2 border-gray-100 hover:border-gray-200 rounded-xl px-4 py-3.5 text-sm text-navy placeholder-gray-300 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-navy font-semibold text-sm">Contraseña</label>
                  <Link
                    to="/forgot-password"
                    className="text-teal-500 hover:text-teal-600 text-xs font-semibold transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="w-full border-2 border-gray-100 hover:border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-sm text-navy placeholder-gray-300 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(14,157,163,0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-teal-500/25 transition-all mt-2"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><LogIn size={17} /> Iniciar sesión</>
                }
              </motion.button>
            </form>
          </div>

          {user && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <Link to="/dashboard"
                className="flex items-center justify-center gap-2 w-full bg-navy hover:bg-navy-light text-teal-400 border border-teal-900/40 py-3 rounded-xl text-sm font-semibold transition-colors">
                <LayoutDashboard size={16} /> Ya sesión activa → Ir al Dashboard
              </Link>
            </motion.div>
          )}
          <p className="text-center text-gray-400 text-xs mt-4">
            © {new Date().getFullYear()} OptiMind Solutions · Acceso restringido
          </p>
        </motion.div>
      </div>
    </div>
  )
}
