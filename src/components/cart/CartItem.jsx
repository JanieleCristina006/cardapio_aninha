import { Minus, Plus, Trash2 } from "lucide-react";

function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
      <img
        src={item.image || item.image_url}
        alt={item.name}
        className="h-14 w-14 rounded-md object-cover"
      />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-neutral-950">
          {item.name}
        </h4>
        <p className="truncate text-xs text-neutral-500">
          {item.description || "Sem descricao"}
        </p>
        <p className="mt-1 text-sm font-bold text-neutral-950">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onDecrease}
          className="grid h-8 w-8 place-items-center rounded-md bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
          aria-label={`Diminuir quantidade de ${item.name}`}
        >
          <Minus size={15} />
        </button>

        <span className="w-6 text-center text-sm font-semibold text-neutral-900">
          {item.qty}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="grid h-8 w-8 place-items-center rounded-md bg-emerald-700 text-white transition hover:bg-emerald-800"
          aria-label={`Aumentar quantidade de ${item.name}`}
        >
          <Plus size={15} />
        </button>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="text-neutral-400 transition hover:text-red-600"
        aria-label={`Remover ${item.name} do carrinho`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
