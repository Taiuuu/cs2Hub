'use client';

import { useState, useEffect } from 'react';
import { Users, Flame, Target, Award, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface EloDataPoint {
  date: string;
  elo: number;
}

export function FaceitCard({ stats, loading = false }: FaceitCardProps) {
  const [eloData, setEloData] = useState<EloDataPoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (stats?.nickname && !loading) {
      setLoadingHistory(true);
      fetch(`/api/stats/history?faceitNickname=${encodeURIComponent(stats.nickname)}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          if (data.eloData) {
            setEloData(data.eloData);
          }
        })
        .catch((err) => console.error('Error loading ELO history:', err))
        .finally(() => setLoadingHistory(false));
    }
  }, [stats?.nickname, loading]);
  if (loading) {
    return (
      <div className="border border-zinc-700 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-b border-zinc-700 p-6">
          <div className="flex items-start gap-4">
            {/* Avatar skeleton */}
            <div className="w-16 h-16 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="flex-1">
              {/* Name skeleton */}
              <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2 animate-pulse" />
              {/* Label skeleton */}
              <div className="h-4 bg-zinc-800 rounded w-1/4 animate-pulse" />
            </div>
            {/* Level skeleton */}
            <div className="w-16 h-16 bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="p-6 space-y-6">
          {/* ELO and Matches row */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                <div className="h-4 bg-zinc-700 rounded w-2/3 mb-3 animate-pulse" />
                <div className="h-8 bg-zinc-700 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Win Rate skeleton */}
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <div className="h-4 bg-zinc-700 rounded w-1/3 mb-3 animate-pulse" />
            <div className="flex items-end gap-4">
              <div>
                <div className="h-8 bg-zinc-700 rounded w-20 mb-2 animate-pulse" />
                <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse" />
              </div>
              <div className="flex-1 h-6 bg-zinc-700 rounded-full animate-pulse" />
            </div>
          </div>

          {/* K/D and HS% skeleton */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                <div className="h-4 bg-zinc-700 rounded w-2/3 mb-3 animate-pulse" />
                <div className="h-8 bg-zinc-700 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Last updated skeleton */}
          <div className="h-4 bg-zinc-700 rounded w-1/3 mx-auto animate-pulse pt-4 border-t border-zinc-700" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center">
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
    <div className="border border-zinc-700 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden shadow-xl">
      {/* Header con avatar y info básica */}
      <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-b border-zinc-700 p-6">
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
            <p className="text-xs text-zinc-400">FACEIT Profile</p>
          </div>
          <div className={`text-4xl font-bold ${levelColor} text-center`}>
            <div>{stats.level}</div>
            <div className="text-xs text-zinc-400 font-normal mt-1">Level</div>
          </div>
        </div>
      </div>

      {/* ELO Evolution Chart */}
      {eloData.length > 0 && (
        <div className="bg-zinc-900/50 border-b border-zinc-700 p-6">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Evolución de ELO</h4>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={eloData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis 
                dataKey="date" 
                stroke="#71717a"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#71717a"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value) => [`${value} ELO`, 'ELO']}
              />
              <Line
                type="monotone"
                dataKey="elo"
                stroke="#ff5500"
                strokeWidth={2}
                dot={{ fill: '#ff5500', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Stats Grid */}
      <div className="p-6 space-y-6">
        {/* Elo y ranking */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">ELO</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.elo}</div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Matches</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.matches}</div>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
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
            <div className="flex-1 h-6 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                style={{ width: `${stats.winRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* K/D y Headshots */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">K/D Ratio</span>
              <Target className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.kdRatio.toFixed(2)}</div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">HS %</span>
              <Zap className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.headshotPercentage.toFixed(1)}%</div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-zinc-500 text-center pt-4 border-t border-zinc-700">
          Actualizado: {new Date(stats.lastUpdated).toLocaleTimeString('es-AR')}
        </div>
      </div>
    </div>
  );
}
