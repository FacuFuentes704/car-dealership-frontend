import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function DetalleVehiculo() {
    const { id } = useParams()
    const [vehiculo, setVehiculo] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch (`https://car-dealership-api-7k16.onrender.com/vehicles/${id}/`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Vehiculo no encontrado")
            }
            return res.json()
        })
        .then(datos => {
            setVehiculo(datos)
            setCargando(false)
        })
        .catch(err => {
            setError(err.message)
            setCargando(false)
        })
    }, [id])
    if (cargando) return <p>Cargando vehiculo...</p>
    if (error) return <p>Error: {error}</p>

    return (
    <div>
      <h2>{vehiculo.brand} {vehiculo.model}</h2>
      <p>Año: {vehiculo.year}</p>
      <p>Precio: ${vehiculo.price}</p>
      <p>Km: {vehiculo.km}</p>
      <p>Color: {vehiculo.color}</p>
      <p>Combustible: {vehiculo.fuel_type}</p>
      <p>Transmisión: {vehiculo.transmission}</p>
      <p>Descripción: {vehiculo.description}</p>
    </div>
    )
}

export default DetalleVehiculo