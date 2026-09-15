import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout.jsx";
import { Home } from "../pages/Home";
import { PerfilPage } from "../pages/ProfileUser/PerfilPage.jsx";
import { Cadastrar } from "../pages/usuario/CadastrarUsuario.jsx";
import { Login } from "../pages/usuario/Login.jsx";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
    </Routes>
  );
}

export default Router;
