import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div className="footer-col">
          <h3 className="footer-logo">
            <span className="logo-lgi">LGi</span> <span className="logo-motors">Motors</span>
          </h3>
          <p>15 años de trayectoria en Venado Tuerto, Santa Fe.</p>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Santa+Fe+2546+Venado+Tuerto+Santa+Fe"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item"
          >
            <svg viewBox="0 0 24 24" className="footer-icon" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            Santa Fe 2546, Venado Tuerto
          </a>

          <a href="tel:+543462260147" className="footer-item">
            <svg viewBox="0 0 24 24" className="footer-icon" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2z" />
            </svg>
            3462 26-0147
          </a>
          <div className="footer-item">
            <svg viewBox="0 0 24 24" className="footer-icon" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            09 a 12:30 hs / 16 a 20 hs
          </div>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <Link to="/0km">0KM</Link>
          <Link to="/usados">Usados</Link>
          <Link to="/ofertas">Ofertas</Link>
          <Link to="/financiacion">Financiación</Link>
        </div>

        <div className="footer-col">
          <h4>Seguinos</h4>
          <a
            href="https://www.instagram.com/lgi.motors/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item"
          >
            <svg viewBox="0 0 24 24" className="footer-icon" fill="currentColor">
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.048 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.048-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5zM17.5 5.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
            </svg>
            Instagram
          </a>
          <a
            href="https://www.facebook.com/leonel.pereyra.vazquez.2025/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item"
          >
            <svg viewBox="0 0 24 24" className="footer-icon" fill="currentColor">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
            </svg>
            Facebook
          </a>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} LGi Motors. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer