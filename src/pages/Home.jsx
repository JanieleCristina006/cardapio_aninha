import { useState } from "react"

import { Header } from "../components/layout/Header"
import { HeroSection } from "../components/hero/HeroSection"
import { StoreStatus } from "../components/store/StoreStatus"
import { PartnersSection } from "../components/partners/PartnersSection"
import { CategoryTabs } from "../components/products/CategoryTabs"
import { FeaturedProducts } from "../components/products/FeaturedProducts"
import { BottomNavigation } from "../components/layout/BottomNavigation"
import { CartDrawer } from "../components/cart/CartDrawer"

export function Home() {
  const [activeCategory, setActiveCategory] = useState("doces")
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-100 relative">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-28">
        <Header />
        <HeroSection />
        <StoreStatus />
        <PartnersSection />

        <CategoryTabs
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <FeaturedProducts />
      </div>

      <div className="lg:hidden">
        <BottomNavigation
          active="home"
          onCartClick={() => setCartOpen(true)}
        />
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  )
}