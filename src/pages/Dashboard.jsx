import { useState } from "react"

const Dashboard = () => {
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [descripcion, setDescripcion] = useState("")

  const [error, setError] = useState("")
  const [okMsg, setOkMsg] = useState("")
  const [cargando, setCargando] = useState(false)

  const validar = () => {
    if (!nombre || !precio || !descripcion) {
      setError("Completá todos los campos")
      return false
    }
    if (nombre.trim().length < 4) {
      setError("El nombre debe tener al menos 4 caracteres")
      return false
    }
    if (Number(precio) <= 0 || isNaN(Number(precio))) {
      setError("El precio debe ser un número mayor a 0")
      return false
    }
    return true
  }

  const enviar = async (e) => {
    e.preventDefault()
    setError("")
    setOkMsg("")

    if (!validar()) return

    const nuevo = {
      title: nombre,
      price: Number(precio),
      description: descripcion,
      category: "",
      image: ""
    }

    try {
      setCargando(true)
      const r = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      })
      await r.json()
      setOkMsg("Producto creado (demo)")
      setNombre("")
      setPrecio("")
      setDescripcion("")
    } catch (e) {
      setError("No se pudo crear el producto. Probá de nuevo.")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="container my-5">
      <h1 className="h4 mb-4">Panel de administración</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">Cargar nuevo producto</h2>

          {error && <div className="alert alert-warning py-2">{error}</div>}
          {okMsg && <div className="alert alert-success py-2">{okMsg}</div>}

          <form onSubmit={enviar} noValidate>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Remera básica"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 9999"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Contá un poco del producto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100" disabled={cargando}>
              {cargando ? "Guardando..." : "Guardar producto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { Dashboard }
