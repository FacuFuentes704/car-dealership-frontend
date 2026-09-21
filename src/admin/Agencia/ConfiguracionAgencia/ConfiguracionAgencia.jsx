import { useState, useEffect } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import '../../formularios.css'
import './ConfiguracionAgencia.css'

function ConfiguracionAgencia() {
  const [datos, setDatos] = useState({
    business_name: "",
    address: "",
    locality: "",
    document_number: "",
    phone: ""
  })
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)
  const [exito, setExito] = useState(false)

  useEffect(() => {
    fetchConToken(`${API_URL}/company-settings/`)
      .then(res => res.json())
      .then(datos => {
        setDatos({
          business_name: datos.business_name,
          address: datos.address || "",
          locality: datos.locality || "",
          document_number: datos.document_number || "",
          phone: datos.phone || ""
        })
        setCargando(false)
      })
  }, [])

  function manejarCambio(campo, valor) {
    setDatos({ ...datos, [campo]: valor })
    setExito(false)
  }

  function manejarSubmit(e) {
    e.preventDefault()
    setError(null)
    setGuardando(true)

    fetchConToken(`${API_URL}/company-settings/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "No se pudo guardar")
          })
        }
        setExito(true)
        setGuardando(false)
      })
      .catch(err => {
        setError(err.message)
        setGuardando(false)
      })
  }

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="configuracion-agencia">
      <h1>Datos de la Agencia</h1>
      <p className="config-hint">Estos datos se usan para generar los boletos de compra-venta.</p>

      <form onSubmit={manejarSubmit}>
        <div className="form-campo">
          <label>Razón Social</label>
          <input
            type="text"
            value={datos.business_name}
            onChange={(e) => manejarCambio("business_name", e.target.value)}
            required
          />
        </div>

        <div className="form-campo">
          <label>Domicilio</label>
          <input
            type="text"
            value={datos.address}
            onChange={(e) => manejarCambio("address", e.target.value)}
          />
        </div>

        <div className="form-campo">
          <label>Localidad</label>
          <input
            type="text"
            value={datos.locality}
            onChange={(e) => manejarCambio("locality", e.target.value)}
          />
        </div>

        <div className="form-campo">
          <label>CUIT / Documento</label>
          <input
            type="text"
            value={datos.document_number}
            onChange={(e) => manejarCambio("document_number", e.target.value)}
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

        {error && <p className="form-error">{error}</p>}
        {exito && <p className="form-exito">Datos guardados correctamente.</p>}

        <div className="form-acciones">
          <button type="submit" disabled={guardando} className="boton-guardar">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConfiguracionAgencia