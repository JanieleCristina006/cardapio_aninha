import { useState } from "react";

export function CheckoutWhatsApp({ cart, cliente }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipoEntrega: "retirada",
    name: cliente?.name || "",
    phone: cliente?.phone || "",
    address: cliente?.address || "",
    house_number: cliente?.house_number || "",
    payment: "dinheiro",
    troco: "",
    observacao: "",
  });
  const [erroTroco, setErroTroco] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnviarWhatsApp = () => {
    if (formData.payment === "dinheiro" && parseFloat(formData.troco) < total) {
      setErroTroco(`O troco não pode ser menor que R$ ${total.toFixed(2)}`);
      return;
    }
    setErroTroco("");

    // Monta a mensagem
    const mensagem = `
*Novo Pedido*
Tipo: ${formData.tipoEntrega}
Cliente: ${formData.name}
Telefone: ${formData.phone}
${formData.tipoEntrega === "entrega" ? `Endereço: ${formData.address}, ${formData.house_number}` : ""}
Forma de pagamento: ${formData.payment}
${formData.payment === "dinheiro" ? `Troco para: R$ ${formData.troco}` : ""}
Observações: ${formData.observacao}

*Itens:*
${cart.map(item => `- ${item.quantity} x ${item.name} = R$ ${(item.price * item.quantity).toFixed(2)}`).join("\n")}
*Total: R$ ${total.toFixed(2)}*
`;

    // Abre WhatsApp
    const telefoneLoja = "55SEUNUMERO"; // exemplo: 5511999999999
    const url = `https://wa.me/${telefoneLoja}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          Finalizar Pedido
        </button>
      )}

      {showForm && (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
          <h2 className="text-xl font-bold mb-4">Finalize seu pedido</h2>

          <div className="mb-2">
            <label className="font-semibold">Tipo de entrega:</label>
            <select
              name="tipoEntrega"
              value={formData.tipoEntrega}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            >
              <option value="retirada">Retirada no local</option>
              <option value="entrega">Entrega</option>
            </select>
          </div>

          {formData.tipoEntrega === "entrega" && (
            <>
              <div className="mb-2">
                <label className="font-semibold">Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Telefone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Endereço:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Número:</label>
                <input
                  type="text"
                  name="house_number"
                  value={formData.house_number}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </div>
            </>
          )}

          <div className="mb-2">
            <label className="font-semibold">Forma de pagamento:</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="pix">PIX</option>
              <option value="cartao">Cartão</option>
            </select>
          </div>

          {formData.payment === "dinheiro" && (
            <div className="mb-2">
              <label className="font-semibold">Troco para:</label>
              <input
                type="number"
                min={total}
                name="troco"
                value={formData.troco}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1 mt-1"
              />
              {erroTroco && <p className="text-red-500 text-sm mt-1">{erroTroco}</p>}
            </div>
          )}

          <div className="mb-4">
            <label className="font-semibold">Observações:</label>
            <textarea
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
              rows={3}
            />
          </div>

          <button
            onClick={handleEnviarWhatsApp}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Enviar pelo WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}