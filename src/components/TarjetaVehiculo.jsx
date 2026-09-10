import './TarjetaVehiculo.css'
import { Link } from 'react-router-dom'

function TarjetaVehiculo(props) {
  return (
    <Link to={`/vehiculo/${props.id}`}>
      <div className="tarjeta-vehiculo">
        <h3>{props.marca} {props.modelo}</h3>
        <p>Año: {props.year}</p>
        <p>Precio: ${props.precio}</p>
        <p>Km: {props.km}</p>
      </div>
    </Link>
  )
}

export default TarjetaVehiculo