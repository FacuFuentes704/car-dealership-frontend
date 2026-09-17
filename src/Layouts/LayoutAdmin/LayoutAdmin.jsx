import { Outlet } from 'react-router-dom'
import './LayoutAdmin.css'

function LayoutAdmin({ modoOscuro, setModoOscuro }) {
  return (
    <div className="layout-admin">
      <aside className="sidebar">
        {/* acá va el menú lateral, lo armamos en el próximo paso */}
      </aside>
      <main className="contenido-admin">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin