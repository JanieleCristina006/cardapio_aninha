import { useEffect, useState } from "react";
import { categories as fallbackCategories, products as fallbackProducts } from "../../data/catalog";
import { getProducts } from "../../services/api";
import { ProductCard } from "./ProductCard";

function getFallbackProducts(activeCategory) {
  if (activeCategory === "todos") return fallbackProducts;
  return fallbackProducts.filter(
    (product) => String(product.categoryId) === String(activeCategory)
  );
}

export function ProductCatalog({
  activeCategory = "todos",
  categories = fallbackCategories,
  onAddToCart,
}) {
  const [products, setProducts] = useState(() =>
    getFallbackProducts(activeCategory)
  );
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setNotice("");

      try {
        const apiProducts = await getProducts(activeCategory);
        if (ignore) return;

        setProducts(apiProducts);
      } catch (error) {
        if (ignore) return;

        setProducts(getFallbackProducts(activeCategory));
        setNotice(error.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [activeCategory]);

  const currentCategory = categories.find(
    (item) => String(item.id) === String(activeCategory)
  );

  return (
    <section id="catalogo" className="mt-8 scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Catalogo
          </p>
          <h2 className="mt-1 text-xl font-bold text-neutral-950">
            {currentCategory?.label || "Itens da categoria"}
          </h2>
        </div>

        <span className="rounded-md bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          {loading ? "Carregando" : `${products.length} itens`}
        </span>
      </div>

      {notice ? (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {notice} Mostrando dados de exemplo.
        </div>
      ) : null}

      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
          Nenhum item cadastrado nesta categoria.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              onAdd={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
