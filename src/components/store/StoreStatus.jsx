import { Clock, MapPin } from "lucide-react";
import { business } from "../../data/catalog";

export function StoreStatus() {
  return (
    <section className="mt-5">
      <div className="grid gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-950">
              Atendimento disponivel
            </p>
            <p className="truncate text-xs text-neutral-500">
              Base estatica pronta para personalizar
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 text-sm text-neutral-600">
          <Clock size={17} className="shrink-0 text-emerald-700" />
          <span className="truncate">{business.schedule}</span>
        </div>

        <div className="flex min-w-0 items-center gap-3 text-sm text-neutral-600 sm:justify-end">
          <MapPin size={17} className="shrink-0 text-amber-700" />
          <span className="truncate">{business.location}</span>
        </div>
      </div>
    </section>
  );
}
