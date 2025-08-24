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
          <span className="quien-somos">Quien soy</span>
        </h2>
        <p>
          Soy estudiante de la Diplomatura en Desarrollo Web Full Stack (UTN) y este sitio forma parte de mi 
          trabajo final. La idea fue practicar React, manejo de estados y diseño responsive creando una 
          tienda online sencilla.
        </p>

      </section>

      <section className="sobre-caja">
        <h2 className="sobre-titulo">
          <BookOpen size={24} weight="duotone" />
          <span>Mi historia</span>
        </h2>
       <p>
          Empecé este proyecto como un desafío personal y académico: aplicar lo aprendido en clases en algo 
          que se sienta real. Arranqué con lo básico y de a poco fui sumando rutas, login, validaciones y 
          estilos globales. Es un ejercicio de aprendizaje continuo.
        </p>

      </section>

      
    </main>
  )
}

export { SobreNosotros }
