import { PartnerCard } from "./PartnerCard"

export function PartnersSection() {
  const partners = [
    {
      id: 1,
      title: "Café Grão Real",
      description: "O par perfeito para nossos doces.",
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Flores da Ana",
      description: "Arranjos lindos para presentear.",
      image:
        "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=600&q=80",
    },
  ]

  return (
    <section className="mt-10">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-zinc-900">
          Parceiros Locais
        </h2>

        <span className="text-pink-600 text-[12px] font-extrabold tracking-widest">
          PATROCINADO
        </span>
      </div>

      {/* Horizontal list */}
      <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
        {partners.map((p) => (
          <PartnerCard
            key={p.id}
            image={p.image}
            title={p.title}
            description={p.description}
          />
        ))}
      </div>
    </section>
  )
}