import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import DetalleVehiculo from './components/DetalleVehiculo/DetalleVehiculo'
import Pagina0km from './components/Pagina0km/Pagina0km'
import PaginaUsados from './components/PaginaUsados/PaginaUsados'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/0km" element={<Pagina0km />} />
        <Route path="/usados" element={<PaginaUsados />} />
        <Route path="/" element={<Home />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
      </Routes>
    </div>
  )
}

export default App