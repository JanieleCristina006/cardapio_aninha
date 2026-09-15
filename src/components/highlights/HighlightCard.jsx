import { ArrowRight } from "lucide-react";

export function HighlightCard({ image, title, description }) {
  return (
    <article className="flex w-[300px] shrink-0 items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:w-[340px]">
      <img
        src={image}
        alt={title}
        className="h-20 w-20 rounded-md object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-neutral-950">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm leading-snug text-neutral-600">
          {description}
        </p>

        <button className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 transition hover:text-emerald-800">
          Detalhes <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
