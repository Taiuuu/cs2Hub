'use client';

import {
  Download,
  Pencil,
  Trash2,
  Crosshair,
  Terminal,
} from 'lucide-react';
import { GameConfig } from '@/types';

interface SectionInfo {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  fields: Array<{ key: string; label: string; unit?: string }>;
}

interface ConfigCardProps {
  config: GameConfig;
  sections: SectionInfo[];
  accentClasses: Record<string, { bg: string; text: string; border: string }>;
  isBeingEdited: boolean;
  onEdit: (config: GameConfig) => void;
  onDelete: (id: string) => void;
  onDownloadCfg: (config: GameConfig) => void;
  deleteConfirmId: string | null;
  onSetDeleteConfirm: (id: string | null) => void;
}

export function ConfigCard({
  config,
  sections,
  accentClasses,
  isBeingEdited,
  onEdit,
  onDelete,
  onDownloadCfg,
  deleteConfirmId,
  onSetDeleteConfirm,
}: ConfigCardProps) {
  const activeSections = sections.filter((s) => (config as any)[s.key]);
  const isConfirmingDelete = deleteConfirmId === config.id;

  return (
    <article
      className="rounded-xl p-5 transition"
      style={{
        background: '#0d0d0d',
        border: `1px solid ${
          isBeingEdited ? 'rgba(249,115,22,0.5)' : '#1e1e1e'
        }`,
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2
            className="text-base font-semibold flex items-center gap-2"
            style={{ color: '#ffffff' }}
          >
            {config.name}
            {isBeingEdited && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{
                  background: 'rgba(249,115,22,0.15)',
                  color: '#fb923c',
                }}
              >
                Editando
              </span>
            )}
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: '#444444' }}
          >
            {config.description || 'Sin descripción'}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ background: '#ff5500' }}
        >
          Guardada
        </span>
      </div>

      {config.crosshairShareCode && (
        <div
          className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
          style={{
            background: '#111111',
            border: '1px solid #1e1e1e',
            color: '#555555',
          }}
        >
          <Crosshair className="h-3.5 w-3.5" style={{ color: '#333333' }} />
          <span
            className="font-mono truncate"
            style={{ color: '#ff5500' }}
          >
            {config.crosshairShareCode}
          </span>
        </div>
      )}

      {activeSections.length === 0 && !config.launchOptions ? (
        <p className="text-sm italic" style={{ color: '#333333' }}>
          Sin secciones de ajustes cargadas.
        </p>
      ) : (
        <div className="space-y-2">
          {activeSections.map((section) => {
            const accent = accentClasses[section.accent];
            const Icon = section.icon;
            const values = (config as any)[section.key] as Record<
              string,
              any
            >;

            return (
              <div
                key={section.key}
                className="rounded-lg p-3"
                style={{
                  background: '#111111',
                  border: '1px solid #1a1a1a',
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-lg ${accent.bg}`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${accent.text}`} />
                  </span>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#444444' }}
                  >
                    {section.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  {section.fields
                    .filter(
                      (f) =>
                        values[f.key] !== undefined && values[f.key] !== ''
                    )
                    .map((f) => (
                      <div
                        key={f.key}
                        className="flex items-center justify-between gap-2"
                      >
                        <span style={{ color: '#444444' }}>
                          {f.label}
                        </span>
                        <span
                          className="font-medium truncate"
                          style={{ color: '#ffffff' }}
                        >
                          {typeof values[f.key] === 'boolean'
                            ? values[f.key]
                              ? 'Sí'
                              : 'No'
                            : `${values[f.key]}${
                                f.unit ? ` ${f.unit}` : ''
                              }`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
          {config.launchOptions && (
            <div
              className="rounded-lg p-3"
              style={{
                background: '#111111',
                border: '1px solid #1a1a1a',
              }}
            >
              <div className="mb-1 flex items-center gap-2">
                <Terminal
                  className="h-3.5 w-3.5"
                  style={{ color: '#333333' }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#444444' }}
                >
                  Lanzamiento
                </span>
              </div>
              <code
                className="text-xs break-all"
                style={{ color: '#aaaaaa' }}
              >
                {config.launchOptions}
              </code>
            </div>
          )}
        </div>
      )}

      <div
        className="mt-4 pt-4 flex items-center justify-between"
        style={{ borderTop: '1px solid #1a1a1a' }}
      >
        <span className="text-xs" style={{ color: '#333333' }}>
          {config.createdAt.toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          {/* Descargar .cfg */}
          <button
            onClick={() => onDownloadCfg(config)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
            style={{
              background: 'rgba(255,85,0,0.08)',
              border: '1px solid #ff5500',
              color: '#ff5500',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'rgba(255,85,0,0.15)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                'rgba(255,85,0,0.08)')
            }
          >
            <Download className="h-3.5 w-3.5" /> .cfg
          </button>

          <button
            onClick={() => onEdit(config)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
            style={{
              border: '1px solid #2a2a2a',
              color: '#aaaaaa',
              background: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                '#444';
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                '#2a2a2a';
              (e.currentTarget as HTMLElement).style.color = '#aaaaaa';
            }}
          >
            <Pencil className="h-3.5 w-3.5" /> Editar
          </button>

          {isConfirmingDelete ? (
            <div className="flex gap-1.5">
              <button
                onClick={() => onDelete(config.id)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-white"
                style={{
                  background: '#ef4444',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Confirmar
              </button>
              <button
                onClick={() => onSetDeleteConfirm(null)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium"
                style={{
                  border: '1px solid #2a2a2a',
                  color: '#aaaaaa',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => onSetDeleteConfirm(config.id)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
              style={{
                border: '1px solid #1e1e1e',
                color: '#333333',
                background: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  '#7f1d1d';
                (e.currentTarget as HTMLElement).style.color =
                  '#ef4444';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  '#1e1e1e';
                (e.currentTarget as HTMLElement).style.color =
                  '#333333';
              }}
            >
              <Trash2 className="h-3.5 w-3.5" /> Borrar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
