import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../config'
import { fetchConToken } from '../../utils/fetchConToken'
import {
  TRADUCCIONES_FUEL_TYPE,
  TRADUCCIONES_TRANSMISSION,
  TRADUCCIONES_CONDITION,
  TRADUCCIONES_STATUS_VEHICULO,
  TRADUCCIONES_STATUS_CLIENTE
} from '../traducciones'
import './VerVehiculo.css'
import '../ver-detalle.css'

function VerVehiculo() {
  const { id } = useParams()
  const [vehiculo, setVehiculo] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchConToken(`${API_URL}/vehicles/${id}/admin`)
      .then(res => res.json())
      .then(datos => {
        setVehiculo(datos)
        setCargando(false)
      })
  }, [id])

  if (cargando) return <p>Cargando...</p>

  const fotoPrincipal = (vehiculo.photos || []).find((f) => f.is_main)

  return (
    <div className="ver-vehiculo">
      <div className="ver-header">
        <h1>{vehiculo.brand} {vehiculo.model}</h1>
        <Link to={`/admin/vehiculos/${id}/editar`} className="boton-editar-desde-ver">
          Editar
        </Link>
      </div>

      <div className="ver-grid">
        {fotoPrincipal ? (
          <img src={fotoPrincipal.url} alt="" className="ver-imagen" />
        ) : (
          <div className="ver-sin-foto">Sin foto</div>
        )}

        <div className="ver-datos">
          <p><span>Precio</span><strong>${Number(vehiculo.price).toLocaleString('es-AR')}</strong></p>
          <p><span>Año</span><strong>{vehiculo.year}</strong></p>
          <p><span>Km</span><strong>{Number(vehiculo.km).toLocaleString('es-AR')}</strong></p>
          <p><span>Color</span><strong>{vehiculo.color || "-"}</strong></p>
          <p><span>Combustible</span><strong>{TRADUCCIONES_FUEL_TYPE[vehiculo.fuel_type]}</strong></p>
          <p><span>Transmisión</span><strong>{TRADUCCIONES_TRANSMISSION[vehiculo.transmission]}</strong></p>
          <p><span>Condición</span><strong>{TRADUCCIONES_CONDITION[vehiculo.condition]}</strong></p>
          <p><span>Estado</span><strong>{TRADUCCIONES_STATUS_VEHICULO[vehiculo.status]}</strong></p>
          <p><span>Activo</span><strong>{vehiculo.is_active ? "Sí" : "No"}</strong></p>
          <p><span>En oferta</span><strong>{vehiculo.is_offer ? "Sí" : "No"}</strong></p>
        </div>
      </div>

      {vehiculo.sale && (
        <div className="ver-venta">
          <h2>Información de venta</h2>
          <p>
            Vendido a{" "}
            <Link to={`/admin/clientes/${vehiculo.sale.client.id}/ver`}>
              {vehiculo.sale.client.name}
            </Link>
            {" "}el {new Date(vehiculo.sale.sale_date || vehiculo.sale.created_at).toLocaleDateString('es-AR')}
            {" "}por ${Number(vehiculo.sale.sale_price).toLocaleString('es-AR')}
          </p>
        </div>
      )}

      {vehiculo.description && (
        <div className="ver-descripcion">
          <h2>Descripción</h2>
          <p>{vehiculo.description}</p>
        </div>
      )}

      <div className="ver-intereses">
        <h2>Clientes interesados</h2>

        {vehiculo.interested_clients && vehiculo.interested_clients.length > 0 ? (
          <div className="intereses-lista">
            {vehiculo.interested_clients.map((interes) => (
              <Link
                key={interes.id}
                to={`/admin/clientes/${interes.client.id}/ver`}
                className="interes-item"
              >
                <strong>{interes.client.name}</strong>
                <span>{interes.client.phone}</span>
                <span className={`badge badge-cliente-${interes.client.status}`}>{TRADUCCIONES_STATUS_CLIENTE[interes.client.status]}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="sin-intereses">Sin clientes interesados todavía.</p>
        )}

        <Link to={`/admin/vehiculos/${id}/intereses`} className="boton-gestionar-intereses">
          Gestionar intereses
        </Link>
      </div>
    </div>
  )
}

export default VerVehiculo