import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import BotonWhatsApp from "../BotonWhatsapp/BotonWhatsapp"
import './DetalleVehiculo.css'
import { API_URL } from '../../config'
import { TRADUCCIONES_FUEL_TYPE, TRADUCCIONES_TRANSMISSION } from '../../admin/traducciones'
import { CARACTERISTICAS_VEHICULO } from '../../admin/caracteristicasVehiculo'

function DetalleVehiculo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vehiculo, setVehiculo] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [fotoActiva, setFotoActiva] = useState(0)

  useEffect(() => {
    fetch(`${API_URL}/vehicles/${id}/`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "Vehiculo no encontrado")
          })
        }
        return res.json()
      })
      .then(datos => {
        setVehiculo(datos)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [id])

  useEffect(() => {
    if (vehiculo) {
      document.title = `${vehiculo.brand} ${vehiculo.model} ${vehiculo.year} - LGi Motors`
    }
  }, [vehiculo])

  if (cargando) return <p className="detalle-mensaje">Cargando vehículo...</p>
  if (error) return <p className="detalle-mensaje">Error: {error}</p>

  const fotos = vehiculo.photos || []

  return (
    <div className="detalle-vehiculo container">
      <button onClick={() => navigate(-1)} className="detalle-volver">
        ← Volver
      </button>

      <div className="detalle-grid">
        <div className="detalle-galeria">
          {fotos.length > 0 ? (
            <>
              <div className="galeria-principal">
                <img src={fotos[fotoActiva].url} alt={`${vehiculo.brand} ${vehiculo.model}`} />
              </div>
              {fotos.length > 1 && (
                <div className="galeria-miniaturas">
                  {fotos.map((foto, index) => (
                    <img
                      key={foto.id}
                      src={foto.url}
                      alt=""
                      className={index === fotoActiva ? "miniatura activa" : "miniatura"}
                      onClick={() => setFotoActiva(index)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="galeria-sin-foto">Sin fotos disponibles</div>
          )}
        </div>

        <div className="detalle-info">
          <h1>{vehiculo.brand} {vehiculo.model}</h1>
          <p className="detalle-precio">
            {vehiculo.price ? `$${Number(vehiculo.price).toLocaleString('es-AR')}` : "Consultar precio"}
          </p>

          <div className="detalle-specs">
            <div><span>Año</span><strong>{vehiculo.year}</strong></div>
            <div><span>Km</span><strong>{Number(vehiculo.km).toLocaleString('es-AR')}</strong></div>
            <div><span>Combustible</span><strong>{TRADUCCIONES_FUEL_TYPE[vehiculo.fuel_type]}</strong></div>
            <div><span>Transmisión</span><strong>{TRADUCCIONES_TRANSMISSION[vehiculo.transmission]}</strong></div>
          </div>

          <BotonWhatsApp
            mensaje={`Hola, me comunico por ${vehiculo.brand} ${vehiculo.model} desde lgimotors.com y quiero saber más detalles`}
          />
        </div>
      </div>

      {vehiculo.description && (
        <div className="detalle-descripcion">
          <h2>Descripción</h2>
          <p>{vehiculo.description}</p>
        </div>
      )}

      {vehiculo.features && Object.values(vehiculo.features).some(Boolean) && (
        <div className="detalle-descripcion">
          <h2>Equipamiento</h2>
          <ul className="detalle-equipamiento-lista">
            {CARACTERISTICAS_VEHICULO.filter((c) => vehiculo.features[c.key]).map((c) => (
              <li key={c.key}>{c.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DetalleVehiculo