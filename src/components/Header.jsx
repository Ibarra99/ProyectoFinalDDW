import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import { SquaresFour, House, Info, UserCircle, SignIn, SignOut } from "phosphor-react"

const Header = () => {
  const { user, logout } = useAuth()

  const cerrarSesion = () => {
    logout()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <SquaresFour size={20} weight="fill" />
          <span>Tienda UTN</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/">
                <House size={18} /> Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/sobre-nosotros">
                <Info size={18} /> Sobre Nosotros
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/dashboard">
                    <UserCircle size={18} /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1 ms-lg-2"
                    onClick={cerrarSesion}
                  >
                    <SignOut size={18} /> Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/login">
                    <SignIn size={18} /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-dark btn-sm ms-lg-2" to="/registrate">
                    Registrate
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export { Header }
