import { useEffect, useState } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import './PlanillaVehiculos.css'

function PlanillaVehiculos() {
  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchConToken(`${API_URL}/vehicles/admin?only_active=true&limit=100`)
      .then(res => res.json())
      .then(datos => {
        const noVendidos = datos.filter((v) => v.status !== "sold")
        const ordenados = [...noVendidos].sort((a, b) => {
          const porMarca = a.brand.localeCompare(b.brand, 'es')
          if (porMarca !== 0) return porMarca
          return a.model.localeCompare(b.model, 'es')
        })
        setVehiculos(ordenados)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="planilla">
      <div className="planilla-header no-imprimir">
        <h1>Planilla de Vehículos</h1>
        <button onClick={() => window.print()}>Imprimir</button>
      </div>

      <h1 className="solo-imprimir">LGi Motors - Planilla de Vehículos</h1>
      <p className="solo-imprimir">Generado el {new Date().toLocaleDateString('es-AR')}</p>

      <table className="tabla-planilla">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Patente</th>
            <th>Km</th>
            <th>Precio Permuta</th>
            <th>Precio Contado</th>
            <th>Estado</th>
            <th>Fecha de Alta</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => (
            <tr key={v.id}>
              <td>{v.brand}</td>
              <td>{v.model}</td>
              <td>{v.year}</td>
              <td>{v.plate || "-"}</td>
              <td>{v.km != null ? Number(v.km).toLocaleString('es-AR') : "-"}</td>
              <td>{v.price_internal ? `$${Number(v.price_internal).toLocaleString('es-AR')}` : "-"}</td>
              <td>{v.price_cash ? `$${Number(v.price_cash).toLocaleString('es-AR')}` : "-"}</td>
              <td>{v.status === "available" ? "Disponible" : "Reservado"}</td>
              <td>{v.created_at ? new Date(v.created_at).toLocaleDateString('es-AR') : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlanillaVehiculos