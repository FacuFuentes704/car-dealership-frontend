import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './Pagina0km.css'

function Pagina0km() {
  return (
    <div className="pagina-condicion container">
      <h1>Vehículos 0KM</h1>
      <p>
        Nuestros vehículos 0KM cuentan con garantía de fábrica y
        financiación disponible en todas las marcas.
      </p>
      <PanelDeVehiculos condition="new" />
    </div>
  )
}

export default Pagina0km