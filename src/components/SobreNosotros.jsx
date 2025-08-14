// src/components/SobreNosotros.jsx
import React from "react"
import "../styles/pages/global.css"

const SobreNosotros = () => {
  return (
    <div className="sobre-nosotros-container">
      <header className="sobre-nosotros-header">
        <h1>Sobre Nosotros</h1>
        <p>Conocé más sobre nuestra tienda y nuestro equipo.</p>
      </header>

      <section className="sobre-nosotros-section">
        <h2>Nuestra Historia</h2>
        <p>
          Fundada en 2025, nuestra tienda nació con el objetivo de ofrecer productos de calidad
          con atención personalizada, cuidando siempre la experiencia del cliente.
        </p>
      </section>

      <section className="sobre-nosotros-section">
        <h2>Misión y Valores</h2>
        <p>
          Nuestra misión es acercarte productos confiables y exclusivos. Nos guiamos por la transparencia,
          el compromiso y la innovación constante para mejorar tu experiencia de compra.
        </p>
      </section>

      <section className="sobre-nosotros-section">
        <h2>Equipo</h2>
        <p>
          Contamos con un equipo apasionado y dedicado, listo para ayudarte en cada paso,
          asegurando que tu experiencia sea única y satisfactoria.
        </p>
      </section>
    </div>
  )
}

export { SobreNosotros }
