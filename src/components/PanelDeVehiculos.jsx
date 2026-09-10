import TarjetaVehiculo from './TarjetaVehiculo'
import { useEffect, useState } from "react"
import './PanelDeVehiculos.css'

function PanelDeVehiculos() {
  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://car-dealership-api-7k16.onrender.com/vehicles/?status=available")
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
  }, [])

  if (cargando) return <p>Cargando Vehiculos...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='panel-vehiculos'>
      {vehiculos.map((vehiculo) => (
        <TarjetaVehiculo
          key={vehiculo.id}
          id={vehiculo.id}
          marca={vehiculo.brand}
          modelo={vehiculo.model}
          year={vehiculo.year}
          precio={vehiculo.price}
          km={vehiculo.km}
        />
      ))}
    </div>
  )
}

export default PanelDeVehiculos