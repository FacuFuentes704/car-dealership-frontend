import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import PanelDeVehiculos from './components/PanelDeVehiculos/PanelDeVehiculos'
import DetalleVehiculo from './components/DetalleVehiculo/DetalleVehiculo'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PanelDeVehiculos />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
      </Routes>
    </div>
  )
}

export default App