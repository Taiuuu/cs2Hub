'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, Filter } from 'lucide-react';
import Link from 'next/link';
import { allMaps } from '@/lib/mapsData';
import type { MapData, RoundStrat } from '@/types';

const BUY_CATEGORIES = ['Pistol', 'Eco', 'Force Buy', 'Full Buy'] as const;
const ZONES = ['A', 'Mid', 'B'] as const;
const ROLES = ['entry', 'lurker', 'support', 'anchor', 'awper'] as const;

type Zone = (typeof ZONES)[number];
type Role = (typeof ROLES)[number];

export default function MapDetailPage({ params }: { params: { slug: string } }) {
  const mapData = useMemo(() => {
    return allMaps.find((m) => m.id === params.slug);
  }, [params.slug]);

  const [activeTeam, setActiveTeam] = useState<'T' | 'CT'>('T');
  const [selectedZones, setSelectedZones] = useState<Set<Zone>>(new Set());
  const [selectedRoles, setSelectedRoles] = useState<Set<Role>>(new Set());

  if (!mapData) {
    return (
      <div className="flex-1 overflow-y-auto bg-zinc-950">
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold text-white">Mapa no encontrado</h1>
          <Link
            href="/maps"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver a mapas
          </Link>
        </div>
      </div>
    );
  }

  const toggleZone = (zone: Zone) => {
    const newZones = new Set(selectedZones);
    if (newZones.has(zone)) {
      newZones.delete(zone);
    } else {
      newZones.add(zone);
    }
    setSelectedZones(newZones);
  };

  const toggleRole = (role: Role) => {
    const newRoles = new Set(selectedRoles);
    if (newRoles.has(role)) {
      newRoles.delete(role);
    } else {
      newRoles.add(role);
    }
    setSelectedRoles(newRoles);
  };

  const filteredTactics = useMemo(() => {
    let filtered = mapData.tactics.filter((t) => t.team === activeTeam);

    // Si hay filtros seleccionados, aplicarlos
    if (selectedZones.size > 0 || selectedRoles.size > 0) {
      filtered = filtered.filter((tactic) => {
        // Si hay zonas seleccionadas, verificar si la táctica menciona alguna
        if (selectedZones.size > 0) {
          const tacticText = JSON.stringify(tactic).toLowerCase();
          const hasZone = Array.from(selectedZones).some(
            (zone) => tacticText.includes(zone.toLowerCase() + ' site') || 
                     tacticText.includes('site ' + zone.toLowerCase())
          );
          if (!hasZone) return false;
        }

        // Si hay roles seleccionados, verificar si la táctica tiene alguno
        if (selectedRoles.size > 0) {
          const hasRole = Array.from(selectedRoles).some(
            (role) => tactic.roles && role in tactic.roles
          );
          if (!hasRole) return false;
        }

        return true;
      });
    }

    return filtered;
  }, [activeTeam, selectedZones, selectedRoles, mapData.tactics]);

  const tacticsByCategory = useMemo(() => {
    const grouped: Record<string, RoundStrat[]> = {};
    BUY_CATEGORIES.forEach((cat) => {
      grouped[cat] = filteredTactics.filter((t) => t.category === cat);
    });
    return grouped;
  }, [filteredTactics]);

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      {/* Header con imagen y overlay */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={`/maps/backgrounds/${mapData.id}.jpg`}
          alt={mapData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          <Link
            href="/maps"
            className="self-start flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 transition-colors backdrop-blur-sm border border-zinc-700"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Volver</span>
          </Link>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400 font-semibold">
              {mapData.sideFavor}
            </p>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">{mapData.name}</h1>
            <p className="text-lg text-zinc-200 max-w-2xl drop-shadow">{mapData.description}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-8">
        {/* Tabs Terrorist/CT */}
        <div className="flex gap-4 border-b border-zinc-800">
          {(['T', 'CT'] as const).map((team) => (
            <button
              key={team}
              onClick={() => setActiveTeam(team)}
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all relative ${
                activeTeam === team
                  ? 'text-orange-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {team === 'T' ? 'Terrorist' : 'Counter-Terrorist'}
              {activeTeam === team && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
              )}
            </button>
          ))}
        </div>

        {/* Filtros */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Filtros</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Filtro de Zonas */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                Zona
              </h3>
              <div className="flex flex-wrap gap-2">
                {ZONES.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => toggleZone(zone)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedZones.has(zone)
                        ? 'bg-orange-500 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro de Roles */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                Rol
              </h3>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => toggleRole(role)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                      selectedRoles.has(role)
                        ? 'bg-orange-500 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {role === 'awper' ? 'AWP' : role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Secciones de compra */}
        <div className="space-y-8">
          {BUY_CATEGORIES.map((category) => {
            const tactics = tacticsByCategory[category];
            return (
              <section
                key={category}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden"
              >
                <div className="border-b border-zinc-800 bg-zinc-800/50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                </div>

                <div className="p-6">
                  {tactics.length === 0 ? (
                    <div className="text-center py-12 space-y-2">
                      <p className="text-zinc-400">
                        No hay tácticas disponibles con los filtros seleccionados.
                      </p>
                      <p className="text-sm text-zinc-500">
                        Intenta ajustar los filtros o selecciona {category.toLowerCase()}
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {tactics.map((tactic) => (
                        <div
                          key={tactic.id}
                          className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 hover:border-orange-500/50 hover:bg-zinc-800 transition-all group cursor-pointer"
                        >
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                                {tactic.name}
                              </h4>
                              <p className="text-xs text-zinc-500 mt-1">
                                {tactic.category}
                              </p>
                            </div>

                            {tactic.description && (
                              <p className="text-sm text-zinc-300">{tactic.description}</p>
                            )}

                            {tactic.concept && (
                              <div className="text-xs space-y-1 pt-2 border-t border-zinc-700">
                                <p className="text-zinc-400">
                                  <span className="font-semibold text-zinc-300">Concepto:</span>{' '}
                                  {tactic.concept}
                                </p>
                              </div>
                            )}

                            {tactic.roles && tactic.roles.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-2">
                                {tactic.roles.map((role) => (
                                  <span
                                    key={role.name}
                                    className="inline-block px-2 py-1 rounded text-xs bg-zinc-700/50 text-zinc-300 capitalize"
                                  >
                                    {role.label}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* Sección de información adicional */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-white">Información del mapa</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Filosofía del mapa */}
            <div className="space-y-3">
              <h4 className="font-semibold text-zinc-300">Filosofía</h4>
              <p className="text-sm text-zinc-400">
                {mapData.philosophy?.tWinCondition ||
                  'Información sobre la estrategia general del mapa'}
              </p>
            </div>

            {/* Callouts principales */}
            <div className="space-y-3">
              <h4 className="font-semibold text-zinc-300">Callouts principales</h4>
              <div className="flex flex-wrap gap-2">
                {mapData.callouts?.siteA?.slice(0, 3).map((callout, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-300"
                  >
                    {callout.name}
                  </span>
                ))}
                {mapData.callouts?.middle?.slice(0, 2).map((callout, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-300"
                  >
                    {callout.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
