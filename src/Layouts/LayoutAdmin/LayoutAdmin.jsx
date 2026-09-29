import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logoClaro from '../../assets/logo-lgi-motors.png'
import logoOscuro from '../../assets/logo-lgi-motors-dark.png'
import './LayoutAdmin.css'

function LayoutAdmin({ modoOscuro, setModoOscuro }) {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  function cerrarSesion() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="layout-admin">
      <button
        onClick={() => setMenuAbierto(true)}
        className="sidebar-toggle-mobile"
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {menuAbierto && (
        <div className="sidebar-overlay" onClick={() => setMenuAbierto(false)} />
      )}

      <aside className={`sidebar ${menuAbierto ? "sidebar-abierto" : ""}`}>
        <img
          src={modoOscuro ? logoOscuro : logoClaro}
          alt="LGi Motors"
          className="sidebar-logo"
        />

        <nav className="sidebar-nav" onClick={() => setMenuAbierto(false)}>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/vehiculos">Vehículos</Link>
          <Link to="/admin/clientes">Clientes</Link>
          <Link to="/admin/ventas">Ventas</Link>
          <Link to="/admin/boletos">Boletos</Link>
          <Link to="/admin/configuracion">Configuración</Link>
        </nav>

        <button onClick={() => setModoOscuro(!modoOscuro)} className="sidebar-toggle-tema">
          {modoOscuro ? "Modo claro" : "Modo oscuro"}
        </button>

        <button onClick={cerrarSesion} className="sidebar-salir">
          Cerrar sesión
        </button>
      </aside>

      <main className="contenido-admin">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin