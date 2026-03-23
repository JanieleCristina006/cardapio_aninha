import { useState, useEffect } from "react";
import { PerfilUsuario } from "./PerfilUsuario";
import { EditProfileModal } from "./EditProfileModal";

export const PerfilPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://ecommerce-api-4k6g.onrender.com/api/v1/customers/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setUsuario(data.results[0]);
    }

    loadUser();
  }, []);

  return (
    <>
      <PerfilUsuario usuario={usuario} onEdit={() => setOpenModal(true)} />

      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        usuario={usuario}
        onUpdate={(updatedUser) => setUsuario(updatedUser)}
      />
    </>
  );
};