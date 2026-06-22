import { useState, useEffect, useCallback } from 'react'
import api from '../../services/api'

export function useDashboard() {
  const [projects, setProjects] = useState([])
  const [tasks,    setTasks]    = useState([])
  const [clients,  setClients]  = useState([])
  const [leads,    setLeads]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const [pRes, tRes, cRes, lRes] = await Promise.all([
        api.get('/projects'),
        api.get('/tasks'),
        api.get('/clients'),
        api.get('/leads'),
      ])
      setProjects(pRes.data)
      setTasks(tRes.data)
      setClients(cRes.data)
      setLeads(lRes.data)
    } catch {
      setError('Error cargando datos. Verifica que la API esté corriendo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  // ─── Projects ──────────────────────────────────────────────────────────
  const addProject = useCallback(async (data) => {
    const res = await api.post('/projects', data)
    setProjects(prev => [res.data, ...prev])
    return res.data
  }, [])

  const updateProject = useCallback(async (id, data) => {
    const res = await api.put(`/projects/${id}`, data)
    setProjects(prev => prev.map(p => p.id === id ? res.data : p))
    return res.data
  }, [])

  const deleteProject = useCallback(async (id) => {
    await api.delete(`/projects/${id}`)
    setProjects(prev => prev.filter(p => p.id !== id))
  }, [])

  // ─── Tasks ─────────────────────────────────────────────────────────────
  const addTask = useCallback(async (data) => {
    const res = await api.post('/tasks', data)
    setTasks(prev => [res.data, ...prev])
    return res.data
  }, [])

  const updateTask = useCallback(async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data)
    setTasks(prev => prev.map(t => t.id === id ? res.data : t))
    return res.data
  }, [])

  const deleteTask = useCallback(async (id) => {
    await api.delete(`/tasks/${id}`)
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  // ─── Clients ───────────────────────────────────────────────────────────
  const addClient = useCallback(async (data) => {
    const res = await api.post('/clients', data)
    setClients(prev => [res.data, ...prev])
    return res.data
  }, [])

  const updateClient = useCallback(async (id, data) => {
    const res = await api.put(`/clients/${id}`, data)
    setClients(prev => prev.map(c => c.id === id ? res.data : c))
    return res.data
  }, [])

  const deleteClient = useCallback(async (id) => {
    await api.delete(`/clients/${id}`)
    setClients(prev => prev.filter(c => c.id !== id))
  }, [])

  // ─── Leads ─────────────────────────────────────────────────────────────
  const updateLead = useCallback(async (id, data) => {
    const res = await api.put(`/leads/${id}`, data)
    setLeads(prev => prev.map(l => l.id === id ? res.data : l))
    return res.data
  }, [])

  const deleteLead = useCallback(async (id) => {
    await api.delete(`/leads/${id}`)
    setLeads(prev => prev.filter(l => l.id !== id))
  }, [])

  // ─── Derived stats ─────────────────────────────────────────────────────
  const stats = {
    totalRevenue:   clients.reduce((s, c) => s + (c.value || 0), 0),
    activeProjects: projects.filter(p => ['En progreso', 'Revisión'].includes(p.status)).length,
    pendingTasks:   tasks.filter(t => ['Backlog', 'Por Hacer', 'En Progreso'].includes(t.status)).length,
    activeClients:  clients.filter(c => c.status === 'Activo').length,
  }

  return {
    projects, tasks, clients, leads, stats, loading, error, fetchAll,
    addProject, updateProject, deleteProject,
    addTask,    updateTask,    deleteTask,
    addClient,  updateClient,  deleteClient,
    updateLead, deleteLead,
  }
}
