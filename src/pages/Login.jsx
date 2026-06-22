import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, AlertCircle, ArrowLeft, LayoutDashboard, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LogoBadge from '../components/LogoBadge'
import { TextureButton } from '../components/ui/texture-button'

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
    <div className="min-h-screen flex items-center justify-center bg-ink relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo + volver */}
        <div className="flex items-center justify-between mb-8">
          <LogoBadge size="md" dark text spin={false} />
          <Link to="/" className="flex items-center gap-1 text-white/40 hover:text-lime text-xs transition-colors">
            <ArrowLeft size={13} /> Landing
          </Link>
        </div>

        {/* Card */}
        <div className="surface-card rounded-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-lime via-lime-dim to-transparent" />
          <div className="p-8 lg:p-10">

            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-white font-black text-3xl mb-1">Bienvenido</h1>
                <p className="text-white/40 text-sm">Inicia sesión en tu cuenta para continuar</p>
              </div>
              <div className="w-10 h-10 rounded-md bg-ink-surface2 border border-ink-border flex items-center justify-center shrink-0">
                <Lock size={16} className="text-lime" />
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-error/10 border border-error/30 text-error rounded-md px-4 py-3 mb-6 text-sm"
              >
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white/80 font-semibold text-sm block mb-2">Usuario</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  placeholder="tu_usuario"
                  className="w-full bg-ink-surface2 border border-ink-border rounded-md px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/80 font-semibold text-sm">Contraseña</label>
                  <Link
                    to="/forgot-password"
                    className="text-lime hover:text-lime-dim text-xs font-semibold transition-colors"
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
                    className="w-full bg-ink-surface2 border border-ink-border rounded-md px-4 py-3.5 pr-12 text-sm text-white placeholder-white/25 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(p => !p)}
                    aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <TextureButton
                type="submit"
                variant="lime"
                disabled={loading}
                className="mt-2"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  : <><LogIn size={17} /> Iniciar sesión</>
                }
              </TextureButton>
            </form>
          </div>
        </div>

        {user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <Link to="/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-ink-surface hover:bg-ink-surface2 text-lime border border-ink-border py-3 rounded-md text-sm font-semibold transition-colors">
              <LayoutDashboard size={16} /> Ya sesión activa → Ir al Dashboard
            </Link>
          </motion.div>
        )}
        <p className="text-center text-white/30 text-xs mt-4 font-mono">
          © {new Date().getFullYear()} OptiMind Solutions · Acceso restringido
        </p>
      </motion.div>
    </div>
  )
}
