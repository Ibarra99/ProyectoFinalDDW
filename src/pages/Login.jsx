// src/pages/Login.jsx
import { useState } from "react"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("") 
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError("")

    const isLogin = await login(username, password)

    if (isLogin) {
      setUsername("")
      setPassword("")
      navigate("/")
    } else {
      setAuthError("Credenciales inválidas. Intente nuevamente.")
    }
  }

  return (
    <>
      <h1>Inicia sesión</h1>

      <section>
        <h2>Hola, bienvenido de nuevo</h2>
        <p>Probá con: <b>johnd</b> / <b>m38rmF$</b></p>

        <form onSubmit={handleLogin}>
          <div>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button>Ingresar</button>
        </form>

        {/* Mensaje de error */}
        {authError && <p style={{ color: "red", marginTop: "1rem" }}>{authError}</p>}
      </section>
    </>
  )
}

export { Login }
