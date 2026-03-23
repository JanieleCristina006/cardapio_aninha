import { Minus, Plus, Trash2 } from "lucide-react";

function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm">
      {/* Imagem do produto */}
      <img
        src={item.image || item.image_url} // fallback caso seja image_url
        alt={item.name}
        className="h-14 w-14 rounded-xl object-cover"
      />

      {/* Info do produto */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-bold text-zinc-800">
          {item.name}
        </h4>
        <p className="truncate text-xs text-zinc-500">
          {item.description || "Sem descrição"}
        </p>
        <p className="mt-1 text-sm font-extrabold text-pink-600">
          {formatPrice(Number(item.price))}
        </p>
      </div>

      {/* Controles de quantidade */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrease}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition hover:bg-pink-100"
          aria-label={`Diminuir quantidade de ${item.name}`}
        >
          <Minus size={16} />
        </button>

        <span className="w-5 text-center font-semibold text-zinc-800">
          {item.qty}
        </span>

        <button
          onClick={onIncrease}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-600 text-white transition hover:opacity-90"
          aria-label={`Aumentar quantidade de ${item.name}`}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Botão remover */}
      <button
        onClick={onRemove}
        className="text-zinc-400 transition hover:text-red-500"
        aria-label={`Remover ${item.name} do carrinho`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}