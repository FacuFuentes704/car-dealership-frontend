import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <span className="logo-lgi">LGi</span> <span className="logo-motors">Motors</span>
      </Link>
    </header>
  )
}

export default Header