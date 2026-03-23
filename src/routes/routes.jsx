import { Routes, Route } from "react-router-dom";

import { Layout } from "../components/layout/Layout.jsx"; 
import { Home } from "../pages/Home";
import { PerfilPage } from "../pages/ProfileUser/PerfilPage.jsx";
import { Login } from "../pages/usuario/Login.jsx";
import { Cadastrar } from "../pages/usuario/CadastrarUsuario.jsx";

function Router() {
  return (
    <Routes>

      {/* ROTAS COM HEADER + BOTTOM */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Route>

      {/* ROTAS SEM LAYOUT */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />

    </Routes>
  );
}

export default Router;