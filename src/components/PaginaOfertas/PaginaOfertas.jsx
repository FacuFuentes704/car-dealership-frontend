import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './PaginaOfertas.css'

function PaginaOfertas() {
  return (
    <div className="pagina-condicion container">
      <h1>Vehículos en Oferta</h1>
      <p>
        Aprovechá nuestras oportunidades por tiempo limitado en vehículos
        seleccionados.
      </p>
      <PanelDeVehiculos offer={true} />
    </div>
  )
}

export default PaginaOfertas