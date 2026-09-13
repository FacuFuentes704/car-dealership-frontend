import './Financiacion.css'

function Financiacion() {
  return (
    <div className="financiacion container">
      <h1>Financiación</h1>
      <p className="financiacion-intro">
        En LGi Motors trabajamos con distintas alternativas para que puedas
        acceder a tu próximo vehículo de la forma que más te convenga.
      </p>

      <section id="0km" className="financiacion-seccion">
        <h2>Financiación para 0KM</h2>
        <p>
          Contamos con créditos prendarios, personales y financiación propia
          para nuestra línea de vehículos 0KM. Consultanos las condiciones
          específicas para la marca y modelo que estés buscando.
        </p>
      </section>

      <section id="usados" className="financiacion-seccion">
        <h2>Financiación para Usados</h2>
        <p>
          También ofrecemos financiación propia y créditos personales para
          nuestra selección de vehículos usados, revisados y listos para
          entregar.
        </p>
      </section>

      <a
        href="https://wa.me/543462260147"
        target="_blank"
        rel="noopener noreferrer"
        className="financiacion-cta"
      >
        Consultanos por WhatsApp
      </a>
    </div>
  )
}

export default Financiacion