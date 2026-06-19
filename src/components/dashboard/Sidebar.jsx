import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, LayoutGrid, Users, X, Menu, LogOut, Globe, ChevronDown, UserCog } from 'lucide-react'
import LogoBadge from '../LogoBadge'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

function NavItem({ to, label, icon: Icon, end, onClick }) {
  return (
    <NavLink
      to={to} end={end} onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/25'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  )
}

function SidebarContent({ onClose }) {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5" style={{ borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
        <LogoBadge size="sm" dark text spin={false} />
        <div className="text-slate-600 text-xs mt-2 ml-0.5">Panel de control</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-slate-700 text-[10px] font-bold uppercase tracking-widest px-4 py-2">Principal</p>
        <NavItem to="/dashboard"           label="Overview"   icon={LayoutDashboard} end onClick={onClose} />
        <NavItem to="/dashboard/proyectos" label="Proyectos"  icon={FolderKanban}    onClick={onClose} />
        <NavItem to="/dashboard/board"     label="Board"      icon={LayoutGrid}      onClick={onClose} />

        <p className="text-slate-700 text-[10px] font-bold uppercase tracking-widest px-4 py-2 mt-3">Gestión</p>
        <NavItem to="/dashboard/clientes"  label="Clientes"   icon={Users}           onClick={onClose} />
        {isAdmin && (
          <NavItem to="/dashboard/usuarios" label="Usuarios"  icon={UserCog}         onClick={onClose} />
        )}
      </nav>

      {/* Bottom */}
      <div className="p-3 space-y-0.5" style={{ borderTop: '1px solid rgba(139,92,246,0.15)' }}>
        <NavLink to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all">
          <Globe size={16} />
          Ver landing
        </NavLink>

        {/* User card */}
        <button
          onClick={() => setShowProfile(p => !p)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all mt-1"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-violet-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
            <span className="text-white text-xs font-bold">
              {user?.full_name?.[0] || '?'}
            </span>
          </div>
          <div className="flex-1 text-left overflow-hidden">
            <div className="text-white text-xs font-semibold truncate">{user?.full_name}</div>
            <div className="text-slate-600 text-xs capitalize">{user?.role}</div>
          </div>
          <ChevronDown size={13} className={`text-slate-600 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={15} />
                Cerrar sesión
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex w-60 flex-col shrink-0 h-screen sticky top-0"
        style={{ background: '#0A0F1C', borderRight: '1px solid rgba(139,92,246,0.12)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 backdrop-blur rounded-xl flex items-center justify-center text-white shadow-lg"
        style={{ background: '#0A0F1C', border: '1px solid rgba(139,92,246,0.2)' }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={19} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/70 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50"
              style={{ background: '#0A0F1C', borderRight: '1px solid rgba(139,92,246,0.2)' }}
            >
              <button className="absolute top-4 right-4 text-slate-500 hover:text-white" onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
