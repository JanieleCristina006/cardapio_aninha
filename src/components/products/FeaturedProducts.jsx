import { ProductCard } from "./ProductCard"

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      title: "Donut Premium",
      description:
        "Massa artesanal com cobertura de morango e confeitos crocantes.",
      price: "R$ 12,90",
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Cheesecake no Pote",
      description:
        "Creme de queijo suave com calda de frutas vermelhas e base crocante.",
      price: "R$ 18,50",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Brownie de Nozes",
      description:
        "Super úmido, com pedaços generosos de nozes e chocolate intenso.",
      price: "R$ 15,00",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    },
  ]

  function handleAdd(product, qty) {
    console.log("Produto:", product.title)
    console.log("Quantidade:", qty)
  }

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-zinc-900">
        Doces em Destaque
      </h2>

      <div className="mt-6 space-y-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            title={p.title}
            description={p.description}
            price={p.price}
            onAdd={({ qty }) => handleAdd(p, qty)}
          />
        ))}
      </div>
    </section>
  )
}