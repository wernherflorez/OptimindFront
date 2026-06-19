import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, LayoutGrid, Users,
  Globe, LogOut, ChevronDown, Bell, UserCog, Menu, X
} from 'lucide-react'
import LogoBadge from '../LogoBadge'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/dashboard',           label: 'Overview',   icon: LayoutDashboard, end: true },
  { to: '/dashboard/proyectos', label: 'Proyectos',  icon: FolderKanban },
  { to: '/dashboard/board',     label: 'Board',      icon: LayoutGrid },
  { to: '/dashboard/clientes',  label: 'Clientes',   icon: Users },
]

export default function TopNav() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [dropOpen, setDropOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (!dropRef.current?.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const links = isAdmin ? [...NAV, { to: '/dashboard/usuarios', label: 'Usuarios', icon: UserCog }] : NAV

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full"
        style={{ background: 'rgba(10,15,28,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.12)' }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center gap-6">

          {/* Logo */}
          <div className="shrink-0 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <LogoBadge size="sm" dark text spin={false} />
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 hidden md:block" />

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-500/15 text-violet-300 border border-violet-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Ver landing */}
            <NavLink to="/" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <Globe size={13} /> Landing
            </NavLink>

            {/* Notification bell */}
            <button className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all relative">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
            </button>

            {/* User dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen(p => !p)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-violet-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
                  <span className="text-white text-xs font-bold">{user?.full_name?.[0] || '?'}</span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-white text-xs font-semibold leading-none">{user?.full_name}</div>
                  <div className="text-slate-600 text-xs capitalize mt-0.5">{user?.role}</div>
                </div>
                <ChevronDown size={12} className={`text-slate-500 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 rounded-2xl py-2 z-50"
                    style={{ background: '#0D1220', border: '1px solid rgba(139,92,246,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
                  >
                    <div className="px-4 py-2 mb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-white text-sm font-semibold">{user?.full_name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{user?.email}</p>
                    </div>
                    <NavLink to="/" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                      <Globe size={14} /> Ver landing
                    </NavLink>
                    <button
                      onClick={() => { logout(); navigate('/login') }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(p => !p)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden px-4 pb-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex flex-col gap-1 pt-2">
                {links.map(({ to, label, icon: Icon, end }) => (
                  <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'bg-violet-500/15 text-violet-300' : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon size={15} /> {label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
