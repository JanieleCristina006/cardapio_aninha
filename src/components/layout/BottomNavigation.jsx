import { Home, ShoppingCart, Tag, User } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useNavigate, useLocation } from "react-router-dom";

export function BottomNavigation({ onCartClick }) {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const items = [
    { id: "home", label: "Início", icon: Home, path: "/" },
    { id: "cart", label: "Carrinho", icon: ShoppingCart },
    // { id: "promo", label: "Promo", icon: Tag, path: "/promo" },
    { id: "profile", label: "Perfil", icon: User, path: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-between rounded-3xl bg-white px-6 py-4 shadow-xl">
      {items.map((item) => {
        const Icon = item.icon;

        const isActive =
          item.path && currentPath === item.path;

        const isCart = item.id === "cart";

        return (
          <button
            key={item.id}
            onClick={() => {
              if (isCart) return onCartClick();
              if (item.path) navigate(item.path);
            }}
            className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? "-translate-y-2" : ""
            }`}
          >
            <Icon
              size={22}
              className={`transition ${
                isActive ? "text-pink-600" : "text-zinc-400"
              }`}
            />

            <span
              className={`text-xs ${
                isActive
                  ? "text-pink-600 font-semibold"
                  : "text-zinc-400"
              }`}
            >
              {item.label}
            </span>

            {/* Badge carrinho */}
            {isCart && totalItems > 0 && (
              <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white shadow">
                {totalItems}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}