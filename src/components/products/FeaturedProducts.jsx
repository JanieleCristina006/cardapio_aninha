import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard"

export function FeaturedProducts({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(
          "https://ecommerce-api-4k6g.onrender.com/api/v1/products/"
        )

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos")
        }

        const data = await response.json()

        const formattedProducts = data.results.map((product) => ({
          id: product.id,
          image: product.image_url,
          title: product.name,
          description: product.description,
          price: Number(product.price),
          stock: product.stock,
          category: product.category,
        }))

        setProducts(formattedProducts)
      } catch (err) {
        console.error(err)
        setError("Não foi possível carregar os produtos.")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-zinc-500">
        Carregando produtos...
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center text-sm text-red-500">
        {error}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-zinc-500">
        Nenhum produto encontrado.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
          onAdd={onAddToCart}
        />
      ))}
    </div>
  )
}