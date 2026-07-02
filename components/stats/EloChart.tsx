'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EloDataPoint {
  date: string;
  elo: number;
}

interface EloChartProps {
  nickname: string;
}

export function EloChart({ nickname }: EloChartProps) {
  const [data, setData] = useState<EloDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`/api/stats/history?faceitNickname=${encodeURIComponent(nickname)}&limit=10`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(json => {
        if (json.eloData) setData(json.eloData);
        setLoading(false);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Error');
        setLoading(false);
      });
  }, [nickname]);

  if (loading) {
    return (
      <div className="h-64 rounded-xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}>
        <div className="h-full flex items-center justify-center">
          <div className="animate-pulse text-sm" style={{ color: '#666666' }}>Cargando gráfico...</div>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="h-64 rounded-xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}>
        <div className="h-full flex items-center justify-center">
          <p className="text-sm" style={{ color: '#666666' }}>No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}>
      <div className="p-4">
        <p className="text-xs font-semibold mb-4" style={{ color: '#444444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Evolución ELO (últimas 10 partidas)
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
            <XAxis 
              dataKey="date" 
              stroke="#666666"
              style={{ fontSize: '11px' }}
            />
            <YAxis 
              stroke="#666666"
              style={{ fontSize: '11px' }}
            />
            <Tooltip 
              contentStyle={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '6px' }}
              labelStyle={{ color: '#ffffff' }}
              formatter={(value: number) => [`${value} ELO`, 'ELO']}
            />
            <Line 
              type="monotone" 
              dataKey="elo" 
              stroke="#ff5500" 
              dot={{ fill: '#ff5500', r: 3 }}
              activeDot={{ r: 5 }}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
