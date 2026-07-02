'use client';

import { useMemo, useState } from 'react';
import { MapName, TacticType } from '@/types';

const sampleTactics = [
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
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center">
          <h1 className="text-3xl font-semibold text-white mb-2">Tácticas movidas</h1>
          <p className="text-zinc-400">Ahora las tácticas están disponibles dentro de la página de cada mapa. Navega a <a href="/maps" className="text-blue-500 underline">Mapas</a> y selecciona un mapa para ver sus tácticas.</p>
        </div>
      </div>
    </div>
  );
}
