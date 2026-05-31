import { NextRequest, NextResponse } from 'next/server';

interface SteamPlayerSummary {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar?: string;
  avatarmedium?: string;
  avatarfull?: string;
  player_level?: number;
}

interface SteamStatsResponse {
  response: {
    players: SteamPlayerSummary[];
  };
}

interface FaceitPlayerResponse {
  player_id: string;
  nickname: string;
  avatar?: string;
  level?: number;
  elo?: number;
  status?: string;
}

/**
 * Extrae el Steam ID de una vanity URL
 */
function extractSteamIdentifier(urlOrId: string): string {
  const vanityMatch = /\/id\/([^/]+)/;
  const profileMatch = /\/profiles\/(\d+)/;

  const vanityResult = urlOrId.match(vanityMatch);
  if (vanityResult) return vanityResult[1];

  const profileResult = urlOrId.match(profileMatch);
  if (profileResult) return profileResult[1];

  return urlOrId;
}

/**
 * Resuelve vanity URL a Steam ID
 */
async function resolveSteamVanity(vanityUrl: string): Promise<string | null> {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    if (!apiKey) {
      console.warn('STEAM_API_KEY no configurada');
      return null;
    }

    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${vanityUrl}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.response?.steamid || null;
  } catch (error) {
    console.error('Error resolviendo vanity URL:', error);
    return null;
  }
}

/**
 * Obtiene perfil Steam
 */
async function getSteamProfile(urlOrId: string) {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    if (!apiKey) {
      console.warn('STEAM_API_KEY no configurada');
      return null;
    }

    let steamId = extractSteamIdentifier(urlOrId);

    // Si es vanity URL, resolver
    if (!/^\d+$/.test(steamId)) {
      const resolved = await resolveSteamVanity(steamId);
      if (!resolved) {
        console.warn('No se pudo resolver Steam vanity URL:', steamId);
        return null;
      }
      steamId = resolved;
    }

    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.error('Error Steam API:', response.status);
      return null;
    }

    const data: SteamStatsResponse = await response.json();
    const profile = data.response?.players?.[0];

    if (!profile) {
      console.warn('No Steam profile found for:', steamId);
      return null;
    }

    return {
      id: profile.steamid,
      nickname: profile.personaname,
      profileUrl: profile.profileurl,
      avatar: profile.avatarmedium,
      level: profile.player_level || 0,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error obteniendo Steam profile:', error);
    return null;
  }
}

/**
 * Obtiene stats de FACEIT
 */
async function getFaceitProfile(nickname: string) {
  try {
    const apiKey = process.env.FACEIT_API_KEY;
    if (!apiKey) {
      console.warn('FACEIT_API_KEY no configurada');
      return null;
    }

    // Obtener info del jugador
    const playerResponse = await fetch(
      `https://open.faceit.com/api/v4/players?nickname=${encodeURIComponent(nickname)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!playerResponse.ok) {
      if (playerResponse.status === 404) {
        console.warn('FACEIT player not found:', nickname);
      } else {
        console.error('FACEIT API error:', playerResponse.status);
      }
      return null;
    }

    const playerData: FaceitPlayerResponse = await playerResponse.json();

    if (!playerData.player_id) {
      console.warn('No FACEIT player ID found');
      return null;
    }

    // Obtener stats de CS2
    const statsResponse = await fetch(
      `https://open.faceit.com/api/v4/players/${playerData.player_id}/stats?game=cs2`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        next: { revalidate: 3600 },
      }
    );

    let lifetime: any = {};
    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      lifetime = statsData.lifetime || {};
    }

    // Calcular win rate
    const wlData = lifetime['W/L']?.split('/') || [];
    const wins = parseInt(wlData[0] || '0');
    const losses = parseInt(wlData[1] || '0');
    const totalGames = wins + losses;
    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

    return {
      id: playerData.player_id,
      nickname: playerData.nickname,
      avatar: playerData.avatar,
      level: playerData.level || 0,
      elo: playerData.elo || 0,
      games: parseInt(lifetime.Matches || '0'),
      gamesWon: wins,
      gamesLost: losses,
      winRate,
      headshots: lifetime['Headshots %'] || '0%',
      kd: lifetime['Average K/D Ratio'] || '0.0',
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error obteniendo FACEIT profile:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const steamUsername = searchParams.get('steamUsername') || 'taiuuu';
    const faceitNickname = searchParams.get('faceitNickname') || 'Chocko0';

    if (!steamUsername || !faceitNickname) {
      return NextResponse.json(
        { error: 'Faltan parámetros: steamUsername y faceitNickname' },
        { status: 400 }
      );
    }

    // Obtener datos en paralelo
    const [steam, faceit] = await Promise.all([
      getSteamProfile(steamUsername),
      getFaceitProfile(faceitNickname),
    ]);

    return NextResponse.json(
      {
        steam,
        faceit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error obteniendo estadísticas' },
      { status: 500 }
    );
  }
}
