import {
  CalendarDays,
  MapPin,
  Pencil,
  Phone,
  ReceiptText,
  RotateCcw,
  Star,
  User,
} from "lucide-react";

function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const PerfilUsuario = ({
  usuario,
  loading,
  error,
  orders = [],
  ordersLoading,
  ordersError,
  onEdit,
  onRepeatOrder,
}) => {
  return (
    <section className="mx-auto mt-5 w-full max-w-md space-y-4 px-4">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        {error ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col items-center text-center">
          <div className="grid h-24 w-24 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-400">
            {usuario.avatar_url ? (
              <img
                src={usuario.avatar_url}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={32} className="m-auto" />
            )}
          </div>

          <h2 className="mt-4 text-xl font-bold text-neutral-950">
            {loading ? "Carregando..." : usuario.name}
          </h2>

          <p className="text-sm text-neutral-500">
            Perfil local para testes do catalogo
          </p>
        </div>

        <div className="my-5 h-px bg-neutral-200" />

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4 rounded-lg bg-neutral-50 px-4 py-3">
            <div className="flex items-center gap-2 text-neutral-500">
              <Phone size={16} />
              <span>Telefone</span>
            </div>
            <span className="font-medium text-neutral-900">
              {loading ? "-" : usuario.phone || "-"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg bg-neutral-50 px-4 py-3">
            <div className="flex items-center gap-2 text-neutral-500">
              <MapPin size={16} />
              <span>Endereco</span>
            </div>
            <span className="max-w-[55%] text-right font-medium text-neutral-900">
              {loading
                ? "-"
                : `${usuario.address || "-"}, ${usuario.house_number || "-"}`}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg bg-amber-50 px-4 py-3">
            <div className="flex items-center gap-2 font-medium text-amber-800">
              <Star size={16} />
              <span>Pontos</span>
            </div>
            <span className="font-bold text-amber-800">
              {loading ? "-" : usuario.points ?? 0}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-700 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          <Pencil size={16} />
          Editar perfil
        </button>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Compras
            </p>
            <h3 className="mt-1 text-lg font-bold text-neutral-950">
              Historico de pedidos
            </h3>
          </div>

          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-neutral-100 text-neutral-600">
            <ReceiptText size={20} />
          </span>
        </div>

        {ordersError ? (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {ordersError}
          </div>
        ) : null}

        {ordersLoading ? (
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center text-sm text-neutral-500">
            Carregando pedidos...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-sm text-neutral-500">
            Nenhum pedido encontrado.
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-neutral-950">
                      {order.id}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                      <CalendarDays size={14} />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {order.status}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-neutral-600">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.name}`}
                      className="flex justify-between gap-3"
                    >
                      <span className="truncate">{item.name}</span>
                      <span className="shrink-0 font-medium">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3">
                  <div className="text-xs text-neutral-500">
                    <p>{order.deliveryType}</p>
                    <p>{order.paymentMethod}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Total</p>
                    <p className="text-base font-bold text-neutral-950">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRepeatOrder?.(order)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                >
                  <RotateCcw size={15} />
                  Repetir pedido
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
