import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container my-4">
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <p>Verificá la URL o volvé al inicio.</p>
      <Link to="/">Ir a inicio</Link>
    </section>
  );
}

export { NotFound };
