import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { business } from "../../data/catalog";
import { getCustomerProfile, loginCustomer } from "../../services/api";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      await loginCustomer(form);
      await getCustomerProfile();
      toast.success("Login realizado");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-emerald-700">
          {business.name}
        </p>
        <h1 className="mt-2 text-center text-2xl font-bold text-neutral-950">
          Entrar
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="seu@email.com"
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-emerald-600"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Senha
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              placeholder="Digite sua senha"
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-emerald-600"
              required
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <Link
              to="/"
              className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
            >
              Voltar
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-600">
          Ainda nao tem cadastro?{" "}
          <Link
            to="/cadastrar"
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            Criar perfil
          </Link>
        </div>
      </div>
    </div>
  );
};
