import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './PaginaOfertas.css'
import BotonWhatsApp from '../BotonWhatsapp/BotonWhatsapp'

function PaginaOfertas() {
  return (
    <div className="pagina-condicion container">
      <h1>Vehículos en Oferta</h1>
      <p>
        Aprovechá nuestras oportunidades por tiempo limitado en vehículos
        seleccionados.
      </p>
      <BotonWhatsApp mensaje="Hola, me comunico desde lgimotors.com. Estoy interesado en conocer más sobre los vehículos en oferta disponibles." />
      <PanelDeVehiculos offer={true} />
    </div>
  )
}

export default PaginaOfertas