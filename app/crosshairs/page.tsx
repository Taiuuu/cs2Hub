'use client';

import { useState, useEffect } from 'react';
import { Crosshair } from '@/types';
import { CrosshairForm } from '@/components/crosshairs/CrosshairForm';
import { CrosshairList } from '@/components/crosshairs/CrosshairList';

export default function CrosshairsPage() {
  const [crosshairs, setCrosshairs] = useState<Crosshair[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar miras del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('crosshairs');
    if (saved) {
      try {
        setCrosshairs(JSON.parse(saved));
      } catch (e) {
        console.error('Error al cargar miras:', e);
      }
    }
  }, []);

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
