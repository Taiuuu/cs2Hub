import { NextResponse } from 'next/server';
import { getCombinedPlayerStats } from '@/lib/playerService';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const steamUsername = url.searchParams.get('steamUsername') || 'taiuuu';
  const faceitNickname = url.searchParams.get('faceitNickname') || 'taiuuu';

  try {
    const stats = await getCombinedPlayerStats(steamUsername, faceitNickname);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error en API /api/stats:', error);
    return NextResponse.json({ error: 'No se pudieron obtener los datos de jugador.' }, { status: 500 });
  }
}
