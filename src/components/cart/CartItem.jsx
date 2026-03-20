import { Minus, Plus, Trash2 } from "lucide-react"

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm">
      <img
        src={item.image}
        alt={item.title}
        className="h-14 w-14 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-bold text-zinc-800">
          {item.title}
        </h4>

        <p className="truncate text-xs text-zinc-500">
          {item.description}
        </p>

        <p className="mt-1 text-sm font-extrabold text-pink-600">
          {formatPrice(Number(item.price))}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onDecrease}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition hover:bg-pink-100"
          aria-label={`Diminuir quantidade de ${item.title}`}
        >
          <Minus size={16} />
        </button>

        <span className="w-5 text-center font-semibold text-zinc-800">
          {item.qty}
        </span>

        <button
          onClick={onIncrease}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-600 text-white transition hover:opacity-90"
          aria-label={`Aumentar quantidade de ${item.title}`}
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        onClick={onRemove}
        className="text-zinc-400 transition hover:text-red-500"
        aria-label={`Remover ${item.title} do carrinho`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}