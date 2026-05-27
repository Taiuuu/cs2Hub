'use client';

import { useState, use } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { allMaps } from '@/lib/mapsData';
import { RoundType } from '@/types';

const roundTypeLabels: Record<RoundType, string> = {
  pistol: 'Pistol',
  eco: 'Eco',
  force: 'Forzado',
  'anti-eco': 'Anti-Eco',
  'anti-force': 'Anti-Forzado',
  buy: 'Buy',
};

const roundTypeColors: Record<RoundType, string> = {
  pistol: 'bg-purple-900 hover:bg-purple-800',
  eco: 'bg-yellow-900 hover:bg-yellow-800',
  force: 'bg-orange-900 hover:bg-orange-800',
  'anti-eco': 'bg-green-900 hover:bg-green-800',
  'anti-force': 'bg-cyan-900 hover:bg-cyan-800',
  buy: 'bg-blue-900 hover:bg-blue-800',
};

export default function MapDetailPage({ params }: { params: Promise<{ mapId: string }> }) {
  const { mapId } = use(params);
  const map = allMaps.find((m) => m.id === mapId);
  const [selectedTeam, setSelectedTeam] = useState<'T' | 'CT'>('T');
  const [selectedRoundType, setSelectedRoundType] = useState<RoundType>('pistol');

  if (!map) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          <p className="text-red-400">Mapa no encontrado</p>
        </div>
      </div>
    );
  }

  // Filtrar strats
  const filteredStrats = map.strats.filter(
    (strat) => strat.team === selectedTeam && strat.type === selectedRoundType
  );

  const availableRoundTypes = Array.from(
    new Set(
      map.strats
        .filter((s) => s.team === selectedTeam)
        .map((s) => s.type)
    )
  ) as RoundType[];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        {/* Header con volver */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/maps" className="p-2 rounded-lg hover:bg-zinc-900 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400 hover:text-white" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white">{map.name}</h1>
            <p className="text-zinc-400 mt-1">
              {map.sideFavor === 'T-sided' && '🔴 Favorecido para Terroristas'}
              {map.sideFavor === 'CT-sided' && '🔵 Favorecido para Counter-Terrorists'}
              {map.sideFavor === 'Balanced' && '⚖️ Balanceado'}
            </p>
          </div>
        </div>

        {/* Descripción y Fundamentales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Descripción */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900">
            <h2 className="text-lg font-semibold text-white mb-3">Filosofía del Mapa</h2>
            <p className="text-zinc-300 leading-relaxed">{map.description}</p>
          </div>

          {/* Callouts */}
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900">
            <h2 className="text-lg font-semibold text-white mb-3">Callouts Clave</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Site A</p>
                <p className="text-xs text-zinc-300">{map.callouts.siteA.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400 mb-1">Medio</p>
                <p className="text-xs text-zinc-300">{map.callouts.middle.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400 mb-1">Site B</p>
                <p className="text-xs text-zinc-300">{map.callouts.siteB.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Principios Fundamentales */}
        {(map.fundamentals.t.length > 0 || map.fundamentals.ct.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {map.fundamentals.t.length > 0 && (
              <div className="border border-red-900 rounded-lg p-6 bg-zinc-900">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Fundamentos T</h3>
                <ul className="space-y-2">
                  {map.fundamentals.t.map((tip, idx) => (
                    <li key={idx} className="text-sm text-zinc-300 flex gap-2">
                      <span className="text-red-400 mt-1">▪</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {map.fundamentals.ct.length > 0 && (
              <div className="border border-blue-900 rounded-lg p-6 bg-zinc-900">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Fundamentos CT</h3>
                <ul className="space-y-2">
                  {map.fundamentals.ct.map((tip, idx) => (
                    <li key={idx} className="text-sm text-zinc-300 flex gap-2">
                      <span className="text-blue-400 mt-1">▪</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Strats */}
        {map.strats.length > 0 && (
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900">
            <h2 className="text-2xl font-bold text-white mb-6">Estrategias</h2>

            {/* Filtros */}
            <div className="mb-8 space-y-4">
              {/* Filtro de lado */}
              <div>
                <p className="text-sm font-medium text-zinc-300 mb-2">Lado</p>
                <div className="flex gap-2">
                  {(['T', 'CT'] as const).map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      className={`px-4 py-2 rounded font-medium transition-colors ${
                        selectedTeam === team
                          ? team === 'T'
                            ? 'bg-red-600 text-white'
                            : 'bg-blue-600 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {team === 'T' ? '🔴 Terroristas' : '🔵 Counter-Terrorists'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro de tipo de ronda */}
              {availableRoundTypes.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-zinc-300 mb-2">Tipo de Ronda</p>
                  <div className="flex flex-wrap gap-2">
                    {availableRoundTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedRoundType(type)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          selectedRoundType === type
                            ? `${roundTypeColors[type]}`
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {roundTypeLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Strats filtradas */}
            {filteredStrats.length > 0 ? (
              <div className="space-y-4">
                {filteredStrats.map((strat) => (
                  <div key={strat.id} className="border border-zinc-700 rounded-lg p-4 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{strat.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${roundTypeColors[strat.type]}`}>
                        {roundTypeLabels[strat.type]}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-300 mb-3">{strat.description}</p>

                    {strat.setup && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-zinc-400 mb-1">Setup</p>
                        <p className="text-sm text-zinc-300">{strat.setup}</p>
                      </div>
                    )}

                    {strat.utilities && strat.utilities.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-zinc-400 mb-1">Utilidades</p>
                        <div className="flex flex-wrap gap-1">
                          {strat.utilities.map((util, idx) => (
                            <span key={idx} className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs">
                              {util}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {strat.tips && strat.tips.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-zinc-400 mb-2">Tips</p>
                        <ul className="space-y-1">
                          {strat.tips.map((tip, idx) => (
                            <li key={idx} className="text-xs text-zinc-300 flex gap-2">
                              <span className="text-yellow-500">→</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-zinc-400">
                  No hay strats disponibles para {selectedTeam === 'T' ? 'Terroristas' : 'Counter-Terrorists'} en{' '}
                  {roundTypeLabels[selectedRoundType]}
                </p>
              </div>
            )}
          </div>
        )}

        {map.strats.length === 0 && (
          <div className="border border-zinc-800 rounded-lg p-8 text-center bg-zinc-900">
            <p className="text-zinc-400 mb-4">No hay strats detalladas para este mapa aún.</p>
            <p className="text-sm text-zinc-500">Próximamente se agregarán más estrategias</p>
          </div>
        )}
      </div>
    </div>
  );
}
