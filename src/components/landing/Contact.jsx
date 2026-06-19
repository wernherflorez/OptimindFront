import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const sectors = ['Retail', 'Fintech', 'Logística', 'Salud', 'Otro']
const budgets = ['$600K – $1M COP', '$1M – $1.5M COP', '$1.5M – $2M COP', '$2M – $2.5M COP', '+$2.5M COP']

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [form, setForm] = useState({ name: '', email: '', company: '', sector: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const hc = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setSent(true)
  }

  const inp = "w-full bg-white/5 border border-white/8 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all"

  return (
    <section id="contacto" className="py-28 relative overflow-hidden" style={{ background: '#080C18' }}>
      <div className="absolute inset-0 bg-grid-sm pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-700/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="text-violet-400 text-xs font-bold uppercase tracking-[4px] block mb-4">Hablemos</span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Diagnóstico{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              gratuito
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
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
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5">¿Por qué elegirnos?</h3>
              {[
                'MVP funcional en 4–6 semanas',
                'Precio desde $600K COP',
                'Demos quincenales de avance',
                'Stack moderno: React, Node, Azure',
                'Soporte en español, zona horaria COP',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  </div>
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-5 space-y-4">
              {[
                { icon: Mail,   text: 'FlorezWernher26@gmail.com' },
                { icon: Phone,  text: '+57 321 307 4133' },
                { icon: MapPin, text: 'Colombia · LatAm' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="w-8 h-8 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-violet-400" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8">
              {sent ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 bg-violet-500/20 border border-violet-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={36} className="text-violet-400" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-2">¡Mensaje enviado!</h3>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">Te contactaremos en menos de 24 horas.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-violet-400 text-sm hover:underline">Enviar otro mensaje</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="text-slate-400 text-xs font-medium block mb-1.5">Nombre *</label>
                      <input name="name" value={form.name} onChange={hc} required placeholder="Tu nombre" className={inp} /></div>
                    <div><label className="text-slate-400 text-xs font-medium block mb-1.5">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={hc} required placeholder="tu@empresa.com" className={inp} /></div>
                  </div>
                  <div><label className="text-slate-400 text-xs font-medium block mb-1.5">Empresa</label>
                    <input name="company" value={form.company} onChange={hc} placeholder="Nombre de tu empresa" className={inp} /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="text-slate-400 text-xs font-medium block mb-1.5">Sector</label>
                      <select name="sector" value={form.sector} onChange={hc} className={inp + ' bg-[#0D1220]'}>
                        <option value="">Selecciona...</option>
                        {sectors.map(s => <option key={s}>{s}</option>)}
                      </select></div>
                    <div><label className="text-slate-400 text-xs font-medium block mb-1.5">Presupuesto</label>
                      <select name="budget" value={form.budget} onChange={hc} className={inp + ' bg-[#0D1220]'}>
                        <option value="">Selecciona...</option>
                        {budgets.map(b => <option key={b}>{b}</option>)}
                      </select></div>
                  </div>
                  <div><label className="text-slate-400 text-xs font-medium block mb-1.5">¿Cuál es tu reto? *</label>
                    <textarea name="message" value={form.message} onChange={hc} required rows={4}
                      placeholder="¿Qué proceso quieres digitalizar o mejorar?"
                      className={inp + ' resize-none'} /></div>
                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(124,58,237,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 transition-all disabled:opacity-60">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <><Send size={17} /> Agendar diagnóstico gratuito</>}
                  </motion.button>
                  <p className="text-center text-slate-600 text-xs">Primera consultoría gratuita. Respondemos en menos de 24 horas.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
