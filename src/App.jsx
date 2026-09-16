import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import DetalleVehiculo from './components/DetalleVehiculo/DetalleVehiculo'
import Pagina0km from './components/Pagina0km/Pagina0km'
import PaginaUsados from './components/PaginaUsados/PaginaUsados'
import PaginaOfertas from './components/PaginaOfertas/PaginaOfertas'
import Financiacion from './components/Financiacion/Financiacion'
import Footer from './components/Footer/Footer'

function App() {
  const [modoOscuro, setModoOscuro] = useState(false)

  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add('modo-oscuro')
    } else {
      document.body.classList.remove('modo-oscuro')
    }
  }, [modoOscuro])

  return (
    <div>
      <Header modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
        <Route path="/0km" element={<Pagina0km />} />
        <Route path="/usados" element={<PaginaUsados />} />
        <Route path="/ofertas" element={<PaginaOfertas />} />
        <Route path="/financiacion" element={<Financiacion />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App