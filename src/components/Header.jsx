import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        LGi Motors
      </Link>
    </header>
  )
}

export default Header