import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import { TRADUCCIONES_STATUS_CLIENTE } from '../../traducciones'
import './AdminClientes.css'

function AdminClientes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFiltro = searchParams.get("status") || ""

  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [busquedaDebounced, setBusquedaDebounced] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBusquedaDebounced(busqueda)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [busqueda])

  useEffect(() => {
    let url = `${API_URL}/clients/?only_active=false`
    if (statusFiltro) url += `&status=${statusFiltro}`
    if (busquedaDebounced) url += `&search=${busquedaDebounced}`

    fetchConToken(url)
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "Error al traer los clientes")
          })
        }
        return res.json()
      })
      .then(datos => {
        setClientes(datos)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [statusFiltro, busquedaDebounced])

  function darDeBaja(id) {
    fetchConToken(`${API_URL}/clients/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("No se pudo dar de baja")
        setClientes(clientes.map((c) =>
          c.id === id ? { ...c, is_active: false } : c
        ))
      })
      .catch(err => alert(err.message))
  }

  function cambiarActivo(id, activo) {
    fetchConToken(`${API_URL}/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: activo })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "No se pudo actualizar el cliente")
          })
        }
        setClientes(clientes.map((c) =>
          c.id === id ? { ...c, is_active: activo } : c
        ))
      })
      .catch(err => alert(err.message))
  }

  function cambiarStatus(nuevoStatus) {
    if (nuevoStatus) {
      setSearchParams({ status: nuevoStatus })
    } else {
      setSearchParams({})
    }
  }

  if (cargando) return <p>Cargando clientes...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="admin-clientes">
      <div className="admin-header">
        <h1>Clientes</h1>
        <Link to="/admin/clientes/nuevo" className="boton-crear">
          + Nuevo cliente
        </Link>
      </div>

      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />

        <select value={statusFiltro} onChange={(e) => cambiarStatus(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="waiting">Esperando</option>
          <option value="negotiating">Negociando</option>
          <option value="closed">Cerrado</option>
          <option value="lost">Perdido</option>
        </select>
      </div>

      {clientes.length === 0 ? (
        <p className="sin-resultados">No se encontraron clientes.</p>
      ) : (
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Status</th>
              <th>Activo</th>
              <th>Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className={!c.is_active ? "fila-inactiva" : ""}>
                <td>{c.name}</td>
                <td>{c.phone || "-"}</td>
                <td>{c.email || "-"}</td>
                <td>
                  <span className={`badge badge-cliente-${c.status}`}>{TRADUCCIONES_STATUS_CLIENTE[c.status]}</span>
                </td>
                <td>{c.is_active ? "Sí" : "No"}</td>
                <td>{new Date(c.created_at).toLocaleDateString('es-AR')}</td>
                <td>
                  <Link to={`/admin/clientes/${c.id}/ver`}>Ver</Link>
                  <Link to={`/admin/clientes/${c.id}/editar`}>Editar</Link>
                  <Link to={`/admin/clientes/${c.id}/intereses`}>Intereses</Link>
                  {c.is_active ? (
                    <button onClick={() => darDeBaja(c.id)} className="boton-baja">
                      Dar de baja
                    </button>
                  ) : (
                    <button onClick={() => cambiarActivo(c.id, true)} className="boton-baja">
                      Reactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminClientes