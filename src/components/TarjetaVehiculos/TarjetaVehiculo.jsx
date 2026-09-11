import './TarjetaVehiculo.css'
import { Link } from 'react-router-dom'

function TarjetaVehiculo(props) {
  const fotos = props.photos || []
  const fotoPrincipal = fotos.find((foto) => foto.is_main === true)

  return (
    <Link to={`/vehiculo/${props.id}`} className="tarjeta-link">
      <article className="tarjeta-vehiculo">
        <div className="tarjeta-imagen">
          {fotoPrincipal ? (
            <img src={fotoPrincipal.url} alt={`${props.marca} ${props.modelo}`} />
          ) : (
            <div className="sin-foto">Sin foto</div>
          )}
          <span className="tarjeta-precio">
            ${Number(props.precio).toLocaleString('es-AR')}
          </span>
        </div>
        <div className="tarjeta-info">
          <h3>{props.marca} {props.modelo}</h3>
          <p className="tarjeta-specs">
            <span>{props.year}</span>
            <span>{Number(props.km).toLocaleString('es-AR')} km</span>
          </p>
        </div>
      </article>
    </Link>
  )
}

export default TarjetaVehiculo