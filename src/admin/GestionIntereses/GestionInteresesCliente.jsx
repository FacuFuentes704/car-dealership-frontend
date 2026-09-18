import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../config'
import { fetchConToken } from '../../utils/fetchConToken'
import './GestionIntereses.css'

function GestionInteresesCliente() {
  const { id } = useParams()
  const [cliente, setCliente] = useState(null)
  const [vehiculosDisponibles, setVehiculosDisponibles] = useState([])
  const [vehiculoElegido, setVehiculoElegido] = useState("")
  const [cargando, setCargando] = useState(true)
  const [procesando, setProcesando] = useState(false)

  function cargarDatos() {
    return fetchConToken(`${API_URL}/clients/${id}?only_active=false`)
      .then(res => res.json())
      .then(datos => {
        setCliente(datos)
        setCargando(false)
      })
  }

  useEffect(() => {
    cargarDatos()
    fetchConToken(`${API_URL}/vehicles/admin?only_active=true&status=available`)
      .then(res => res.json())
      .then(setVehiculosDisponibles)
  }, [id])

  function agregarInteres(e) {
    e.preventDefault()
    if (!vehiculoElegido) return
    setProcesando(true)

    fetchConToken(`${API_URL}/clients/${id}/interests/${vehiculoElegido}`, {
      method: "POST"
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "No se pudo agregar el interés")
          })
        }
        return cargarDatos()
      })
      .then(() => {
        setVehiculoElegido("")
        setProcesando(false)
      })
      .catch(err => {
        alert(err.message)
        setProcesando(false)
      })
  }

  function quitarInteres(vehicleId) {
    setProcesando(true)
    fetchConToken(`${API_URL}/clients/${id}/interests/${vehicleId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("No se pudo quitar el interés")
        return cargarDatos()
      })
      .then(() => setProcesando(false))
      .catch(err => {
        alert(err.message)
        setProcesando(false)
      })
  }

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="gestion-intereses">
      <div className="ver-header">
        <h1>Intereses de {cliente.name}</h1>
        <Link to={`/admin/clientes/${id}/ver`}>← Volver</Link>
      </div>

      <div className="intereses-lista">
        {cliente.interests.length === 0 && <p>Sin intereses cargados todavía.</p>}
        {cliente.interests.map((interes) => (
          <div key={interes.id} className="interes-item-gestion">
            <span>
              <strong>{interes.vehicle.brand} {interes.vehicle.model}</strong> ({interes.vehicle.year})
            </span>
            <button onClick={() => quitarInteres(interes.vehicle.id)} disabled={procesando}>
              Quitar
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={agregarInteres} className="form-agregar-interes">
        <select value={vehiculoElegido} onChange={(e) => setVehiculoElegido(e.target.value)}>
          <option value="">Elegir vehículo...</option>
          {vehiculosDisponibles.map((v) => (
          <option key={v.id} value={v.id}>
            {v.brand} {v.model} ({v.year}) — Patente: {v.plate || "sin patente"}
          </option>
          ))}
        </select>
        <button type="submit" disabled={procesando || !vehiculoElegido}>
          + Agregar interés
        </button>
      </form>
    </div>
  )
}

export default GestionInteresesCliente