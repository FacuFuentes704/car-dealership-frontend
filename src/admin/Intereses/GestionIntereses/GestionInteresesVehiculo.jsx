import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import './GestionIntereses.css'

function GestionInteresesVehiculo() {
  const { id } = useParams()
  const [vehiculo, setVehiculo] = useState(null)
  const [clientesDisponibles, setClientesDisponibles] = useState([])
  const [clienteElegido, setClienteElegido] = useState("")
  const [cargando, setCargando] = useState(true)
  const [procesando, setProcesando] = useState(false)

  function cargarDatos() {
    return fetchConToken(`${API_URL}/vehicles/${id}/admin`)
      .then(res => res.json())
      .then(datos => {
        setVehiculo(datos)
        setCargando(false)
      })
  }

  useEffect(() => {
    cargarDatos()
    fetchConToken(`${API_URL}/clients/?only_active=true`)
      .then(res => res.json())
      .then(setClientesDisponibles)
  }, [id])

  function agregarInteres(e) {
    e.preventDefault()
    if (!clienteElegido) return
    setProcesando(true)

    fetchConToken(`${API_URL}/clients/${clienteElegido}/interests/${id}`, {
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
        setClienteElegido("")
        setProcesando(false)
      })
      .catch(err => {
        alert(err.message)
        setProcesando(false)
      })
  }

  function quitarInteres(clientId) {
    setProcesando(true)
    fetchConToken(`${API_URL}/clients/${clientId}/interests/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "No se pudo quitar el interés")
          })
        }
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
        <h1>Interesados en {vehiculo.brand} {vehiculo.model}</h1>
        <Link to={`/admin/vehiculos/${id}/ver`}>← Volver</Link>
      </div>

      <div className="intereses-lista">
        {vehiculo.interested_clients.length === 0 && <p>Sin clientes interesados todavía.</p>}
        {vehiculo.interested_clients.map((interes) => (
          <div key={interes.id} className="interes-item-gestion">
            <span><strong>{interes.client.name}</strong> — {interes.client.phone}</span>
            <button onClick={() => quitarInteres(interes.client.id)} disabled={procesando}>
              Quitar
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={agregarInteres} className="form-agregar-interes">
        <select value={clienteElegido} onChange={(e) => setClienteElegido(e.target.value)}>
          <option value="">Elegir cliente...</option>
          {clientesDisponibles.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} — Tel: {c.phone || "sin teléfono"} — {c.email || "sin email"}
          </option>
          ))}
        </select>
        <button type="submit" disabled={procesando || !clienteElegido}>
          + Agregar interesado
        </button>
      </form>
    </div>
  )
}

export default GestionInteresesVehiculo