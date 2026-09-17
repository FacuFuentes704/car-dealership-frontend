import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

function LayoutPublico({ modoOscuro, setModoOscuro }) {
  return (
    <div>
      <Header modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutPublico