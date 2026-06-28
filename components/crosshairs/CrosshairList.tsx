'use client';

import { Crosshair } from '@/types';
import { Copy, Trash2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { CrosshairPreview } from './CrosshairPreview';

interface CrosshairListProps {
  crosshairs: Crosshair[];
  onDelete: (id: string) => void;
  onCopy: (code: string) => void;
}

function parseCvarsFromString(raw: string) {
  const result: Record<string, number | boolean> = {};
  const lines = raw.split(/[\n;]+/);
  for (const line of lines) {
    const match = line.trim().match(/^(cl_\w+)\s+"?([^"]+)"?$/);
    if (!match) continue;
    const [, key, val] = match;
    if (val === 'true' || val === 'false') result[key] = val === 'true';
    else if (!isNaN(Number(val))) result[key] = Number(val);
  }
  return result as any;
}

function buildConsoleString(cvars: Record<string, any>): string {
  return Object.entries(cvars)
    .map(([k, v]) => `${k} "${v}"`)
    .join('; ');
}

// Modal de detalle de crosshair
function CrosshairModal({ crosshair, onClose, onDelete, onCopy }: {
  crosshair: Crosshair;
  onClose: () => void;
  onDelete: () => void;
  onCopy: (text: string) => void;
}) {
  const [tab, setTab] = useState<'code' | 'config'>('code');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const consoleString = crosshair.cvars ? buildConsoleString(crosshair.cvars) : '';

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(crosshair.code);
    onCopy(crosshair.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyConfig = async () => {
    await navigator.clipboard.writeText(consoleString);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: '#111111', border: '1px solid #2a2a2a' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div>
            <h2 className="font-bold text-base" style={{ color: '#ffffff' }}>{crosshair.name}</h2>
            {crosshair.description && (
              <p className="text-xs mt-0.5" style={{ color: '#555555' }}>{crosshair.description}</p>
            )}
          </div>
          <button onClick={onClose} style={{ color: '#444444', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444444')}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview grande */}
        <div className="flex items-center justify-center py-8" style={{ background: '#0a0a0a' }}>
          <CrosshairPreview cvars={crosshair.cvars} size={220} />
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: '1px solid #1a1a1a' }}>
          {(['code', 'config'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-3 text-sm font-medium transition-colors"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: tab === t ? '#ffffff' : '#444444',
                borderBottom: tab === t ? '2px solid #ff5500' : '2px solid transparent',
              }}
            >
              {t === 'code' ? 'Crosshair Code' : 'Config (consola)'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4 space-y-3">
          {tab === 'code' ? (
            <div className="flex gap-2 items-center">
              <div
                className="flex-1 font-mono text-sm px-3 py-2.5 rounded-lg break-all"
                style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', color: '#ff5500' }}
              >
                {crosshair.code || '—'}
              </div>
              <button
                onClick={handleCopyCode}
                disabled={!crosshair.code}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: copiedCode ? 'rgba(34,197,94,0.1)' : '#ff5500',
                  border: `1px solid ${copiedCode ? '#16a34a' : '#ff5500'}`,
                  color: copiedCode ? '#16a34a' : '#ffffff',
                  cursor: crosshair.code ? 'pointer' : 'not-allowed',
                }}
              >
                {copiedCode ? <><Check className="w-3.5 h-3.5" /> Copiado</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {crosshair.cvars ? (
                <>
                  <div
                    className="font-mono text-xs px-3 py-3 rounded-lg leading-relaxed"
                    style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', color: '#aaaaaa', maxHeight: 160, overflowY: 'auto' }}
                  >
                    {Object.entries(crosshair.cvars).map(([k, v]) => (
                      <div key={k}>
                        <span style={{ color: '#ff5500' }}>{k}</span>
                        <span style={{ color: '#555555' }}> &quot;{String(v)}&quot;</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleCopyConfig}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: copiedConfig ? 'rgba(34,197,94,0.1)' : 'rgba(255,85,0,0.08)',
                      border: `1px solid ${copiedConfig ? '#16a34a' : '#ff5500'}`,
                      color: copiedConfig ? '#16a34a' : '#ff5500',
                    }}
                  >
                    {copiedConfig
                      ? <><Check className="w-4 h-4" /> Copiado al portapapeles</>
                      : <><Copy className="w-4 h-4" /> Copiar para consola</>}
                  </button>
                </>
              ) : (
                <p className="text-sm text-center py-4" style={{ color: '#444444' }}>
                  Esta mira no tiene cvars guardados.
                  <br />Editala para agregar los comandos de consola.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer con eliminar */}
        <div className="px-4 pb-4">
          <button
            onClick={() => { onDelete(); onClose(); }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all"
            style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#444444', cursor: 'pointer' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#7f1d1d';
              (e.currentTarget as HTMLElement).style.color = '#ef4444';
              (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a';
              (e.currentTarget as HTMLElement).style.color = '#444444';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <Trash2 className="w-3.5 h-3.5" /> Eliminar mira
          </button>
        </div>
      </div>
    </div>
  );
}

export function CrosshairList({ crosshairs, onDelete, onCopy }: CrosshairListProps) {
  const [selected, setSelected] = useState<Crosshair | null>(null);

  if (crosshairs.length === 0) {
    return (
      <div className="text-center py-16 rounded-xl border" style={{ borderColor: '#1e1e1e', background: '#0d0d0d' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#1a1a1a' }}>
          <span style={{ color: '#ff5500', fontSize: 22 }}>+</span>
        </div>
        <p className="font-medium mb-1" style={{ color: '#ffffff' }}>No tenés miras guardadas</p>
        <p className="text-sm" style={{ color: '#444444' }}>Creá una nueva con el botón de arriba</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {crosshairs.map((crosshair) => (
          <div
            key={crosshair.id}
            onClick={() => setSelected(crosshair)}
            className="rounded-xl flex flex-col overflow-hidden cursor-pointer transition-all duration-150"
            style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#ff550044')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
          >
            {/* Preview */}
            <div
              className="flex items-center justify-center"
              style={{ background: '#111111', height: 120, borderBottom: '1px solid #1a1a1a' }}
            >
              <CrosshairPreview cvars={crosshair.cvars} size={100} />
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate" style={{ color: '#ffffff' }}>
                {crosshair.name}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: '#333333' }}>
                {crosshair.cvars ? 'Con config' : crosshair.code ? 'Solo código' : 'Sin datos'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <CrosshairModal
          crosshair={selected}
          onClose={() => setSelected(null)}
          onDelete={() => { onDelete(selected.id); setSelected(null); }}
          onCopy={onCopy}
        />
      )}
    </>
  );
}
