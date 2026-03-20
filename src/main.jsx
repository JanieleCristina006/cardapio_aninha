import { createRoot } from "react-dom/client"
import "./global.css"
import { Home } from "./pages/Home"
import { CartProvider } from "./context/CartContext"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <Home />
    <Toaster position="top-center" />
  </CartProvider>
)