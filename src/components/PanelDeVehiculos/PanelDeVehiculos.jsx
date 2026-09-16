import TarjetaVehiculo from '../TarjetaVehiculos/TarjetaVehiculo'
import { useEffect, useState } from "react"
import './PanelDeVehiculos.css'

function PanelDeVehiculos({ condition, offer }) {
  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const [transmision, setTransmision] = useState("")
  const [anio, setAnio] = useState("")
  const [precioMin, setPrecioMin] = useState("")
  const [precioMax, setPrecioMax] = useState("")

  const anioActual = new Date().getFullYear()
  const anios = []
  for (let a = anioActual; a >= 1990; a--) {
    anios.push(a)
  }

  useEffect(() => {
    setCargando(true)
    let url = `https://car-dealership-api-7k16.onrender.com/vehicles/?status=available`
    if (condition) url += `&condition=${condition}`
    if (offer) url += `&is_offer=true`
    if (busqueda) url += `&search=${busqueda}`
    if (transmision) url += `&transmission=${transmision}`
    if (anio) url += `&year=${anio}`
    if (precioMin) url += `&price_min=${precioMin}`
    if (precioMax) url += `&price_max=${precioMax}`

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
  }, [condition, offer, busqueda, transmision, anio, precioMin, precioMax])

  return (
    <div>
      <div className="controles-catalogo">
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        <button
          onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
          className="boton-filtros"
        >
          Filtros {filtrosAbiertos ? "▲" : "▼"}
        </button>
      </div>

      {filtrosAbiertos && (
        <div className="panel-filtros">
          <div className="filtro-campo">
            <label>Transmisión</label>
            <select value={transmision} onChange={(e) => setTransmision(e.target.value)}>
              <option value="">Todas</option>
              <option value="automatic">Automática</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div className="filtro-campo">
            <label>Año</label>
            <select value={anio} onChange={(e) => setAnio(e.target.value)}>
              <option value="">Todos</option>
              {anios.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="filtro-campo">
            <label>Precio mínimo</label>
            <input
              type="number"
              placeholder="Ej: 10000000"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
            />
          </div>
          <div className="filtro-campo">
            <label>Precio máximo</label>
            <input
              type="number"
              placeholder="Ej: 30000000"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>
        </div>
      )}

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
              esOferta={vehiculo.is_offer}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PanelDeVehiculos