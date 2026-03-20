import { X, Trash2 } from "lucide-react";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCart } from "../../hooks/useCart";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CartDrawer({ open, onClose }) {
  const { items, clearCart, increaseQty, decreaseQty, removeFromCart } =
    useCart();

  if (!open) return null;

  const subtotal = items.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return acc + price * qty;
  }, 0);

  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Fechar carrinho"
      />

      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-pink-200" />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onClose}
            className="text-zinc-500 transition hover:text-zinc-800"
            aria-label="Fechar"
          >
            <X size={22} />
          </button>

          <h3 className="text-lg font-extrabold text-zinc-800">
            Meu Carrinho
          </h3>

          <button
            className="text-pink-600 transition hover:opacity-80 disabled:opacity-40"
            aria-label="Limpar carrinho"
            onClick={clearCart}
            disabled={items.length === 0}
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="px-6 pb-6">
          {items.length === 0 ? (
            <div className="py-10 text-center text-sm text-zinc-500">
              Seu carrinho está vazio.
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onDecrease={() => decreaseQty(item.id)}
                    onIncrease={() => increaseQty(item.id)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))}
              </div>

              <CartSummary
                subtotal={formatPrice(subtotal)}
                deliveryText={delivery === 0 ? "Grátis" : formatPrice(delivery)}
                total={formatPrice(total)}
              />
            </>
          )}
        </div>

        <div className="px-6 pb-6">
          <button
            disabled={items.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 font-bold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex h-6 w-6 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path
                  fill="#fff"
                  d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                />
                <path
                  fill="#fff"
                  d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                />
                <path
                  fill="#cfd8dc"
                  d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5"
                />
                <path
                  fill="#40c351"
                  d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                />
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                />
              </svg>
            </span>

            <span>Finalizar pelo WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}