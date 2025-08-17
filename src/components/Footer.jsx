import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-4 mt-5 shadow-sm">
      <div className="container">
        <div className="row">
          {/* Sección de links rápidos */}
          <div className="col-md-4 mb-3">
            <h5>Links rápidos</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark text-decoration-none">Inicio</Link></li>
              <li><Link to="/dashboard" className="text-dark text-decoration-none">Dashboard</Link></li>
              <li><Link to="/sobre-nosotros" className="text-dark text-decoration-none">Sobre Nosotros</Link></li>
              <li><Link to="/login" className="text-dark text-decoration-none">Login</Link></li>
            </ul>
          </div>

          {/* Sección de contacto */}
          <div className="col-md-4 mb-3">
            <h5>Contacto</h5>
            <p>Email: contacto@tienda.com</p>
            <p>Tel: +54 9 1234 5678</p>
            <p>Dirección: Río Gallegos, Santa Cruz</p>
          </div>

          {/* Sección de redes sociales */}
          <div className="col-md-4 mb-3">
            <h5>Síguenos</h5>
            <a href="#" className="text-dark me-3">Facebook</a>
            <a href="#" className="text-dark me-3">Instagram</a>
            <a href="#" className="text-dark">Twitter</a>
          </div>
        </div>

        <hr />

        <div className="text-center pb-3">
          &copy; {new Date().getFullYear()} Tienda Virtual UTN. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export { Footer };
