import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import { TRADUCCIONES_STATUS_VEHICULO } from '../../traducciones'
import './AdminVehiculos.css'

function AdminVehiculos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFiltro = searchParams.get("status") || ""

  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [soloActivos, setSoloActivos] = useState(false)

  useEffect(() => {
    let url = `${API_URL}/vehicles/admin?only_active=${soloActivos}`
    if (statusFiltro) url += `&status=${statusFiltro}`
    if (busqueda) url += `&search=${busqueda}`

    fetchConToken(url)
      .then(res => {
        if (!res.ok) throw new Error("Error al traer los vehículos")
        return res.json()
      })
      .then(datos => {
        setVehiculos(datos)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [statusFiltro, busqueda, soloActivos])

  function darDeBaja(id) {
    fetchConToken(`${API_URL}/vehicles/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("No se pudo dar de baja")
        setVehiculos(vehiculos.map((v) =>
          v.id === id ? { ...v, is_active: false } : v
        ))
      })
      .catch(err => alert(err.message))
  }

  function cambiarStatus(nuevoStatus) {
    if (nuevoStatus) {
      setSearchParams({ status: nuevoStatus })
    } else {
      setSearchParams({})
    }
  }

  if (cargando) return <p>Cargando vehículos...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="admin-vehiculos">
      <div className="admin-header">
        <h1>Vehículos</h1>
        <Link to="/admin/vehiculos/nuevo" className="boton-crear">
          + Nuevo vehículo
        </Link>
      </div>

      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />

        <select value={statusFiltro} onChange={(e) => cambiarStatus(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="available">Disponible</option>
          <option value="reserved">Reservado</option>
          <option value="sold">Vendido</option>
        </select>

        <label className="filtro-checkbox">
          <input
            type="checkbox"
            checked={soloActivos}
            onChange={(e) => setSoloActivos(e.target.checked)}
          />
          Solo activos
        </label>
      </div>

      {vehiculos.length === 0 ? (
        <p className="sin-resultados">No se encontraron vehículos.</p>
      ) : (
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Precio</th>
              <th>Status</th>
              <th>Activo</th>
              <th>Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((v) => (
              <tr key={v.id} className={!v.is_active ? "fila-inactiva" : ""}>
                <td>{v.brand}</td>
                <td>{v.model}</td>
                <td>{v.year}</td>
                <td>${Number(v.price).toLocaleString('es-AR')}</td>
                <td>
                  <span className={`badge badge-${v.status}`}>{TRADUCCIONES_STATUS_VEHICULO[v.status]}</span>
                </td>
                <td>{v.is_active ? "Sí" : "No"}</td>
                <td>{new Date(v.created_at).toLocaleDateString('es-AR')}</td>
                <td>
                  <Link to={`/admin/vehiculos/${v.id}/ver`}>Ver</Link>
                  <Link to={`/admin/vehiculos/${v.id}/editar`}>Editar</Link>
                  <Link to={`/admin/vehiculos/${v.id}/intereses`}>Intereses</Link>
                  {v.is_active && (
                    <button onClick={() => darDeBaja(v.id)} className="boton-baja">
                      Dar de baja
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminVehiculos