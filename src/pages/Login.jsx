import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, authError } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const isLogin = await login(username, password);
    if (isLogin) {
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <section className="container my-4">
      <h1>Inicia sesión</h1>
      <section>
        <h2>Hola, bienvenido de nuevo</h2>
        <p><code>johnd</code>, <code>m38rmF$</code></p>
        <form onSubmit={handleLogin} noValidate>
          <div>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              minLength={4}
            />
          </div>
          {authError && <p className="error" role="alert">{authError}</p>}
          <button>Ingresar</button>
        </form>
      </section>
    </section>
  );
};

export { Login };
