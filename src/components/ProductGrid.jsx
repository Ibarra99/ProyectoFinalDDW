import React from "react"
import ProductCard from "./ProductCard"
import "./ProductGrid.css"

const ProductGrid = ({ products, user, onEdit, onDelete }) => {
  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProductGrid
