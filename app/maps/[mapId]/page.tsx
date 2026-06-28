'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { allMaps } from '@/lib/mapsData';
import { MapData, Tactic } from '@/types';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

// ─── helpers ────────────────────────────────────────────────────────────────

const ROUND_LABELS: Record<string, string> = {
  Pistol: 'Pistola', Eco: 'Eco', Force: 'Forzada', Buy: 'Compra',
  AntiEco: 'Anti-Eco', Default: 'Default', Protocol: 'Execute',
  Retake: 'Retake', MidRound: 'Mid-Round', Reaggression: 'Re-aggression',
};

const ROUND_ORDER = ['Pistol','Default','Eco','Force','Buy','Protocol','AntiEco','Retake','MidRound','Reaggression'];

const SIDE_COLOR = {
  T:  { bg: 'rgba(234,179,8,0.08)',  border: '#854d0e', text: '#fbbf24', badge: 'rgba(234,179,8,0.15)'  },
  CT: { bg: 'rgba(59,130,246,0.08)', border: '#1e3a5f', text: '#60a5fa', badge: 'rgba(59,130,246,0.15)' },
};

function groupBySide(tactics: Tactic[]) {
  const t  = tactics.filter(t => t.team === 'T');
  const ct = tactics.filter(t => t.team === 'CT');
  return { T: t, CT: ct };
}

function groupByCategory(tactics: Tactic[]) {
  const map: Record<string, Tactic[]> = {};
  for (const t of tactics) {
    const cat = t.category || 'Default';
    if (!map[cat]) map[cat] = [];
    map[cat].push(t);
  }
  return map;
}

// ─── Tactic Card ────────────────────────────────────────────────────────────

function TacticCard({ tactic, side }: { tactic: Tactic; side: 'T' | 'CT' }) {
  const [open, setOpen] = useState(false);
  const col = SIDE_COLOR[side];

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{ background: '#0d0d0d', border: `1px solid ${open ? col.border : '#1e1e1e'}` }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-3 p-4 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>
              {tactic.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: col.badge, color: col.text }}
            >
              {ROUND_LABELS[tactic.category || ''] || tactic.category}
            </span>
          </div>
          {tactic.setup && (
            <p className="text-xs font-mono" style={{ color: '#444444' }}>{tactic.setup}</p>
          )}
        </div>
        <span style={{ color: '#333333', flexShrink: 0, marginTop: 2 }}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Expanded */}
      {open && (
        <div className="px-4 pb-4 space-y-4" style={{ borderTop: '1px solid #1a1a1a' }}>
          {tactic.description && (
            <p className="text-sm pt-4 leading-relaxed" style={{ color: '#888888' }}>
              {tactic.description}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tactic.objectivePrincipal && (
              <InfoBlock label="Objetivo" value={tactic.objectivePrincipal} accent={col.text} />
            )}
            {tactic.winCondition && (
              <InfoBlock label="Condición de victoria" value={tactic.winCondition} accent="#22c55e" />
            )}
            {tactic.timingWindows && (
              <InfoBlock label="Timing" value={tactic.timingWindows} accent="#f59e0b" />
            )}
            {tactic.postplant && (
              <InfoBlock label="Post-plant" value={tactic.postplant} accent="#a78bfa" />
            )}
          </div>

          {tactic.minimumUtility && tactic.minimumUtility.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: '#444444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Utilidad mínima
              </p>
              <div className="flex flex-wrap gap-2">
                {tactic.minimumUtility.map((u, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg"
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#aaaaaa' }}>
                    {u}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tactic.reactionTree && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: '#444444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Árbol de reacción
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#666666', fontStyle: 'italic' }}>
                {tactic.reactionTree}
              </p>
            </div>
          )}

          {tactic.commonMistakes && tactic.commonMistakes.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Errores comunes
              </p>
              <ul className="space-y-1">
                {tactic.commonMistakes.map((m, i) => (
                  <li key={i} className="text-xs flex gap-2" style={{ color: '#666666' }}>
                    <span style={{ color: '#ef444488' }}>×</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tactic.roles && tactic.roles.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: '#444444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Roles
              </p>
              <div className="space-y-2">
                {tactic.roles.map((role, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: col.text }}>
                      {role.label || role.name}
                      {role.position && <span style={{ color: '#555555', fontWeight: 400 }}> — {role.position}</span>}
                    </p>
                    {role.objective && <p className="text-xs" style={{ color: '#666666' }}>{role.objective}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-lg p-3" style={{ background: '#111111', border: '1px solid #1a1a1a' }}>
      <p className="text-xs font-semibold mb-1" style={{ color: accent, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: '#888888' }}>{value}</p>
    </div>
  );
}

// ─── Side Panel ─────────────────────────────────────────────────────────────

function SidePanel({ map, side }: { map: MapData; side: 'T' | 'CT' }) {
  const col = SIDE_COLOR[side];
  const tactics = groupBySide(map.tactics)[side];
  const byCategory = groupByCategory(tactics);
  const fundamentals = side === 'T' ? map.fundamentals.T : map.fundamentals.CT;

  const orderedCats = ROUND_ORDER.filter(c => byCategory[c]);
  const otherCats = Object.keys(byCategory).filter(c => !ROUND_ORDER.includes(c));

  return (
    <div className="space-y-6">
      {/* Fundamentals */}
      <div className="rounded-xl p-4" style={{ background: '#0d0d0d', border: `1px solid ${col.border}` }}>
        <p className="text-xs font-semibold mb-3" style={{ color: col.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Principios {side === 'T' ? 'Terrorista' : 'Counter-Terrorista'}
        </p>
        <ul className="space-y-2">
          {fundamentals.map((f, i) => (
            <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: '#777777' }}>
              <span style={{ color: col.text, flexShrink: 0 }}>›</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Win condition */}
      <div className="rounded-xl p-4" style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}>
        <p className="text-xs font-semibold mb-2" style={{ color: '#444444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Condición de victoria
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
          {side === 'T' ? map.philosophy.tWinCondition : map.philosophy.ctWinCondition}
        </p>
      </div>

      {/* Tactics by category */}
      {[...orderedCats, ...otherCats].map(cat => (
        <div key={cat}>
          <p className="text-xs font-semibold mb-2 px-1"
            style={{ color: '#333333', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {ROUND_LABELS[cat] || cat}
          </p>
          <div className="space-y-2">
            {byCategory[cat].map(t => (
              <TacticCard key={t.id} tactic={t} side={side} />
            ))}
          </div>
        </div>
      ))}

      {tactics.length === 0 && (
        <div className="text-center py-10 rounded-xl" style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}>
          <p className="text-sm" style={{ color: '#333333' }}>Sin jugadas cargadas aún</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function MapDetailPage({ params }: { params: Promise<{ mapId: string }> }) {
  const { mapId } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'T' | 'CT'>('T');
  const [calloutSite, setCalloutSite] = useState<'siteA' | 'siteB' | 'middle'>('siteA');

  const mapData = allMaps.find(m => m.id === mapId);

  if (!mapData) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>Mapa no encontrado</p>
          <button onClick={() => router.push('/maps')}
            className="text-sm" style={{ color: '#ff5500' }}>
            ← Volver a mapas
          </button>
        </div>
      </div>
    );
  }

  const CALLOUT_TABS = [
    { key: 'siteA' as const,  label: 'Site A' },
    { key: 'siteB' as const,  label: 'Site B' },
    { key: 'middle' as const, label: 'Mid' },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#0a0a0a' }}>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={`/maps/backgrounds/${mapId}.jpg`}
          alt={mapData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(10,10,10,0.95) 100%)' }} />

        {/* Back */}
        <button
          onClick={() => router.push('/maps')}
          className="absolute top-5 left-5 flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', cursor: 'pointer' }}
        >
          <ChevronLeft className="w-4 h-4" /> Mapas
        </button>

        {/* Map info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Image
                  src={`/maps/icons/${mapId}.png`}
                  alt={mapData.name}
                  width={28} height={28}
                  className="object-contain"
                />
                <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#ffffff' }}>
                  {mapData.name}
                </h1>
              </div>
              <p className="text-sm" style={{ color: '#aaaaaa' }}>{mapData.description}</p>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: mapData.sideFavor === 'T-sided' ? 'rgba(234,179,8,0.15)'
                  : mapData.sideFavor === 'CT-sided' ? 'rgba(59,130,246,0.15)'
                  : 'rgba(255,255,255,0.08)',
                color: mapData.sideFavor === 'T-sided' ? '#fbbf24'
                  : mapData.sideFavor === 'CT-sided' ? '#60a5fa'
                  : '#aaaaaa',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {mapData.sideFavor}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* Key areas */}
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: '#333333', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Zonas clave
          </p>
          <div className="flex flex-wrap gap-2">
            {mapData.philosophy.keyAreas.map(area => (
              <span key={area} className="text-xs px-3 py-1 rounded-full"
                style={{ background: '#111111', border: '1px solid #2a2a2a', color: '#888888' }}>
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Callouts */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}>
          <div className="flex" style={{ borderBottom: '1px solid #1a1a1a' }}>
            {CALLOUT_TABS.map(t => (
              <button key={t.key} onClick={() => setCalloutSite(t.key)}
                className="flex-1 py-3 text-sm font-medium transition-colors"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: calloutSite === t.key ? '#ffffff' : '#444444',
                  borderBottom: calloutSite === t.key ? '2px solid #ff5500' : '2px solid transparent',
                }}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {mapData.callouts[calloutSite].map((c, i) => (
              <div key={i} className="rounded-lg px-3 py-2.5" style={{ background: '#111111', border: '1px solid #1a1a1a' }}>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#ff5500' }}>{c.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#555555' }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* T / CT Tabs */}
        <div>
          <div className="flex gap-2 mb-6">
            {(['T', 'CT'] as const).map(side => (
              <button
                key={side}
                onClick={() => setActiveTab(side)}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  cursor: 'pointer', border: 'none',
                  background: activeTab === side
                    ? (side === 'T' ? '#854d0e' : '#1e3a5f')
                    : '#111111',
                  color: activeTab === side
                    ? (side === 'T' ? '#fbbf24' : '#60a5fa')
                    : '#444444',
                  outline: activeTab === side
                    ? `1px solid ${side === 'T' ? '#854d0e' : '#1e3a5f'}`
                    : '1px solid #1e1e1e',
                }}
              >
                {side === 'T' ? '🟡 Terrorist' : '🔵 Counter-Terrorist'}
              </button>
            ))}
          </div>

          <SidePanel map={mapData} side={activeTab} />
        </div>

        {/* Philosophy footer */}
        <div className="rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: '#333333', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tempo</p>
            <p className="text-sm" style={{ color: '#666666' }}>{mapData.philosophy.tempo}</p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: '#333333', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Complejidad de rotaciones</p>
            <p className="text-sm" style={{ color: '#666666' }}>{mapData.philosophy.rotationComplexity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}