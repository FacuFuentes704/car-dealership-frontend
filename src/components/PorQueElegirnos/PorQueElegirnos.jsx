import './PorQueElegirnos.css'
import useEnPantalla from '../../hooks/useEnPantalla'

function PorQueElegirnos() {
    const [ref, visible] = useEnPantalla()

    return(
        <section ref={ref} className={`por-que container ${visible ? 'visible' : ''}`}>
            <h2>Por que elegirnos</h2>
            <div className="por-que-grid">
                <div className="por-que-item">
                    <h3>Recibimos tu usado</h3>
                    <p>
                        Aceptamos tu vehiculo actual como parte de pago de cualquier
                        modelo o año, y también recibimos motos.
                    </p>
                </div>
                <div className="por-que-item">
                    <h3>Atención personalizada</h3>
                    <p>
                        Te acomopañamos en todo el proceso para encontrar el vehículo
                        que mejor se ajuste a lo que estás buscando.
                    </p>
                </div>
                <div className="por-que-item">
                    <h3>Gestoría propia</h3>
                    <p>
                        Nos encargamos de toda la gestoría para que puedas subirte a
                        tu próximo auto de forma rápida y sin trámites extra.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PorQueElegirnos