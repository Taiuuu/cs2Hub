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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allMaps.map((map) => (
            <Link
              key={map.id}
              href={`/maps/${map.id}`}
              className="group border border-zinc-800 rounded-lg p-6 hover:border-blue-500 hover:bg-zinc-900 transition-all duration-200"
            >
              {/* Nombre del mapa */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {map.name}
                </h2>
                <MapPin className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
              </div>

              {/* Descripción */}
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{map.description}</p>

              {/* Favor del mapa */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded text-xs font-medium ${sideColors[map.sideFavor]}`}>
                  {map.sideFavor}
                </span>
                {map.strats.length > 0 && (
                  <span className="text-xs text-zinc-500">
                    {map.strats.length} strats
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
