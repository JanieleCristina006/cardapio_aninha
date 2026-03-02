import { X, Trash2 } from "lucide-react"
import { CartItem } from "./CartItem"
import { CartSummary } from "./CartSummary"

export function CartDrawer({ open, onClose }) {
  if (!open) return null

  // Mock (depois você liga no context)
  const items = [
    {
      id: 1,
      name: "Brigadeiro Gourmet",
      price: "R$ 5,00",
      qty: 4,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Bolo de Pote Ninho",
      price: "R$ 15,00",
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Coxinha de Frango",
      price: "R$ 8,50",
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1604908554148-1730f6f0b8a0?auto=format&fit=crop&w=400&q=80",
    },
  ]

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Fechar carrinho"
      />

      {/* Panel */}
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-pink-200" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800 transition"
            aria-label="Fechar"
          >
            <X size={22} />
          </button>

          <h3 className="font-extrabold text-zinc-800 text-lg">
            Meu Carrinho
          </h3>

          <button
            className="text-pink-600 hover:opacity-80 transition"
            aria-label="Limpar carrinho"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onDecrease={() => console.log("decrease", item.id)}
                onIncrease={() => console.log("increase", item.id)}
              />
            ))}
          </div>

          <CartSummary subtotal="R$ 52,00" deliveryText="Grátis" total="R$ 52,00" />
        </div>

        {/* Footer button */}
        <div className="px-6 pb-6">
          <button className="w-full rounded-2xl bg-pink-600 text-white font-extrabold py-4 shadow-lg hover:opacity-90 transition flex items-center justify-center gap-3">
            <span className="text-xl">📱</span>
            Finalizar pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}