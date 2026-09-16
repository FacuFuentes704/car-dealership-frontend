import { Link } from 'react-router-dom'
import './Header.css'

function Header({ modoOscuro, setModoOscuro }) {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <span className="logo-lgi">LGi</span> <span className="logo-motors">Motors</span>
      </Link>
      <nav className="header-nav">
        <Link to="/0km">0KM</Link>
        <Link to="/usados">Usados</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/financiacion">Financiación</Link>
        <button
          onClick={() => setModoOscuro(!modoOscuro)}
          className="toggle-tema"
          aria-label="Cambiar tema"
        >
          {modoOscuro ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 4V2m0 20v-2M4.93 4.93 3.51 3.51m16.98 16.98-1.42-1.42M4 12H2m20 0h-2M4.93 19.07l-1.42 1.42M20.49 3.51l-1.42 1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  )
}

export default Header