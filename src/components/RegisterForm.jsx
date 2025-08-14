import { useState } from 'react';
import { useUser } from '../context/UserContext';

function RegisterForm() {
  const { register } = useUser();
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
