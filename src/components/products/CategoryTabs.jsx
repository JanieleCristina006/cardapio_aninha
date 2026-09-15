import { useEffect, useState } from "react";
import {
  Coffee,
  Gift,
  LayoutGrid,
  Package,
  Star,
  Utensils,
} from "lucide-react";
import { categories as fallbackCategories } from "../../data/catalog";
import { getCategories } from "../../services/api";

const categoryIcons = {
  todos: LayoutGrid,
  destaques: Star,
  produtos: Package,
  refeicoes: Utensils,
  bebidas: Coffee,
  kits: Gift,
};

function formatLabel(label) {
  if (!label) return "Categoria";
  return String(label).charAt(0).toUpperCase() + String(label).slice(1);
}

export function CategoryTabs({
  active = "todos",
  onChange,
  onCategoriesLoaded,
}) {
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    let ignore = false;

    async function loadCategories() {
      try {
        const apiCategories = await getCategories();
        if (ignore || apiCategories.length === 0) return;

        const nextCategories = [
          fallbackCategories[0],
          ...apiCategories.map((category) => ({
            ...category,
            label: formatLabel(category.label),
          })),
        ];

        setCategories(nextCategories);
        onCategoriesLoaded?.(nextCategories);
      } catch {
        onCategoriesLoaded?.(fallbackCategories);
      }
    }

    loadCategories();

    return () => {
      ignore = true;
    };
  }, [onCategoriesLoaded]);

  return (
    <section className="mt-8">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = categoryIcons[category.id] || Package;
          const isActive = String(active) === String(category.id);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange?.(category.id)}
              className={[
                "flex min-w-24 shrink-0 flex-col items-center gap-2 rounded-lg border px-3 py-3 transition",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-950",
              ].join(" ")}
            >
              <Icon size={22} strokeWidth={2.1} />

              <span className="text-sm font-semibold leading-none">
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
