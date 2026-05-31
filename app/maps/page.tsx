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
        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Mapas competitivos</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Guía de playbooks por mapa</h1>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Encuentra los playbooks más completos por mapa, con callouts, fundamentos y estrategias priorizadas para scrims y FACEIT.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-medium text-zinc-200">
              <MapPin className="h-4 w-4 text-blue-400" />
              {allMaps.length} mapas cargados
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {allMaps.map((map) => (
            <Link
              key={map.id}
              href={`/maps/${map.id}`}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
              aria-label={`Ver detalles de ${map.name}`}
            >
              <div className="relative h-64 overflow-hidden bg-zinc-900">
                <img
                  src={map.image ?? '/maps/callout-bg.svg'}
                  alt={`Imagen de ${map.name}`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{map.sideFavor}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{map.name}</h2>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-sm leading-6 text-zinc-400">{map.description}</p>
                <div className="flex flex-wrap gap-2">
                  {map.callouts.siteA.slice(0, 1).map((value) => (
                    <span key={value} className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                      {value}
                    </span>
                  ))}
                  {map.callouts.middle.slice(0, 1).map((value) => (
                    <span key={value} className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                      {value}
                    </span>
                  ))}
                  {map.callouts.siteB.slice(0, 1).map((value) => (
                    <span key={value} className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                      {value}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sideColors[map.sideFavor]}`}>
                    {map.sideFavor}
                  </span>
                  <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white transition group-hover:bg-blue-400">
                    Ver playbook
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
