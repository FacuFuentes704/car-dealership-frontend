import { useEffect, useState } from 'react'
import { API_URL } from '../../../config'
import { fetchConToken } from '../../../utils/fetchConToken'
import './PlanillaVehiculos.css'

function PlanillaVehiculos() {
  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchConToken(`${API_URL}/vehicles/admin?only_active=true`)
      .then(res => res.json())
      .then(datos => {
        const noVendidos = datos.filter((v) => v.status !== "sold")
        setVehiculos(noVendidos)
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
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => (
            <tr key={v.id}>
              <td>{v.brand}</td>
              <td>{v.model}</td>
              <td>{v.year}</td>
              <td>{v.plate || "-"}</td>
              <td>{Number(v.km).toLocaleString('es-AR')}</td>
              <td>{v.price ? `$${Number(v.price).toLocaleString('es-AR')}` : "Consultar precio"}</td>
              <td>{v.price_cash ? `$${Number(v.price_cash).toLocaleString('es-AR')}` : "-"}</td>
              <td>{v.status === "available" ? "Disponible" : "Reservado"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlanillaVehiculos