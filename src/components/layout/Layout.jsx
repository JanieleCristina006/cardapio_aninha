import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CartDrawer } from "../cart/CartDrawer";
import { BottomNavigation } from "./BottomNavigation";
import { Header } from "./Header";

export const Layout = () => {
  const [openCart, setOpenCart] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="fixed left-0 top-0 z-50 w-full">
        <Header />
      </div>

      <main className="min-h-screen pt-20 pb-28">
        <Outlet />
      </main>

      <BottomNavigation onCartClick={() => setOpenCart(true)} />

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </div>
  );
};
