export function HeroSection() {
  return (
    <section className="mt-2">
      <div className="relative overflow-hidden rounded-3xl min-h-90 sm:min-h-105">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80"
          alt="Bolo com morangos"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 flex h-full items-end">
          <div className="max-w-lg">
            <h2 className="text-white font-extrabold leading-[1.05] text-4xl sm:text-5xl">
              Delícias que
              <br />
              Encantam o
              <br />
              Coração
            </h2>

            <p className="mt-4 text-white/85 text-base sm:text-lg leading-relaxed">
              Doces artesanais feitos com amor e os melhores ingredientes da
              região.
            </p>

            <button className="mt-6 inline-flex items-center justify-center rounded-2xl bg-pink-600 px-7 py-4 text-white font-semibold text-lg shadow-lg active:scale-[0.98] transition">
              Ver Cardápio
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}