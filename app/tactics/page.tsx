'use client';

import { useMemo, useState } from 'react';
import { Tactic, MapName, TacticType } from '@/types';

const sampleTactics: Tactic[] = [
  {
    id: 'tac-1',
    name: 'Rush B rápido con utility',
    map: 'Dust2',
    type: 'execute',
    team: 'T',
    description: 'Entrada veloz por túnel con humo de puerta, flash de rush y molotov de auto para dejar el postplant limpio.',
    utility: ['Smoke puerta', 'Flash entry', 'Molotov auto'],
    createdAt: new Date('2026-05-28T10:00:00'),
  },
  {
    id: 'tac-2',
    name: 'Split medio-largo',
    map: 'Dust2',
    type: 'setup',
    team: 'T',
    description: 'Control de medio con dos jugadores y ataque de largo para obligar al CT a rotar.',
    utility: ['Smoke xbox', 'Flash corto', 'Smoke largo'],
    createdAt: new Date('2026-05-27T16:30:00'),
  },
  {
    id: 'tac-3',
    name: 'Hold A con 2-2-1',
    map: 'Mirage',
    type: 'setup',
    team: 'CT',
    description: 'Un rotador en CT, un ancla en palacio y dos en A para negar cualquier entrada coordinada.',
    utility: ['Molotov palace', 'Smoke tetris', 'Flash CT'],
    createdAt: new Date('2026-05-26T18:10:00'),
  },
  {
    id: 'tac-4',
    name: 'Default de Nuke con información',
    map: 'Nuke',
    type: 'setup',
    team: 'T',
    description: 'Conseguir control de afuera y rampa para obligar la rotación del CT antes de ejecutar.',
    utility: ['Smoke squeaky', 'Flash hut', 'Molotov ramp'],
    createdAt: new Date('2026-05-25T13:45:00'),
  },
  {
    id: 'tac-5',
    name: 'Retake B organizado',
    map: 'Vertigo',
    type: 'execute',
    team: 'CT',
    description: 'Controlar late con humo de rafters y molotov de scaffolding para limpiar el site.',
    utility: ['Smoke rafters', 'Molotov scaffolding', 'Flash site'],
    createdAt: new Date('2026-05-24T09:20:00'),
  },
];

const mapLabels: MapName[] = ['Dust2', 'Mirage', 'Nuke', 'Inferno', 'Vertigo', 'Ancient', 'Anubis'];
const tacticTypeLabels: Record<TacticType, string> = {
  smoke: 'Smoke',
  flash: 'Flash',
  molotov: 'Molotov',
  execute: 'Ejecución',
  setup: 'Setup',
};

export default function TacticsPage() {
  const [selectedMap, setSelectedMap] = useState<MapName | 'All'>('All');
  const [selectedTeam, setSelectedTeam] = useState<'All' | 'T' | 'CT'>('All');

  const filteredTactics = useMemo(
    () => sampleTactics.filter((tactic) => {
      if (selectedMap !== 'All' && tactic.map !== selectedMap) return false;
      if (selectedTeam !== 'All' && tactic.team !== selectedTeam) return false;
      return true;
    }),
    [selectedMap, selectedTeam]
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Tácticas</h1>
          <p className="text-zinc-400 max-w-2xl">
            Revisa ejecuciones y distribuciones de utilidad por mapa. Filtra por mapa y por lado para encontrar la táctica correcta.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_240px]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Tácticas recientes</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Guarda entradas rápidas para tus ejecuciones clave, así no perdés de vista la utility y la sinergia del equipo.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">Filtros</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">Mapa</label>
                <select
                  value={selectedMap}
                  onChange={(event) => setSelectedMap(event.target.value as MapName | 'All')}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:border-blue-500"
                >
                  <option value="All">Todos los mapas</option>
                  {mapLabels.map((map) => (
                    <option key={map} value={map}>{map}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">Lado</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['All', 'T', 'CT'] as const).map((team) => (
                    <button
                      key={team}
                      type="button"
                      onClick={() => setSelectedTeam(team)}
                      className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                        selectedTeam === team ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {team === 'All' ? 'Todos' : team === 'T' ? 'T' : 'CT'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredTactics.map((tactic) => (
            <article key={tactic.id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 hover:border-blue-500 transition">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{tactic.map} • {tactic.team}</p>
                  <h3 className="text-xl font-semibold text-white mt-2">{tactic.name}</h3>
                </div>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {tacticTypeLabels[tactic.type]}
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">{tactic.description}</p>
              {tactic.utility?.length ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {tactic.utility.map((item) => (
                    <span key={item} className="inline-flex items-center rounded-2xl bg-zinc-900 px-3 py-2 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Sin utilidades listadas.</p>
              )}
            </article>
          ))}
          {filteredTactics.length === 0 && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center">
              <p className="text-zinc-400">No se encontraron tácticas con estos filtros. Probá otra combinación.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
