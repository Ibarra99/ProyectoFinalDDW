import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }

    const newUser = {
      email,
      username,
      password,
      name: { firstname: "test", lastname: "user" }, 
      address: {
        city: "test city",
        street: "test street",
        number: 123,
        zipcode: "12345",
        geolocation: { lat: "0", long: "0" }
      },
      phone: "123456789"
    }

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Usuario creado:", data)
        setSuccess("Usuario registrado con éxito. Redirigiendo...")
        setUsername("")
        setEmail("")
        setPassword("")

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      } else {
        setError("Hubo un problema al registrar el usuario")
      }
    } catch (err) {
      console.error(err)
      setError("Error de conexión con el servidor")
    }
  }

  return (
    <>
      <h1>Registrate</h1>
      <section>
        <h2>Hola, bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
          <button>Registrar</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </section>
    </>
  )
}

export { Register }
