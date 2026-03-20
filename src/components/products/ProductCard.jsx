import { useMemo, useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import toast from "react-hot-toast"

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function ProductCard({
  id,
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
    onAdd?.({
      id,
      image,
      title,
      description,
      price: Number(price),
      qty,
    })

    toast.success(`${title} adicionado ao carrinho 🛒`)
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full shrink-0 sm:w-32">
          <img
            src={image}
            alt={title}
            className="h-44 w-full object-cover sm:h-full sm:w-full"
          />
        </div>

        <div className="min-w-0 flex-1 p-4">
          <h3 className="truncate text-base font-semibold text-zinc-900">
            {title}
          </h3>

          <p
            className={[
              "mt-1 text-sm leading-snug text-zinc-500",
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

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-lg font-extrabold text-pink-600">
              {formatPrice(Number(price))}
            </p>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-xl border border-pink-100 bg-pink-50">
                <button
                  type="button"
                  onClick={dec}
                  className="grid h-10 w-10 place-items-center rounded-xl text-pink-600 transition hover:bg-pink-100"
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
                  className="grid h-10 w-10 place-items-center rounded-xl text-pink-600 transition hover:bg-pink-100"
                  aria-label={`Aumentar quantidade de ${title}`}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-pink-600 px-3 text-sm font-semibold text-white transition hover:opacity-90"
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