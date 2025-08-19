import React from "react"

const ProductCard = ({ product, user, onEdit, onDelete, deletingId }) => {
  const estaBorrando = deletingId === product.id

  // corto un poco la descripción
  const descripcionCorta = product?.description
    ? product.description.slice(0, 80) + (product.description.length > 80 ? "..." : "")
    : ""

  return (
    <div className="card h-100">
      {/* foto arriba */}
      <img
        src={product.image}
        className="card-img-top"
        alt={`Imagen de ${product.title}`}
        style={{ height: "180px", objectFit: "contain", padding: "1rem" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="mb-2 text-truncate">{product.title}</h6>
        <p className="text-muted small mb-2 descripcion-corta">{descripcionCorta}</p>
        <p className="fw-bold mb-3">${product.price}</p>

        {/* si estoy logueado muestro botones */}
        {user && (
          <div className="mt-auto d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => onEdit(product)}
              disabled={estaBorrando}
            >
              Actualizar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(product.id)}
              disabled={estaBorrando}
            >
              {estaBorrando ? "Borrando..." : "Borrar"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
