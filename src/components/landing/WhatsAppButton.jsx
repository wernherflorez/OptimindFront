import { motion } from 'framer-motion'

const PHONE = '573213074133'
const MESSAGE = 'Hola, vengo de la página web de OptiMind Solutions y quiero más información.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.6, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-lime hover:bg-lime-dim rounded-full flex items-center justify-center shadow-2xl shadow-lime/30 transition-all"
      aria-label="Chatear por WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#0A0A0B" aria-hidden="true">
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.43 1.27 4.88L2 22l5.25-1.38A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm5.84 14.12c-.25.7-1.45 1.35-2 1.43-.51.08-1.16.11-1.87-.12-.43-.13-.98-.31-1.68-.6-2.96-1.28-4.9-4.24-5.04-4.44-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39.002.56.01.18.008.42-.07.66.5.25.6.84 2.07.92 2.22.08.15.13.32.03.51-.1.19-.15.31-.3.48-.15.17-.31.38-.45.51-.15.14-.3.29-.13.58.17.29.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.46.3.14.48.12.66-.07.18-.19.77-.9.97-1.21.2-.31.4-.26.67-.16.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.71-.18 1.41Z" />
      </svg>
    </motion.a>
  )
}
