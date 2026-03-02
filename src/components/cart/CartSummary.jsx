export function CartSummary({ subtotal, deliveryText = "Grátis", total }) {
  return (
    <div className="mt-5 rounded-2xl bg-pink-50/50 border border-dashed border-pink-200 p-5">
      <div className="flex items-center justify-between text-zinc-600">
        <span>Subtotal</span>
        <span className="font-semibold">{subtotal}</span>
      </div>

      <div className="mt-2 flex items-center justify-between text-zinc-600">
        <span>Taxa de Entrega</span>
        <span className="font-semibold text-green-600">{deliveryText}</span>
      </div>

      <div className="mt-4 pt-4 border-t border-pink-100 flex items-end justify-between">
        <span className="font-extrabold text-zinc-800">Total do Pedido</span>
        <span className="text-2xl font-extrabold text-pink-600">{total}</span>
      </div>
    </div>
  )
}