import { PlayerStats } from '@/types';

export interface SteamProfile {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
}

export interface SteamStatsResponse {
  response: {
    players: SteamProfile[];
  };
}

/**
 * Extrae el Steam ID de una vanity URL o retorna el ID directamente
 * Ejemplos:
 * - https://steamcommunity.com/id/taiuuu/ -> taiuuu (vanity)
 * - https://steamcommunity.com/profiles/76561198123456789/ -> 76561198123456789
 */
export function extractSteamIdentifier(urlOrId: string): string {
  const vanityMatch = /\/id\/([^/]+)/;
  const profileMatch = /\/profiles\/(\d+)/;

  const vanityResult = urlOrId.match(vanityMatch);
  if (vanityResult) return vanityResult[1];

  const profileResult = urlOrId.match(profileMatch);
  if (profileResult) return profileResult[1];

  return urlOrId;
}

/**
 * Obtiene el Steam ID desde una vanity URL
 */
export async function resolveSteamVanity(vanityUrl: string): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
    if (!apiKey) {
      console.warn('STEAM_API_KEY no configurada');
      return '';
    }

    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${vanityUrl}`
    );

    if (!response.ok) throw new Error('Error resolviendo vanity URL');

    const data = await response.json();
    if (data.response?.steamid) {
      return data.response.steamid;
    }
    return '';
  } catch (error) {
    console.error('Error resolviendo vanity Steam URL:', error);
    return '';
  }
}

/**
 * Obtiene el perfil de Steam y convierte a PlayerStats
 */
export async function getSteamStats(urlOrId: string): Promise<PlayerStats | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
    if (!apiKey) {
      console.warn('STEAM_API_KEY no configurada');
      return null;
    }

    let steamId = extractSteamIdentifier(urlOrId);

    // Si es una vanity URL, resolver primero
    if (!/^\d+$/.test(steamId)) {
      const resolved = await resolveSteamVanity(steamId);
      if (!resolved) return null;
      steamId = resolved;
    }

    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    );

    if (!response.ok) throw new Error('Error obteniendo perfil Steam');

    const data: SteamStatsResponse = await response.json();
    const profile = data.response?.players?.[0];

    if (!profile) return null;

    return {
      id: profile.steamid,
      platform: 'Steam',
      nickname: profile.personaname,
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Error obteniendo Steam stats:', error);
    return null;
  }
}
