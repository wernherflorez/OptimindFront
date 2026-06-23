import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import api from '../../services/api'

const BOT = 'bot'
const USR = 'user'

const initialMessages = [
  {
    from: BOT,
    text: '¡Hola! 👋 Soy el asistente de **OptiMind Solutions**. ¿En qué puedo ayudarte hoy?',
    time: new Date(),
  },
]

const quickReplies = [
  '¿Qué servicios ofrecen?',
  '¿Cuánto cuesta un proyecto?',
  '¿Cuánto tiempo tarda el MVP?',
  '¿Cómo agendo una consulta?',
]

const FALLBACK_REPLY = 'No pude conectarme en este momento. Escríbenos por el formulario de contacto o por WhatsApp y te respondemos enseguida.'

function renderText(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g)
    return (
      <span key={i}>
        {parts.map((p, j) =>
          j % 2 === 1 ? <strong key={j}>{p}</strong> : <span key={j}>{p}</span>
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    )
  })
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [messages, open])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')

    setMessages(prev => [...prev, { from: USR, text: msg, time: new Date() }])
    setTyping(true)

    try {
      const { data } = await api.post('/chat', { message: msg })
      setMessages(prev => [...prev, { from: BOT, text: data.reply, time: new Date() }])
    } catch {
      setMessages(prev => [...prev, { from: BOT, text: FALLBACK_REPLY, time: new Date() }])
    } finally {
      setTyping(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-lime hover:bg-lime-dim rounded-full flex items-center justify-center shadow-2xl shadow-lime/30 transition-all"
        aria-label="Abrir chat"
      >
        <AnimatePresence mode="wait">
          {open ? null : (
            <motion.div
              key="icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <MessageCircle size={24} className="text-ink" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-ink animate-pulse" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-lg overflow-hidden border border-ink-border"
            style={{ height: 520, background: '#131315' }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 bg-ink-surface2 border-b border-ink-border">
              <div className="w-10 h-10 bg-lime rounded-full flex items-center justify-center shrink-0">
                <Bot size={20} className="text-ink" />
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-sm font-display">Asistente OptiMind</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-white/50 text-xs font-mono">En línea</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-ink">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.from === USR ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.from === BOT ? 'bg-lime' : 'bg-white/10'}`}>
                    {m.from === BOT ? <Bot size={14} className="text-ink" /> : <User size={14} className="text-white" />}
                  </div>
                  <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.from === BOT
                      ? 'text-white/70 rounded-tl-none bg-ink-surface2 border border-ink-border'
                      : 'bg-lime text-ink font-medium rounded-tr-none'
                  }`}
                  >
                    {renderText(m.text)}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-lime flex items-center justify-center">
                    <Bot size={14} className="text-ink" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-ink-surface2 border border-ink-border">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 bg-lime rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-ink-surface2 border-t border-ink-border">
                {quickReplies.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="shrink-0 text-xs border border-lime/30 text-lime hover:bg-lime/15 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 flex gap-2 bg-ink-surface2 border-t border-ink-border">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta..."
                className="flex-1 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none transition-all bg-ink border border-ink-border focus:border-lime"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="w-10 h-10 bg-lime hover:bg-lime-dim disabled:opacity-40 text-ink rounded-md flex items-center justify-center transition-all"
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
