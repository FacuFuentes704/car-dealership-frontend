import './TarjetaVehiculo.css'
import { Link } from 'react-router-dom'

function TarjetaVehiculo(props) {
  const fotos = props.photos || []
  const fotoPrincipal = fotos.find((foto) => foto.is_main === true)

  return (
    <Link to={`/vehiculo/${props.id}`}>
      <div className="tarjeta-vehiculo">
        {fotoPrincipal ? (
          <img src={fotoPrincipal.url} alt={`${props.marca} ${props.modelo}`} />
        ) : (
          <div className="sin-foto">Sin foto</div>
        )}
        <h3>{props.marca} {props.modelo}</h3>
        <p>Año: {props.year}</p>
        <p>Precio: ${props.precio}</p>
        <p>Km: {props.km}</p>
      </div>
    </Link>
  )
}

export default TarjetaVehiculo