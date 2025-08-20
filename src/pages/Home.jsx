// src/pages/Home.jsx
import { useEffect, useMemo, useRef, useState } from "react"
import { useAuth } from "../context/UserContext"
import ProductGrid from "../components/ProductGrid"
import { Modal as BsModal } from "bootstrap"
import "../styles/global.css"

const Home = () => {
  // estados de productos y búsqueda
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState("")

  // estados para editar (modal)
  const [productoAEditar, setProductoAEditar] = useState(null)
  const [tituloEdit, setTituloEdit] = useState("")
  const [precioEdit, setPrecioEdit] = useState("")
  const [descripcionEdit, setDescripcionEdit] = useState("")
  const [categoriaEdit, setCategoriaEdit] = useState("")
  const [imagenEdit, setImagenEdit] = useState("")
  const [errores, setErrores] = useState({})
  const [borrandoId, setBorrandoId] = useState(null)
  const [cargando, setCargando] = useState(true)

  const { user } = useAuth()
  const modalRef = useRef(null)

  // traer productos
  const traerProductos = async () => {
    try {
      setCargando(true)
      const r = await fetch("https://fakestoreapi.com/products")
      const data = await r.json()
      setProductos(data)
    } catch (e) {
      console.log("error al traer productos", e)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    traerProductos()
  }, [])

  // abrir modal con datos del producto
  const abrirEdicion = (prod) => {
    setProductoAEditar(prod)
    setTituloEdit(prod.title)
    setPrecioEdit(prod.price)
    setDescripcionEdit(prod.description)
    setCategoriaEdit(prod.category)
    setImagenEdit(prod.image)
    setErrores({})
    const m = BsModal.getOrCreateInstance(modalRef.current)
    m.show()
  }

  // cerrar modal
  const cerrarEdicion = () => {
    const m = BsModal.getOrCreateInstance(modalRef.current)
    m.hide()
  }

  // validar form simple
  const validar = () => {
    const e = {}
    if (!tituloEdit.trim()) e.titulo = "El título es obligatorio"
    if (!precioEdit || isNaN(precioEdit) || Number(precioEdit) <= 0) e.precio = "Precio inválido"
    if (!descripcionEdit.trim()) e.descripcion = "La descripción es obligatoria"
    if (!categoriaEdit.trim()) e.categoria = "La categoría es obligatoria"
    if (!imagenEdit.trim()) e.imagen = "La URL de la imagen es obligatoria"
    setErrores(e)
    return Object.keys(e).length === 0
  }

  // guardar cambios
  const guardarEdicion = async (e) => {
    e.preventDefault()
    if (!validar()) return

    const actualizado = {
      id: productoAEditar.id,
      title: tituloEdit,
      price: Number(precioEdit),
      description: descripcionEdit,
      category: categoriaEdit,
      image: imagenEdit
    }

    try {
      const r = await fetch(`https://fakestoreapi.com/products/${productoAEditar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado)
      })
      if (r.ok) {
        const data = await r.json()
        setProductos((prev) => prev.map(p => p.id === data.id ? data : p))
        cerrarEdicion()
      }
    } catch (error) {
      console.log("error al actualizar", error)
    }
  }

  // borrar
  const borrarProducto = async (id) => {
    try {
      setBorrandoId(id)
      const r = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })
      if (r.ok) setProductos((prev) => prev.filter(p => p.id !== id))
    } catch (e) {
      console.log("error al borrar", e)
    } finally {
      setBorrandoId(null)
    }
  }

  // filtro simple por título
  const listaFiltrada = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return productos
    return productos.filter(p => p.title.toLowerCase().includes(q))
  }, [productos, busqueda])

  return (
    <main className="container px-0">
      {/* home-welcome como SPAN centrado */}
      <div className="d-flex justify-content-center">
        <span className="home-welcome text-center d-block">
          Bienvenido a Nuestra Tienda
        </span>
      </div>

     {/* home-features en el medio. título centrado, items a la izquierda */}
      <section className="home-features d-flex justify-content-center">
        <div style={{ maxWidth: 900, width: "100%" }}>
          <h2 className="text-center mb-3">¿Por qué elegirnos?</h2>
          <ul className="text-start">
            <li>
              <h3 className="h6">Envíos a todo el país</h3>
              <p>Recibís tu compra en tu casa.</p>
            </li>
            <li>
              <h3 className="h6">Pagos seguros</h3>
              <p>Plataformas confiables.</p>
            </li>
            <li>
              <h3 className="h6">Atención personalizada</h3>
              <p>Te ayudamos con lo que necesites.</p>
            </li>
          </ul>
        </div>
      </section>

      <article className="card p-3">
        <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-2 mb-3">
          <h2 className="m-0">Nuestros productos</h2>
          <div style={{ minWidth: 240, width: "100%", maxWidth: 380 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar productos"
            />
          </div>
        </header>

        {cargando ? (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          <ProductGrid
            products={listaFiltrada}
            user={user}
            onEdit={abrirEdicion}
            onDelete={borrarProducto}
            deletingId={borrandoId}
          />
        )}
      </article>

      <div
        className="modal fade"
        id="modalEditar"
        tabIndex="-1"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={guardarEdicion} noValidate>
              <div className="modal-header">
                <h5 className="modal-title">Editar producto</h5>
                <button type="button" className="btn-close" onClick={cerrarEdicion} aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tituloEdit}
                    onChange={(e) => setTituloEdit(e.target.value)}
                  />
                  {errores.titulo && <small className="text-danger">{errores.titulo}</small>}
                </div>

                <div className="mb-2">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    value={precioEdit}
                    onChange={(e) => setPrecioEdit(e.target.value)}
                  />
                  {errores.precio && <small className="text-danger">{errores.precio}</small>}
                </div>

                <div className="mb-2">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={descripcionEdit}
                    onChange={(e) => setDescripcionEdit(e.target.value)}
                  />
                  {errores.descripcion && <small className="text-danger">{errores.descripcion}</small>}
                </div>

                <div className="mb-2">
                  <label className="form-label">Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    value={categoriaEdit}
                    onChange={(e) => setCategoriaEdit(e.target.value)}
                  />
                  {errores.categoria && <small className="text-danger">{errores.categoria}</small>}
                </div>

                <div className="mb-2">
                  <label className="form-label">URL de la imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imagenEdit}
                    onChange={(e) => setImagenEdit(e.target.value)}
                  />
                  {errores.imagen && <small className="text-danger">{errores.imagen}</small>}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={cerrarEdicion}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </main>
  )
}

export { Home }
