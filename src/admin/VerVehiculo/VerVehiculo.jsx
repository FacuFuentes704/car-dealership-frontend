import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../config'
import { fetchConToken } from '../../utils/fetchConToken'
import './VerVehiculo.css'

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
          <p><span>Combustible</span><strong>{vehiculo.fuel_type}</strong></p>
          <p><span>Transmisión</span><strong>{vehiculo.transmission}</strong></p>
          <p><span>Condición</span><strong>{vehiculo.condition}</strong></p>
          <p><span>Estado</span><strong>{vehiculo.status}</strong></p>
          <p><span>Activo</span><strong>{vehiculo.is_active ? "Sí" : "No"}</strong></p>
          <p><span>En oferta</span><strong>{vehiculo.is_offer ? "Sí" : "No"}</strong></p>
        </div>
      </div>

      {vehiculo.description && (
        <div className="ver-descripcion">
          <h2>Descripción</h2>
          <p>{vehiculo.description}</p>
        </div>
      )}
    </div>
  )
}

export default VerVehiculo