export function StoreStatus() {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4 
                      rounded-2xl border border-pink-100 
                      bg-white px-4 py-3 shadow-sm">

        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">

          {/* Green dot */}
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>

          {/* Text */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900">
              Estamos abertos
            </p>

            <p className="text-xs text-zinc-500 truncate">
              Segunda a Sábado · 09:00 – 18:00
            </p>
          </div>
        </div>

        {/* Right */}
        <button className="shrink-0 rounded-xl 
                           bg-pink-50 px-4 py-2 
                           text-sm font-medium text-pink-600 
                           hover:bg-pink-100 transition">
          Horários
        </button>

      </div>
    </section>
  )
}