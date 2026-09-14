import TarjetaVehiculo from '../TarjetaVehiculos/TarjetaVehiculo'
import { useEffect, useState } from "react"
import './PanelDeVehiculos.css'

function PanelDeVehiculos({ condition, offer }) {
  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    setCargando(true)
    let url = `https://car-dealership-api-7k16.onrender.com/vehicles/?status=available`
    if (condition) url += `&condition=${condition}`
    if (offer) url += `&is_offer=true`
    if (busqueda) url += `&search=${busqueda}`

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al traer los vehiculos")
        }
        return res.json()
      })
      .then(datos => {
        setVehiculos(datos)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [condition, offer, busqueda])

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por marca o modelo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      {cargando && <p>Cargando Vehiculos...</p>}
      {error && <p>Error: {error}</p>}

      {!cargando && !error && (
        <div className="panel-vehiculos">
          {vehiculos.map((vehiculo) => (
            <TarjetaVehiculo
              key={vehiculo.id}
              id={vehiculo.id}
              marca={vehiculo.brand}
              modelo={vehiculo.model}
              year={vehiculo.year}
              precio={vehiculo.price}
              km={vehiculo.km}
              photos={vehiculo.photos}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PanelDeVehiculos