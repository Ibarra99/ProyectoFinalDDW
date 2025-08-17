import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png" 
            alt="Logo" 
            width="120"
          />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-dark ms-2" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registrate">Registrate</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/sobre-nosotros">Sobre Nosotros</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Header };
