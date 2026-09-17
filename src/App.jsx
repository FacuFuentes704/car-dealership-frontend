import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LayoutAdmin from './Layouts/LayoutAdmin/LayoutAdmin'
import RutaPrivada from './admin/RutaPrivada/RutaPrivada'
import Home from './components/Home/Home'
import DetalleVehiculo from './components/DetalleVehiculo/DetalleVehiculo'
import Pagina0km from './components/Pagina0km/Pagina0km'
import PaginaUsados from './components/PaginaUsados/PaginaUsados'
import PaginaOfertas from './components/PaginaOfertas/PaginaOfertas'
import Financiacion from './components/Financiacion/Financiacion'
import Login from './admin/Login/Login'
import Dashboard from './admin/Dashboard/Dashboard'
import LayoutPublico from './Layouts/LayoutPublico/LayoutPublico'
import AdminVehiculos from './admin/Vehiculos/AdminVehiculos'
import FormularioVehiculo from './admin/FormularioVehiculo/FormularioVehiculo'

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
    <Routes>
      <Route element={<LayoutPublico modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />}>
        <Route path="/" element={<Home />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
        <Route path="/0km" element={<Pagina0km />} />
        <Route path="/usados" element={<PaginaUsados />} />
        <Route path="/ofertas" element={<PaginaOfertas />} />
        <Route path="/financiacion" element={<Financiacion />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <RutaPrivada>
            <LayoutAdmin modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
          </RutaPrivada>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/vehiculos" element={<AdminVehiculos />} />
        <Route path="/admin/vehiculos/nuevo" element={<FormularioVehiculo />} />
        <Route path="/admin/vehiculos/:id/editar" element={<FormularioVehiculo />} />
      </Route>
    </Routes>
  )
}

export default App