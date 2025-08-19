import React from "react"
import ProductCard from "./ProductCard"

const ProductGrid = ({ products, user, onEdit, onDelete, deletingId }) => {
  // grilla responsive: 1 col en celu, 2 en tablet, 4 en desktop
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
      {products.map(prod => (
        <div className="col" key={prod.id}>
          <ProductCard
            product={prod}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            deletingId={deletingId}
          />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
