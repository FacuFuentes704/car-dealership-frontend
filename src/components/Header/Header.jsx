import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
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
      </nav>
    </header>
  )
}

export default Header