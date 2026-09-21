import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import '../../formularios.css'
import './FormularioClientes.css'

function FormularioCliente() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [datos, setDatos] = useState({
    name: "",
    status: "waiting",
    phone: "",
    email: "",
    notes: "",
    is_active: true
  })
  const [cargando, setCargando] = useState(esEdicion)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!esEdicion) return

    fetchConToken(`${API_URL}/clients/${id}?only_active=false`)
      .then(res => res.json())
      .then(cliente => {
        setDatos({
          name: cliente.name,
          status: cliente.status,
          phone: cliente.phone || "",
          email: cliente.email || "",
          notes: cliente.notes || "",
          is_active: cliente.is_active
        })
        setCargando(false)
      })
  }, [id, esEdicion])

  function manejarCambio(campo, valor) {
    setDatos({ ...datos, [campo]: valor })
  }

function manejarSubmit(e) {
  e.preventDefault()
  setError(null)
  setGuardando(true)

  const url = esEdicion
    ? `${API_URL}/clients/${id}`
    : `${API_URL}/clients/`

  const metodo = esEdicion ? "PATCH" : "POST"

  const datosLimpios = {
    ...datos,
    email: datos.email || null,
    phone: datos.phone || null,
    notes: datos.notes || null
  }

  fetchConToken(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosLimpios)
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.detail || "No se pudo guardar el cliente")
        })
      }
      navigate("/admin/clientes")
    })
    .catch(err => {
      setError(err.message)
      setGuardando(false)
    })
}

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="formulario-cliente">
      <h1>{esEdicion ? "Editar cliente" : "Nuevo cliente"}</h1>

      <form onSubmit={manejarSubmit}>
        <div className="form-grid">
          <div className="form-campo">
            <label>Nombre</label>
            <input
              type="text"
              value={datos.name}
              onChange={(e) => manejarCambio("name", e.target.value)}
              required
            />
          </div>

          <div className="form-campo">
            <label>Teléfono</label>
            <input
              type="text"
              value={datos.phone}
              onChange={(e) => manejarCambio("phone", e.target.value)}
            />
          </div>

          <div className="form-campo">
            <label>Email</label>
            <input
              type="email"
              value={datos.email}
              onChange={(e) => manejarCambio("email", e.target.value)}
            />
          </div>

          <div className="form-campo">
            <label>Estado</label>
            <select
              value={datos.status}
              onChange={(e) => manejarCambio("status", e.target.value)}
            >
              <option value="waiting">Esperando</option>
              <option value="negotiating">Negociando</option>
              <option value="closed">Cerrado</option>
              <option value="lost">Perdido</option>
            </select>
          </div>

          {esEdicion && (
            <div className="form-campo form-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={datos.is_active}
                  onChange={(e) => manejarCambio("is_active", e.target.checked)}
                />
                Cliente activo
              </label>
            </div>
          )}
        </div>

        <div className="form-campo form-descripcion">
          <label>Notas</label>
          <textarea
            value={datos.notes}
            onChange={(e) => manejarCambio("notes", e.target.value)}
            rows={4}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-acciones">
          <button type="button" onClick={() => navigate("/admin/clientes")}>
            Cancelar
          </button>
          <button type="submit" disabled={guardando} className="boton-guardar">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormularioCliente