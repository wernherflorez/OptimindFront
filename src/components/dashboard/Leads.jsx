import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Mail, Inbox, Calendar } from 'lucide-react'

const statusOptions = ['Nuevo', 'Contactado', 'Descartado']

const statusColors = {
  Nuevo:      'bg-lime/15 text-lime border border-lime/25',
  Contactado: 'bg-info/15 text-info border border-info/25',
  Descartado: 'bg-white/10 text-white/40 border border-white/15',
}

export default function Leads({ leads, updateLead, deleteLead }) {
  const [filter, setFilter] = useState('Todos')

  const filtered = filter === 'Todos' ? leads : leads.filter(l => l.status === filter)

  const fmtDate = iso => new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-display">Diagnósticos</h1>
        <p className="text-white/40 text-sm mt-0.5">{leads.length} solicitudes recibidas desde el formulario del landing</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['Todos', ...statusOptions].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === s
                ? 'bg-gradient-to-r from-lime-dim to-lime text-ink'
                : 'bg-white/[0.04] border border-white/[0.08] text-white/50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="rounded-lg overflow-hidden border border-ink-border">
        <AnimatePresence>
          {filtered.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-5 border-b border-ink-border last:border-0 hover:bg-ink-surface2/40 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white font-semibold text-sm">{l.name}</span>
                    {l.company && <span className="text-white/30 text-xs">· {l.company}</span>}
                    {!l.seen && <span className="w-1.5 h-1.5 rounded-full bg-lime" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40 mb-2 flex-wrap">
                    <a href={`mailto:${l.email}`} className="flex items-center gap-1 hover:text-lime transition-colors">
                      <Mail size={11} /> {l.email}
                    </a>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {fmtDate(l.created_at)}
                    </span>
                    {l.sector && <span className="font-mono">{l.sector}</span>}
                    {l.budget && <span className="font-mono">{l.budget}</span>}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{l.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={l.status}
                    onChange={e => updateLead(l.id, { status: e.target.value })}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[l.status] || statusColors.Nuevo}`}
                  >
                    {statusOptions.map(s => <option key={s} value={s} className="bg-ink-surface text-white">{s}</option>)}
                  </select>
                  <button onClick={() => deleteLead(l.id)}
                    className="p-2 rounded-md text-white/30 hover:text-error hover:bg-error/10 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Inbox size={32} className="text-white/15 mx-auto mb-3" />
            <p className="text-white/30 text-sm">
              {filter !== 'Todos' ? `Sin diagnósticos con estado "${filter}"` : 'Sin solicitudes todavía'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
