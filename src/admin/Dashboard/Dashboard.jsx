import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../config'
import './Dashboard.css'
import { fetchConToken } from '../../utils/fetchConToken'

function Dashboard() {
  const [vehiculosStats, setVehiculosStats] = useState(null)
  const [clientesStats, setClientesStats] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

 useEffect(() => {
    Promise.all([
      fetchConToken(`${API_URL}/vehicles/dashboard`).then(res => res.json()),
      fetchConToken(`${API_URL}/clients/dashboard`).then(res => res.json())
    ])
      .then(([vehiculosData, clientesData]) => {
        setVehiculosStats(vehiculosData)
        setClientesStats(clientesData)
        setCargando(false)
      })
      .catch(() => {
        setError("No se pudieron cargar las estadísticas")
        setCargando(false)
      })
  }, [])

  if (cargando) return <p>Cargando estadísticas...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-seccion">
        <h2>Vehículos</h2>
        <div className="stats-grid">
          <Link to="/admin/vehiculos?status=available" className="stat-card stat-disponible">
            <span className="stat-numero">{vehiculosStats?.disponibles ?? 0}</span>
            <span className="stat-label">Disponibles</span>
          </Link>
          <Link to="/admin/vehiculos?status=reserved" className="stat-card stat-reservado">
            <span className="stat-numero">{vehiculosStats?.reservados ?? 0}</span>
            <span className="stat-label">Reservados</span>
          </Link>
          <div className="stat-card stat-vendido">
            <span className="stat-numero">{vehiculosStats?.vendidos_mes ?? 0}</span>
            <span className="stat-label">Vendidos este mes</span>
          </div>
        </div>
      </div>

      <div className="dashboard-seccion">
        <h2>Clientes</h2>
        <div className="stats-grid">
          <Link to="/admin/clientes?status=negotiating" className="stat-card">
            <span className="stat-numero">{clientesStats?.negotiating ?? 0}</span>
            <span className="stat-label">Negociando</span>
          </Link>
          <Link to="/admin/clientes?status=closed" className="stat-card stat-disponible">
            <span className="stat-numero">{clientesStats?.closed ?? 0}</span>
            <span className="stat-label">Cerrados</span>
          </Link>
          <Link to="/admin/clientes?status=waiting" className="stat-card">
            <span className="stat-numero">{clientesStats?.waiting ?? 0}</span>
            <span className="stat-label">Esperando</span>
          </Link>
          <Link to="/admin/clientes?status=lost" className="stat-card stat-vendido">
            <span className="stat-numero">{clientesStats?.lost ?? 0}</span>
            <span className="stat-label">Perdidos</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard