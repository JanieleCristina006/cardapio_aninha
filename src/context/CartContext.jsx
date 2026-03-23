import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./cart-context";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function addToCart(product) {
    // garante que o produto sempre tenha os campos corretos
    const productToAdd = {
      id: product.id,
      name: product.name || "Produto",
      price: Number(product.price) || 0,
      description: product.description || "",
      image: product.image || product.image_url || "",
      qty: product.qty || 1,
    };

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === productToAdd.id
            ? { ...item, qty: item.qty + productToAdd.qty }
            : item
        );
      }

      return [...prev, productToAdd];
    });
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function increaseQty(productId) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function decreaseQty(productId) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      totalItems,
    }),
    [items, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}