import TarjetaVehiculo from '../TarjetaVehiculos/TarjetaVehiculo'
import { useEffect, useState } from "react"
import './PanelDeVehiculos.css'

function PanelDeVehiculos(condition) {
  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    const url = condition
    ? `https://car-dealership-api-7k16.onrender.com/vehicles/?status=available&condition=${condition}`
    : `https://car-dealership-api-7k16.onrender.com/vehicles/?status=available`

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
  }, [condition])

  if (cargando) return <p>Cargando Vehiculos...</p>
  if (error) return <p>Error: {error}</p>

  return (
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
  )
}

export default PanelDeVehiculos