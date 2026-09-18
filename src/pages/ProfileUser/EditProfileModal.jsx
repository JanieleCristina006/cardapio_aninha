import { useState } from "react";
import { Camera, X } from "lucide-react";
import toast from "react-hot-toast";
import { updateCustomerProfile } from "../../services/api";

export function EditProfileModal({ open, onClose, usuario, onUpdate }) {
  if (!open) return null;

  return (
    <EditProfileModalContent
      key={usuario?.id || "profile"}
      onClose={onClose}
      usuario={usuario}
      onUpdate={onUpdate}
    />
  );
}

function splitName(name = "") {
  const [firstName = "", ...rest] = name.split(" ");
  return {
    first_name: firstName,
    last_name: rest.join(" "),
  };
}

function EditProfileModalContent({ onClose, usuario, onUpdate }) {
  const fallbackName = splitName(usuario?.name);
  const [form, setForm] = useState(() => ({
    first_name: usuario?.first_name || fallbackName.first_name,
    last_name: usuario?.last_name || fallbackName.last_name,
    phone: usuario?.phone || "",
    address: usuario?.address || "",
    house_number: usuario?.house_number || "",
  }));
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(() => usuario?.avatar_url || "");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const updatedProfile = await updateCustomerProfile(usuario.id, form, image);
      onUpdate(updatedProfile);
      toast.success("Perfil atualizado");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="bottom-sheet-overlay absolute inset-0 bg-black/45"
        onClick={onClose}
        aria-label="Fechar modal"
      />

      <div className="bottom-sheet-panel absolute inset-x-0 bottom-0 mx-auto flex max-h-[88dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl">
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-bold text-neutral-950">Editar perfil</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-500 transition hover:text-neutral-900"
            aria-label="Fechar"
          >
            <X size={22} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-2 pt-5">
          <div className="mb-6 flex justify-center">
            <label className="relative cursor-pointer">
              <div className="grid h-24 w-24 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-400">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="m-auto text-sm">Foto</span>
                )}
              </div>

              <div className="absolute bottom-0 right-0 rounded-md bg-blue-700 p-2 text-white shadow-sm">
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
            <div className="grid grid-cols-2 gap-3">
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="Nome"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
              />

              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Sobrenome"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
              />
            </div>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Telefone"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Endereco"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
            />

            <input
              name="house_number"
              value={form.house_number}
              onChange={handleChange}
              placeholder="Numero"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-700 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar alteracoes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
