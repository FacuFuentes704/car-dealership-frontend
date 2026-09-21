import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import '../../formularios.css'
import './FormularioVenta.css'

function FormularioVenta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [vehiculosDisponibles, setVehiculosDisponibles] = useState([])
  const [clientes, setClientes] = useState([])
  const [datos, setDatos] = useState({
    vehicle_id: "",
    client_id: "",
    sale_price: "",
    payment_method: "cash",
    sale_date: "",
    notes: ""
  })
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const promesas = [
      fetchConToken(`${API_URL}/vehicles/admin?only_active=true&status=available`).then(res => res.json()),
      fetchConToken(`${API_URL}/clients/?only_active=true`).then(res => res.json())
    ]

    if (esEdicion) {
      promesas.push(fetchConToken(`${API_URL}/sales/${id}`).then(res => res.json()))
    }

    Promise.all(promesas)
      .then(([vehiculosData, clientesData, ventaData]) => {
        let listaVehiculos = vehiculosData

        if (esEdicion && ventaData) {
          const yaEsta = vehiculosData.some((v) => v.id === ventaData.vehicle.id)
          if (!yaEsta) {
            listaVehiculos = [...vehiculosData, ventaData.vehicle]
          }
        }

        setVehiculosDisponibles(listaVehiculos)
        setClientes(clientesData)

        if (esEdicion && ventaData) {
          setDatos({
            vehicle_id: ventaData.vehicle.id,
            client_id: ventaData.client.id,
            sale_price: ventaData.sale_price,
            payment_method: ventaData.payment_method,
            sale_date: ventaData.sale_date ? ventaData.sale_date.split("T")[0] : "",
            notes: ventaData.notes || ""
          })
        }
        setCargando(false)
      })
      .catch(() => {
        setError("No se pudieron cargar los datos")
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
      ? `${API_URL}/sales/${id}`
      : `${API_URL}/sales/`

    const metodo = esEdicion ? "PATCH" : "POST"

    fetchConToken(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicle_id: Number(datos.vehicle_id),
        client_id: Number(datos.client_id),
        sale_price: Number(datos.sale_price),
        payment_method: datos.payment_method,
        sale_date: datos.sale_date || null,
        notes: datos.notes || null
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "No se pudo guardar la venta")
          })
        }
        navigate("/admin/ventas")
      })
      .catch(err => {
        setError(err.message)
        setGuardando(false)
      })
  }

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="formulario-venta">
      <h1>{esEdicion ? "Editar venta" : "Nueva venta"}</h1>

      <form onSubmit={manejarSubmit}>
        <div className="form-campo">
          <label>Vehículo</label>
          <select
            value={datos.vehicle_id}
            onChange={(e) => manejarCambio("vehicle_id", e.target.value)}
            required
          >
            <option value="">Elegir vehículo...</option>
            {vehiculosDisponibles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.brand} {v.model} ({v.year}) — Patente: {v.plate || "sin patente"} — ${Number(v.price).toLocaleString('es-AR')}
              </option>
            ))}
          </select>
        </div>

        <div className="form-campo">
          <label>Cliente</label>
          <select
            value={datos.client_id}
            onChange={(e) => manejarCambio("client_id", e.target.value)}
            required
          >
            <option value="">Elegir cliente...</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — Tel: {c.phone || "sin teléfono"}
              </option>
            ))}
          </select>
        </div>

        <div className="form-campo">
          <label>Precio de venta</label>
          <input
            type="number"
            value={datos.sale_price}
            onChange={(e) => manejarCambio("sale_price", e.target.value)}
            required
          />
        </div>

        <div className="form-campo">
          <label>Fecha de venta (opcional)</label>
          <input
            type="date"
            value={datos.sale_date}
            onChange={(e) => manejarCambio("sale_date", e.target.value)}
          />
        </div>

        <div className="form-campo">
          <label>Método de pago</label>
          <select
            value={datos.payment_method}
            onChange={(e) => manejarCambio("payment_method", e.target.value)}
          >
            <option value="cash">Contado</option>
            <option value="financing">Crédito prendario</option>
            <option value="transfer">Transferencia</option>
            <option value="cash_financing">Contado + financiación</option>
            <option value="trade_in">Toma de usado</option>
            <option value="mixed">Mixto</option>
          </select>
        </div>

        <div className="form-campo form-descripcion">
          <label>Notas</label>
          <textarea
            value={datos.notes}
            onChange={(e) => manejarCambio("notes", e.target.value)}
            rows={3}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-acciones">
          <button type="button" onClick={() => navigate("/admin/ventas")}>
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

export default FormularioVenta