'use client';

import { useState, useEffect, use } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { allMaps } from '@/lib/mapsData';
import { MapStrategyCategory, RoundType } from '@/types';

const categoryOrder: MapStrategyCategory[] = [
  'Default',
  'Pistol',
  'Eco',
  'Force Buy',
  'Full Buy',
  'Anti Eco',
  'Anti Force',
  'Buy vs Buy',
  'Retakes',
  'Protocol',
  'Reaggression',
  'Mid Round Calls',
  'Reacciones CT',
  'Reacciones T',
  'Situaciones especiales',
];

const roundTypeLabels: Record<RoundType, string> = {
  pistol: 'Pistol',
  eco: 'Eco',
  force: 'Forzado',
  buy: 'Buy',
  'full-buy': 'Full Buy',
  'anti-eco': 'Anti-Eco',
  'anti-force': 'Anti-Forzado',
  'buy-vs-buy': 'Buy vs Buy',
  default: 'Default',
  retake: 'Retake',
  protocol: 'Protocol',
  antiEco: 'Anti Eco',
  reaggression: 'Reaggression',
  midRound: 'Mid Round',
  exec: 'Exec',
  split: 'Split',
  rush: 'Rush',
  contact: 'Contact',
  'mid-control': 'Mid Control',
  'late-exec': 'Late Exec',
};

const roundTypeColors: Record<RoundType, string> = {
  pistol: 'bg-purple-900 hover:bg-purple-800',
  eco: 'bg-yellow-900 hover:bg-yellow-800',
  force: 'bg-orange-900 hover:bg-orange-800',
  buy: 'bg-blue-800 hover:bg-blue-700',
  'full-buy': 'bg-blue-900 hover:bg-blue-800',
  'anti-eco': 'bg-green-900 hover:bg-green-800',
  antiEco: 'bg-emerald-900 hover:bg-emerald-800',
  'anti-force': 'bg-cyan-900 hover:bg-cyan-800',
  'buy-vs-buy': 'bg-fuchsia-900 hover:bg-fuchsia-800',
  default: 'bg-zinc-700 hover:bg-zinc-600',
  retake: 'bg-violet-900 hover:bg-violet-800',
  protocol: 'bg-indigo-700 hover:bg-indigo-600',
  reaggression: 'bg-rose-900 hover:bg-rose-800',
  midRound: 'bg-slate-900 hover:bg-slate-800',
  exec: 'bg-emerald-900 hover:bg-emerald-800',
  split: 'bg-sky-900 hover:bg-sky-800',
  rush: 'bg-red-800 hover:bg-red-700',
  contact: 'bg-amber-900 hover:bg-amber-800',
  'mid-control': 'bg-indigo-900 hover:bg-indigo-800',
  'late-exec': 'bg-teal-900 hover:bg-teal-800',
};

type CalloutMarker = {
  id: string;
  label: string;
  left: string;
  top: string;
};

const mapCalloutMarkers: Record<string, CalloutMarker[]> = {
  dust2: [
    { id: 'largo', label: 'Largo', left: '18%', top: '56%' },
    { id: 'corto', label: 'Corto', left: '62%', top: '74%' },
    { id: 'mid', label: 'Mid', left: '50%', top: '39%' },
    { id: 'b-tuneles', label: 'B túneles', left: '78%', top: '58%' },
    { id: 'b-planta', label: 'B planta', left: '80%', top: '72%' },
    { id: 'puerta', label: 'Puerta', left: '46%', top: '55%' },
    { id: 'xbox', label: 'Xbox', left: '52%', top: '26%' },
    { id: 'ventana', label: 'Ventana', left: '62%', top: '22%' },
    { id: 'garita', label: 'Garita', left: '26%', top: '52%' },
  ],
  mirage: [
    { id: 'short', label: 'Short', left: '24%', top: '63%' },
    { id: 'connector', label: 'Connector', left: '48%', top: '46%' },
    { id: 'palacio', label: 'Palacio', left: '16%', top: '40%' },
    { id: 'jungle', label: 'Jungla', left: '29%', top: '53%' },
    { id: 'window', label: 'Ventana', left: '56%', top: '34%' },
    { id: 'apps', label: 'Apps', left: '78%', top: '72%' },
    { id: 'van', label: 'Van', left: '74%', top: '82%' },
  ],
  nuke: [
    { id: 'caseta', label: 'Caseta', left: '29%', top: '32%' },
    { id: 'metal', label: 'Metal', left: '37%', top: '48%' },
    { id: 'rafters', label: 'Rafters', left: '61%', top: '22%' },
    { id: 'rampa', label: 'Rampa', left: '72%', top: '64%' },
    { id: 'secret', label: 'Secret', left: '84%', top: '56%' },
    { id: 'afuera', label: 'Afuera', left: '38%', top: '74%' },
    { id: 'ducto', label: 'Ducto', left: '68%', top: '74%' },
  ],
  inferno: [
    { id: 'apps', label: 'Apps', left: '22%', top: '70%' },
    { id: 'banana', label: 'Banana', left: '34%', top: '48%' },
    { id: 'mid', label: 'Mid', left: '56%', top: '36%' },
    { id: 'palacio', label: 'Palacio', left: '16%', top: '26%' },
    { id: 'site-a', label: 'Site A', left: '18%', top: '18%' },
    { id: 'site-b', label: 'Site B', left: '80%', top: '66%' },
  ],
  vertigo: [
    { id: 'a-site', label: 'Site A', left: '24%', top: '20%' },
    { id: 'mid', label: 'Mid', left: '50%', top: '44%' },
    { id: 'b-site', label: 'Site B', left: '76%', top: '72%' },
    { id: 'rafters', label: 'Rafters', left: '52%', top: '24%' },
  ],
  ancient: [
    { id: 'mid', label: 'Mid', left: '48%', top: '42%' },
    { id: 'a-site', label: 'Site A', left: '26%', top: '20%' },
    { id: 'b-site', label: 'Site B', left: '78%', top: '72%' },
    { id: 'water', label: 'Water', left: '63%', top: '58%' },
  ],
  anubis: [
    { id: 'main', label: 'Main', left: '26%', top: '34%' },
    { id: 'temple', label: 'Temple', left: '18%', top: '22%' },
    { id: 'mid', label: 'Mid', left: '50%', top: '44%' },
    { id: 'site-a', label: 'Site A', left: '26%', top: '18%' },
    { id: 'site-b', label: 'Site B', left: '78%', top: '72%' },
  ],
};

export default function MapDetailPage({ params }: { params: Promise<{ mapId: string }> }) {
  const { mapId } = use(params);
  const map = allMaps.find((m) => m.id === mapId);
  const [selectedTeam, setSelectedTeam] = useState<'T' | 'CT'>('T');
  const [selectedRoundType, setSelectedRoundType] = useState<RoundType>('pistol');
  const [selectedCategory, setSelectedCategory] = useState<MapStrategyCategory>('Default');
  const [activeTab, setActiveTab] = useState<'overview' | 'callouts' | 'utilities' | 'strats'>('overview');
  const [highlightedCallout, setHighlightedCallout] = useState<string | null>(null);

  if (!map) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          <p className="text-red-400">Mapa no encontrado</p>
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(map.strats.map((strat) => strat.category ?? 'Default'))) as MapStrategyCategory[];

  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const filteredStrats = map.strats.filter(
    (strat) =>
      strat.team === selectedTeam &&
      strat.type === selectedRoundType &&
      (strat.category ?? 'Default') === selectedCategory
  );

  const availableRoundTypes = Array.from(
    new Set(
      map.strats
        .filter((s) => s.team === selectedTeam)
        .map((s) => s.type)
    )
  ) as RoundType[];

  const utilities = Array.from(new Set(map.strats.flatMap((s) => s.utilities ?? [])));
  const calloutMarkers = mapCalloutMarkers[map.id] ?? [];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
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

        <div className="flex flex-wrap gap-3 mb-10">
          {[
              { key: 'overview', label: 'Overview' },
              { key: 'callouts', label: 'Callouts' },
              { key: 'utilities', label: 'Utilidades' },
              { key: 'strats', label: 'Estrategias' },
            ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as 'overview' | 'callouts' | 'utilities' | 'strats')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mb-8">
              <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                <h2 className="text-lg font-semibold text-white mb-3">Filosofía del Mapa</h2>
                <p className="text-zinc-300 leading-relaxed">{map.description}</p>
              </div>
              <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                <h2 className="text-lg font-semibold text-white mb-3">Callouts Clave</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-zinc-400 mb-2">Site A</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{map.callouts.siteA.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-2">Medio</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{map.callouts.middle.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-2">Site B</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{map.callouts.siteB.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {(map.fundamentals.t.length > 0 || map.fundamentals.ct.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {map.fundamentals.t.length > 0 && (
                  <div className="border border-red-900 rounded-3xl p-6 bg-zinc-900">
                    <h3 className="text-lg font-semibold text-red-400 mb-3">Fundamentos T</h3>
                    <ul className="space-y-3">
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
                  <div className="border border-blue-900 rounded-3xl p-6 bg-zinc-900">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Fundamentos CT</h3>
                    <ul className="space-y-3">
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
          </>
        )}

        {activeTab === 'callouts' && (
          <div className="space-y-8 mb-8">
            <div className="border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950">
              <div className="relative aspect-[4/3] min-h-[440px] bg-zinc-950">
                <img
                  src={map.calloutImage ?? '/maps/callout-bg.svg'}
                  alt={`Minimap de callouts de ${map.name}`}
                  className="h-full w-full object-cover brightness-90"
                />
                {calloutMarkers.map((marker) => (
                  <button
                    key={marker.id}
                    type="button"
                    onMouseEnter={() => setHighlightedCallout(marker.label)}
                    onMouseLeave={() => setHighlightedCallout(null)}
                    onFocus={() => setHighlightedCallout(marker.label)}
                    onBlur={() => setHighlightedCallout(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-blue-500/90 p-3 shadow-lg shadow-black/30 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{ left: marker.left, top: marker.top }}
                    aria-label={marker.label}
                  >
                    <span className="sr-only">{marker.label}</span>
                  </button>
                ))}
                <div className="absolute left-4 bottom-4 rounded-3xl bg-black/80 px-4 py-3 text-sm text-white shadow-xl shadow-black/40">
                  {highlightedCallout ?? 'Pasa el cursor sobre una zona para ver el callout'}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">Site A</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {map.callouts.siteA.map((callout) => (
                    <li key={callout} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      {callout}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">Medio</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {map.callouts.middle.map((callout) => (
                    <li key={callout} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      {callout}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">Site B</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {map.callouts.siteB.map((callout) => (
                    <li key={callout} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      {callout}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'utilities' && (
          <div className="space-y-8 mb-8">
            <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
              <h2 className="text-2xl font-bold text-white mb-4">Utilidades clave</h2>
              <p className="text-sm text-zinc-400 mb-6">Resumen de utilidades más frecuentes en este mapa, extraídas de las estrategias clave.</p>
              {utilities.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {utilities.map((util) => (
                    <div key={util} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
                      <p className="text-sm font-semibold text-white mb-2">{util}</p>
                      <p className="text-xs text-zinc-400">Útil en varias rondas del mapa para controlar ángulos y ganar espacios.</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400">No hay utilidades registradas para este mapa aún.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'strats' && (
          <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
            <h2 className="text-2xl font-bold text-white mb-6">Estrategias</h2>

            <div className="mb-8 space-y-4">
              <div>
                <p className="text-sm font-medium text-zinc-300 mb-2">Lado</p>
                <div className="flex gap-2 flex-wrap">
                  {(['T', 'CT'] as const).map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
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

              {availableRoundTypes.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-zinc-300 mb-2">Tipo de Ronda</p>
                  <div className="flex flex-wrap gap-2">
                    {availableRoundTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedRoundType(type)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedRoundType === type
                            ? `${roundTypeColors[type]} text-white`
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {roundTypeLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {categories.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-zinc-300 mb-2">Categoría</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryOrder.filter((category) => categories.includes(category)).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-zinc-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {filteredStrats.length > 0 ? (
              <div className="space-y-4">
                {filteredStrats.map((strat) => (
                  <div key={strat.id} className="border border-zinc-700 rounded-3xl p-5 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <h3 className="text-xl font-semibold text-white">{strat.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${roundTypeColors[strat.type]}`}>
                        {roundTypeLabels[strat.type]}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-300 mb-4">{strat.description}</p>

                    {strat.setup && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-zinc-400 mb-1">Setup</p>
                        <p className="text-sm text-zinc-300">{strat.setup}</p>
                      </div>
                    )}

                    {strat.utilities && strat.utilities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-zinc-400 mb-2">Utilidades</p>
                        <div className="flex flex-wrap gap-2">
                          {strat.utilities.map((util, idx) => (
                            <span key={idx} className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs">
                              {util}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {strat.tips && strat.tips.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-zinc-400 mb-2">Tips</p>
                        <ul className="space-y-2">
                          {strat.tips.map((tip, idx) => (
                            <li key={idx} className="text-sm text-zinc-300 flex gap-2">
                              <span className="text-yellow-400">→</span>
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
              <div className="text-center py-10">
                <p className="text-zinc-400">
                  No hay strats disponibles para {selectedTeam === 'T' ? 'Terroristas' : 'Counter-Terrorists'} en{' '}
                  {roundTypeLabels[selectedRoundType]}
                </p>
              </div>
            )}

            {map.strats.length === 0 && (
              <div className="border border-zinc-800 rounded-3xl p-8 text-center bg-zinc-900 mt-6">
                <p className="text-zinc-400 mb-4">No hay strats detalladas para este mapa aún.</p>
                <p className="text-sm text-zinc-500">Próximamente se agregarán más estrategias</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
