import { useState } from "react"
import { useAuth } from "../context/UserContext"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  // estados simples para el form
  const [usuario, setUsuario] = useState("")
  const [clave, setClave] = useState("")
  const { login, authError } = useAuth()
  const navigate = useNavigate()

  // para mostrar un mini cartel si falta algo
  const [errorLocal, setErrorLocal] = useState("")

  const enviar = async (e) => {
    e.preventDefault()
    setErrorLocal("")

    // validación tranqui
    if (!usuario || !clave) {
      setErrorLocal("Completá usuario y contraseña")
      return
    }

    const ok = await login(usuario, clave)
    if (ok) {
      setUsuario("")
      setClave("")
      navigate("/")
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4 text-center mb-3">Iniciar sesión</h1>
              <p className="text-center text-muted mb-4">
                Probá con <code>johnd</code> / <code>m38rmF$</code>
              </p>

              {/* errores simples */}
              {errorLocal && (
                <div className="alert alert-warning py-2">{errorLocal}</div>
              )}
              {authError && (
                <div className="alert alert-danger py-2">{authError}</div>
              )}

              <form onSubmit={enviar} noValidate>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="tu usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="******"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Entrar
                </button>
              </form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  ¿No tenés cuenta?{" "}
                  <Link to="/registrate">Registrate acá</Link>
                </small>
              </div>
            </div>
          </div>

          <div className="text-center mt-3">
            <Link className="text-decoration-none" to="/">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Login }
