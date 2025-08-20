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

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export { RouterApp };
