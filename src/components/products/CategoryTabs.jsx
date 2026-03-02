import { CakeSlice, Croissant, PieChart, Cookie, Flame } from "lucide-react"

const categories = [
  { id: "doces", label: "Doces", icon: CakeSlice },
  { id: "bolos", label: "Bolos", icon: Croissant },
  { id: "tortas", label: "Tortas", icon: PieChart },
  { id: "salgados", label: "Salgados", icon: Cookie },
  { id: "combos", label: "Combos", icon: Flame },
]

export function CategoryTabs({ active = "doces", onChange }) {
  return (
    <section className="mt-8">
      <div className="flex gap-6 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = active === cat.id

          return (
            <button
              key={cat.id}
              onClick={() => onChange?.(cat.id)}
              className="shrink-0 flex flex-col items-center gap-3"
            >
              <div
                className={[
                  "h-16 w-16 rounded-full flex items-center justify-center border transition",
                  isActive
                    ? "bg-pink-600 border-pink-600 text-white shadow-md"
                    : "bg-white border-pink-100 text-zinc-800",
                ].join(" ")}
              >
                <Icon size={26} strokeWidth={2.2} />
              </div>

              <span
                className={[
                  "text-lg font-semibold",
                  isActive ? "text-pink-600" : "text-zinc-800",
                ].join(" ")}
              >
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}