import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);       // { token } | null
  const [authError, setAuthError] = useState(""); // opcional para mostrar errores en Login

  // Cargar sesión desde localStorage (autologin)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const login = async (username, password) => {
    setAuthError("");
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setAuthError("Usuario o contraseña inválidos");
        return false;
      }

      const data = await response.json(); // { token }
      if (!data?.token) {
        setAuthError("Respuesta inválida del servidor");
        return false;
      }

      localStorage.setItem("token", data.token);
      setUser({ token: data.token });
      return true;
    } catch (e) {
      setAuthError("Error de conexión. Intentá nuevamente.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ login, logout, user, authError }}>
      {props.children}
    </UserContext.Provider>
  );
};

const useAuth = () => useContext(UserContext);

export { UserProvider, useAuth };
