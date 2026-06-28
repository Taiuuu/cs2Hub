'use client';

import { Crosshair } from '@/types';
import { Copy, Trash2, Check } from 'lucide-react';
import { useState } from 'react';
import { CrosshairPreview } from './CrosshairPreview';

interface CrosshairListProps {
  crosshairs: Crosshair[];
  onDelete: (id: string) => void;
  onCopy: (code: string) => void;
}

export function CrosshairList({ crosshairs, onDelete, onCopy }: CrosshairListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, code: string) => {
    onCopy(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (crosshairs.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-xl border"
        style={{ borderColor: '#1e1e1e', background: '#0d0d0d' }}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#1a1a1a' }}>
          <span style={{ color: '#ff5500', fontSize: 22 }}>+</span>
        </div>
        <p className="font-medium mb-1" style={{ color: '#ffffff' }}>No tenés miras guardadas</p>
        <p className="text-sm" style={{ color: '#444444' }}>Creá una nueva con el botón de arriba</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {crosshairs.map((crosshair) => (
        <div
          key={crosshair.id}
          className="rounded-xl flex flex-col overflow-hidden transition-all duration-150"
          style={{
            background: '#0d0d0d',
            border: '1px solid #1e1e1e',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
        >
          {/* Preview area */}
          <div
            className="flex items-center justify-center"
            style={{ background: '#111111', height: 140, borderBottom: '1px solid #1a1a1a' }}
          >
            <CrosshairPreview code={crosshair.code} size={120} />
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col gap-3 flex-1">
            <div>
              <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: '#ffffff' }}>
                {crosshair.name}
              </h3>
              {crosshair.description && (
                <p className="text-xs leading-relaxed" style={{ color: '#555555' }}>
                  {crosshair.description}
                </p>
              )}
            </div>

            {/* Code */}
            <div
              className="rounded-lg px-3 py-2 font-mono text-xs break-all"
              style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', color: '#ff5500' }}
            >
              {crosshair.code}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleCopy(crosshair.id, crosshair.code)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: copiedId === crosshair.id ? 'rgba(34,197,94,0.1)' : 'rgba(255,85,0,0.08)',
                  border: `1px solid ${copiedId === crosshair.id ? '#16a34a' : '#ff5500'}`,
                  color: copiedId === crosshair.id ? '#16a34a' : '#ff5500',
                }}
              >
                {copiedId === crosshair.id
                  ? <><Check className="w-3.5 h-3.5" /> Copiado</>
                  : <><Copy className="w-3.5 h-3.5" /> Copiar código</>
                }
              </button>
              <button
                onClick={() => onDelete(crosshair.id)}
                className="p-2 rounded-lg transition-all"
                style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#444444' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#7f1d1d';
                  (e.currentTarget as HTMLElement).style.color = '#ef4444';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a';
                  (e.currentTarget as HTMLElement).style.color = '#444444';
                  (e.currentTarget as HTMLElement).style.background = '#1a1a1a';
                }}
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
