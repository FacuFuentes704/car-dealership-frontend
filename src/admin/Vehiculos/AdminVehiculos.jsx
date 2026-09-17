import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { API_URL } from '../../config'
import './AdminVehiculos.css'
import { fetchConToken } from '../../utils/fetchConToken'

function AdminVehiculos() {
  const [searchParams] = useSearchParams()
  const statusFiltro = searchParams.get("status")

  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let url = `${API_URL}/vehicles/admin?only_active=false`
    if (statusFiltro) url += `&status=${statusFiltro}`

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
  }, [statusFiltro])

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

      <table className="tabla-admin">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Status</th>
            <th>Activo</th>
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
                <span className={`badge badge-${v.status}`}>{v.status}</span>
              </td>
              <td>{v.is_active ? "Sí" : "No"}</td>
              <td>
                <Link to={`/admin/vehiculos/${v.id}/editar`}>Editar</Link>
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
    </div>
  )
}

export default AdminVehiculos