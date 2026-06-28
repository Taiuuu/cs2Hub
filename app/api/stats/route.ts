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

interface FACEITProfile {
  nickname: string;
  level?: number | null;
  elo?: number | null;
  games?: number;
  gamesWon?: number;
  gamesLost?: number;
  lastUpdated: Date;
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

export async function getFACEITProfile(nickname: string): Promise<FACEITProfile | null> {
  try {
    const playerRes = await fetch(
      `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(nickname)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
          Accept: 'application/json',
        },
      }
    );

    if (!playerRes.ok) {
      const errorText = await playerRes.text();
      console.error('FACEIT player error:', playerRes.status, errorText);
      return null;
    }

    const player = await playerRes.json();
    const playerId = player.player_id;
    if (!playerId) return null;

    const statsRes = await fetch(
      `https://open.faceit.com/data/v4/players/${playerId}/stats/cs2`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
          Accept: 'application/json',
        },
      }
    );

    if (!statsRes.ok) {
      const errorText = await statsRes.text();
      console.error('FACEIT stats error:', statsRes.status, errorText);
      return null;
    }

    const statsData = await statsRes.json();
    const lt = statsData.lifetime ?? {};
    const wl = (lt['W/L'] ?? '0/0').split('/');

    return {
      nickname: player.nickname,
      level: player.games?.cs2?.skill_level ?? null,
      elo: player.games?.cs2?.faceit_elo ?? null,
      games: parseInt(lt['Matches'] ?? '0'),
      gamesWon: parseInt(wl[0] ?? '0'),
      gamesLost: parseInt(wl[1] ?? '0'),
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Error al obtener datos de FACEIT:', error);
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
      getFACEITProfile(faceitNickname),
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
