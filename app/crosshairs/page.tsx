'use client';

import { useState, useEffect } from 'react';
import { Crosshair } from '@/types';
import { CrosshairForm } from '@/components/crosshairs/CrosshairForm';
import { CrosshairList } from '@/components/crosshairs/CrosshairList';

const DEFAULT_CROSSHAIRS: Crosshair[] = [
  {
    id: '1',
    name: 'Huasopeek (cruz cerrada)',
    code: 'CSGO-yHtOW-SswFo-Ypfyr-2pswm-zL3ED',
    description: 'Cruz cerrada clásica para duelos crisp y referencias limpias',
    team: 'Both',
    createdAt: new Date('2026-05-28T10:00:00'),
  },
  {
    id: '2',
    name: 'Ropz (cruz 16:9 o BB)',
    code: 'CSGO-5UHEt-3RFCY-4Nu8t-4UYGQ-vJN2G',
    description: 'Cruz proporcional 16:9, perfecta para juego versátil',
    team: 'Both',
    createdAt: new Date('2026-05-28T10:05:00'),
  },
];

function getInitialCrosshairs(): Crosshair[] {
  if (typeof window === 'undefined') return DEFAULT_CROSSHAIRS;
  const saved = localStorage.getItem('crosshairs');
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as any[];
      if (parsed.length === 0) return DEFAULT_CROSSHAIRS;
      return parsed.map((crosshair) => ({
        ...crosshair,
        createdAt: new Date(crosshair.createdAt),
      }));
    } catch (e) {
      console.error('Error al cargar miras:', e);
      return DEFAULT_CROSSHAIRS;
    }
  }
  return DEFAULT_CROSSHAIRS;
}

export default function CrosshairsPage() {
  const [crosshairs, setCrosshairs] = useState<Crosshair[]>(getInitialCrosshairs());
  const [searchTerm, setSearchTerm] = useState('');

  // Guardar en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('crosshairs', JSON.stringify(crosshairs));
  }, [crosshairs]);

  const handleAdd = (newCrosshair: Omit<Crosshair, 'id' | 'createdAt'>) => {
    const crosshair: Crosshair = {
      ...newCrosshair,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setCrosshairs([crosshair, ...crosshairs]);
  };

  const handleDelete = (id: string) => {
    setCrosshairs(crosshairs.filter((c) => c.id !== id));
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert('✓ Código copiado al portapapeles');
    } catch (e) {
      console.error('Error al copiar:', e);
    }
  };

  const filtered = crosshairs.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Miras</h1>
          <p className="text-zinc-400">Guarda y copia tus crosshairs favoritas</p>
        </div>

        {/* Formulario */}
        <CrosshairForm onAdd={handleAdd} />

        {/* Búsqueda */}
        {crosshairs.length > 0 && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar mira..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

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
