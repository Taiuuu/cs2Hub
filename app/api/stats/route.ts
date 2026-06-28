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
      `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(nickname)}`,
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
      fetch(`https://open.faceit.com/data/v4/players/${player.player_id}/history?game=cs2&limit=5`, { headers, ...cache }),
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
