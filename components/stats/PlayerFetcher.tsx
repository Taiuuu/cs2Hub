"use client";

import { useEffect, useState } from 'react';
import { getCombinedPlayerStats } from '@/lib/playerService';

interface Props {
  steamUsername?: string;
  faceitNickname?: string;
}

export default function PlayerFetcher({ steamUsername = 'taiuuu', faceitNickname = 'taiuuu' }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCombinedPlayerStats(steamUsername, faceitNickname)
      .then((res) => {
        if (!mounted) return;
        setData(res);
      })
      .catch((e) => console.error(e))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [steamUsername, faceitNickname]);

  if (loading) return <div className="text-sm text-zinc-400">Cargando datos del jugador...</div>;
  if (!data) return <div className="text-sm text-zinc-400">No se pudieron cargar datos.</div>;

  const { steam, faceit } = data;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Steam</p>
            <h2 className="text-xl font-semibold text-white">{steam?.nickname || steamUsername}</h2>
          </div>
        </div>
        <div className="text-sm text-zinc-300">
          <p><span className="text-zinc-400">Perfil:</span> <a href={steam?.profileUrl} className="text-blue-400 underline">Ver en Steam</a></p>
          <p><span className="text-zinc-400">Nivel:</span> <span className="text-white">{steam?.level ?? '—'}</span></p>
          <p><span className="text-zinc-400">Última:</span> <span className="text-white">{new Date(steam?.lastUpdated).toLocaleString()}</span></p>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">FACEIT</p>
            <h2 className="text-xl font-semibold text-white">{faceit?.nickname || faceitNickname}</h2>
          </div>
        </div>
        <div className="text-sm text-zinc-300">
          <p><span className="text-zinc-400">Nivel:</span> <span className="text-white">{faceit?.level ?? '—'}</span></p>
          <p><span className="text-zinc-400">ELO:</span> <span className="text-white">{faceit?.elo ?? '—'}</span></p>
          <p><span className="text-zinc-400">Partidos:</span> <span className="text-white">{faceit?.games ?? '—'}</span></p>
        </div>
      </div>
    </div>
  );
}
