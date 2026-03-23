import { Menu, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // pega a rota atual
  const [usuario, setUsuario] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://ecommerce-api-4k6g.onrender.com/api/v1/customers/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setUsuario(data.results[0]);
        }
      })
      .catch((err) => console.error("Erro ao buscar usuário:", err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white px-4 py-4 shadow-sm flex items-center justify-between">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        <button className="text-pink-500">
          <Menu size={26} strokeWidth={2.5} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-zinc-800">
          Aninha Doces
        </h1>
      </div>

      {/* DIREITA - USUÁRIO */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex items-center gap-2 rounded-full bg-zinc-100 px-2 py-1 pr-3 transition hover:bg-zinc-200"
        >
          {/* FOTO */}
          <div className="h-9 w-9 overflow-hidden rounded-full border">
            {usuario?.avatar_url ? (
              <img
                src={usuario.avatar_url}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                :)
              </div>
            )}
          </div>

          {/* NOME */}
          <span className="hidden sm:block text-sm font-medium text-zinc-700">
            {usuario?.name?.split(" ")[0] || "Usuário"}
          </span>
        </button>

        {/* DROPDOWN */}
        {openDropdown && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border z-50 overflow-hidden animate-fadeIn">
            <button
              onClick={() => navigate("/perfil")}
              className={`flex items-center gap-2 w-full px-4 py-2 transition ${
                location.pathname === "/perfil"
                  ? "bg-pink-100 font-semibold"
                  : "text-zinc-700 hover:bg-pink-50"
              }`}
            >
              <User size={18} /> Perfil
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-zinc-700 hover:bg-pink-50 transition"
            >
              <LogOut size={18} /> Sair
            </button>
          </div>
        )}
      </div>

   
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        `}
      </style>
    </header>
  );
}