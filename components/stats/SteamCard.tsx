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
        <div className="bg-[var(--color-bg-card)] rounded-xl h-40"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="border border-dashed border-[var(--color-border-subtle)] rounded-xl p-8 text-center bg-[var(--color-bg-card)]">
        <User className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
        <p className="text-zinc-400">No se pudieron cargar los datos de Steam</p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-bg-card)] overflow-hidden shadow-[var(--shadow-sm)]">
      {/* Header */}
      <div className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-subtle)] p-6">
        <div className="flex items-start gap-4">
          {stats.avatar && (
            <img
              src={stats.avatar}
              alt={stats.nickname}
              className="w-16 h-16 rounded-lg border border-[var(--color-border-subtle)]"
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
        <div className="bg-[var(--color-bg-base)] rounded-lg p-4 border border-[var(--color-border-subtle)]">
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
        <div className="bg-[var(--color-blue-default)]/10 border border-[var(--color-blue-muted)] rounded-lg p-4 text-center">
          <p className="text-sm text-blue-300">
            Nivel {stats.level} en Counter-Strike 2
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-[var(--color-foreground)]/70 text-center pt-4 border-t border-[var(--color-border-subtle)]">
          Actualizado: {new Date(stats.lastUpdated).toLocaleTimeString('es-AR')}
        </div>
      </div>
    </div>
  );
}
