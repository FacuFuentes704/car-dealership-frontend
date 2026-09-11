import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import DetalleVehiculo from './components/DetalleVehiculo/DetalleVehiculo'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
      </Routes>
    </div>
  )
}

export default App