import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Send } from 'lucide-react'
import api from '../services/api'
import LogoBadge from '../components/LogoBadge'
import { TextureButton } from '../components/ui/texture-button'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await api.post('/auth/forgot', { email: email.trim().toLowerCase() })
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background — subtle grid only, no decorative blobs (DESIGN.md: minimal decoration) */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,255,77,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,77,1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <LogoBadge size="lg" dark text spin />
          </div>
        </div>

        <div className="surface-card rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">

            {/* ── Formulario ─────────────────────────────────────── */}
            {!sent && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-ink-surface2 border border-ink-border rounded-md flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-lime" />
                  </div>
                  <div>
                    <h2 className="font-display text-white font-bold text-lg leading-tight">Restablecer contraseña</h2>
                    <p className="text-white/40 text-xs mt-0.5">Te enviaremos una contraseña temporal</p>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-error/10 border border-error/30 text-error rounded-md px-4 py-3 mb-5 text-sm"
                  >
                    <AlertCircle size={15} className="shrink-0" />
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-white/70 text-sm font-medium block mb-1.5">
                      Correo electrónico registrado
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="tu@correo.com"
                      className="w-full bg-ink-surface2 border border-ink-border text-white placeholder-white/25 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                    />
                    <p className="text-white/30 text-xs mt-2">
                      Debes usar el correo con el que te registraron en el sistema.
                    </p>
                  </div>

                  <TextureButton type="submit" variant="lime" disabled={loading}>
                    {loading
                      ? <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                      : <><Send size={16} /> Enviar contraseña temporal</>
                    }
                  </TextureButton>
                </form>
              </motion.div>
            )}

            {/* ── Éxito ───────────────────────────────────────────── */}
            {sent && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="w-20 h-20 bg-ink-surface2 border border-ink-border rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={38} className="text-lime" />
                </div>
                <h2 className="font-display text-white font-bold text-xl mb-2">¡Correo enviado!</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-2">
                  Si <strong className="text-white/70">{email}</strong> está registrado,
                  recibirás una contraseña temporal en tu bandeja de entrada.
                </p>
                <p className="text-white/30 text-xs mb-8">
                  Revisa también la carpeta de spam. La contraseña vence en 24 horas.
                </p>

                <div className="bg-ink-surface2 border border-ink-border rounded-md p-4 text-left mb-6 space-y-2">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider font-mono">Próximos pasos</p>
                  {['Revisa tu correo y copia la contraseña temporal', 'Inicia sesión con esa contraseña', 'Cambia tu contraseña desde el dashboard'].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-lime/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-lime text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-white/60 text-sm">{s}</span>
                    </div>
                  ))}
                </div>

                <TextureButton variant="lime" className="w-full" onClick={() => navigate('/login')}>
                  Ir al login
                </TextureButton>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="flex items-center justify-center gap-1.5 text-white/40 hover:text-lime text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Volver al login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
