'use client';

import { Crosshair } from '@/types';
import { Copy, Trash2 } from 'lucide-react';

interface CrosshairListProps {
  crosshairs: Crosshair[];
  onDelete: (id: string) => void;
  onCopy: (code: string) => void;
}

export function CrosshairList({ crosshairs, onDelete, onCopy }: CrosshairListProps) {
  if (crosshairs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">No hay miras guardadas. Crea una nueva para empezar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {crosshairs.map((crosshair) => (
        <div
          key={crosshair.id}
          className="border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-white">{crosshair.name}</h3>
              {crosshair.description && (
                <p className="text-sm text-zinc-400 mt-1">{crosshair.description}</p>
              )}
              <code className="text-xs bg-zinc-900 text-green-400 px-2 py-1 rounded mt-2 block w-fit font-mono break-all">
                {crosshair.code}
              </code>
              {crosshair.team && (
                <span className="text-xs text-zinc-500 mt-2 inline-block">
                  {crosshair.team === 'Both' ? '🔄 Ambos' : crosshair.team === 'CT' ? '🛡️ CT' : '🔫 T'}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onCopy(crosshair.code)}
                className="p-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-blue-300 transition-colors"
                title="Copiar código"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(crosshair.id)}
                className="p-2 rounded-lg bg-red-900 hover:bg-red-800 text-red-300 transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
