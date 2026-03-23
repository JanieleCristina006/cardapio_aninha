import { useState, useEffect } from "react";
import { X, Camera } from "lucide-react";
import toast from "react-hot-toast";

export function EditProfileModal({ open, onClose, usuario, onUpdate }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    house_number: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (usuario) {
      console.log("👤 Usuario carregado:", usuario);

      setForm({
        name: usuario.name || "",
        phone: usuario.phone || "",
        address: usuario.address || "",
        house_number: usuario.house_number || "",
      });

      setPreview(usuario.avatar_url);
    }
  }, [usuario]);

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    console.log("📸 Imagem selecionada:", file);

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    console.log("🖼️ Preview gerado:", previewUrl);

    setPreview(previewUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      console.log("🔐 Token:", token);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("house_number", form.house_number);

      if (image) {
        formData.append("image", image); // 🔥 CORRETO
      }

      // 🔍 DEBUG FORM DATA
      console.log("📦 Enviando FormData:");
      for (let pair of formData.entries()) {
        console.log("➡️", pair[0], pair[1]);
      }

      const response = await fetch(
        `https://ecommerce-api-4k6g.onrender.com/api/v1/customers/${usuario.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log("📡 Status da resposta:", response.status);

      const data = await response.json();

      console.log("📥 Resposta da API:", data);

      if (!response.ok) {
        throw new Error(data?.detail || "Erro ao atualizar");
      }

      const updatedUser = Array.isArray(data) ? data[0] : data;

      console.log("✅ Usuario atualizado:", updatedUser);

      toast.success("Perfil atualizado! 🎉");

      onUpdate({
        ...usuario,
        ...updatedUser,
        avatar_url: preview,
      });

      onClose();
    } catch (err) {
      console.error("❌ ERRO:", err);
      toast.error(err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl">
        
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Editar perfil</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FOTO */}
        <div className="mb-6 flex justify-center">
          <label className="relative cursor-pointer">
            
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-pink-100">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  Foto
                </div>
              )}
            </div>

            <div className="absolute bottom-0 right-0 rounded-full bg-pink-500 p-2 text-white shadow">
              <Camera size={16} />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefone"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Endereço"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
          />

          <input
            name="house_number"
            value={form.house_number}
            onChange={handleChange}
            placeholder="Número"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
          />

          <button className="w-full rounded-lg bg-pink-500 py-3 text-white hover:bg-pink-600">
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}