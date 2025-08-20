const ProductCard = ({ product, user, onEdit, onDelete, deletingId }) => {
  const estaBorrando = deletingId === product.id
  const descripcionCorta = product?.description
    ? product.description.slice(0, 80) + (product.description.length > 80 ? "..." : "")
    : ""

  return (
    <article
      className="card h-100 product-card"
      aria-busy={estaBorrando ? "true" : "false"}
      data-product-id={product.id}
    >
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top"
        loading="lazy"
        style={{ height: "180px", objectFit: "contain", padding: "1rem" }}
        width="300"
        height="180"
      />

      <div className="card-body d-flex flex-column">
        {/* título, descripción y precio */}
        <h3 className="mb-2 fs-6 text-truncate">{product.title}</h3>
        
        <p className="text-muted small mb-2" style={{ maxHeight: 60, overflow: "hidden" }}>
          {descripcionCorta}
        </p>

        <p className="fw-bold mb-3">
          <span aria-label="Precio del producto">
            <strong>${product.price}</strong>
          </span>
        </p>

        {/* acciones solo si hay usuario */}
        {user && (
          <div className="mt-auto d-flex gap-2">
            <button
              type="button"
              className="btn btn-warning btn-sm"
              onClick={() => onEdit(product)}
              disabled={estaBorrando}
            >
              Actualizar
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(product.id)}
              disabled={estaBorrando}
            >
              {estaBorrando ? "Borrando..." : "Borrar"}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProductCard
