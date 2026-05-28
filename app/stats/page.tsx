import { PlayerStats } from '@/types';

const sampleStats: PlayerStats[] = [
  {
    id: '1',
    platform: 'FACEIT',
    nickname: 'taiuuu',
    rating: 9.18,
    elo: 2540,
    lastUpdated: new Date(),
  },
  {
    id: '2',
    platform: 'Steam',
    nickname: 'taiuuu',
    rating: 8.72,
    elo: 2240,
    lastUpdated: new Date(),
  },
];

export default function StatsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Estadísticas</h1>
          <p className="text-zinc-400 max-w-2xl">
            Datos competitivos, rendimiento y tendencias clave para mejorar tu juego en CS2.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">Rating promedio</p>
            <p className="text-5xl font-semibold text-white">8.95</p>
            <p className="text-sm text-zinc-400 mt-2">Promedio entre FACEIT y partidas regulares</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">ELO medio</p>
            <p className="text-5xl font-semibold text-white">2390</p>
            <p className="text-sm text-zinc-400 mt-2">Promedio ponderado de tus cuentas</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">Actualizado</p>
            <p className="text-4xl font-semibold text-white">Hoy</p>
            <p className="text-sm text-zinc-400 mt-2">Última sincronización de datos reales</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {sampleStats.map((player) => (
            <div key={player.id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{player.platform}</p>
                  <h2 className="text-xl font-semibold text-white">{player.nickname}</h2>
                </div>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">Top</span>
              </div>
              <div className="space-y-3 text-sm text-zinc-300">
                <p>
                  <span className="text-zinc-400">Rating:</span> <span className="text-white">{player.rating?.toFixed(2)}</span>
                </p>
                <p>
                  <span className="text-zinc-400">Elo:</span> <span className="text-white">{player.elo}</span>
                </p>
                <p>
                  <span className="text-zinc-400">Última actualización:</span>{' '}
                  <span className="text-white">{player.lastUpdated.toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
