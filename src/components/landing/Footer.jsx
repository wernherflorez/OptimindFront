import { Github, Linkedin, Mail } from 'lucide-react'
import LogoBadge from '../LogoBadge'

export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-ink-border bg-ink">

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5"><LogoBadge size="md" dark text spin={false} /></div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-4">
              Transformamos Pymes latinoamericanas con soluciones digitales a la medida.
              MVP en 4–6 semanas, resultados medibles.
            </p>
            <p className="text-lime/70 text-sm italic font-mono">"Pensar diferente nunca fue tan Optimind"</p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Github,   href: 'https://github.com/optimindsolutionss-bit/Optimind_OptiShop.git' },
                { icon: Mail,     href: 'mailto:FlorezWernher26@gmail.com' },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 surface-card rounded-md flex items-center justify-center text-white/40 hover:text-lime hover:border-lime/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-display">Servicios</h4>
            <ul className="space-y-1">
              {['Plataformas Web', 'Automatización', 'Business Intelligence', 'Pasarelas PSE', 'Soporte'].map(item => (
                <li key={item}>
                  <button onClick={() => scrollTo('#servicios')}
                    className="text-white/40 hover:text-lime text-sm transition-colors text-left py-1.5 block">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-display">Contacto</h4>
            <ul className="space-y-1">
              <li><a href="mailto:FlorezWernher26@gmail.com" className="text-white/40 hover:text-lime text-sm transition-colors py-1.5 block">FlorezWernher26@gmail.com</a></li>
              <li><a href="tel:+573213074133" className="text-white/40 hover:text-lime text-sm transition-colors py-1.5 block">+57 321 307 4133</a></li>
              <li><span className="text-white/40 text-sm py-1.5 block">Colombia · LatAm</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs font-mono">© {year} OptiMind Solutions. Todos los derechos reservados.</p>
          <p className="text-white/30 text-xs font-mono">Hecho en Colombia</p>
        </div>
      </div>
    </footer>
  )
}
