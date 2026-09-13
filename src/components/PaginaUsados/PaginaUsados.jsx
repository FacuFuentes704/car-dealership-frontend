import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './PaginaUsados.css'
import { Link } from 'react-router-dom'

function PaginaUsados() {
  return (
    <div className="pagina-condicion container">
      <h1>Vehículos Usados</h1>
      <p>
        Todos nuestros usados pasan por una revisión mecánica completa
        antes de estar disponibles para la venta.
      </p>
      <Link to="/financiacion#0km" className="pagina-condicion-link">
        Ver opciones de financiación
      </Link>
      <PanelDeVehiculos condition="used" />
    </div>
  )
}

export default PaginaUsados