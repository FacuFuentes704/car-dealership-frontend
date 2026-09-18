import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { API_URL } from '../../config'
import { fetchConToken } from '../../utils/fetchConToken'
import './AdminClientes.css'

function AdminClientes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFiltro = searchParams.get("status") || ""

  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    let url = `${API_URL}/clients/?only_active=false`
    if (statusFiltro) url += `&status=${statusFiltro}`
    if (busqueda) url += `&search=${busqueda}`

    fetchConToken(url)
      .then(res => {
        if (!res.ok) throw new Error("Error al traer los clientes")
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
  }, [statusFiltro, busqueda])

  function darDeBaja(id) {
    fetchConToken(`${API_URL}/clients/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("No se pudo dar de baja")
        setClientes(prev => prev.map((c) =>
          c.id === id ? { ...c, is_active: false } : c
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
                  <span className={`badge badge-cliente-${c.status}`}>{c.status}</span>
                </td>
                <td>{c.is_active ? "Sí" : "No"}</td>
                <td>{new Date(c.created_at).toLocaleDateString('es-AR')}</td>
                <td>
                  <Link to={`/admin/clientes/${c.id}/editar`}>Editar</Link>
                  {c.is_active && (
                    <button onClick={() => darDeBaja(c.id)} className="boton-baja">
                      Dar de baja
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