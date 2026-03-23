import { createRoot } from "react-dom/client"
import "./global.css"
import { CartProvider } from "./context/CartContext"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Router from "./routes/routes"

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <Router />
      <Toaster position="top-center" />
    </BrowserRouter>
  </CartProvider>
)