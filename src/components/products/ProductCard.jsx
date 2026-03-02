import { useMemo, useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"

export function ProductCard({
  image,
  title,
  description,
  price,
  onAdd,
  initialQty = 1,
}) {
  const [expanded, setExpanded] = useState(false)
  const [qty, setQty] = useState(initialQty)

  const canExpand = useMemo(() => (description?.length ?? 0) > 60, [description])

  function dec() {
    setQty((q) => Math.max(1, q - 1))
  }

  function inc() {
    setQty((q) => Math.min(99, q + 1))
  }

  function handleAdd() {
    onAdd?.({ title, qty })
  }

  return (
    <article className="rounded-2xl bg-white border border-pink-100 shadow-sm overflow-hidden">
      {/* Layout: coluna no mobile, linha no sm+ */}
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="w-full sm:w-32 shrink-0">
          <img
            src={image}
            alt={title}
            className="h-44 w-full sm:h-full sm:w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 min-w-0">
          <h3 className="text-base font-semibold text-zinc-900 truncate">
            {title}
          </h3>

          <p
            className={[
              "mt-1 text-sm text-zinc-500 leading-snug",
              expanded ? "" : "line-clamp-2",
            ].join(" ")}
          >
            {description}
          </p>

          {canExpand && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 text-sm font-medium text-pink-600 hover:opacity-80"
            >
              {expanded ? "Ver menos" : "Ver mais"}
            </button>
          )}

          {/* Footer / actions */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-lg font-extrabold text-pink-600">{price}</p>

            <div className="flex items-center gap-2">
              {/* Stepper */}
              <div className="flex items-center rounded-xl bg-pink-50 border border-pink-100">
                <button
                  type="button"
                  onClick={dec}
                  className="h-10 w-10 grid place-items-center text-pink-600 hover:bg-pink-100 rounded-xl transition"
                  aria-label={`Diminuir quantidade de ${title}`}
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center text-sm font-semibold text-zinc-800">
                  {qty}
                </span>

                <button
                  type="button"
                  onClick={inc}
                  className="h-10 w-10 grid place-items-center text-pink-600 hover:bg-pink-100 rounded-xl transition"
                  aria-label={`Aumentar quantidade de ${title}`}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add */}
              <button
                type="button"
                onClick={handleAdd}
                className="h-10 px-3 rounded-xl bg-pink-600 text-white text-sm font-semibold
                           inline-flex items-center gap-2 hover:opacity-90 transition"
                aria-label={`Adicionar ${qty} de ${title} ao carrinho`}
              >
                <ShoppingCart size={16} />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}