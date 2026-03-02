import { Minus, Plus } from "lucide-react"

export function CartItem({ item, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white shadow-sm px-4 py-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-xl object-cover"
      />

      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-zinc-900 truncate">{item.name}</p>
        <p className="text-pink-600 font-bold mt-1">{item.price}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          className="h-10 w-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition"
          aria-label={`Diminuir ${item.name}`}
        >
          <Minus size={18} />
        </button>

        <span className="w-5 text-center font-bold text-zinc-700">
          {item.qty}
        </span>

        <button
          onClick={onIncrease}
          className="h-10 w-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:opacity-90 transition"
          aria-label={`Aumentar ${item.name}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}