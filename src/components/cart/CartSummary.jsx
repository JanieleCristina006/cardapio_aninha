export function CartSummary({ subtotal, deliveryText = "Gratis", total }) {
  return (
    <div className="mt-5 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4">
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <span>Subtotal</span>
        <span className="font-semibold">{subtotal}</span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm text-neutral-600">
        <span>Taxa de entrega</span>
        <span className="font-semibold text-blue-700">{deliveryText}</span>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-neutral-200 pt-4">
        <span className="font-bold text-neutral-950">Total</span>
        <span className="text-2xl font-bold text-neutral-950">{total}</span>
      </div>
    </div>
  );
}
