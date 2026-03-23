import React from "react";
import { Phone, MapPin, Coins, User, Pencil } from "lucide-react";

export const PerfilUsuario = ({ usuario, onEdit }) => {
  if (!usuario) {
    return (
      <div className="flex justify-center py-10 text-gray-400">
        Carregando perfil...
      </div>
    );
  }

  return (
    <section className="mx-auto mt-5 w-full max-w-md px-2">
      
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        
        {/* TOPO */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-pink-100 shadow">
            
            {usuario.avatar_url ? (
              <img
                src={usuario.avatar_url}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <User size={32} />
              </div>
            )}

            {/* status online */}
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
          </div>

          <h2 className="mt-3 text-xl font-bold text-zinc-800">
            {usuario.name}
          </h2>

          <p className="text-sm text-zinc-400">
            Cliente desde{" "}
            {usuario.created_at
              ? new Date(usuario.created_at).getFullYear()
              : "-"}
          </p>
        </div>

        {/* DIVISOR */}
        <div className="my-5 h-px bg-zinc-100" />

        {/* INFOS */}
        <div className="space-y-4 text-sm">

          {/* Telefone */}
          <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
            <div className="flex items-center gap-2 text-zinc-500">
              <Phone size={16} />
              <span>Telefone</span>
            </div>
            <span className="font-medium text-zinc-800">
              {usuario.phone || "-"}
            </span>
          </div>

          {/* Endereço */}
          <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
            <div className="flex items-center gap-2 text-zinc-500">
              <MapPin size={16} />
              <span>Endereço</span>
            </div>
            <span className="max-w-[55%] text-right font-medium text-zinc-800">
              {usuario.address || "-"}, {usuario.house_number || "-"}
            </span>
          </div>

          {/* Moedas */}
          <div className="flex items-center justify-between rounded-xl bg-pink-50 px-4 py-3">
            <div className="flex items-center gap-2 text-pink-600 font-medium">
              <Coins size={16} />
              <span>Moedas</span>
            </div>
            <span className="font-bold text-pink-600">
              {usuario.coins ?? 0}
            </span>
          </div>
        </div>

        {/* BOTÃO EDITAR */}
        <button
          onClick={onEdit}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-pink-600 active:scale-95"
        >
          <Pencil size={16} />
          Editar perfil
        </button>
      </div>
    </section>
  );
};