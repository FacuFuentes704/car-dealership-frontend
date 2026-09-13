import Hero from '../Hero/Hero'
import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import './Home.css'
import PorQueElegirnos from '../PorQueElegirnos/PorQueElegirnos'

function Home() {
  return (
    <div>
      <Hero />
      <section id="catalogo" className="catalogo-section container">
        <h2 className="catalogo-title">Vehículos disponibles</h2>
        <PanelDeVehiculos />
      </section>
      <PorQueElegirnos />
    </div>
  )
}

export default Home