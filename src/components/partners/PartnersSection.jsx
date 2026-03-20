import { useEffect, useRef, useState } from "react"
import { PartnerCard } from "./PartnerCard"

export function PartnersSection() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch(
          "https://ecommerce-api-4k6g.onrender.com/api/v1/banners/"
        )
        const data = await response.json()

        setPartners(data.results || [])
      } catch (error) {
        console.error("Erro ao buscar parceiros:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return

      scrollRef.current.scrollBy({
        left: 220, // quanto anda (ajusta conforme o tamanho do card)
        behavior: "smooth",
      })

      // volta pro início quando chega no fim
      const el = scrollRef.current
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      }
    }, 6000) // 6 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-zinc-900">
          Parceiros Locais
        </h2>

        <span className="text-[12px] font-extrabold tracking-widest text-pink-600">
          PATROCINADO
        </span>
      </div>

      {loading && <p className="mt-4">Carregando parceiros...</p>}

      {!loading && (
        <div
          ref={scrollRef}
          className="mt-5 flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        >
          {partners.map((p) => (
            <PartnerCard
              key={p.id}
              image={p.banner_url}
              title={p.name}
              description={p.description}
            />
          ))}
        </div>
      )}
    </section>
  )
}