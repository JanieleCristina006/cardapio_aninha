import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
import { CartDrawer } from "../cart/CartDrawer"; // ajuste o caminho

export const Layout = () => {
  const [openCart, setOpenCart] = useState(false);

  return (
    <div className="h-screen bg-neutral-100">
      
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* CONTEÚDO */}
      <main className="h-full overflow-y-auto pt-20 pb-28 px-3">
        <Outlet />
      </main>

      {/* BOTTOM */}
      <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
        <BottomNavigation onCartClick={() => setOpenCart(true)} />
      </div>

      {/* 🔥 CARRINHO */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </div>
  );
};