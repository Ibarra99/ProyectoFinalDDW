import React from "react"
import { UsersThree, BookOpen, Star } from "@phosphor-icons/react"

const SobreNosotros = () => {
  return (
    <main className="sobre-nosotros">
      <header>
        <h1>Sobre Nosotros</h1>
      </header>

      <section className="sobre-caja">
        <h2 className="sobre-titulo">
          <UsersThree size={24} weight="duotone" />
          <span className="quien-somos">Quiénes somos</span>
        </h2>
        <p>
          Somos una tienda que busca ofrecer productos de calidad y una experiencia de compra
          simple, sin vueltas. Atendemos consultas y tratamos de resolver rápido.
        </p>
      </section>

      <section className="sobre-caja">
        <h2 className="sobre-titulo">
          <BookOpen size={24} weight="duotone" />
          <span>Nuestra historia</span>
        </h2>
        <p>
          Arrancamos como un proyecto chico y fuimos creciendo con la comunidad. Escuchamos a los
          clientes y vamos ajustando lo necesario.
        </p>
      </section>

      <section className="sobre-caja">
        <h2 className="sobre-titulo">
          <Star size={24} weight="duotone" />
          <span>Qué nos diferencia</span>
        </h2>
        <p>
          Envíos a todo el país, atención personalizada y ganas de mejorar. Tratamos de mantener
          precios justos y publicar info clara.
        </p>
      </section>
    </main>
  )
}

export { SobreNosotros }
