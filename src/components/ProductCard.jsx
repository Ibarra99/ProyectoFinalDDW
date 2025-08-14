import React from "react"
import "./ProductCard.css"

const ProductCard = ({ product, user, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <img width="120px" src={product.image} alt={`Imagen de ${product.title}`} />
      <p>${product.price}</p>
      <p>{product.description}</p>
      <p><strong>{product.category}</strong></p>
      {user && (
        <div>
          <button onClick={() => onEdit(product)}>Actualizar</button>
          <button onClick={() => onDelete(product.id)}>Borrar</button>
        </div>
      )}
    </div>
  )
}

export default ProductCard
