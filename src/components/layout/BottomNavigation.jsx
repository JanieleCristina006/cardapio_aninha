import { Home, BookOpen, ShoppingCart, Tag, User } from "lucide-react"

export function BottomNavigation({ active = "home", onCartClick }) {
  const items = [
    { id: "home", label: "Início", icon: Home },
    { id: "menu", label: "Cardápio", icon: BookOpen },
    { id: "promo", label: "Promo", icon: Tag },
    { id: "profile", label: "Perfil", icon: User },
  ]

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white rounded-3xl shadow-xl py-4 px-6 flex items-center justify-between z-50">
      
      {/* Left Items */}
      <div className="flex items-center gap-8">
        {items.slice(0, 2).map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <button
              key={item.id}
              className="flex flex-col items-center text-sm"
            >
              <Icon
                size={24}
                className={
                  isActive ? "text-pink-600" : "text-zinc-400"
                }
              />
              <span
                className={
                  isActive
                    ? "text-pink-600 font-semibold"
                    : "text-zinc-400"
                }
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Center Cart Button */}
      <button
        type="button"
        onClick={onCartClick}
        className="absolute left-1/2 -translate-x-1/2 -top-6 h-16 w-16 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg border-4 border-white"
      >
        <ShoppingCart size={26} />
      </button>

      {/* Right Items */}
      <div className="flex items-center gap-8">
        {items.slice(2).map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <button
              key={item.id}
              className="flex flex-col items-center text-sm"
            >
              <Icon
                size={24}
                className={
                  isActive ? "text-pink-600" : "text-zinc-400"
                }
              />
              <span
                className={
                  isActive
                    ? "text-pink-600 font-semibold"
                    : "text-zinc-400"
                }
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

    </nav>
  )
}