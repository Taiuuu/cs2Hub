import { PlayerStats } from '@/types';

export interface FaceitPlayerResponse {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  verified: boolean;
  level: number;
  elo: number;
  faceit_url: string;
  game_player_id?: string;
  steam_id?: string;
  steam_nickname?: string;
}

export interface FaceitStatsResponse {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  verified: boolean;
  level: number;
  elo: number;
  faceit_url: string;
  stats?: {
    lifetime?: {
      'General Statistics'?: {
        'K/D Ratio'?: string;
        Wins?: string;
        'Win Rate %'?: string;
        Matches?: string;
        'Average K/D Ratio'?: string;
        'Headshots %'?: string;
      };
    };
  };
  games?: {
    cs2?: {
      game_player_id?: string;
      skill_level?: number;
      elo?: number;
      faceit_url?: string;
    };
  };
}

/**
 * Obtiene stats del jugador en FACEIT
 */
export async function getFaceitStats(nickname: string): Promise<PlayerStats | null> {
  try {
    const response = await fetch(`https://open.faceit.com/api/v4/players?nickname=${nickname}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FACEIT_API_KEY || ''}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Error FACEIT: ${response.status}`);
    }

    const data: FaceitPlayerResponse = await response.json();

    if (!data.player_id) return null;

    return {
      id: data.player_id,
      platform: 'FACEIT',
      nickname: data.nickname,
      elo: data.elo,
      level: data.level,
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Error obteniendo FACEIT stats:', error);
    return null;
  }
}

/**
 * Extrae el nickname de una URL de FACEIT
 * Ejemplo: https://www.faceit.com/es/players/Chocko0 -> Chocko0
 */
export function extractFaceitNickname(urlOrNickname: string): string {
  const match = /\/players\/([^/?]+)/i;
  const result = urlOrNickname.match(match);
  return result ? result[1] : urlOrNickname;
}
