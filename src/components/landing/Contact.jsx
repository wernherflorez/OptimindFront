import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { TextureButton } from '../ui/texture-button'
import api from '../../services/api'

const sectors = ['Retail', 'Fintech', 'Logística', 'Salud', 'Otro']
const budgets = ['$600K – $1M COP', '$1M – $1.5M COP', '$1.5M – $2M COP', '$2M – $2.5M COP', '+$2.5M COP']

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [form, setForm] = useState({ name: '', email: '', company: '', sector: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const hc = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await api.post('/leads', form)
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo enviar el mensaje. Intenta de nuevo o escríbenos directamente.')
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full bg-ink border border-white/15 text-white placeholder-white/30 rounded-md px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/25 transition-all"
  const lbl = "text-white text-sm font-bold block mb-2"

  return (
    <section id="contacto" className="py-28 relative overflow-hidden bg-ink-surface">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="text-lime text-xs font-bold uppercase tracking-[4px] block mb-4 font-mono">Hablemos</span>
          <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Diagnóstico <span className="text-lime">gratuito</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            30 minutos que pueden transformar tu negocio. Sin compromiso, con valor inmediato.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="rounded-lg p-6 bg-ink border-2 border-lime/30 shadow-[0_0_40px_-10px_rgba(200,255,77,0.35)]">
              <h3 className="font-display text-white font-black text-xl mb-5">¿Por qué elegirnos?</h3>
              {[
                'MVP funcional en 4–6 semanas',
                'Precio desde $600K COP',
                'Demos quincenales de avance',
                'Stack moderno: React, Node, Azure',
                'Soporte en español, zona horaria COP',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 mb-3.5">
                  <div className="w-6 h-6 rounded-full bg-lime flex items-center justify-center shrink-0">
                    <CheckCircle size={14} className="text-ink" strokeWidth={3} />
                  </div>
                  <span className="text-white text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg p-5 space-y-3 bg-ink border border-white/15">
              <a href="mailto:FlorezWernher26@gmail.com" className="flex items-center gap-3 text-sm group py-1">
                <div className="w-10 h-10 bg-lime/15 border border-lime/30 rounded-md flex items-center justify-center shrink-0 group-hover:bg-lime transition-colors">
                  <Mail size={16} className="text-lime group-hover:text-ink transition-colors" />
                </div>
                <span className="text-white font-semibold group-hover:text-lime transition-colors">FlorezWernher26@gmail.com</span>
              </a>
              <a href="tel:+573213074133" className="flex items-center gap-3 text-sm group py-1">
                <div className="w-10 h-10 bg-lime/15 border border-lime/30 rounded-md flex items-center justify-center shrink-0 group-hover:bg-lime transition-colors">
                  <Phone size={16} className="text-lime group-hover:text-ink transition-colors" />
                </div>
                <span className="text-white font-semibold group-hover:text-lime transition-colors">+57 321 307 4133</span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-lime/15 border border-lime/30 rounded-md flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-lime" />
                </div>
                <span className="text-white font-semibold">Colombia · LatAm</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="rounded-lg overflow-hidden bg-ink border-2 border-lime/30 shadow-[0_0_60px_-10px_rgba(200,255,77,0.4)]">
              <div className="h-1.5 bg-gradient-to-r from-lime via-lime-dim to-lime" />
              <div className="p-8">
              {sent ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 bg-lime/15 border border-lime/30 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={36} className="text-lime" />
                  </div>
                  <h3 className="font-display text-white font-bold text-2xl mb-2">¡Mensaje enviado!</h3>
                  <p className="text-white/50 text-sm max-w-xs mx-auto">Te contactaremos en menos de 24 horas.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-lime text-sm hover:underline">Enviar otro mensaje</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2.5 bg-error/10 border border-error/30 text-error rounded-md px-4 py-3 text-sm">
                      <AlertCircle size={16} className="shrink-0" />
                      {error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={lbl}>Nombre *</label>
                      <input name="name" value={form.name} onChange={hc} required placeholder="Tu nombre" className={inp} /></div>
                    <div><label className={lbl}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={hc} required placeholder="tu@empresa.com" className={inp} /></div>
                  </div>
                  <div><label className={lbl}>Empresa</label>
                    <input name="company" value={form.company} onChange={hc} placeholder="Nombre de tu empresa" className={inp} /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={lbl}>Sector</label>
                      <select name="sector" value={form.sector} onChange={hc} className={inp}>
                        <option value="">Selecciona...</option>
                        {sectors.map(s => <option key={s}>{s}</option>)}
                      </select></div>
                    <div><label className={lbl}>Presupuesto</label>
                      <select name="budget" value={form.budget} onChange={hc} className={inp}>
                        <option value="">Selecciona...</option>
                        {budgets.map(b => <option key={b}>{b}</option>)}
                      </select></div>
                  </div>
                  <div><label className={lbl}>¿Cuál es tu reto? *</label>
                    <textarea name="message" value={form.message} onChange={hc} required rows={4}
                      placeholder="¿Qué proceso quieres digitalizar o mejorar?"
                      className={inp + ' resize-none'} /></div>
                  <TextureButton type="submit" variant="lime" disabled={loading} className="!py-4 text-base">
                    {loading ? <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                      : <><Send size={18} /> Agendar diagnóstico gratuito</>}
                  </TextureButton>
                  <p className="text-center text-white/30 text-xs">Primera consultoría gratuita. Respondemos en menos de 24 horas.</p>
                </form>
              )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
