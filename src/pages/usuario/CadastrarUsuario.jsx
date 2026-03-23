import { useState } from "react";
import { Link } from "react-router-dom";

export const Cadastrar = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    house_number: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("username", form.username);
      data.append("password", form.password);
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("address", form.address);
      data.append("house_number", form.house_number);

      if (image) {
        data.append("avatar", image); // ⚠️ confirma esse nome na API
      }

      const response = await fetch(
        "https://ecommerce-api-4k6g.onrender.com/api/v1/customers/register/",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Conta criada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-3 sm:px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
        
        {/* FOTO */}
        <div className="mb-5 flex flex-col items-center">
          <label className="cursor-pointer">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-dashed border-gray-300 hover:border-pink-500">
              
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs text-gray-400">
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

          <span className="mt-2 text-xs sm:text-sm text-gray-500">
            Adicionar foto
          </span>
        </div>

        <h2 className="mb-5 text-center text-xl sm:text-2xl font-bold">
          Criar conta
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          
          <input
            name="username"
            type="text"
            placeholder="Usuário"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:border-pink-500 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:border-pink-500 outline-none"
          />

          <input
            name="name"
            type="text"
            placeholder="Nome completo"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:border-pink-500 outline-none"
          />

          <input
            name="phone"
            type="text"
            placeholder="Telefone"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:border-pink-500 outline-none"
          />

          <div className="flex gap-2">
            <input
              name="address"
              type="text"
              placeholder="Endereço"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:border-pink-500 outline-none"
            />

            <input
              name="house_number"
              type="text"
              placeholder="Nº"
              onChange={handleChange}
              className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:border-pink-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-pink-500 py-2 text-sm sm:text-base font-medium text-white hover:bg-pink-600 transition"
          >
            Criar conta
          </button>
        </form>

        <div className="mt-5 text-center text-xs sm:text-sm text-gray-600">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="font-medium text-pink-500 hover:underline"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};