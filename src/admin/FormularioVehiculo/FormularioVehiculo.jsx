import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../config'
import { fetchConToken } from '../../utils/fetchConToken'
import '../formularios.css'
import './FormularioVehiculo.css'

function FormularioVehiculo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [datos, setDatos] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    km: "",
    color: "",
    plate: "",
    description: "",
    fuel_type: "gasoline",
    transmission: "manual",
    status: "available",
    condition: "used",
    is_offer: false,
    is_active: true
  })
  const [fotos, setFotos] = useState([])
  const [cargando, setCargando] = useState(esEdicion)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!esEdicion) return

    fetchConToken(`${API_URL}/vehicles/${id}/admin`)
      .then(res => res.json())
      .then(vehiculo => {
        setDatos({
          brand: vehiculo.brand,
          model: vehiculo.model,
          year: vehiculo.year,
          price: vehiculo.price,
          km: vehiculo.km,
          color: vehiculo.color || "",
          plate: vehiculo.plate || "", 
          description: vehiculo.description || "",
          fuel_type: vehiculo.fuel_type,
          transmission: vehiculo.transmission,
          status: vehiculo.status,
          condition: vehiculo.condition,
          is_offer: vehiculo.is_offer,
          is_active: vehiculo.is_active
        })
        setFotos(vehiculo.photos || [])
        setCargando(false)
      })
  }, [id, esEdicion])

  useEffect(() => {
    function prevenir(e) {
      e.preventDefault()
    }
    window.addEventListener("dragover", prevenir)
    window.addEventListener("drop", prevenir)

    return () => {
      window.removeEventListener("dragover", prevenir)
      window.removeEventListener("drop", prevenir)
    }
  }, [])

  function manejarCambio(campo, valor) {
    setDatos({ ...datos, [campo]: valor })
  }

  function manejarSubmit(e) {
    e.preventDefault()
    setError(null)
    setGuardando(true)

    const url = esEdicion
      ? `${API_URL}/vehicles/${id}`
      : `${API_URL}/vehicles/`

    const metodo = esEdicion ? "PATCH" : "POST"

    fetchConToken(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...datos,
        year: Number(datos.year),
        price: Number(datos.price),
        km: Number(datos.km)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("No se pudo guardar el vehículo")
        navigate("/admin/vehiculos")
      })
      .catch(err => {
        setError(err.message)
        setGuardando(false)
      })
  }

  function subirArchivo(archivo) {
    const formData = new FormData()
    formData.append("photos", archivo)

    fetchConToken(`${API_URL}/vehicles/${id}/photos`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(nuevasFotos => {
        setFotos([...fotos, ...nuevasFotos])
      })
      .catch(() => alert("No se pudo subir la foto"))
  }

  function manejarSeleccion(e) {
    const archivo = e.target.files[0]
    if (archivo) subirArchivo(archivo)
  }

  function manejarDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    const archivo = e.dataTransfer.files[0]
    if (archivo) subirArchivo(archivo)
  }

  function manejarDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function borrarFoto(photoId) {
    fetchConToken(`${API_URL}/vehicles/${id}/photos/${photoId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error()
        setFotos(fotos.filter((f) => f.id !== photoId))
      })
      .catch(() => alert("No se pudo borrar la foto"))
  }

  function marcarPrincipal(photoId) {
    fetchConToken(`${API_URL}/vehicles/${id}/photos/${photoId}`, {
      method: "PATCH"
    })
      .then(res => {
        if (!res.ok) throw new Error()
        setFotos(fotos.map((f) => ({
          ...f,
          is_main: f.id === photoId
        })))
      })
      .catch(() => alert("No se pudo actualizar la foto principal"))
  }

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="formulario-vehiculo">
      <h1>{esEdicion ? "Editar vehículo" : "Nuevo vehículo"}</h1>

      <form onSubmit={manejarSubmit}>
        <div className="form-grid">
          <div className="form-campo">
            <label>Marca</label>
            <input
              type="text"
              value={datos.brand}
              onChange={(e) => manejarCambio("brand", e.target.value)}
              required
            />
          </div>

          <div className="form-campo">
            <label>Modelo</label>
            <input
              type="text"
              value={datos.model}
              onChange={(e) => manejarCambio("model", e.target.value)}
              required
            />
          </div>

          <div className="form-campo">
            <label>Año</label>
            <input
              type="number"
              value={datos.year}
              onChange={(e) => manejarCambio("year", e.target.value)}
              required
            />
          </div>

          <div className="form-campo">
            <label>Precio</label>
            <input
              type="number"
              value={datos.price}
              onChange={(e) => manejarCambio("price", e.target.value)}
              required
            />
          </div>

          <div className="form-campo">
            <label>Kilómetros</label>
            <input
              type="number"
              value={datos.km}
              onChange={(e) => manejarCambio("km", e.target.value)}
            />
          </div>

          <div className="form-campo">
            <label>Color</label>
            <input
              type="text"
              value={datos.color}
              onChange={(e) => manejarCambio("color", e.target.value)}
            />
          </div>

            <div className="form-campo">
            <label>Patente</label>
            <input
                type="text"
                value={datos.plate}
                onChange={(e) => manejarCambio("plate", e.target.value.toUpperCase())}
                placeholder="Ej: AB123CD"
            />
            </div>

          <div className="form-campo">
            <label>Combustible</label>
            <select
              value={datos.fuel_type}
              onChange={(e) => manejarCambio("fuel_type", e.target.value)}
            >
              <option value="gasoline">Nafta</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Híbrido</option>
              <option value="gasoline_gnc">Nafta/GNC</option>
              <option value="diesel_gnc">Diesel/GNC</option>
            </select>
          </div>

          <div className="form-campo">
            <label>Transmisión</label>
            <select
              value={datos.transmission}
              onChange={(e) => manejarCambio("transmission", e.target.value)}
            >
              <option value="manual">Manual</option>
              <option value="automatic">Automática</option>
            </select>
          </div>

          <div className="form-campo">
            <label>Estado</label>
            <select
              value={datos.status}
              onChange={(e) => manejarCambio("status", e.target.value)}
            >
              <option value="available">Disponible</option>
              <option value="reserved">Reservado</option>
              <option value="sold">Vendido</option>
            </select>
          </div>

          <div className="form-campo">
            <label>Condición</label>
            <select
              value={datos.condition}
              onChange={(e) => manejarCambio("condition", e.target.value)}
            >
              <option value="new">0KM</option>
              <option value="used">Usado</option>
            </select>
          </div>

          <div className="form-campo form-checkbox">
            <label>
              <input
                type="checkbox"
                checked={datos.is_offer}
                onChange={(e) => manejarCambio("is_offer", e.target.checked)}
              />
              En oferta
            </label>
          </div>

          {esEdicion && (
            <div className="form-campo form-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={datos.is_active}
                  onChange={(e) => manejarCambio("is_active", e.target.checked)}
                />
                Vehículo activo
              </label>
            </div>
          )}
        </div>

        <div className="form-campo form-descripcion">
          <label>Descripción</label>
          <textarea
            value={datos.description}
            onChange={(e) => manejarCambio("description", e.target.value)}
            rows={4}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-acciones">
          <button type="button" onClick={() => navigate("/admin/vehiculos")}>
            Cancelar
          </button>
          <button type="submit" disabled={guardando} className="boton-guardar">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>

      {esEdicion && (
        <div className="form-fotos">
          <h2>Fotos</h2>
          <div className="fotos-grid">
            {fotos.map((foto) => (
              <div key={foto.id} className="foto-item">
                <img src={foto.url} alt="" />
                {foto.is_main && <span className="foto-principal">Principal</span>}
                <div className="foto-acciones">
                  {!foto.is_main && (
                    <button type="button" onClick={() => marcarPrincipal(foto.id)}>
                      Hacer principal
                    </button>
                  )}
                  <button type="button" onClick={() => borrarFoto(foto.id)}>
                    Borrar
                  </button>
                </div>
              </div>
            ))}

            <label
              className="input-subir-foto"
              onDrop={manejarDrop}
              onDragOver={manejarDragOver}
            >
              <span>+ Agregar foto</span>
              <span className="input-subir-foto-hint">o arrastrá una imagen acá</span>
              <input type="file" accept="image/*" onChange={manejarSeleccion} hidden />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormularioVehiculo