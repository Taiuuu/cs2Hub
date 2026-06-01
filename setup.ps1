# setup.ps1 - Sin emojis ni caracteres especiales
New-Item -ItemType Directory -Path components\stats -Force | Out-Null

$route = @'
import { NextRequest, NextResponse } from 'next/server';

interface SteamPlayerSummary {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar?: string;
  avatarmedium?: string;
  avatarfull?: string;
  personastate?: number;
  communityvisibilitystate?: number;
  timecreated?: number;
  loccountrycode?: string;
}

interface FaceitPlayerResponse {
  player_id: string;
  nickname: string;
  avatar?: string;
  country?: string;
  activated_at?: string;
  games?: {
    cs2?: {
      faceit_elo?: number;
      skill_level?: number;
    };
  };
}

interface FaceitStats {
  lifetime?: Record<string, string>;
  segments?: Array<{
    label: string;
    stats: Record<string, string>;
  }>;
}

function extractSteamIdentifier(urlOrId: string): string {
  const vanityMatch = urlOrId.match(/\/id\/([^/]+)/);
  if (vanityMatch) return vanityMatch[1];
  const profileMatch = urlOrId.match(/\/profiles\/(\d+)/);
  if (profileMatch) return profileMatch[1];
  return urlOrId;
}

async function resolveSteamVanity(vanityUrl: string): Promise<string | null> {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${vanityUrl}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.response?.steamid ?? null;
  } catch {
    return null;
  }
}

function steamIdToFriendCode(steamId64: string): string {
  try {
    const id = BigInt(steamId64);
    const accountId = id & BigInt('0xFFFFFFFF');
    const h = BigInt('0x4C07FCA8');
    const DICTIONARY = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let val = accountId ^ h;
    const chars: string[] = [];
    for (let i = 0; i < 8; i++) {
      const rem = Number(val % BigInt(DICTIONARY.length));
      chars.push(DICTIONARY[rem]);
      val = val / BigInt(DICTIONARY.length);
    }
    const raw = chars.join('');
    return `${raw.slice(0, 4)}-${raw.slice(4, 9)}-${raw.slice(9)}`;
  } catch {
    return 'N/A';
  }
}

async function getSteamProfile(urlOrId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) return null;
  try {
    let steamId = extractSteamIdentifier(urlOrId);
    let vanity: string | null = null;
    if (!/^\d+$/.test(steamId)) {
      vanity = steamId;
      const resolved = await resolveSteamVanity(steamId);
      if (!resolved) return null;
      steamId = resolved;
    }
    const [summaryRes, levelRes, friendsRes] = await Promise.all([
      fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${apiKey}&steamid=${steamId}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${apiKey}&steamid=${steamId}&relationship=friend`, { next: { revalidate: 3600 } }),
    ]);
    const summaryData = summaryRes.ok ? await summaryRes.json() : null;
    const levelData = levelRes.ok ? await levelRes.json() : null;
    const friendsData = friendsRes.ok ? await friendsRes.json() : null;
    const profile: SteamPlayerSummary = summaryData?.response?.players?.[0];
    if (!profile) return null;
    const xpLevel: number = levelData?.response?.player_level ?? 0;
    const friendCount: number = friendsData?.friendslist?.friends?.length ?? null;
    const registered = profile.timecreated ? new Date(profile.timecreated * 1000).toISOString() : null;
    if (!vanity && profile.profileurl) {
      const m = profile.profileurl.match(/\/id\/([^/]+)/);
      if (m) vanity = m[1];
    }
    return {
      name: profile.personaname,
      steamId64: profile.steamid,
      vanity: vanity ?? null,
      friendCode: steamIdToFriendCode(profile.steamid),
      registered,
      country: profile.loccountrycode ?? null,
      xpLevel,
      friends: friendCount,
      commendations: { friendly: null, leader: null, teacher: null },
      avatar: profile.avatarfull ?? profile.avatarmedium ?? profile.avatar ?? null,
      profileUrl: profile.profileurl,
    };
  } catch (error) {
    console.error('Steam profile error:', error);
    return null;
  }
}

async function getCS2Stats(steamId64: string) {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730&key=${apiKey}&steamid=${steamId64}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const stats: Array<{ name: string; value: number }> = data?.playerstats?.stats ?? [];
    const get = (key: string) => stats.find((s) => s.name === key)?.value ?? null;
    return {
      aim: get('cs2_perf_aim'),
      utility: get('cs2_perf_utility'),
      position: get('cs2_perf_positioning'),
      clutch: get('cs2_perf_clutch'),
      opening: get('cs2_perf_opening'),
      kd: get('cs2_perf_kd'),
      rating: get('cs2_perf_rating'),
      party: get('cs2_perf_team_play'),
      peakRating: get('cs2_perf_peak_rating'),
    };
  } catch (error) {
    console.error('CS2 stats error:', error);
    return null;
  }
}

async function getFaceitProfile(nickname: string) {
  const apiKey = process.env.FACEIT_API_KEY;
  if (!apiKey) return null;
  const headers = { Authorization: `Bearer ${apiKey}` };
  const cache = { next: { revalidate: 3600 } };
  try {
    const playerRes = await fetch(
      `https://open.faceit.com/api/v4/players?nickname=${encodeURIComponent(nickname)}`,
      { headers, ...cache }
    );
    if (!playerRes.ok) return null;
    const player: FaceitPlayerResponse = await playerRes.json();
    if (!player.player_id) return null;
    const cs2 = player.games?.cs2;
    const elo = cs2?.faceit_elo ?? 0;
    const level = cs2?.skill_level ?? 0;
    const [statsRes, historyRes] = await Promise.all([
      fetch(`https://open.faceit.com/api/v4/players/${player.player_id}/stats?game=cs2`, { headers, ...cache }),
      fetch(`https://open.faceit.com/api/v4/players/${player.player_id}/history?game=cs2&limit=5`, { headers, ...cache }),
    ]);
    let stats = {
      matches: 0, wins: 0, winrate: 0, hs: 0, kd: 0,
      adr: null as number | null, udr: null as number | null,
      clutch1v1: null as number | null, clutch1v2: null as number | null,
    };
    if (statsRes.ok) {
      const statsData: FaceitStats = await statsRes.json();
      const lt = statsData.lifetime ?? {};
      const wl = (lt['W/L'] ?? '0/0').split('/');
      const wins = parseInt(wl[0] ?? '0');
      const losses = parseInt(wl[1] ?? '0');
      const total = wins + losses;
      let totalAdr = 0, totalUdr = 0, totalClutch1v1 = 0, totalClutch1v2 = 0, segCount = 0;
      if (statsData.segments?.length) {
        for (const seg of statsData.segments) {
          const s = seg.stats;
          if (s['Average Damage per Round']) { totalAdr += parseFloat(s['Average Damage per Round']); segCount++; }
          if (s['Average Utility Damage per Round']) totalUdr += parseFloat(s['Average Utility Damage per Round']);
          if (s['1v1 Win Rate']) totalClutch1v1 += parseFloat(s['1v1 Win Rate']);
          if (s['1v2 Win Rate']) totalClutch1v2 += parseFloat(s['1v2 Win Rate']);
        }
      }
      stats = {
        matches: parseInt(lt['Matches'] ?? '0') || total,
        wins,
        winrate: total > 0 ? Math.round((wins / total) * 100) : 0,
        hs: parseFloat((lt['Headshots %'] ?? '0').replace('%', '')),
        kd: parseFloat(lt['Average K/D Ratio'] ?? '0'),
        adr: segCount > 0 ? parseFloat((totalAdr / segCount).toFixed(1)) : null,
        udr: segCount > 0 ? parseFloat((totalUdr / segCount).toFixed(1)) : null,
        clutch1v1: segCount > 0 ? parseFloat((totalClutch1v1 / segCount).toFixed(2)) : null,
        clutch1v2: segCount > 0 ? parseFloat((totalClutch1v2 / segCount).toFixed(2)) : null,
      };
    }
    let recent: ('W' | 'L')[] = [];
    let lastMatch: string | null = null;
    if (historyRes.ok) {
      const historyData = await historyRes.json();
      const items: Array<{
        finished_at: number;
        results?: { winner?: string };
        teams?: { faction1?: { players?: Array<{ player_id: string }> }; faction2?: { players?: Array<{ player_id: string }> } };
      }> = historyData.items ?? [];
      recent = items.map((match) => {
        const faction1Players = match.teams?.faction1?.players ?? [];
        const playerInFaction1 = faction1Players.some((p) => p.player_id === player.player_id);
        const winner = match.results?.winner;
        const myFaction = playerInFaction1 ? 'faction1' : 'faction2';
        return winner === myFaction ? 'W' : 'L';
      });
      if (items[0]?.finished_at) lastMatch = new Date(items[0].finished_at * 1000).toISOString();
    }
    return {
      nickname: player.nickname,
      faceitId: player.player_id,
      country: player.country ?? null,
      registered: player.activated_at ?? null,
      elo,
      peakElo: null,
      level,
      ...stats,
      lastMatch,
      recent,
    };
  } catch (error) {
    console.error('FACEIT profile error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const steamUsername = params.get('steamUsername') || 'taiuuu';
    const faceitNickname = params.get('faceitNickname') || 'Chocko0';
    const defaultSteamId = '76561198169332338';
    const [steam, faceit] = await Promise.all([
      getSteamProfile(steamUsername),
      getFaceitProfile(faceitNickname),
    ]);
    const steamId64 = steam?.steamId64 ?? defaultSteamId;
    const cs2 = await getCS2Stats(steamId64);
    return NextResponse.json(
      { steam, cs2, faceit },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' } }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Error obteniendo estadisticas' }, { status: 500 });
  }
}
'@

Set-Content -Path app\api\stats\route.ts -Value $route -Encoding UTF8
Write-Host "OK: app\api\stats\route.ts creado" -ForegroundColor Green

$fetcher = @'
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
  if (level <= 0) return 'bg-zinc-700';
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
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-950 p-5 ${className}`}>
      {children}
    </div>
  );
}

function NullBadge() {
  return (
    <span className="text-xs text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
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
          <img src={steam.avatar} alt={steam.name} className="w-14 h-14 rounded-xl border border-zinc-700 object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl">?</div>
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
      <div className="mt-5 pt-4 border-t border-zinc-800">
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
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 pt-4 border-t border-zinc-800 mb-5">
        <Stat label="ADR" value={faceit.adr !== null ? fmt(faceit.adr, 1) : '-'} />
        <Stat label="UDR" value={faceit.udr !== null ? fmt(faceit.udr, 1) : '-'} />
        <Stat label="Clutch 1v1" value={faceit.clutch1v1 !== null ? `${(faceit.clutch1v1 * 100).toFixed(1)}%` : '-'} />
        <Stat label="Clutch 1v2" value={faceit.clutch1v2 !== null ? `${(faceit.clutch1v2 * 100).toFixed(1)}%` : '-'} />
      </div>
      <div className="pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500">Ultimas partidas</p>
          {faceit.lastMatch && (
            <p className="text-xs text-zinc-600">Ultimo: {fmtDate(faceit.lastMatch)}</p>
          )}
        </div>
        <div className="flex gap-2">
          {faceit.recent.length > 0 ? (
            faceit.recent.map((r, i) => (
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
      .then((json: PlayerData) => { setData(json); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [steamUsername, faceitNickname]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse" />
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
'@

Set-Content -Path components\stats\PlayerFetcher.tsx -Value $fetcher -Encoding UTF8
Write-Host "OK: components\stats\PlayerFetcher.tsx creado" -ForegroundColor Green
Write-Host "Listo. Corre: npm run dev" -ForegroundColor Cyan
