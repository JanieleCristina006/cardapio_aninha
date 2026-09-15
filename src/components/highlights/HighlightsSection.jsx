import { highlights } from "../../data/catalog";
import { HighlightCard } from "./HighlightCard";

export function HighlightsSection() {
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Operacao
          </p>
          <h2 className="mt-1 text-xl font-bold text-neutral-950">
            Destaques do atendimento
          </h2>
        </div>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {highlights.map((item) => (
          <HighlightCard
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
