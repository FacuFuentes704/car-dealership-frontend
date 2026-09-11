import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-bar" />
        <h1 className="hero-title">
          Tu próximo auto te está esperando.
        </h1>
        <p className="hero-sub">
          15 años de trayectoria en Venado Tuerto. Más de 50 vehículos en stock,
          entre todas las marcas y modelos, con financiación propia disponible.
        </p>
        <a href="#catalogo" className="hero-cta">Ver catálogo</a>
      </div>
    </section>
  )
}

export default Hero