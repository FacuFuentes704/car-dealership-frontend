import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './PaginaUsados.css'

function PaginaUsados() {
  return (
    <div className="pagina-condicion container">
      <h1>Vehículos Usados</h1>
      <p>
        Todos nuestros usados pasan por una revisión mecánica completa
        antes de estar disponibles para la venta.
      </p>
      <PanelDeVehiculos condition="used" />
    </div>
  )
}

export default PaginaUsados