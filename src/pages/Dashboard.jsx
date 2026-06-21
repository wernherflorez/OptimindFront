import { Routes, Route } from 'react-router-dom'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import TopNav   from '../components/dashboard/TopNav'
import Overview from '../components/dashboard/Overview'
import Projects from '../components/dashboard/Projects'
import Board    from '../components/dashboard/Board'
import Clients  from '../components/dashboard/Clients'
import Users    from '../components/dashboard/Users'
import { useDashboard } from '../components/dashboard/useDashboard'
import { useAuth } from '../context/AuthContext'

function LoadingScreen() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm font-mono">Cargando datos...</p>
      </div>
    </div>
  )
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] p-6">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 bg-error/10 border border-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={28} className="text-error" />
        </div>
        <h3 className="font-display text-white font-bold text-lg mb-2">Error de conexión</h3>
        <p className="text-white/40 text-sm mb-5">{message}</p>
        <button onClick={onRetry}
          className="flex items-center gap-2 bg-lime text-ink px-6 py-2.5 rounded-md text-sm font-bold mx-auto transition-all hover:bg-lime-dim">
          <RefreshCw size={15} /> Reintentar
        </button>
        <p className="text-white/30 text-xs mt-4 font-mono">
          Asegúrate de que el API esté corriendo en<br />
          <code className="text-lime">http://localhost:3001</code>
        </p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { isAdmin } = useAuth()
  const db = useDashboard()

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <TopNav />

      <main className="flex-1 w-full">
        {db.loading ? (
          <LoadingScreen />
        ) : db.error ? (
          <ErrorScreen message={db.error} onRetry={db.fetchAll} />
        ) : (
          <div className="max-w-screen-xl mx-auto px-6 py-8">
            <Routes>
              <Route index element={<Overview data={db} />} />
              <Route path="proyectos" element={
                <Projects projects={db.projects}
                  addProject={db.addProject} updateProject={db.updateProject} deleteProject={db.deleteProject} />
              } />
              <Route path="board" element={<Board />} />
              <Route path="clientes" element={
                <Clients clients={db.clients}
                  addClient={db.addClient} updateClient={db.updateClient} deleteClient={db.deleteClient} />
              } />
              {isAdmin && <Route path="usuarios" element={<Users />} />}
            </Routes>
          </div>
        )}
      </main>
    </div>
  )
}
