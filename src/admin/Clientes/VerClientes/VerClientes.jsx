import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import { TRADUCCIONES_STATUS_CLIENTE, TRADUCCIONES_STATUS_VEHICULO } from '../../traducciones'
import './VerClientes.css'
import '../../ver-detalle.css'

function VerCliente() {
  const { id } = useParams()
  const [cliente, setCliente] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchConToken(`${API_URL}/clients/${id}?only_active=false`)
      .then(res => res.json())
      .then(datos => {
        setCliente(datos)
        setCargando(false)
      })
  }, [id])

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="ver-cliente">
      <div className="ver-header">
        <h1>{cliente.name}</h1>
        <Link to={`/admin/clientes/${id}/editar`} className="boton-editar-desde-ver">
          Editar
        </Link>
      </div>

      <div className="ver-datos">
        <p><span>Teléfono</span><strong>{cliente.phone || "-"}</strong></p>
        <p><span>Email</span><strong>{cliente.email || "-"}</strong></p>
        <p><span>Estado</span><strong>{TRADUCCIONES_STATUS_CLIENTE[cliente.status]}</strong></p>
        <p><span>Activo</span><strong>{cliente.is_active ? "Sí" : "No"}</strong></p>
        <p><span>Alta</span><strong>{new Date(cliente.created_at).toLocaleDateString('es-AR')}</strong></p>
      </div>

      {cliente.notes && (
        <div className="ver-descripcion">
          <h2>Notas</h2>
          <p>{cliente.notes}</p>
        </div>
      )}

      <div className="ver-intereses">
        <h2>Vehículos de interés</h2>

        {cliente.interests && cliente.interests.length > 0 ? (
          <div className="intereses-lista">
            {cliente.interests.map((interes) => (
              <Link
                key={interes.id}
                to={`/admin/vehiculos/${interes.vehicle.id}/ver`}
                className="interes-item"
              >
                <strong>{interes.vehicle.brand} {interes.vehicle.model}</strong>
                <span>{interes.vehicle.year} — ${Number(interes.vehicle.price).toLocaleString('es-AR')}</span>
                <span className={`badge badge-${interes.vehicle.status}`}>{TRADUCCIONES_STATUS_VEHICULO[interes.vehicle.status]}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="sin-intereses">Sin intereses cargados todavía.</p>
        )}

        <Link to={`/admin/clientes/${id}/intereses`} className="boton-gestionar-intereses">
          Gestionar intereses
        </Link>
      </div>

      <div className="ver-ventas-cliente">
        <h2>Compras realizadas</h2>
        {cliente.sales && cliente.sales.length > 0 ? (
          <div className="intereses-lista">
            {cliente.sales.map((venta) => (
              <Link
                key={venta.id}
                to={`/admin/vehiculos/${venta.vehicle.id}/ver`}
                className="interes-item"
              >
                <strong>{venta.vehicle.brand} {venta.vehicle.model}</strong>
                <span>${Number(venta.sale_price).toLocaleString('es-AR')}</span>
                <span>{new Date(venta.sale_date || venta.created_at).toLocaleDateString('es-AR')}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="sin-intereses">Sin compras registradas todavía.</p>
        )}
      </div>
    </div>
  )
}

export default VerCliente