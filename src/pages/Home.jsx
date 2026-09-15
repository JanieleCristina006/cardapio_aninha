import { useState } from "react"
import { useCart } from "../hooks/useCart"
import { categories } from "../data/catalog"

import { HeroSection } from "../components/hero/HeroSection"
import { StoreStatus } from "../components/store/StoreStatus"
import { HighlightsSection } from "../components/highlights/HighlightsSection"
import { CategoryTabs } from "../components/products/CategoryTabs"
import { ProductCatalog } from "../components/products/ProductCatalog"

export function Home() {
  const [activeCategory, setActiveCategory] = useState("todos")
  const [categoryOptions, setCategoryOptions] = useState(categories)

  const { addToCart } = useCart()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
      <HeroSection />
      <StoreStatus />
      <HighlightsSection />

      <CategoryTabs
        active={activeCategory}
        onChange={setActiveCategory}
        onCategoriesLoaded={setCategoryOptions}
      />

      <ProductCatalog
        activeCategory={activeCategory}
        categories={categoryOptions}
        onAddToCart={addToCart}
      />
    </div>
  )
}
