import Hero from '../Hero/Hero'
import PorQueElegirnos from '../PorQueElegirnos/PorQueElegirnos'
import PanelDeVehiculos from '../PanelDeVehiculos/PanelDeVehiculos'
import useEnPantalla from '../../hooks/useEnPantalla'
import './Home.css'
import useTitulo from '../../hooks/useTitulo'

function Home() {
  useTitulo("LGi Motors - Agencia de Autos en Venado Tuerto")

  const [refOfertas, visibleOfertas] = useEnPantalla()
  const [refCatalogo, visibleCatalogo] = useEnPantalla()

  return (
    <div>
      <Hero />

      <section
        ref={refOfertas}
        className={`ofertas-section container ${visibleOfertas ? 'visible' : ''}`}
      >
        <div className="ofertas-titulo">
          <span className="ofertas-barra" />
          <h2 className="catalogo-title">Ofertas de la semana</h2>
        </div>
        <PanelDeVehiculos offer={true} />
      </section>

      <section
        ref={refCatalogo}
        id="catalogo"
        className={`catalogo-section container ${visibleCatalogo ? 'visible' : ''}`}
      >
        <h2 className="catalogo-title">Vehículos disponibles</h2>
        <PanelDeVehiculos />
      </section>

      <PorQueElegirnos />
    </div>
  )
}

export default Home