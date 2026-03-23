import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ecommerce-api-4k6g.onrender.com/api/v1/authentication/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      // 🔐 salva token
      localStorage.setItem("token", data.access);

      // 🚀 redireciona
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        
        <h2 className="mb-6 text-center text-2xl font-bold">
          Entrar na conta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Usuário
            </label>
            <input
              name="username"
              type="text"
              placeholder="Digite seu usuário"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Senha
            </label>
            <input
              name="password"
              type="password"
              placeholder="Digite sua senha"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              className="text-sm text-gray-500 hover:underline"
            >
              Esqueci a senha
            </button>

            <button
              type="submit"
              className="rounded-lg bg-pink-500 px-6 py-2 font-medium text-white transition hover:bg-pink-600"
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Não tem conta?{" "}
          <Link
            to="/cadastrar"
            className="font-medium text-pink-600 hover:underline"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};