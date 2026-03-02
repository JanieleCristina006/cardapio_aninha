import { ArrowRight } from "lucide-react"

export function PartnerCard({ image, title, description }) {
  return (
    <article className="shrink-0 w-[320px] sm:w-[360px] rounded-2xl 
                        bg-[#F6EDEF] border border-[#EAD4DA] 
                        p-4 shadow-sm flex gap-4 items-center">

      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-2xl object-cover"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-zinc-900 truncate">
          {title}
        </h3>

        <p className="mt-1 text-sm text-zinc-600 leading-snug">
          {description}
        </p>

        <button className="mt-3 inline-flex items-center gap-1 
                           text-pink-500 font-medium text-sm 
                           hover:opacity-80 transition">
          Saiba Mais <ArrowRight size={16} />
        </button>
      </div>
    </article>
  )
}