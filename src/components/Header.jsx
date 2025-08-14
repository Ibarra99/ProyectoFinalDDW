import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header style={{ backgroundColor: "lightblue" }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png" alt="imagen de logo" />
      <nav>
        <ul>
          {/* Links visibles solo si hay usuario */}
          {user && (
            <>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/sobrenosotros">Sobre Nosotros</Link></li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          )}
          {/* Links visibles si no hay usuario */}
          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registrate">Registrate</Link></li>
              <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export { Header }

