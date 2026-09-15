import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { business } from "../../data/catalog";
import {
  getCustomerProfile,
  loginCustomer,
  registerCustomer,
} from "../../services/api";

export const Cadastrar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    telephone: "",
    address: "",
    house_number: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
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
      await registerCustomer(form, image);
      await loginCustomer({
        email: form.email,
        password: form.password,
      });
      await getCustomerProfile();
      toast.success("Cadastro criado");
      navigate("/perfil");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-3 sm:px-4">
      <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-emerald-700">
          {business.name}
        </p>
        <h1 className="mt-2 text-center text-2xl font-bold text-neutral-950">
          Criar perfil
        </h1>

        <div className="mt-6 flex flex-col items-center">
          <label className="cursor-pointer">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-dashed border-neutral-300 transition hover:border-emerald-600 sm:h-24 sm:w-24">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                  Foto
                </span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            name="email"
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:text-base"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            placeholder="Senha"
            onChange={handleChange}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:text-base"
            required
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              name="first_name"
              type="text"
              value={form.first_name}
              placeholder="Nome"
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:text-base"
              required
            />

            <input
              name="last_name"
              type="text"
              value={form.last_name}
              placeholder="Sobrenome"
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:text-base"
              required
            />
          </div>

          <input
            name="telephone"
            type="text"
            value={form.telephone}
            placeholder="Telefone"
            onChange={handleChange}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:text-base"
          />

          <div className="grid grid-cols-[1fr_88px] gap-2">
            <input
              name="address"
              type="text"
              value={form.address}
              placeholder="Endereco"
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:text-base"
            />

            <input
              name="house_number"
              type="text"
              value={form.house_number}
              placeholder="N."
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:text-base"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {loading ? "Criando..." : "Criar perfil"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-neutral-600">
          Ja tem perfil?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};
