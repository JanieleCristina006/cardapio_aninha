import { Home, ShoppingCart, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export function BottomNavigation({ onCartClick }) {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { id: "home", label: "Inicio", icon: Home, path: "/" },
    { id: "cart", label: "Carrinho", icon: ShoppingCart },
    { id: "profile", label: "Perfil", icon: User, path: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-between rounded-lg border border-neutral-200 bg-white px-5 py-3 shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isCart = item.id === "cart";
        const isActive = item.path && location.pathname === item.path;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (isCart) {
                onCartClick?.();
                return;
              }

              if (item.path) navigate(item.path);
            }}
            className={[
              "relative flex min-w-16 flex-col items-center gap-1 text-xs font-medium transition",
              isActive ? "text-blue-700" : "text-neutral-400 hover:text-neutral-700",
            ].join(" ")}
          >
            <Icon size={21} />
            <span>{item.label}</span>

            {isCart && totalItems > 0 && (
              <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-[10px] font-bold text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
