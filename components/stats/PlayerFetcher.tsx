'use client';

import { useEffect, useState } from 'react';

interface SteamData {
  name: string;
  steamId64: string;
  vanity: string | null;
  friendCode: string;
  registered: string | null;
  country: string | null;
  xpLevel: number;
  friends: number | null;
  commendations: { friendly: number | null; leader: number | null; teacher: number | null };
  avatar: string | null;
  profileUrl: string;
}

interface CS2Data {
  aim: number | null;
  utility: number | null;
  position: number | null;
  clutch: number | null;
  opening: number | null;
  kd: number | null;
  rating: number | null;
  party: number | null;
  peakRating: number | null;
}

interface FaceitData {
  nickname: string;
  faceitId: string;
  country: string | null;
  registered: string | null;
  elo: number;
  peakElo: number | null;
  level: number;
  matches: number;
  wins: number;
  winrate: number;
  hs: number;
  kd: number;
  adr: number | null;
  udr: number | null;
  clutch1v1: number | null;
  clutch1v2: number | null;
  lastMatch: string | null;
  recent: ('W' | 'L')[];
}

interface PlayerData {
  steam: SteamData | null;
  cs2: CS2Data | null;
  faceit: FaceitData | null;
}

function fmt(v: number | null | undefined, digits = 2): string {
  if (v === null || v === undefined) return '-';
  return typeof v === 'number' ? v.toFixed(digits) : String(v);
}

function fmtDate(iso: string | null): string {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function faceitLevelColor(level: number): string {
  const colors: Record<number, string> = {
    1: '#eee', 2: '#1cef56', 3: '#1cef56', 4: '#1cef56',
    5: '#f5a623', 6: '#f5a623', 7: '#f5a623',
    8: '#ee3232', 9: '#ee3232', 10: '#b916e5',
  };
  return colors[level] ?? '#eee';
}

function faceitLevelBg(level: number): string {
  if (level <= 0) return 'bg-[var(--color-bg-elevated)]';
  if (level <= 4) return 'bg-green-950';
  if (level <= 7) return 'bg-orange-950';
  if (level <= 9) return 'bg-red-950';
  return 'bg-purple-950';
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] uppercase tracking-widest text-zinc-500">{label}</span>
      <span className={`text-lg font-semibold leading-tight ${accent ?? 'text-white'}`}>{value}</span>
    </div>
  );
}

function BarStat({ label, value }: { label: string; value: number | null }) {
  const pct = value === null ? null : Math.min(100, Math.max(0, value));
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400 uppercase tracking-wider">{label}</span>
        <span className="text-white font-medium">{pct === null ? '-' : pct}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-700"
          style={{ width: pct === null ? '0%' : `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">{title}</h2>
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] shadow-[var(--shadow-sm)] p-5 ${className}`}>
      {children}
    </div>
  );
}

function NullBadge() {
  return (
    <span className="text-xs text-[var(--color-foreground)]/70 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] px-2 py-0.5 rounded-full">
      no disponible
    </span>
  );
}

function SteamSection({ steam }: { steam: SteamData }) {
  return (
    <Card>
      <SectionHeader title="Steam" />
      <div className="flex items-center gap-4 mb-5">
        {steam.avatar ? (
          <img src={steam.avatar} alt={steam.name} className="w-14 h-14 rounded-xl border border-[var(--color-border-subtle)] object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-elevated)] flex items-center justify-center text-2xl">?</div>
        )}
        <div>
          <p className="text-xl font-bold text-white">{steam.name}</p>
          <a href={steam.profileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors">
            {steam.profileUrl}
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
        <Stat label="SteamID64" value={steam.steamId64} />
        <Stat label="Vanity URL" value={steam.vanity ?? '-'} />
        <Stat label="Friend Code" value={steam.friendCode} />
        <Stat label="Registrado" value={fmtDate(steam.registered)} />
        <Stat label="Pais" value={steam.country ?? '-'} />
        <Stat label="Nivel XP" value={String(steam.xpLevel)} />
        <Stat label="Amigos" value={steam.friends !== null ? String(steam.friends) : '-'} />
      </div>
      <div className="mt-5 pt-4 border-t border-[var(--color-border-subtle)]">
        <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-3">Commendations</p>
        <div className="flex gap-6">
          {(['friendly', 'leader', 'teacher'] as const).map((k) => {
            const val = steam.commendations[k];
            return (
              <div key={k} className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-600">{k}</span>
                {val !== null ? (
                  <span className="text-base font-semibold text-white">{val}</span>
                ) : (
                  <NullBadge />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function CS2Section({ cs2 }: { cs2: CS2Data | null }) {
  if (!cs2) {
    return (
      <Card>
        <SectionHeader title="CS2 Performance" />
        <p className="text-sm text-zinc-500">
          Las estadisticas de rendimiento de CS2 requieren un perfil publico con estadisticas habilitadas en Steam.
        </p>
      </Card>
    );
  }
  const bars = [
    { label: 'Aim', value: cs2.aim },
    { label: 'Utility', value: cs2.utility },
    { label: 'Position', value: cs2.position },
    { label: 'Clutch', value: cs2.clutch },
    { label: 'Opening', value: cs2.opening },
    { label: 'Party', value: cs2.party },
  ];
  return (
    <Card>
      <SectionHeader title="CS2 Performance" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 mb-5">
        {bars.map((b) => <BarStat key={b.label} label={b.label} value={b.value} />)}
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--color-border-subtle)]">
        <Stat label="K/D" value={fmt(cs2.kd)} />
        <Stat label="Rating" value={fmt(cs2.rating)} />
        <Stat label="Peak Rating" value={fmt(cs2.peakRating)} />
      </div>
    </Card>
  );
}

function FaceitSection({ faceit }: { faceit: FaceitData }) {
  const lvlColor = faceitLevelColor(faceit.level);
  const lvlBg = faceitLevelBg(faceit.level);
  return (
    <Card>
      <SectionHeader title="FACEIT" />
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-12 h-12 rounded-xl ${lvlBg} border border-zinc-700 flex items-center justify-center`}>
          <span className="text-xl font-black" style={{ color: lvlColor }}>{faceit.level}</span>
        </div>
        <div>
          <p className="text-xl font-bold text-white">{faceit.nickname}</p>
          <p className="text-xs text-zinc-500">{faceit.faceitId}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-3xl font-black text-orange-400">{faceit.elo}</p>
          <p className="text-[11px] uppercase tracking-widest text-zinc-500">ELO</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mb-5">
        <Stat label="Pais" value={faceit.country ?? '-'} />
        <Stat label="Registrado" value={fmtDate(faceit.registered)} />
        <Stat label="Peak ELO" value={faceit.peakElo !== null ? String(faceit.peakElo) : '-'} />
        <Stat label="Nivel" value={String(faceit.level)} />
        <Stat label="Partidas" value={String(faceit.matches)} />
        <Stat label="Winrate" value={`${faceit.winrate}%`} accent={faceit.winrate >= 50 ? 'text-green-400' : 'text-red-400'} />
        <Stat label="HS%" value={`${fmt(faceit.hs, 1)}%`} />
        <Stat label="K/D" value={fmt(faceit.kd)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 pt-4 border-t border-[var(--color-border-subtle)] mb-5">
        <Stat label="ADR" value={faceit.adr !== null ? fmt(faceit.adr, 1) : '-'} />
        <Stat label="UDR" value={faceit.udr !== null ? fmt(faceit.udr, 1) : '-'} />
        <Stat label="Clutch 1v1" value={faceit.clutch1v1 !== null ? `${(faceit.clutch1v1 * 100).toFixed(1)}%` : '-'} />
        <Stat label="Clutch 1v2" value={faceit.clutch1v2 !== null ? `${(faceit.clutch1v2 * 100).toFixed(1)}%` : '-'} />
      </div>
      <div className="pt-4 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500">Ultimas partidas</p>
          {faceit.lastMatch && (
            <p className="text-xs text-zinc-600">Ultimo: {fmtDate(faceit.lastMatch)}</p>
          )}
        </div>
        <div className="flex gap-2">
          {(faceit.recent ?? []).length > 0 ? (
            (faceit.recent ?? []).map((r, i) => (
              <span
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${
                  r === 'W'
                    ? 'bg-green-950 border-green-800 text-green-400'
                    : 'bg-red-950 border-red-900 text-red-400'
                }`}
              >
                {r}
              </span>
            ))
          ) : (
            <NullBadge />
          )}
        </div>
      </div>
    </Card>
  );
}

function RawJson({ data }: { data: PlayerData }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 bg-zinc-900 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
      >
        <span>JSON Response</span>
        <span>{open ? 'cerrar' : 'ver'}</span>
      </button>
      {open && (
        <pre className="p-5 bg-zinc-950 text-[11px] text-green-400 overflow-x-auto leading-relaxed max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

interface Props {
  steamUsername: string;
  faceitNickname: string;
}

export default function PlayerFetcher({ steamUsername, faceitNickname }: Props) {
  const [data, setData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/stats?steamUsername=${encodeURIComponent(steamUsername)}&faceitNickname=${encodeURIComponent(faceitNickname)}`)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((json: PlayerData) => { 
        if (!json) throw new Error('No response data');
        setData(json); 
        setLoading(false); 
      })
      .catch((err) => { 
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg || 'Error desconocido al cargar datos'); 
        setLoading(false); 
      });
  }, [steamUsername, faceitNickname]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-5 text-red-400 text-sm">
        Error al cargar datos: {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      {data.steam ? (
        <SteamSection steam={data.steam} />
      ) : (
        <Card>
          <SectionHeader title="Steam" />
          <p className="text-sm text-zinc-500">No se pudo cargar el perfil de Steam.</p>
        </Card>
      )}
      <CS2Section cs2={data.cs2} />
      {data.faceit ? (
        <FaceitSection faceit={data.faceit} />
      ) : (
        <Card>
          <SectionHeader title="FACEIT" />
          <p className="text-sm text-zinc-500">No se pudo cargar el perfil de FACEIT.</p>
        </Card>
      )}
      <RawJson data={data} />
    </div>
  );
}
