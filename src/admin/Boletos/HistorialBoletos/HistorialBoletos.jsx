import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'

function HistorialBoletos() {
  const [boletos, setBoletos] = useState([])
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
            throw new Error(data.detail || "Error al traer los boletos")
          })
        }
        return res.json()
      })
      .then(datos => {
        setBoletos(datos.filter((v) => v.boleto_generado === true))
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [busquedaDebounced, fechaDesde, fechaHasta])

  if (error) return <p>{error}</p>

  return (
    <div className="historial-boletos">
      <div className="admin-header">
        <h1>Boletos</h1>
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
        <p>Cargando boletos...</p>
      ) : boletos.length === 0 ? (
        <p className="sin-resultados">No se encontraron boletos generados.</p>
      ) : (
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {boletos.map((v) => (
              <tr key={v.id}>
                <td>{new Date(v.sale_date || v.created_at).toLocaleDateString('es-AR')}</td>
                <td>{v.vehicle.brand} {v.vehicle.model}</td>
                <td>{v.client.name}</td>
                <td>${Number(v.sale_price).toLocaleString('es-AR')}</td>
                <td>
                  <Link to={`/admin/ventas/${v.id}/boleto`}>Ver boleto</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default HistorialBoletos
