// src/router/RouterApp.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { NotFound } from "../pages/NotFound";
import { PrivateRoute } from "../components/PrivateRoute";
import { SobreNosotros } from "../pages/SobreNosotros";

const RouterApp = () => (
  <BrowserRouter>
    <Routes>
      {/* Todo lo que cuelga de este Route se renderiza dentro de Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registrate" element={<Register />} />
      </Route>

      {/* 404 fuera del layout (o ponelo adentro si querés con el mismo header/footer) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export { RouterApp };
