import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCart } from "../../hooks/useCart";

function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CartDrawer({ open, onClose }) {
  const { items, clearCart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const [step, setStep] = useState("carrinho"); // carrinho ou checkout
  const [cliente, setCliente] = useState({
    name: "",
    phone: "",
    address: "",
    house_number: "",
  });

  const [deliveryType, setDeliveryType] = useState("retirada"); // "retirada" ou "entrega"
  const [paymentMethod, setPaymentMethod] = useState("dinheiro"); // "dinheiro" ou "cartao"
  const [changeAmount, setChangeAmount] = useState("");
  const [observacao, setObservacao] = useState("");

  const subtotal = items.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0);
  const delivery = deliveryType === "entrega" ? 5 : 0;
  const total = subtotal + delivery;

  // Pega dados do usuário logado
  useEffect(() => {
    if (step === "checkout") {
      const token = localStorage.getItem("token");
      if (!token) return;

      fetch("https://ecommerce-api-4k6g.onrender.com/api/v1/customers/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const user = data.results?.[0];
          if (user) {
            const confirmUse = window.confirm(
              "Deseja usar os dados do cadastro para preencher o pedido?"
            );
            if (confirmUse) {
              setCliente({
                name: user.name,
                phone: user.phone,
                address: user.address,
                house_number: user.house_number,
              });
            }
          }
        })
        .catch(console.error);
    }
  }, [step]);

  const handleSendWhatsApp = () => {
    if (paymentMethod === "dinheiro" && Number(changeAmount) < total) {
      alert("O valor do troco não pode ser menor que o total do pedido!");
      return;
    }

    let message = `Novo Pedido\n\n`;
    message += `Cliente: ${cliente.name}\n`;
    message += `Telefone: ${cliente.phone}\n`;
    message += `Tipo de pedido: ${deliveryType === "retirada" ? "Retirada no local" : "Entrega"}\n`;
    if (deliveryType === "entrega") {
      message += `Endereço: ${cliente.address}, Nº ${cliente.house_number}\n`;
    }
    message += `\nItens:\n`;
    items.forEach((item) => {
      message += `- ${item.name} x${item.qty} = ${formatPrice(Number(item.price) * Number(item.qty))}\n`;
    });
    message += `\nSubtotal: ${formatPrice(subtotal)}\n`;
    message += `Taxa de entrega: ${formatPrice(delivery)}\n`;
    message += `Total: ${formatPrice(total)}\n`;
    message += `Pagamento: ${paymentMethod}\n`;
    if (paymentMethod === "dinheiro") {
      message += `Troco para: ${formatPrice(Number(changeAmount))}\n`;
    }
    if (observacao) {
      message += `Observação: ${observacao}\n`;
    }

    const url = `https://wa.me/5535997554926?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Fundo preto */}
      <button className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Fechar carrinho" />

      {/* Modal */}
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-pink-200" />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <button onClick={onClose} className="text-zinc-500 transition hover:text-zinc-800" aria-label="Fechar">
            <X size={22} />
          </button>

          <h3 className="text-lg font-extrabold text-zinc-800">
            {step === "carrinho" ? "Meu Carrinho" : "Finalizar Pedido"}
          </h3>

          {step === "carrinho" && (
            <button
              className="text-pink-600 transition hover:opacity-80 disabled:opacity-40"
              aria-label="Limpar carrinho"
              onClick={clearCart}
              disabled={items.length === 0}
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>

        <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto">
          {step === "carrinho" && (
            <>
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

                  <button
                    onClick={() => setStep("checkout")}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 font-bold text-white shadow-md transition hover:opacity-90"
                  >
                    Finalizar Pedido
                  </button>
                </>
              )}
            </>
          )}

          {step === "checkout" && (
            <form className="space-y-4">
              {/* Nome */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">Nome</label>
                <input
                  type="text"
                  value={cliente.name}
                  onChange={(e) => setCliente({ ...cliente, name: e.target.value })}
                  placeholder="Informe seu nome"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">Telefone</label>
                <input
                  type="text"
                  value={cliente.phone}
                  onChange={(e) => setCliente({ ...cliente, phone: e.target.value })}
                  placeholder="Informe um telefone válido (com DDD)"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                />
              </div>

              {/* Entrega ou Retirada */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">Entrega ou Retirada</label>
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                >
                  <option value="retirada">Retirada no local</option>
                  <option value="entrega">Entrega</option>
                </select>
              </div>

              {/* Endereço */}
              {deliveryType === "entrega" && (
                <>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Rua</label>
                    <input
                      type="text"
                      value={cliente.address}
                      onChange={(e) => setCliente({ ...cliente, address: e.target.value })}
                      placeholder="Informe a rua"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Número</label>
                    <input
                      type="text"
                      value={cliente.house_number}
                      onChange={(e) => setCliente({ ...cliente, house_number: e.target.value })}
                      placeholder="Informe o número"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                    />
                  </div>
                </>
              )}

              {/* Pagamento */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">Forma de pagamento</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                >
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao">Cartão</option>
                </select>
              </div>

              {/* Troco */}
              {paymentMethod === "dinheiro" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-600">Troco</label>
                  <input
                    type="number"
                    value={changeAmount}
                    onChange={(e) => setChangeAmount(e.target.value)}
                    placeholder="Troco para"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                  />
                </div>
              )}

              {/* Observação */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">Observação</label>
                <textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Observação (opcional)"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setStep("carrinho")}
                  className="flex-1 rounded-lg border border-zinc-300 py-2 font-semibold text-zinc-700 hover:bg-zinc-100 transition"
                >
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 rounded-lg bg-pink-600 py-2 font-bold text-white hover:opacity-90 transition"
                >
                  Enviar pelo WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}