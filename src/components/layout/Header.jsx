import { Menu, MessageSquare } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between py-5">
      
      <div className="flex items-center gap-3">
        <button className="text-pink-500">
          <Menu size={28} strokeWidth={2.5} />
        </button>

        <h1 className="text-2xl font-bold text-zinc-800">
          Aninha Doces
        </h1>
      </div>

      <button className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-105 transition">
        <MessageSquare size={22} />
      </button>

    </header>
  )
}