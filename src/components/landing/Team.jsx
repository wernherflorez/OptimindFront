import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin } from 'lucide-react'

const team = [
  {
    name: 'Kevin Gonzalez',
    role: 'Analista & Desarrollador TI',
    specialty: 'React · Angular · Power BI · SQL · Python',
    bio: 'Ing. de Sistemas (9° sem.) con enfoque en análisis de datos e inteligencia de negocio. Experiencia en dashboards Power BI, validación de información, requerimientos y automatización de análisis.',
    photo: '/team/kevin.jpg',
    linkedin: 'https://www.linkedin.com/in/kevin-gonzalez-betancourt-649a50173/',
    initials: 'KG',
    gradient: 'from-violet-600 to-violet-400',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
    name: 'Marlong Mendoza',
    role: 'Desarrollador de Sistemas',
    specialty: 'React · Angular · Node.js · Python · Java · Odoo',
    bio: 'Desarrollador web con experiencia en el ciclo completo de proyectos: desde la toma de requerimientos hasta la entrega. Ha construido soluciones para empresas y programas de gobierno.',
    photo: '/team/marlong.jpg',
    linkedin: 'https://www.linkedin.com/in/marlong-mendoza/',
    initials: 'MM',
    gradient: 'from-cyan-600 to-cyan-400',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    name: 'Brayan Torres',
    role: 'QA Analyst | Analista Funcional',
    specialty: 'Testing · Postman · SQL · Selenium · Playwright',
    bio: 'QA Analyst con experiencia en pruebas manuales, validación de APIs (Postman/SOAP), consultas SQL y documentación funcional. Garantiza la calidad integral del software.',
    photo: '/team/brayan.jpg',
    linkedin: 'https://www.linkedin.com/in/brayan-torres01/',
    initials: 'BT',
    gradient: 'from-violet-500 to-cyan-500',
    glow: 'rgba(139,92,246,0.35)',
  },
  {
    name: 'Wernher Florez',
    role: 'Data Analyst & Software Developer',
    specialty: 'SQL Server · .NET · React · Node.js · Python',
    bio: 'Ing. de Sistemas con +2 años en entornos fintech y corporativos. Desarrolla aplicaciones full-stack, automatiza procesos con .NET y optimiza bases de datos SQL Server.',
    photo: '/team/wernher.jpg',
    linkedin: 'https://www.linkedin.com/in/wernher-florez-66644718a/',
    initials: 'WF',
    gradient: 'from-emerald-500 to-cyan-500',
    glow: 'rgba(16,185,129,0.35)',
  },
]

function MemberCard({ member, index, inView }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative glass-card rounded-2xl overflow-hidden flex flex-col"
      style={{ '--glow': member.glow }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 50px ${member.glow}` }}
      />

      {/* Photo */}
      <div className="relative h-56 overflow-hidden shrink-0">
        {!imgFailed ? (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
            <span className="text-white text-5xl font-black opacity-80">{member.initials}</span>
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0D1220] to-transparent" />

        {/* LinkedIn badge */}
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="absolute top-3 right-3 w-9 h-9 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 hover:bg-violet-500/80 hover:border-violet-400"
        >
          <Linkedin size={15} className="text-white" />
        </a>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 relative z-10">
        <h3 className="text-white font-bold text-base leading-tight">{member.name}</h3>
        <div
          className="text-sm font-semibold mt-0.5 mb-1 bg-gradient-to-r bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(to right, ${member.glow.replace('0.4', '1').replace('0.35', '1')}, #22d3ee)` }}
        >
          {member.role}
        </div>
        <div className="text-slate-500 text-xs mb-3 leading-relaxed">{member.specialty}</div>
        <p className="text-slate-400 text-xs leading-relaxed flex-1">{member.bio}</p>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold mt-4 transition-colors"
        >
          <Linkedin size={13} />
          Ver perfil LinkedIn
        </a>
      </div>
    </motion.div>
  )
}

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="equipo" className="py-28 relative overflow-hidden" style={{ background: '#070B16' }}>
      <div className="absolute inset-0 bg-grid-sm pointer-events-none opacity-60" />
      {/* Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-700/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 text-xs font-bold uppercase tracking-[4px] block mb-4">
            Conoce al equipo
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Las mentes detrás de{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              OptiMind
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ingenieros apasionados por la tecnología, comprometidos con entregar
            software que genera resultados tangibles para tu negocio.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
