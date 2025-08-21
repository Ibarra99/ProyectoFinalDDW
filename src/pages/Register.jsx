import { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {
  const [usuario, setUsuario] = useState("")
  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")

  const [error, setError] = useState("")
  const [okMsg, setOkMsg] = useState("")

  const enviar = (e) => {
    e.preventDefault()
    setError("")
    setOkMsg("")

    if (!usuario || !correo || !clave) {
      setError("Completá todos los campos")
      return
    }

    if (!correo.includes("@")) {
      setError("Correo inválido")
      return
    }
    if (clave.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres")
      return
    }

    setOkMsg("Usuario registrado (demo). Ahora podés iniciar sesión.")
    setUsuario("")
    setCorreo("")
    setClave("")
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4 text-center mb-3">Crear cuenta</h1>
              <p className="text-center text-muted mb-4">
                Completá tus datos para registrarte (demo)
              </p>

              {error && <div className="alert alert-warning py-2">{error}</div>}
              {okMsg && <div className="alert alert-success py-2">{okMsg}</div>}

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
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="tu@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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
                  Registrarme
                </button>
              </form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  ¿Ya tenés cuenta?{" "}
                  <Link to="/login">Ingresá acá</Link>
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

export { Register }
