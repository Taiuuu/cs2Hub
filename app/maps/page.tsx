'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { allMaps } from '@/lib/mapsData';

const sideColors = {
  'T-sided': 'bg-red-900 text-red-100',
  'CT-sided': 'bg-blue-900 text-blue-100',
  'Balanced': 'bg-zinc-700 text-zinc-100',
};

export default function MapsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mapas</h1>
          <p className="text-zinc-400">Selecciona un mapa para ver strats y callouts</p>
        </div>

        {/* Grid de mapas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMaps.map((map) => (
            <Link
              key={map.id}
              href={`/maps/${map.id}`}
              className="group block overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              aria-label={`Ver detalles de ${map.name}`}
            >
              <div className="relative h-72 sm:h-80 bg-zinc-950">
                <img
                  src={map.image ?? '/maps/callout-bg.svg'}
                  alt={`Imagen de fondo de ${map.name}`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-lg">{map.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
