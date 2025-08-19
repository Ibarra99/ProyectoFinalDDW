import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/UserContext";
import ProductGrid from "../components/ProductGrid";
import "../styles/pages/global.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [errors, setErrors] = useState({});

  const { user } = useAuth();

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => { fetchingProducts(); }, []);

  // debounce 300ms
  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOpenEdit = (product) => {
    setShowPopup(true);
    setProductToEdit(product);
    setTitleEdit(product.title);
    setPriceEdit(product.price);
    setDescriptionEdit(product.description);
    setCategoryEdit(product.category);
    setImageEdit(product.image);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!titleEdit.trim()) newErrors.title = "El título es obligatorio";
    if (!priceEdit || isNaN(priceEdit) || Number(priceEdit) <= 0) newErrors.price = "Ingrese un precio válido";
    if (!descriptionEdit.trim()) newErrors.description = "La descripción es obligatoria";
    if (!categoryEdit.trim()) newErrors.category = "La categoría es obligatoria";
    if (!imageEdit.trim()) newErrors.image = "La URL de la imagen es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit,
    };

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProducts((prev) => prev.map((p) => (p.id === productToEdit.id ? data : p)));
        setShowPopup(false);
        setErrors({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) => product.title.toLowerCase().includes(q));
  }, [products, debounced]);

  return (
    <>
      <section className="home-welcome">
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
      </section>

      <section className="home-features">
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>
            <h3>Envíos a todo el país</h3>
            <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
          </li>
          <li>
            <h3>Pagos seguros</h3>
            <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
          </li>
          <li>
            <h3>Atención personalizada</h3>
            <p>Estamos disponibles para ayudarte en todo momento.</p>
          </li>
        </ul>
      </section>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar productos"
        />
      </div>

      <section className="home-products">
        <h2>Nuestros productos</h2>
        <p>Elegí entre nuestras categorías más populares.</p>

        {showPopup && (
          <div className="popup-overlay" role="dialog" aria-modal="true">
            <section className="popup-edit">
              <h2>Editando producto</h2>
              <button onClick={() => setShowPopup(false)}>Cerrar</button>
              <form onSubmit={handleUpdate} noValidate>
                <input type="text" placeholder="Ingrese el título" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
                {errors.title && <p className="error">{errors.title}</p>}

                <input type="number" placeholder="Ingrese el precio" value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} />
                {errors.price && <p className="error">{errors.price}</p>}

                <textarea placeholder="Ingrese la descripción" value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} />
                {errors.description && <p className="error">{errors.description}</p>}

                <input type="text" placeholder="Ingrese la categoría" value={categoryEdit} onChange={(e) => setCategoryEdit(e.target.value)} />
                {errors.category && <p className="error">{errors.category}</p>}

                <input type="text" placeholder="Ingrese la URL de la imagen" value={imageEdit} onChange={(e) => setImageEdit(e.target.value)} />
                {errors.image && <p className="error">{errors.image}</p>}

                <button>Actualizar</button>
              </form>
            </section>
          </div>
        )}

        <ProductGrid
          products={filteredProducts}
          user={user}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </section>
    </>
  );
};

export { Home };
