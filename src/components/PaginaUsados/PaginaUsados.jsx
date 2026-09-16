import { useEffect } from 'react'
import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './PaginaUsados.css'
import BotonWhatsApp from '../BotonWhatsapp/BotonWhatsapp'

function PaginaUsados() {
  useEffect(() => {
    document.title = "Vehículos Usados - LGi Motors"
  }, [])

  return (
    <div className="pagina-condicion container">
      <h1>Vehículos Usados</h1>
      <p>
        Todos nuestros usados pasan por una revisión mecánica completa
        antes de estar disponibles para la venta.
      </p>
      <BotonWhatsApp mensaje="Hola, me comunico desde lgimotors.com. Estoy interesado en conocer más sobre los vehículos usados disponibles." />
      <PanelDeVehiculos condition="used" />
    </div>
  )
}

export default PaginaUsados