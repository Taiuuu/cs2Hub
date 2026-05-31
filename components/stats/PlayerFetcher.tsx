"use client";

import { useEffect, useState } from 'react';
import type { CombinedPlayerStats } from '@/lib/playerService';

interface Props {
  steamUsername?: string;
  faceitNickname?: string;
}

export default function PlayerFetcher({ steamUsername = 'taiuuu', faceitNickname = 'taiuuu' }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CombinedPlayerStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [steamInput, setSteamInput] = useState(steamUsername);
  const [faceitInput, setFaceitInput] = useState(faceitNickname);
  const [query, setQuery] = useState({ steamUsername, faceitNickname });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/stats?steamUsername=${encodeURIComponent(query.steamUsername)}&faceitNickname=${encodeURIComponent(query.faceitNickname)}`)
      .then(async (res) => {
        if (!mounted) return;
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || 'Error obteniendo estadísticas');
        }
        return res.json();
      })
      .then((result) => {
        if (!mounted) return;
        setData(result);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError('No se pudieron cargar los datos. Revisa los nombres y vuelve a intentar.');
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery({ steamUsername: steamInput.trim() || 'taiuuu', faceitNickname: faceitInput.trim() || 'taiuuu' });
  };

  const faceitWinRate = data?.faceit?.games && data.faceit.gamesWon
    ? Math.round((data.faceit.gamesWon / data.faceit.games) * 100)
    : undefined;

  const updatedAt = data?.faceit?.lastUpdated || data?.steam?.lastUpdated;

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] items-end">
        <label className="space-y-2">
          <span className="text-sm text-zinc-400">Steam username</span>
          <input
            value={steamInput}
            onChange={(event) => setSteamInput(event.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            placeholder="taiuuu"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-zinc-400">FACEIT nickname</span>
          <input
            value={faceitInput}
            onChange={(event) => setFaceitInput(event.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            placeholder="taiuuu"
          />
        </label>
        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Actualizar
        </button>
      </form>

      {loading && <div className="text-sm text-zinc-400">Cargando datos del jugador...</div>}
      {error && <div className="rounded-3xl border border-red-700 bg-red-950 p-4 text-sm text-red-300">{error}</div>}
      {!loading && !data && !error && <div className="text-sm text-zinc-400">No se pudieron cargar datos.</div>}

      {data && (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">ELO FACEIT</p>
              <p className="text-4xl font-semibold text-white">{data.faceit?.elo ?? '—'}</p>
              <p className="text-sm text-zinc-400 mt-2">Valor real de tu cuenta FACEIT</p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">Partidos</p>
              <p className="text-4xl font-semibold text-white">{data.faceit?.games ?? '—'}</p>
              <p className="text-sm text-zinc-400 mt-2">Total de matches en CS2</p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">Win rate</p>
              <p className="text-4xl font-semibold text-white">{faceitWinRate != null ? `${faceitWinRate}%` : '—'}</p>
              <p className="text-sm text-zinc-400 mt-2">Victorias según FACEIT lifetime</p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">Steam level</p>
              <p className="text-4xl font-semibold text-white">{data.steam?.level ?? '—'}</p>
              <p className="text-sm text-zinc-400 mt-2">Nivel de tu perfil Steam</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-5">
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Steam</p>
                <h2 className="text-xl font-semibold text-white">{data.steam?.nickname || steamInput}</h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-300">
                <p>
                  <span className="text-zinc-400">Perfil:</span>{' '}
                  <a href={data.steam?.profileUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                    Ver en Steam
                  </a>
                </p>
                <p><span className="text-zinc-400">Nivel:</span> <span className="text-white">{data.steam?.level ?? '—'}</span></p>
                <p><span className="text-zinc-400">Última:</span> <span className="text-white">{data.steam?.lastUpdated ? new Date(data.steam.lastUpdated).toLocaleString() : '—'}</span></p>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-5">
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">FACEIT</p>
                <h2 className="text-xl font-semibold text-white">{data.faceit?.nickname || faceitInput}</h2>
              </div>
              <div className="space-y-3 text-sm text-zinc-300">
                <p><span className="text-zinc-400">Nivel:</span> <span className="text-white">{data.faceit?.level ?? '—'}</span></p>
                <p><span className="text-zinc-400">ELO:</span> <span className="text-white">{data.faceit?.elo ?? '—'}</span></p>
                <p><span className="text-zinc-400">Última:</span> <span className="text-white">{data.faceit?.lastUpdated ? new Date(data.faceit.lastUpdated).toLocaleString() : '—'}</span></p>
              </div>
            </div>
          </div>

          {updatedAt && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-400">
              Última sincronización: <span className="text-white">{new Date(updatedAt).toLocaleString()}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
