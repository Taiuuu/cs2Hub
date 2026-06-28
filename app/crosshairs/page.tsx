'use client';

import { useState, useEffect } from 'react';
import { Crosshair } from '@/types';
import { CrosshairForm } from '@/components/crosshairs/CrosshairForm';
import { CrosshairList } from '@/components/crosshairs/CrosshairList';
import { Search } from 'lucide-react';

const DEFAULT_CROSSHAIRS: Crosshair[] = [
  {
    id: '1',
    name: 'donk',
    code: 'CSGO-yHtOW-SswFo-Ypfyr-2pswm-zL3ED',
    description: 'Cruz cerrada clásica para duelos crisp',
    team: 'Both',
    createdAt: new Date('2026-05-28T10:00:00'),
  },
  {
    id: '2',
    name: 'ropz',
    code: 'CSGO-5UHEt-3RFCY-4Nu8t-4UYGQ-vJN2G',
    description: 'Cruz proporcional 16:9, perfecta para juego versátil',
    team: 'Both',
    createdAt: new Date('2026-05-28T10:05:00'),
  },
  {
    id: '3',
    name: 'ZywOo',
    code: 'CSGO-DR6Tv-VTbfJ-VTrAM-fVkGe-zJNQB',
    description: 'Mira de punto pequeño, precisión máxima',
    team: 'Both',
    createdAt: new Date('2026-05-28T10:10:00'),
  },
];

function getInitialCrosshairs(): Crosshair[] {
  if (typeof window === 'undefined') return DEFAULT_CROSSHAIRS;
  const saved = localStorage.getItem('crosshairs');
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as any[];
      if (parsed.length === 0) return DEFAULT_CROSSHAIRS;
      return parsed.map((c) => ({ ...c, createdAt: new Date(c.createdAt) }));
    } catch {
      return DEFAULT_CROSSHAIRS;
    }
  }
  return DEFAULT_CROSSHAIRS;
}

export default function CrosshairsPage() {
  const [crosshairs, setCrosshairs] = useState<Crosshair[]>(getInitialCrosshairs());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('crosshairs', JSON.stringify(crosshairs));
  }, [crosshairs]);

  const handleAdd = (newCrosshair: Omit<Crosshair, 'id' | 'createdAt'>) => {
    setCrosshairs([{ ...newCrosshair, id: Date.now().toString(), createdAt: new Date() }, ...crosshairs]);
  };

  const handleDelete = (id: string) => setCrosshairs(crosshairs.filter((c) => c.id !== id));

  const handleCopy = async (code: string) => {
    try { await navigator.clipboard.writeText(code); } catch {}
  };

  const filtered = crosshairs.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#ffffff' }}>Miras</h1>
            <p className="text-sm" style={{ color: '#444444' }}>
              {crosshairs.length} {crosshairs.length === 1 ? 'mira guardada' : 'miras guardadas'}
            </p>
          </div>
          {/* Búsqueda */}
          {crosshairs.length > 0 && (
            <div style={{ position: 'relative' }}>
              <Search
                className="w-4 h-4"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#333333' }}
              />
              <input
                type="text"
                placeholder="Buscar mira..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: '#0d0d0d',
                  border: '1px solid #1e1e1e',
                  borderRadius: 8,
                  color: '#ffffff',
                  padding: '8px 14px 8px 36px',
                  fontSize: 13,
                  outline: 'none',
                  width: 220,
                }}
                onFocus={e => (e.target.style.borderColor = '#ff5500')}
                onBlur={e => (e.target.style.borderColor = '#1e1e1e')}
              />
            </div>
          )}
        </div>

        {/* Form */}
        <CrosshairForm onAdd={handleAdd} />

        {/* Lista */}
        <CrosshairList
          crosshairs={filtered}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      </div>
    </div>
  );
}
