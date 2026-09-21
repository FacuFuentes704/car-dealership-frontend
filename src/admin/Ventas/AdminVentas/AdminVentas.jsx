import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import { TRADUCCIONES_PAYMENT_METHOD } from '../../traducciones'
import './AdminVentas.css'

function AdminVentas() {
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [busquedaDebounced, setBusquedaDebounced] = useState("")
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBusquedaDebounced(busqueda)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [busqueda])

  useEffect(() => {
    let url = `${API_URL}/sales/?`
    if (busquedaDebounced) url += `search=${busquedaDebounced}&`
    if (fechaDesde) url += `fecha_desde=${fechaDesde}&`
    if (fechaHasta) url += `fecha_hasta=${fechaHasta}&`

    fetchConToken(url)
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "Error al traer las ventas")
          })
        }
        return res.json()
      })
      .then(datos => {
        setVentas(datos)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [busquedaDebounced, fechaDesde, fechaHasta])

  if (error) return <p>{error}</p>

  return (
    <div className="admin-ventas">
      <div className="admin-header">
        <h1>Ventas</h1>
        <Link to="/admin/ventas/nueva" className="boton-crear">
          + Nueva venta
        </Link>
      </div>

      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Buscar por cliente o vehículo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        <div className="filtro-fechas">
          <label>
            Desde
            <input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
          </label>
          <label>
            Hasta
            <input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
          </label>
        </div>
      </div>

      {cargando ? (
        <p>Cargando ventas...</p>
      ) : ventas.length === 0 ? (
        <p className="sin-resultados">No se encontraron ventas.</p>
      ) : (
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Precio</th>
              <th>Método de pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id}>
                <td>{new Date(v.sale_date || v.created_at).toLocaleDateString('es-AR')}</td>
                <td>{v.vehicle.brand} {v.vehicle.model}</td>
                <td>{v.client.name}</td>
                <td>${Number(v.sale_price).toLocaleString('es-AR')}</td>
                <td>{TRADUCCIONES_PAYMENT_METHOD[v.payment_method]}</td>
                <td>
                  <Link to={`/admin/ventas/${v.id}/ver`}>Ver</Link>
                  <Link to={`/admin/ventas/${v.id}/editar`}>Editar</Link>
                  <Link to={`/admin/ventas/${v.id}/boleto`}>Boleto</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminVentas