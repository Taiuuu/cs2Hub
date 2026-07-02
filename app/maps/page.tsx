'use client';

import { MapPin } from 'lucide-react';
import { allMaps } from '@/lib/mapsData';
import { MapCard } from '@/components/maps/MapCard';

export default function MapsPage() {
  const mapData = allMaps.map((map) => ({
    id: map.id,
    nombre: map.name,
    fondo: `/maps/backgrounds/${map.id}.webp`,
    icono: `/maps/icons/${map.id}.png`,
  }));

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        {/* Header */}
        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Mapas competitivos</p>
              <h1 className="mt-3 text-4xl font-bold text-white">Selecciona un mapa</h1>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Explora playbooks completos, callouts, fundamentos y estrategias por mapa.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl border border-zinc-800 bg-zinc-800 px-5 py-4 text-sm font-medium text-zinc-200">
              <MapPin className="h-4 w-4 text-blue-400" />
              {allMaps.length} mapas
            </div>
          </div>
        </section>

        {/* Grid responsive de tarjetas */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mapData.map((map) => (
            <MapCard
              key={map.id}
              id={map.id}
              nombre={map.nombre}
              fondo={map.fondo}
              icono={map.icono}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

