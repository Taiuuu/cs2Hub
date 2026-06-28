'use client';

import { useState, use } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { allMaps } from '@/lib/mapsData';

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
  ],
  mirage: [
    { id: 'short', label: 'Short', left: '24%', top: '63%' },
    { id: 'connector', label: 'Connector', left: '48%', top: '46%' },
    { id: 'palacio', label: 'Palacio', left: '16%', top: '40%' },
    { id: 'window', label: 'Ventana', left: '56%', top: '34%' },
    { id: 'apps', label: 'Apps', left: '78%', top: '72%' },
  ],
  inferno: [
    { id: 'banana', label: 'Banana', left: '34%', top: '48%' },
    { id: 'mid', label: 'Mid', left: '56%', top: '36%' },
    { id: 'palacio', label: 'Palacio', left: '16%', top: '26%' },
  ],
  nuke: [
    { id: 'rampa', label: 'Rampa', left: '72%', top: '64%' },
    { id: 'secret', label: 'Secret', left: '84%', top: '56%' },
    { id: 'afuera', label: 'Afuera', left: '38%', top: '74%' },
  ],
  vertigo: [
    { id: 'a-site', label: 'Site A', left: '24%', top: '20%' },
    { id: 'mid', label: 'Mid', left: '50%', top: '44%' },
    { id: 'b-site', label: 'Site B', left: '76%', top: '72%' },
  ],
  ancient: [
    { id: 'mid', label: 'Mid', left: '48%', top: '42%' },
    { id: 'a-site', label: 'Site A', left: '26%', top: '20%' },
    { id: 'b-site', label: 'Site B', left: '78%', top: '72%' },
  ],
  anubis: [
    { id: 'mid', label: 'Mid', left: '50%', top: '44%' },
    { id: 'site-a', label: 'Site A', left: '26%', top: '18%' },
    { id: 'site-b', label: 'Site B', left: '78%', top: '72%' },
  ],
  cache: [
    { id: 'mid', label: 'Mid', left: '50%', top: '40%' },
    { id: 'a-site', label: 'Site A', left: '24%', top: '20%' },
    { id: 'b-site', label: 'Site B', left: '76%', top: '70%' },
  ],
  overpass: [
    { id: 'agua', label: 'Agua', left: '30%', top: '60%' },
    { id: 'monster', label: 'Monster', left: '50%', top: '40%' },
    { id: 'a-site', label: 'Site A', left: '22%', top: '20%' },
  ],
  train: [
    { id: 'ivy', label: 'Ivy', left: '28%', top: '35%' },
    { id: 'a-site', label: 'Site A', left: '24%', top: '20%' },
    { id: 'b-site', label: 'Site B', left: '76%', top: '70%' },
  ],
};

const categoryColors: Record<string, string> = {
  Default: 'bg-zinc-700',
  Protocol: 'bg-indigo-700',
  Retake: 'bg-violet-800',
  Reaggression: 'bg-rose-800',
  AntiEco: 'bg-green-800',
  Pistol: 'bg-purple-800',
  Eco: 'bg-yellow-800',
  Force: 'bg-orange-800',
  Buy: 'bg-blue-800',
  MidRound: 'bg-slate-700',
};

export default function MapDetailPage({ params }: { params: Promise<{ mapId: string }> }) {
  const { mapId } = use(params);
  const map = allMaps.find((m) => m.id === mapId);
  const [selectedTeam, setSelectedTeam] = useState<'T' | 'CT'>('T');
  const [selectedCategory, setSelectedCategory] = useState<string>('Default');
  const [activeTab, setActiveTab] = useState<'overview' | 'callouts' | 'strats'>('overview');
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

  const tactics = map.tactics ?? [];
  const categories = Array.from(new Set(tactics.map((t) => t.category)));
  const filteredTactics = tactics.filter(
    (t) => t.team === selectedTeam && t.category === selectedCategory
  );
  const calloutMarkers = mapCalloutMarkers[map.id] ?? [];

  // Callouts: soporta tanto string[] como {name, description}[]
  const toStringArray = (arr: Array<string | { name: string; description?: string }>) =>
    arr.map((x) => (typeof x === 'string' ? x : x.name));

  const siteA = toStringArray(map.callouts?.siteA ?? []);
  const siteB = toStringArray(map.callouts?.siteB ?? []);
  const middle = toStringArray(map.callouts?.middle ?? []);

  // Fundamentals: soporta {T, CT} y {t, ct}
  const fundamentalsT: string[] = (map.fundamentals as any)?.T ?? (map.fundamentals as any)?.t ?? [];
  const fundamentalsCT: string[] = (map.fundamentals as any)?.CT ?? (map.fundamentals as any)?.ct ?? [];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/maps" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-zinc-700 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Mapa</p>
              <h1 className="mt-2 text-4xl font-semibold text-white">{map.name}</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300">
              {map.sideFavor}
            </span>
            <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white">
              {tactics.length} estrategias
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { key: 'overview', label: 'Resumen' },
            { key: 'callouts', label: 'Callouts' },
            { key: 'strats', label: 'Estrategias' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
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

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px] mb-8">
              <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                <h2 className="text-lg font-semibold text-white mb-3">Filosofía del mapa</h2>
                <p className="text-zinc-300 leading-relaxed">{map.description}</p>
                {map.philosophy && (
                  <div className="mt-4 space-y-2 text-sm text-zinc-400">
                    <p><span className="text-red-400 font-medium">T:</span> {map.philosophy.tWinCondition}</p>
                    <p><span className="text-blue-400 font-medium">CT:</span> {map.philosophy.ctWinCondition}</p>
                    <p><span className="text-zinc-300 font-medium">Tempo:</span> {map.philosophy.tempo}</p>
                    <p><span className="text-zinc-300 font-medium">Rotaciones:</span> {map.philosophy.rotationComplexity}</p>
                  </div>
                )}
              </div>
              <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                <h2 className="text-lg font-semibold text-white mb-3">Callouts clave</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Site A</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{siteA.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Medio</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{middle.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Site B</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{siteB.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {(fundamentalsT.length > 0 || fundamentalsCT.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {fundamentalsT.length > 0 && (
                  <div className="border border-red-900 rounded-3xl p-6 bg-zinc-900">
                    <h3 className="text-lg font-semibold text-red-400 mb-3">Fundamentos T</h3>
                    <ul className="space-y-3">
                      {fundamentalsT.map((tip, idx) => (
                        <li key={idx} className="text-sm text-zinc-300 flex gap-2">
                          <span className="text-red-400 mt-1">▪</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {fundamentalsCT.length > 0 && (
                  <div className="border border-blue-900 rounded-3xl p-6 bg-zinc-900">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Fundamentos CT</h3>
                    <ul className="space-y-3">
                      {fundamentalsCT.map((tip, idx) => (
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

        {/* CALLOUTS */}
        {activeTab === 'callouts' && (
          <div className="space-y-8 mb-8">
            <div className="border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950">
              <div className="relative aspect-[4/3] min-h-[440px] bg-zinc-950">
                <img
                  src={`/maps/callouts/${map.id}.jpg`}
                  alt={`Minimap de ${map.name}`}
                  className="h-full w-full object-cover brightness-90"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {calloutMarkers.map((marker) => (
                  <button
                    key={marker.id}
                    type="button"
                    onMouseEnter={() => setHighlightedCallout(marker.label)}
                    onMouseLeave={() => setHighlightedCallout(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-blue-500/90 p-3 shadow-lg transition hover:scale-110"
                    style={{ left: marker.left, top: marker.top }}
                  />
                ))}
                <div className="absolute left-4 bottom-4 rounded-3xl bg-black/80 px-4 py-3 text-sm text-white">
                  {highlightedCallout ?? 'Pasá el cursor sobre una zona'}
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[{ label: 'Site A', items: siteA }, { label: 'Medio', items: middle }, { label: 'Site B', items: siteB }].map(({ label, items }) => (
                <div key={label} className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
                  <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">{label}</h3>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {items.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STRATS */}
        {activeTab === 'strats' && (
          <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-900">
            <h2 className="text-2xl font-bold text-white mb-6">Estrategias</h2>

            {/* Filtro equipo */}
            <div className="mb-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-zinc-300 mb-2">Lado</p>
                <div className="flex gap-2 flex-wrap">
                  {(['T', 'CT'] as const).map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        selectedTeam === team
                          ? team === 'T' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {team === 'T' ? '🔴 Terroristas' : '🔵 Counter-Terrorists'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro categoría */}
              {categories.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-zinc-300 mb-2">Categoría</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === cat
                            ? `${categoryColors[cat] ?? 'bg-zinc-600'} text-white`
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lista de tácticas */}
            {filteredTactics.length > 0 ? (
              <div className="space-y-4">
                {filteredTactics.map((tactic) => (
                  <div key={tactic.id} className="border border-zinc-700 rounded-3xl p-5 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <h3 className="text-xl font-semibold text-white">{tactic.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryColors[tactic.category] ?? 'bg-zinc-600'}`}>
                        {tactic.category}
                      </span>
                    </div>
                    {tactic.setup && (
                      <p className="text-xs text-zinc-400 mb-2">Setup: <span className="text-zinc-300">{tactic.setup}</span></p>
                    )}
                    <p className="text-sm text-zinc-300 mb-3">{tactic.description}</p>
                    {tactic.winCondition && (
                      <p className="text-xs text-green-400 mb-2">✓ {tactic.winCondition}</p>
                    )}
                    {tactic.minimumUtility && tactic.minimumUtility.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-zinc-400 mb-2">Utilidades mínimas</p>
                        <div className="flex flex-wrap gap-2">
                          {tactic.minimumUtility.map((u, i) => (
                            <span key={i} className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs">{u}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {tactic.reactionTree && (
                      <div className="mt-3 p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                        <p className="text-xs font-medium text-zinc-400 mb-1">Árbol de reacción</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">{tactic.reactionTree}</p>
                      </div>
                    )}
                    {tactic.roles && tactic.roles.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-zinc-400 mb-2">Roles</p>
                        <div className="flex flex-wrap gap-2">
                          {tactic.roles.map((role, i) => (
                            <span key={i} className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-xs">
                              {role.label ?? role.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-zinc-400">No hay estrategias para {selectedTeam === 'T' ? 'Terroristas' : 'Counter-Terrorists'} en {selectedCategory}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}