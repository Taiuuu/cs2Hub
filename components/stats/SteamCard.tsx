'use client';

import { User, Heart } from 'lucide-react';

interface SteamStats {
  id: string;
  nickname: string;
  profileUrl: string;
  avatar?: string;
  level: number;
  lastUpdated: string;
}

interface SteamCardProps {
  stats: SteamStats | null;
  loading?: boolean;
}

export function SteamCard({ stats, loading = false }: SteamCardProps) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-zinc-800 rounded-xl h-40"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center">
        <User className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
        <p className="text-zinc-400">No se pudieron cargar los datos de Steam</p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-700 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-b border-zinc-700 p-6">
        <div className="flex items-start gap-4">
          {stats.avatar && (
            <img
              src={stats.avatar}
              alt={stats.nickname}
              className="w-16 h-16 rounded-lg border border-zinc-600"
            />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{stats.nickname}</h3>
            <p className="text-xs text-zinc-400">Steam Profile</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400">{stats.level}</div>
            <div className="text-xs text-zinc-400">CS Level</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Profile Link */}
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Perfil</span>
          </div>
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 break-all text-sm transition-colors"
          >
            {stats.profileUrl}
          </a>
        </div>

        {/* Info Badge */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-300">
            Nivel {stats.level} en Counter-Strike 2
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-zinc-500 text-center pt-4 border-t border-zinc-700">
          Actualizado: {new Date(stats.lastUpdated).toLocaleTimeString('es-AR')}
        </div>
      </div>
    </div>
  );
}
