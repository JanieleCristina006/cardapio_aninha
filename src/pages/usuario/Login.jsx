import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="relative flex h-dvh items-center justify-center overflow-hidden bg-neutral-200 px-4 py-3 sm:py-4">
      <div className="absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-blue-500" />

      <div className="relative z-10 flex h-full max-h-[650px] w-full max-w-sm flex-col rounded-[2.5rem] bg-white px-6 py-6 shadow-sm sm:px-8 sm:py-8">
        <div className="mx-auto flex flex-col items-center">
          <div
            className="relative flex h-24 w-28 items-end justify-center gap-1"
            aria-label="Logo ficticia"
          >
            <span className="mb-4 h-9 w-7 rounded-t-md bg-blue-200 shadow-sm" />
            <span className="mb-3 h-12 w-7 rounded-md bg-blue-500 shadow-sm" />
            <span className="mb-4 h-10 w-7 rounded-t-md bg-blue-200 shadow-sm" />
            <span className="absolute left-8 top-1 h-12 w-px rotate-[-22deg] bg-slate-300" />
            <span className="absolute right-8 top-0 h-14 w-px rotate-[18deg] bg-slate-300" />
            <span className="absolute left-10 top-4 h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="absolute right-10 top-5 h-1.5 w-1.5 rounded-full bg-slate-400" />
          </div>

          <p className="-mt-2 text-center text-sm font-semibold uppercase tracking-widest text-blue-700">
            {business.name}
          </p>
        </div>

        <h1 className="mt-9 text-center text-2xl font-bold text-neutral-950">
          Bem-vindo de volta!
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Entre para continuar seu pedido.
        </p>

        <form onSubmit={handleSubmit} className="mt-9 space-y-5">
          <div>
            <label className="mb-2 block text-base font-medium text-neutral-950">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="seu@email.com"
              onChange={handleChange}
              className="h-11 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium text-neutral-950">
              Senha
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                placeholder="Digite sua senha"
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-neutral-300 px-3 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
            <div className="mt-2 text-right">
              <button
                type="button"
                className="text-xs font-medium text-neutral-600 transition hover:text-neutral-950"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </div>

          <div className="pt-5">
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={16} />
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <div className="mt-auto pt-10 text-center text-xs text-neutral-700">
          Ainda nao tem uma conta?{" "}
          <Link
            to="/cadastrar"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Criar perfil
          </Link>
        </div>
      </div>
    </div>
  );
};
