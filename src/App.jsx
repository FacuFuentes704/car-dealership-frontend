import { Routes, Route } from 'react-router-dom'
import PanelDeVehiculos from './components/PanelDeVehiculos'
import DetalleVehiculo from './components/DetalleVehiculo'

function App() {
  return (
    <div>
      <h1>Agencia de Autos</h1>
      <Routes>
        <Route path="/" element={<PanelDeVehiculos />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
      </Routes>
    </div>
  )
}

export default App