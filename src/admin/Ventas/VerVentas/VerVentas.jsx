import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import { TRADUCCIONES_PAYMENT_METHOD } from '../../traducciones'
import './VerVenta.css'

function VerVenta() {
  const { id } = useParams()
  const [venta, setVenta] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchConToken(`${API_URL}/sales/${id}`)
      .then(res => res.json())
      .then(datos => {
        setVenta(datos)
        setCargando(false)
      })
  }, [id])

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="ver-venta-detalle">
      <div className="ver-header">
        <h1>Venta #{venta.id}</h1>
        <div className="ver-header-acciones">
          <Link to={`/admin/ventas/${id}/boleto`} className="boton-editar-desde-ver">
            Ver Boleto
          </Link>
          <Link to="/admin/ventas">← Volver</Link>
        </div>
      </div>

      <div className="ver-datos">
        <p><span>Vehículo</span>
          <strong>
            <Link to={`/admin/vehiculos/${venta.vehicle.id}/ver`}>
              {venta.vehicle.brand} {venta.vehicle.model}
            </Link>
          </strong>
        </p>
        <p><span>Cliente</span>
          <strong>
            <Link to={`/admin/clientes/${venta.client.id}/ver`}>
              {venta.client.name}
            </Link>
          </strong>
        </p>
        <p><span>Precio</span><strong>${Number(venta.sale_price).toLocaleString('es-AR')}</strong></p>
        <p><span>Método de pago</span><strong>{TRADUCCIONES_PAYMENT_METHOD[venta.payment_method]}</strong></p>
        <p><span>Fecha</span><strong>{new Date(venta.sale_date || venta.created_at).toLocaleDateString('es-AR')}</strong></p>
      </div>

      {venta.notes && (
        <div className="ver-descripcion">
          <h2>Notas</h2>
          <p>{venta.notes}</p>
        </div>
      )}
    </div>
  )
}

export default VerVenta