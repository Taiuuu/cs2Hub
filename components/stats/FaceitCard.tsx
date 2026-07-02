'use client';

import { Users, Flame, Target, Award, Zap } from 'lucide-react';

interface FaceitStats {
  id: string;
  nickname: string;
  avatar?: string;
  level: number;
  elo: number;
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
  kdRatio: number;
  headshotPercentage: number;
  totalMatches: number;
  lastUpdated: string;
}

interface FaceitCardProps {
  stats: FaceitStats | null;
  loading?: boolean;
}

export function FaceitCard({ stats, loading = false }: FaceitCardProps) {
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
        <Flame className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
        <p className="text-zinc-400">No se pudieron cargar los datos de FACEIT</p>
      </div>
    );
  }

  const levelColor =
    stats.level <= 4
      ? 'text-red-400'
      : stats.level <= 7
        ? 'text-yellow-400'
        : stats.level <= 9
          ? 'text-green-400'
          : 'text-purple-400';

  return (
    <div className="border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-bg-card)] overflow-hidden shadow-[var(--shadow-sm)]">
      {/* Header con avatar y info básica */}
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
            <p className="text-xs text-zinc-400">FACEIT Profile</p>
          </div>
          <div className={`text-4xl font-bold ${levelColor} text-center`}>
            <div>{stats.level}</div>
            <div className="text-xs text-zinc-400 font-normal mt-1">Level</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6 space-y-6">
        {/* Elo y ranking */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--color-bg-base)] rounded-lg p-4 border border-[var(--color-border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">ELO</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.elo}</div>
          </div>

          <div className="bg-[var(--color-bg-base)] rounded-lg p-4 border border-[var(--color-border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Matches</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.matches}</div>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-[var(--color-bg-base)] rounded-lg p-4 border border-[var(--color-border-subtle)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Win Rate</span>
            <Award className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-end gap-4">
            <div>
              <div className="text-3xl font-bold text-white">{stats.winRate}%</div>
              <div className="text-xs text-zinc-400 mt-1">
                {stats.wins}W / {stats.losses}L
              </div>
            </div>
            {/* Progress bar */}
            <div className="flex-1 h-6 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                style={{ width: `${stats.winRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* K/D y Headshots */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--color-bg-base)] rounded-lg p-4 border border-[var(--color-border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">K/D Ratio</span>
              <Target className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.kdRatio.toFixed(2)}</div>
          </div>

          <div className="bg-[var(--color-bg-base)] rounded-lg p-4 border border-[var(--color-border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">HS %</span>
              <Zap className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.headshotPercentage.toFixed(1)}%</div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-[var(--color-foreground)]/70 text-center pt-4 border-t border-[var(--color-border-subtle)]">
          Actualizado: {new Date(stats.lastUpdated).toLocaleTimeString('es-AR')}
        </div>
      </div>
    </div>
  );
}
