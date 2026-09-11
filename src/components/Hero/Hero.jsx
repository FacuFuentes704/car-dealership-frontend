import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-bar" />
        <h1 className="hero-title">
          Autos de confianza, listos para la ruta.
        </h1>
        <p className="hero-sub">
          En LGi Motors revisamos cada unidad antes de ofrecerla.
          Explorá el catálogo y encontrá el auto que estabas buscando.
        </p>
        <a href="#catalogo" className="hero-cta">Ver catálogo</a>
      </div>
    </section>
  )
}

export default Hero