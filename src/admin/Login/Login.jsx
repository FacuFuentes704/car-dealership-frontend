import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  function manejarSubmit(e) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.status === 429) {
          throw new Error("Demasiados intentos. Esperá un minuto e intentá de nuevo.")
        }
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.detail || "Email o contraseña incorrectos")
          })
        }
        return res.json()
      })
      .then(datos => {
        localStorage.setItem("token", datos.access_token)
        navigate("/admin")
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }

  return (
    <div className="login-container">
      <form onSubmit={manejarSubmit} className="login-form">
        <h1>Panel de Administración</h1>
        <p className="login-subtitulo">LGi Motors</p>

        <div className="login-campo">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-campo">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  )
}

export default Login