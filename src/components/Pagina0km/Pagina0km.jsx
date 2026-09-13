import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './Pagina0km.css'
import { Link } from 'react-router-dom'

function Pagina0km() {
  return (
    <div className="pagina-condicion container">
      <h1>Vehículos 0KM</h1>
      <p>
        Nuestros vehículos 0KM cuentan con garantía de fábrica y
        financiación disponible en todas las marcas.
      </p>
      <Link to="/financiacion#0km" className="pagina-condicion-link">
        Ver opciones de financiación
      </Link>
      <PanelDeVehiculos condition="new" />
    </div>
  )
}

export default Pagina0km
