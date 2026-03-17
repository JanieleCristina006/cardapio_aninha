import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard"

export function FeaturedProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          "https://ecommerce-api-4k6g.onrender.com/api/v1/products/"
        )

        const data = await response.json()

        setProducts(data.results)
      } catch (error) {
        console.error("Erro ao buscar produtos", error)
      }
    }

    loadProducts()
  }, [])

  function handleAdd(product, qty) {
    console.log("Produto:", product.name)
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
            image={p.image_url}
            title={p.name}
            description={p.description}
            price={Number(p.price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            onAdd={({ qty }) => handleAdd(p, qty)}
          />
        ))}
      </div>
    </section>
  )
}