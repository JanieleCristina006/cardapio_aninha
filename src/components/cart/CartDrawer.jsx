import { Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  business,
  defaultProfile,
  PROFILE_STORAGE_KEY,
} from "../../data/catalog";
import { useCart } from "../../hooks/useCart";
import { createOrder, getAccessToken } from "../../services/api";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const emptyCustomer = {
  name: "",
  phone: "",
  address: "",
  house_number: "",
};

function readStoredProfile() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    return storedProfile ? JSON.parse(storedProfile) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { items, clearCart, increaseQty, decreaseQty, removeFromCart } =
    useCart();

  const [step, setStep] = useState("carrinho");
  const [customer, setCustomer] = useState(emptyCustomer);
  const [deliveryType, setDeliveryType] = useState("retirada");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [changeAmount, setChangeAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );
  const delivery = deliveryType === "entrega" ? business.deliveryFee : 0;
  const total = subtotal + delivery;

  function updateCustomer(field, value) {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [field]: value,
    }));
  }

  function handleClose() {
    setStep("carrinho");
    onClose?.();
  }

  function handleStartCheckout() {
    if (!getAccessToken()) {
      toast.error("Faca login para finalizar o pedido.");
      handleClose();
      navigate("/login");
      return;
    }

    const profile = readStoredProfile();
    setCustomer({
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      house_number: profile.house_number || "",
    });
    setStep("checkout");
  }

  async function handleCreateOrder() {
    if (!customer.name.trim() || !customer.phone.trim()) {
      alert("Informe nome e telefone para finalizar o pedido.");
      return;
    }

    if (
      paymentMethod === "dinheiro" &&
      changeAmount &&
      Number(changeAmount) < total
    ) {
      alert("O valor para troco nao pode ser menor que o total do pedido.");
      return;
    }

    const remaining =
      paymentMethod === "dinheiro" && changeAmount
        ? Math.max(Number(changeAmount) - total, 0)
        : 0;

    const payload = {
      name_customer: customer.name,
      phone: customer.phone,
      address:
        deliveryType === "entrega"
          ? customer.address
          : customer.address || "Retirada no local",
      house_number: customer.house_number,
      observation: notes,
      subtotal: subtotal.toFixed(2),
      rate_delivery: delivery.toFixed(2),
      total: total.toFixed(2),
      remaining: remaining.toFixed(2),
      payment_method: paymentMethod,
      itens: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.qty),
      })),
    };

    try {
      setSubmitting(true);
      await createOrder(payload);
      toast.success("Pedido criado");
      clearCart();
      handleClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="bottom-sheet-overlay absolute inset-0 bg-black/45"
        onClick={handleClose}
        aria-label="Fechar carrinho"
      />

      <div className="bottom-sheet-panel absolute inset-x-0 bottom-0 mx-auto flex max-h-[88dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl">
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="text-neutral-500 transition hover:text-neutral-900"
            aria-label="Fechar"
          >
            <X size={22} />
          </button>

          <h3 className="text-lg font-bold text-neutral-950">
            {step === "carrinho" ? "Carrinho" : "Finalizar pedido"}
          </h3>

          {step === "carrinho" ? (
            <button
              type="button"
              className="text-neutral-500 transition hover:text-red-600 disabled:opacity-40"
              aria-label="Limpar carrinho"
              onClick={clearCart}
              disabled={items.length === 0}
            >
              <Trash2 size={20} />
            </button>
          ) : (
            <span className="h-5 w-5" />
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-2 pt-4">
          {step === "carrinho" && (
            <>
              {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-10 text-center text-sm text-neutral-500">
                  Seu carrinho esta vazio.
                </div>
              ) : (
                <>
                  <div className="space-y-3">
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
                    deliveryText={
                      delivery === 0 ? "Gratis" : formatPrice(delivery)
                    }
                    total={formatPrice(total)}
                  />

                  <button
                    type="button"
                    onClick={handleStartCheckout}
                    className="mt-5 flex w-full items-center justify-center rounded-md bg-blue-700 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                  >
                    Finalizar pedido
                  </button>
                </>
              )}
            </>
          )}

          {step === "checkout" && (
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Nome
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(event) => updateCustomer("name", event.target.value)}
                  placeholder="Informe seu nome"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Telefone
                </label>
                <input
                  type="text"
                  value={customer.phone}
                  onChange={(event) =>
                    updateCustomer("phone", event.target.value)
                  }
                  placeholder="Informe um telefone com DDD"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Entrega ou retirada
                </label>
                <select
                  value={deliveryType}
                  onChange={(event) => setDeliveryType(event.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                >
                  <option value="retirada">Retirada no local</option>
                  <option value="entrega">Entrega</option>
                </select>
              </div>

              {deliveryType === "entrega" && (
                <div className="grid grid-cols-[1fr_96px] gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                      Rua
                    </label>
                    <input
                      type="text"
                      value={customer.address}
                      onChange={(event) =>
                        updateCustomer("address", event.target.value)
                      }
                      placeholder="Rua"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                      Numero
                    </label>
                    <input
                      type="text"
                      value={customer.house_number}
                      onChange={(event) =>
                        updateCustomer("house_number", event.target.value)
                      }
                      placeholder="100"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Forma de pagamento
                </label>
                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                >
                  <option value="pix">Pix</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao">Cartao</option>
                </select>
              </div>

              {paymentMethod === "dinheiro" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Troco
                  </label>
                  <input
                    type="number"
                    value={changeAmount}
                    onChange={(event) => setChangeAmount(event.target.value)}
                    placeholder="Troco para"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Observacao
                </label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Observacao opcional"
                  className="min-h-20 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep("carrinho")}
                  className="flex-1 rounded-md border border-neutral-300 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                >
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleCreateOrder}
                  disabled={submitting}
                  className="flex-1 rounded-md bg-blue-700 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Enviando..." : "Enviar pedido"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
