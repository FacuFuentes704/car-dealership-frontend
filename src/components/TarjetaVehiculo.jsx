function TarjetaVehiculo(props) {
  return (
    <div>
      <h3>{props.marca} {props.modelo}</h3>
      <p>Año: {props.year}</p>
      <p>Precio: ${props.precio}</p>
      <p>Km: {props.km}</p>
    </div>
  )
}

export default TarjetaVehiculo