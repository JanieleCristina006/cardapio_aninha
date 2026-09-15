import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ProductCard({
  id,
  image,
  name,
  title,
  description,
  price,
  onAdd,
  initialQty = 1,
}) {
  const productName = name || title || "Produto";
  const [expanded, setExpanded] = useState(false);
  const [qty, setQty] = useState(initialQty);

  const canExpand = useMemo(
    () => (description?.length ?? 0) > 70,
    [description]
  );

  function dec() {
    setQty((currentQty) => Math.max(1, currentQty - 1));
  }

  function inc() {
    setQty((currentQty) => Math.min(99, currentQty + 1));
  }

  function handleAdd() {
    onAdd?.({
      id,
      image,
      name: productName,
      description,
      price: Number(price),
      qty,
    });

    toast.success(`${productName} adicionado ao carrinho`);
  }

  return (
    <article className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="flex h-full flex-col sm:flex-row">
        <div className="w-full shrink-0 sm:w-36">
          <img
            src={image}
            alt={productName}
            className="h-44 w-full object-cover sm:h-full"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <h3 className="truncate text-base font-semibold text-neutral-950">
            {productName}
          </h3>

          <p
            className={[
              "mt-1 text-sm leading-snug text-neutral-600",
              expanded ? "" : "line-clamp-2",
            ].join(" ")}
          >
            {description}
          </p>

          {canExpand && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-2 w-fit text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              {expanded ? "Ver menos" : "Ver mais"}
            </button>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-bold text-neutral-950">
              {formatPrice(price)}
            </p>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <div className="flex h-10 items-center rounded-md border border-neutral-200 bg-neutral-50">
                <button
                  type="button"
                  onClick={dec}
                  className="grid h-10 w-10 place-items-center text-neutral-600 transition hover:bg-neutral-100"
                  aria-label={`Diminuir quantidade de ${productName}`}
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center text-sm font-semibold text-neutral-900">
                  {qty}
                </span>

                <button
                  type="button"
                  onClick={inc}
                  className="grid h-10 w-10 place-items-center text-neutral-600 transition hover:bg-neutral-100"
                  aria-label={`Aumentar quantidade de ${productName}`}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-700 px-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                aria-label={`Adicionar ${qty} de ${productName} ao carrinho`}
              >
                <ShoppingCart size={16} />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
