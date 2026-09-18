import { useState } from "react";
import toast from "react-hot-toast";
import { Camera, CircleUserRound, Eye, EyeOff, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="relative flex h-dvh items-center justify-center overflow-hidden bg-neutral-200 px-4 py-2 sm:py-4">
      <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-blue-500" />

      <div className="relative z-10 flex h-full max-h-[700px] w-full max-w-sm flex-col rounded-[2rem] bg-white px-5 py-5 shadow-sm sm:rounded-[2.5rem] sm:px-7 sm:py-7">
        <h1 className="text-center text-2xl font-bold text-neutral-950">
          Criar conta
        </h1>
        <p className="mt-1 text-center text-xs text-neutral-600 sm:text-sm">
          Cadastre-se para acompanhar seus pedidos.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="flex justify-center">
            <label
              className="relative block cursor-pointer"
              aria-label="Escolher foto de perfil"
            >
              <span className="grid h-16 w-16 overflow-hidden rounded-full border border-neutral-300 bg-neutral-50 text-neutral-400 shadow-sm transition hover:border-blue-500">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Camera size={20} className="m-auto" />
                )}
              </span>
              <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-blue-700 text-white shadow-sm transition hover:bg-blue-800">
                <Pencil size={13} />
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-950">
              Nome
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                name="first_name"
                type="text"
                value={form.first_name}
                placeholder="Nome"
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                name="last_name"
                type="text"
                value={form.last_name}
                placeholder="Sobrenome"
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-950">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="seu@email.com"
              onChange={handleChange}
              className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-950">
              Senha
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                placeholder="Digite sua senha"
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-neutral-300 px-3 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-3 grid place-items-center text-neutral-600 transition hover:text-neutral-950"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-950">
              Telefone
            </label>
            <input
              name="telephone"
              type="text"
              value={form.telephone}
              placeholder="Telefone"
              onChange={handleChange}
              className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-950">
              Endereco
            </label>
            <div className="grid grid-cols-[1fr_86px] gap-2">
              <input
                name="address"
                type="text"
                value={form.address}
                placeholder="Rua"
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                name="house_number"
                type="text"
                value={form.house_number}
                placeholder="N."
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CircleUserRound size={16} />
              {loading ? "Criando..." : "Criar perfil"}
            </button>
          </div>
        </form>

        <div className="mt-auto pt-3 text-center text-xs text-neutral-700">
          Ja tem uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};
