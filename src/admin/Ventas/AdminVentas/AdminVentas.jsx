import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import './AdminVentas.css'

function AdminVentas() {
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchConToken(`${API_URL}/sales/`)
      .then(res => {
        if (!res.ok) throw new Error("Error al traer las ventas")
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
  }, [])

  if (cargando) return <p>Cargando ventas...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="admin-ventas">
      <div className="admin-header">
        <h1>Ventas</h1>
        <Link to="/admin/ventas/nueva" className="boton-crear">
          + Nueva venta
        </Link>
      </div>

      {ventas.length === 0 ? (
        <p className="sin-resultados">No hay ventas registradas todavía.</p>
      ) : (
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Precio</th>
              <th>Método de pago</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id}>
                <td>{new Date(v.sale_date || v.created_at).toLocaleDateString('es-AR')}</td>
                <td>{v.vehicle.brand} {v.vehicle.model}</td>
                <td>{v.client.name}</td>
                <td>${Number(v.sale_price).toLocaleString('es-AR')}</td>
                <td>{v.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminVentas