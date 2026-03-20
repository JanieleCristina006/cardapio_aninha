import { useEffect, useMemo, useRef, useState } from "react"

const API_BASE = "https://ecommerce-api-4k6g.onrender.com/api/v1"
const WHATSAPP_NUMBER = "5599999999999"

export function ChatAninha({ onClose }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)

  const [step, setStep] = useState("welcome")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [cart, setCart] = useState([])

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    deliveryType: "",
    street: "",
    number: "",
    neighborhood: "",
    payment: "",
    changeFor: "",
    notes: "",
  })

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    initChat()
  }, [])

  async function initChat() {
    setLoading(true)

    try {
      const categoriesData = await buscarCategorias()
      setCategories(categoriesData)

      pushBotMessage("Oiê 💕 Seja muito bem-vindo(a) à Aninha Doces!")
      await wait(500)
      pushBotMessage("Eu vou te ajudar com seu pedido 😊")
      await wait(500)
      pushBotMessage("Pra começar, me diz: o que você está com vontade de pedir hoje?")
      await wait(400)

      if (categoriesData.length) {
        pushBotMessage("Posso te mostrar nossas categorias 👇")
        pushOptions(
          categoriesData.map((category) => ({
            type: "category",
            label: category.name,
            value: category,
          }))
        )
      }
      setStep("browsing_categories")
    } catch (error) {
      pushBotMessage("Tive um probleminha para carregar o cardápio agora 😕")
      pushBotMessage("Tenta novamente em instantes.")
    } finally {
      setLoading(false)
    }
  }

  async function buscarCategorias() {
    const res = await fetch(`${API_BASE}/categories/`)
    if (!res.ok) throw new Error("Erro ao buscar categorias")
    const data = await res.json()
    return data.results || []
  }

  async function buscarProdutos(categoryId) {
    const res = await fetch(`${API_BASE}/products/?category=${categoryId}`)
    if (!res.ok) throw new Error("Erro ao buscar produtos")
    const data = await res.json()
    return data.results || []
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function pushBotMessage(text) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        kind: "text",
        from: "bot",
        text,
      },
    ])
  }

  function pushUserMessage(text) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        kind: "text",
        from: "user",
        text,
      },
    ])
  }

  function pushOptions(options) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        kind: "options",
        options,
      },
    ])
  }

  function pushProducts(products) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        kind: "products",
        products,
      },
    ])
  }

  function updateCustomer(field, value) {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
  }, [cart])

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image_url: product.image_url,
          quantity: 1,
        },
      ]
    })
  }

  function getCartSummaryText() {
    if (!cart.length) return "Seu carrinho está vazio."

    const lines = cart.map(
      (item) =>
        `• ${item.quantity}x ${item.name} - R$ ${(Number(item.price) * item.quantity).toFixed(2)}`
    )

    lines.push("")
    lines.push(`Total parcial: R$ ${subtotal.toFixed(2)}`)

    return lines.join("\n")
  }

  function getAddressText() {
    if (customer.deliveryType !== "Entrega") return "Retirada no local"
    return `${customer.street}, ${customer.number} - ${customer.neighborhood}`
  }

  function buildWhatsappMessage() {
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.name} - R$ ${(Number(item.price) * item.quantity).toFixed(2)}`
      )
      .join("\n")

    return `Olá! Vim pelo cardápio online 💕

*Novo Pedido - Aninha Doces*

*Cliente:* ${customer.name}
*Telefone:* ${customer.phone}
*Tipo:* ${customer.deliveryType}
*Endereço:* ${getAddressText()}

*Itens do pedido:*
${itemsText}

*Pagamento:* ${customer.payment}${
      customer.payment === "Dinheiro" && customer.changeFor
        ? `\n*Troco para:* ${customer.changeFor}`
        : ""
    }${
      customer.notes ? `\n*Observação:* ${customer.notes}` : ""
    }

*Total:* R$ ${subtotal.toFixed(2)}`
  }

  async function showCategoryProducts(category) {
    setLoading(true)
    setSelectedCategory(category)

    try {
      const products = await buscarProdutos(category.id)

      pushUserMessage(category.name)
      await wait(250)

      if (!products.length) {
        pushBotMessage(`No momento não encontrei produtos em ${category.name} 😕`)
        pushBotMessage("Quer ver outra categoria?")
        pushOptions([
          ...categories.map((item) => ({
            type: "category",
            label: item.name,
            value: item,
          })),
          {
            type: "action",
            label: "Finalizar pedido",
            value: "finish_order",
          },
        ])
        setStep("browsing_categories")
        return
      }

      pushBotMessage(`Perfeito 💕 Aqui estão os itens de ${category.name}:`)
      pushProducts(products)
      await wait(300)
      pushBotMessage("Se quiser, é só tocar em “Adicionar”.")
      pushBotMessage("Depois eu continuo seu atendimento por aqui 😊")
      setStep("browsing_products")
    } catch (error) {
      pushBotMessage("Não consegui carregar os produtos dessa categoria agora 😕")
    } finally {
      setLoading(false)
    }
  }

  async function handleAddProduct(product) {
    addToCart(product)

    pushBotMessage(`Anotei aqui: ${product.name} 📝`)
    await wait(250)
    pushBotMessage("Seu pedido até agora está assim:")
    pushBotMessage(getCartSummaryText())
    await wait(300)
    pushBotMessage("Você quer mais alguma coisa ou já posso fechar seu pedido?")
    pushOptions([
      {
        type: "action",
        label: "Quero mais itens",
        value: "more_items",
      },
      {
        type: "action",
        label: "Ver outra categoria",
        value: "other_category",
      },
      {
        type: "action",
        label: "Finalizar pedido",
        value: "finish_order",
      },
    ])
    setStep("after_adding_item")
  }

  async function startCheckout() {
    if (!cart.length) {
      pushBotMessage("Seu carrinho ainda está vazio 😕")
      pushBotMessage("Me diz o que você quer e eu te ajudo a montar seu pedido.")
      pushOptions(
        categories.map((category) => ({
          type: "category",
          label: category.name,
          value: category,
        }))
      )
      setStep("browsing_categories")
      return
    }

    pushUserMessage("Finalizar pedido")
    await wait(200)
    pushBotMessage("Perfeito! Vamos finalizar rapidinho 😊")
    await wait(300)
    pushBotMessage("Primeiro, qual é o seu nome?")
    setStep("checkout_name")
  }

  async function handleUserText(text) {
    const value = text.trim()
    if (!value) return

    pushUserMessage(value)

    if (step === "checkout_name") {
      if (value.length < 2) {
        pushBotMessage("Me passa seu nome direitinho, por favor 😊")
        return
      }

      updateCustomer("name", value)
      pushBotMessage(`Prazer, ${value} 💕`)
      await wait(250)
      pushBotMessage("Agora me informa seu telefone com DDD.")
      setStep("checkout_phone")
      return
    }

    if (step === "checkout_phone") {
      const numbers = value.replace(/\D/g, "")
      if (numbers.length < 10 || numbers.length > 11) {
        pushBotMessage("Esse telefone parece inválido 😕 Me manda com DDD, por favor.")
        return
      }

      updateCustomer("phone", value)
      pushBotMessage("Seu pedido vai ser entrega ou retirada?")
      pushOptions([
        { type: "delivery", label: "Entrega", value: "Entrega" },
        { type: "delivery", label: "Retirada", value: "Retirada" },
      ])
      setStep("checkout_delivery_type")
      return
    }

    if (step === "checkout_street") {
      if (value.length < 3) {
        pushBotMessage("Me informa a rua certinha, por favor.")
        return
      }

      updateCustomer("street", value)
      pushBotMessage("Agora o número do endereço.")
      setStep("checkout_number")
      return
    }

    if (step === "checkout_number") {
      if (value.length < 1) {
        pushBotMessage("Me passa o número, por favor.")
        return
      }

      updateCustomer("number", value)
      pushBotMessage("E o bairro?")
      setStep("checkout_neighborhood")
      return
    }

    if (step === "checkout_neighborhood") {
      if (value.length < 2) {
        pushBotMessage("Me passa o bairro certinho, por favor.")
        return
      }

      updateCustomer("neighborhood", value)
      pushBotMessage("Como você vai pagar?")
      pushOptions([
        { type: "payment", label: "Pix", value: "Pix" },
        { type: "payment", label: "Dinheiro", value: "Dinheiro" },
        { type: "payment", label: "Cartão", value: "Cartão" },
      ])
      setStep("checkout_payment")
      return
    }

    if (step === "checkout_change") {
      updateCustomer("changeFor", value)
      pushBotMessage("Quer me passar alguma observação do pedido?")
      pushBotMessage("Se não tiver, pode digitar: não")
      setStep("checkout_notes")
      return
    }

    if (step === "checkout_notes") {
      updateCustomer("notes", value.toLowerCase() === "não" ? "" : value)
      await showOrderConfirmation()
      return
    }
  }

  async function handleOptionClick(option) {
    if (option.type === "category") {
      await showCategoryProducts(option.value)
      return
    }

    if (option.type === "action") {
      if (option.value === "more_items" || option.value === "other_category") {
        pushUserMessage(option.label)
        await wait(250)
        pushBotMessage("Claro! Me diz por qual categoria você quer continuar 👇")
        pushOptions(
          categories.map((category) => ({
            type: "category",
            label: category.name,
            value: category,
          }))
        )
        setStep("browsing_categories")
        return
      }

      if (option.value === "finish_order") {
        await startCheckout()
        return
      }

      if (option.value === "confirm_send_whatsapp") {
        pushUserMessage("Pode enviar")
        const message = buildWhatsappMessage()
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
        pushBotMessage("Perfeito 💕 Estou te encaminhando para o WhatsApp da loja.")
        pushBotMessage("Lá seu pedido já vai com todas as informações preenchidas.")
        setStep("done")
        return
      }

      if (option.value === "edit_order") {
        pushUserMessage("Quero alterar")
        pushBotMessage("Sem problemas 😊")
        pushBotMessage("Você quer adicionar mais itens ou recomeçar a finalização?")
        pushOptions([
          {
            type: "action",
            label: "Adicionar mais itens",
            value: "more_items",
          },
          {
            type: "action",
            label: "Refazer finalização",
            value: "restart_checkout",
          },
        ])
        setStep("editing_order")
        return
      }

      if (option.value === "restart_checkout") {
        pushUserMessage("Refazer finalização")
        pushBotMessage("Claro! Vamos de novo.")
        pushBotMessage("Qual é o seu nome?")
        setStep("checkout_name")
      }
      return
    }

    if (option.type === "delivery") {
      pushUserMessage(option.label)
      updateCustomer("deliveryType", option.value)

      if (option.value === "Entrega") {
        pushBotMessage("Me informa a rua, por favor.")
        setStep("checkout_street")
        return
      }

      pushBotMessage("Perfeito! Vai ser retirada no local 😊")
      await wait(250)
      pushBotMessage("Como você vai pagar?")
      pushOptions([
        { type: "payment", label: "Pix", value: "Pix" },
        { type: "payment", label: "Dinheiro", value: "Dinheiro" },
        { type: "payment", label: "Cartão", value: "Cartão" },
      ])
      setStep("checkout_payment")
      return
    }

    if (option.type === "payment") {
      pushUserMessage(option.label)
      updateCustomer("payment", option.value)

      if (option.value === "Dinheiro") {
        pushBotMessage("Precisa de troco? Se sim, troco para quanto?")
        pushBotMessage("Se não precisar, pode digitar: não")
        setStep("checkout_change")
        return
      }

      updateCustomer("changeFor", "")
      pushBotMessage("Quer me passar alguma observação do pedido?")
      pushBotMessage("Se não tiver, pode digitar: não")
      setStep("checkout_notes")
    }
  }

  async function showOrderConfirmation() {
    const summary = [
      "Perfeito! Deixa eu te mostrar como ficou seu pedido 💕",
      "",
      getCartSummaryText(),
      "",
      `Nome: ${customer.name}`,
      `Telefone: ${customer.phone}`,
      `Tipo: ${customer.deliveryType}`,
      `Endereço: ${getAddressText()}`,
      `Pagamento: ${customer.payment}`,
      customer.payment === "Dinheiro" && customer.changeFor
        ? `Troco para: ${customer.changeFor}`
        : null,
      `Observação: ${customer.notes || "Sem observações"}`,
    ]
      .filter(Boolean)
      .join("\n")

    pushBotMessage(summary)
    await wait(300)
    pushBotMessage("Posso enviar esse pedido para o WhatsApp da loja?")
    pushOptions([
      {
        type: "action",
        label: "Enviar para WhatsApp",
        value: "confirm_send_whatsapp",
      },
      {
        type: "action",
        label: "Quero alterar",
        value: "edit_order",
      },
    ])
    setStep("checkout_confirm")
  }

  function handleSendInput() {
    if (!inputValue.trim()) return
    handleUserText(inputValue)
    setInputValue("")
  }

  function canType() {
    return [
      "checkout_name",
      "checkout_phone",
      "checkout_street",
      "checkout_number",
      "checkout_neighborhood",
      "checkout_change",
      "checkout_notes",
    ].includes(step)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[620px] w-[380px] flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-pink-500 px-4 py-4 text-white">
        <div>
          <p className="text-base font-semibold">Aninha Doces</p>
          <p className="text-xs opacity-90">Atendimento virtual</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/20 px-2 py-1 text-sm hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-pink-50/30 px-3 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((message) => {
            if (message.kind === "text") {
              return (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                    message.from === "bot"
                      ? "self-start bg-white text-gray-800 shadow-sm"
                      : "self-end bg-pink-500 text-white"
                  }`}
                >
                  {message.text}
                </div>
              )
            }

            if (message.kind === "options") {
              return (
                <div key={message.id} className="flex flex-wrap gap-2">
                  {message.options.map((option, index) => (
                    <button
                      key={`${message.id}-${index}`}
                      onClick={() => handleOptionClick(option)}
                      className="rounded-full border border-pink-200 bg-white px-3 py-2 text-sm text-pink-700 transition hover:bg-pink-100"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )
            }

            if (message.kind === "products") {
              return (
                <div key={message.id} className="grid grid-cols-1 gap-3">
                  {message.products.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-2xl border border-pink-100 bg-white p-3 shadow-sm"
                    >
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="mb-3 h-32 w-full rounded-xl object-cover"
                        />
                      ) : null}

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          {product.description ? (
                            <p className="mt-1 text-xs text-gray-500">
                              {product.description}
                            </p>
                          ) : null}
                          <p className="mt-2 text-sm font-bold text-pink-600">
                            R$ {Number(product.price).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => handleAddProduct(product)}
                          className="rounded-xl bg-pink-500 px-3 py-2 text-xs font-medium text-white hover:bg-pink-600"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }

            return null
          })}

          {loading ? (
            <div className="max-w-[85%] self-start rounded-2xl bg-white px-4 py-3 text-sm text-gray-400 shadow-sm">
              Digitando...
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-pink-100 bg-white p-3">
        <div className="mb-2 rounded-2xl bg-pink-50 px-3 py-2 text-xs text-gray-600">
          {cart.length ? (
            <span>
              {cart.reduce((acc, item) => acc + item.quantity, 0)} item(ns) no pedido •
              {" "}R$ {subtotal.toFixed(2)}
            </span>
          ) : (
            <span>Seu pedido ainda está vazio</span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canType()) {
                handleSendInput()
              }
            }}
            disabled={!canType()}
            placeholder={
              canType()
                ? "Digite sua resposta..."
                : "Escolha uma opção acima"
            }
            className="flex-1 rounded-2xl border border-pink-200 px-4 py-3 text-sm outline-none focus:border-pink-400 disabled:bg-gray-100"
          />
          <button
            onClick={handleSendInput}
            disabled={!canType()}
            className="rounded-2xl bg-pink-500 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-pink-200"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}