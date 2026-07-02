import { NextRequest, NextResponse } from 'next/server';

interface FaceitMatch {
  match_id: string;
  elo_change?: number;
  started_at: number;
  stats?: {
    cs2?: {
      elo?: number;
    };
  };
}

interface EloDataPoint {
  date: string;
  elo: number;
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const faceitNickname = params.get('faceitNickname') || 'Chocko0';
    const limit = parseInt(params.get('limit') || '10');

    // Primero obtener el player_id
    const playerRes = await fetch(
      `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(faceitNickname)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
          Accept: 'application/json',
        },
      }
    );

    if (!playerRes.ok) {
      console.error('FACEIT player error:', playerRes.status);
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const player = await playerRes.json();
    const playerId = player.player_id;

    if (!playerId) {
      return NextResponse.json({ error: 'Player ID not found' }, { status: 404 });
    }

    // Obtener historial de matches
    const historyRes = await fetch(
      `https://open.faceit.com/data/v4/players/${playerId}/history?game=cs2&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
          Accept: 'application/json',
        },
      }
    );

    if (!historyRes.ok) {
      console.error('FACEIT history error:', historyRes.status);
      return NextResponse.json({ error: 'History not found' }, { status: 404 });
    }

    const historyData = await historyRes.json();
    const items: FaceitMatch[] = historyData.items || [];

    // Procesar datos para el gráfico
    // Empezar con ELO actual y trabajar hacia atrás
    const statsRes = await fetch(
      `https://open.faceit.com/data/v4/players/${playerId}/stats/cs2`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
          Accept: 'application/json',
        },
      }
    );

    const statsData = statsRes.ok ? await statsRes.json() : { lifetime: { cs2: { faceit_elo: 0 } } };
    let currentElo = statsData.lifetime?.['Current ELO'] 
      ? parseInt(statsData.lifetime['Current ELO'])
      : player.games?.cs2?.faceit_elo || 0;

    const eloData: EloDataPoint[] = [];

    // Recorrer desde el match más reciente hacia atrás
    for (let i = items.length - 1; i >= 0; i--) {
      const match = items[i];
      const date = new Date(match.started_at * 1000).toLocaleDateString('es-AR', {
        month: 'short',
        day: 'numeric',
      });

      eloData.push({
        date,
        elo: Math.round(currentElo),
      });

      // Restar el cambio de ELO para obtener el ELO anterior
      if (match.elo_change !== undefined) {
        currentElo -= match.elo_change;
      }
    }

    // Invertir para mostrar cronológicamente (antiguo → nuevo)
    eloData.reverse();

    return NextResponse.json(
      { eloData },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' } }
    );
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json({ error: 'Error fetching history' }, { status: 500 });
  }
}
