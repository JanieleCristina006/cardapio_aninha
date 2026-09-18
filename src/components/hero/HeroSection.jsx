import { ArrowDown, ShoppingBag } from "lucide-react";
import { business } from "../../data/catalog";

export function HeroSection() {
  function handleScrollToCatalog() {
    document
      .getElementById("catalogo")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="pt-2">
      <div className="relative min-h-[260px] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-900">
        <img
          src={business.heroImage}
          alt="Vitrine de produtos"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

        <div className="relative z-10 flex min-h-[260px] items-end p-5 sm:p-7">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-800">
              <ShoppingBag size={14} />
              {business.eyebrow}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
              {business.name}
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
              {business.description}
            </p>

            <button
              type="button"
              onClick={handleScrollToCatalog}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Ver catalogo
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
