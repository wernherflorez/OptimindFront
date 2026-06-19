import { Github, Linkedin, Mail } from 'lucide-react'
import LogoBadge from '../LogoBadge'

export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5" style={{ background: '#060A14' }}>
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5"><LogoBadge size="md" dark text spin={false} /></div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-4">
              Transformamos Pymes latinoamericanas con soluciones digitales a la medida.
              MVP en 4–6 semanas, resultados medibles.
            </p>
            <p className="text-violet-400/60 text-sm italic">"Pensar diferente nunca fue tan Optimind"</p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Github,   href: 'https://github.com/optimindsolutionss-bit/Optimind_OptiShop.git' },
                { icon: Mail,     href: 'mailto:FlorezWernher26@gmail.com' },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 glass-card rounded-xl flex items-center justify-center text-slate-500 hover:text-violet-400 hover:border-violet-500/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Servicios', items: ['Plataformas Web', 'Automatización', 'Business Intelligence', 'Pasarelas PSE', 'Soporte'] },
            { title: 'Contacto',  items: ['FlorezWernher26@gmail.com', '+57 321 307 4133', 'Colombia · LatAm'] },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <button onClick={() => scrollTo('#servicios')}
                      className="text-slate-500 hover:text-violet-400 text-sm transition-colors text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-xs">© {year} OptiMind Solutions. Todos los derechos reservados.</p>
          <p className="text-slate-600 text-xs">Hecho con ☕ en Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  )
}
