import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-dark pt-4 mt-5">
      <div className="container">
        <div className="row gy-3">
          <div className="col-md-4">
            <h6 className="text-uppercase text-muted">Links rápidos</h6>
            <ul className="list-unstyled mb-0">
              <li><Link to="/" className="text-dark text-decoration-none">Inicio</Link></li>
              <li><Link to="/dashboard" className="text-dark text-decoration-none">Dashboard</Link></li>
              <li><Link to="/sobre-nosotros" className="text-dark text-decoration-none">Sobre Nosotros</Link></li>
              <li><Link to="/login" className="text-dark text-decoration-none">Login</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="text-uppercase text-muted">Contacto</h6>
            <p className="mb-1">Email: contacto@tienda.com</p>
            <p className="mb-1">Tel: +54 9 1234 5678</p>
            <p className="mb-0">Río Gallegos, Santa Cruz</p>
          </div>

          <div className="col-md-4">
            <h6 className="text-uppercase text-muted">Seguinos</h6>
            <div className="d-flex gap-3">
              <a href="#" className="link-secondary">Facebook</a>
              <a href="#" className="link-secondary">Instagram</a>
              <a href="#" className="link-secondary">Twitter</a>
            </div>
          </div>
        </div>

        <hr className="my-3" />
        <div className="d-flex justify-content-between align-items-center pb-3 small text-muted">
          <span>&copy; {new Date().getFullYear()} Tienda Virtual UTN.</span>
          <span>Roberto E. Ibarra</span>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
