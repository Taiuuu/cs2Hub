'use client';

import {
  Pencil,
  X,
  Check,
  Terminal,
  Crosshair,
  ChevronDown,
} from 'lucide-react';
import { ConfigSection, SectionDefProps, FieldDef } from './ConfigSection';

export interface FormState {
  name: string;
  description: string;
  crosshairShareCode: string;
  launchOptions: string;
  enabled: Record<string, boolean>;
  data: Record<string, Record<string, string | number | boolean>>;
}

interface ConfigFormProps {
  form: FormState;
  sections: SectionDefProps[];
  accentClasses: Record<
    string,
    { bg: string; text: string; border: string; ring: string }
  >;
  editingId: string | null;
  editingConfig: any;
  openSection: string | null;
  onFormChange: (updates: Partial<FormState>) => void;
  onToggleSection: (key: string, value: boolean) => void;
  onSetOpenSection: (key: string | null) => void;
  onFieldChange: (sectionKey: string, fieldKey: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

const inputBase: React.CSSProperties = {
  width: '100%',
  background: '#111111',
  border: '1px solid #2a2a2a',
  borderRadius: 12,
  color: '#ffffff',
  padding: '10px 14px',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
};

export function ConfigForm({
  form,
  sections,
  accentClasses,
  editingId,
  editingConfig,
  openSection,
  onFormChange,
  onToggleSection,
  onSetOpenSection,
  onFieldChange,
  onSubmit,
  onCancelEdit,
}: ConfigFormProps) {
  const activeSectionCount = sections.filter(
    (s) => form.enabled[s.key]
  ).length;

  return (
    <>
      {/* Banner edición */}
      {editingId && (
        <div
          className="sticky top-4 z-10 flex items-center justify-between gap-4 rounded-xl px-5 py-3"
          style={{
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.3)',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: 'rgba(249,115,22,0.15)',
                color: '#fb923c',
              }}
            >
              <Pencil className="h-4 w-4" />
            </span>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: '#fb923c' }}
              >
                Editando «{editingConfig?.name ?? form.name}»
              </p>
              <p
                className="text-xs"
                style={{ color: 'rgba(251,146,60,0.7)' }}
              >
                Los cambios se guardan al tocar "Guardar cambios".
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
            style={{
              border: '1px solid rgba(249,115,22,0.3)',
              color: '#fb923c',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            <X className="h-3.5 w-3.5" /> Cancelar edición
          </button>
        </div>
      )}

      <section
        className="rounded-xl p-6"
        style={{
          background: '#0d0d0d',
          border: `1px solid ${
            editingId ? 'rgba(249,115,22,0.4)' : '#1e1e1e'
          }`,
        }}
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2
              className="text-xl font-semibold mb-0.5"
              style={{ color: '#ffffff' }}
            >
              {editingId ? 'Editar configuración' : 'Nueva configuración'}
            </h2>
            <p className="text-xs" style={{ color: '#444444' }}>
              {activeSectionCount === 0
                ? 'Elegí qué secciones querés cargar más abajo.'
                : `${activeSectionCount} sección${
                    activeSectionCount > 1 ? 'es' : ''
                  } activa${activeSectionCount > 1 ? 's' : ''}.`}
            </p>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            style={{ background: editingId ? '#ea580c' : '#ff5500' }}
          >
            {editingId ? 'Editando' : 'Mi setup'}
          </span>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: '#444444' }}
              >
                Nombre
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => onFormChange({ name: e.target.value })}
                placeholder="Config 31/5/2026"
                style={inputBase}
                onFocus={(e) => (e.target.style.borderColor = '#ff5500')}
                onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: '#444444' }}
              >
                Descripción
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  onFormChange({ description: e.target.value })
                }
                placeholder="ej: Setup de práctica"
                style={inputBase}
                onFocus={(e) => (e.target.style.borderColor = '#ff5500')}
                onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-semibold mb-2 uppercase tracking-wider"
              style={{ color: '#444444' }}
            >
              Mira{' '}
              <span
                style={{
                  color: '#2a2a2a',
                  textTransform: 'none',
                  letterSpacing: 0,
                }}
              >
                — opcional
              </span>
            </label>
            <div style={{ position: 'relative' }}>
              <Crosshair
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: '#333333' }}
              />
              <input
                type="text"
                value={form.crosshairShareCode}
                onChange={(e) =>
                  onFormChange({ crosshairShareCode: e.target.value })
                }
                placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                style={{ ...inputBase, paddingLeft: 40 }}
                onFocus={(e) => (e.target.style.borderColor = '#ff5500')}
                onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>
          </div>

          {/* Secciones */}
          <div className="space-y-2">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#444444' }}
            >
              Secciones a cargar
            </p>
            {sections.map((section) => {
              const accent = accentClasses[section.accent];
              const isEnabled = !!form.enabled[section.key];
              const isOpen = openSection === section.key;

              return (
                <ConfigSection
                  key={section.key}
                  section={section}
                  isEnabled={isEnabled}
                  isOpen={isOpen}
                  accentClasses={accent}
                  onToggleEnable={(enabled) =>
                    onToggleSection(section.key, enabled)
                  }
                  onToggleOpen={() =>
                    onSetOpenSection(isOpen ? null : section.key)
                  }
                  onFieldChange={(fieldKey, value) =>
                    onFieldChange(section.key, fieldKey, value)
                  }
                  fieldValues={form.data[section.key] ?? {}}
                />
              );
            })}
          </div>

          <div>
            <label
              className="block text-xs font-semibold mb-2 uppercase tracking-wider"
              style={{ color: '#444444' }}
            >
              Opciones de lanzamiento{' '}
              <span
                style={{
                  color: '#2a2a2a',
                  textTransform: 'none',
                  letterSpacing: 0,
                }}
              >
                — opcional
              </span>
            </label>
            <div style={{ position: 'relative' }}>
              <Terminal className="absolute left-4 top-3.5 h-4 w-4 text-[#333333]" />
              <input
                type="text"
                value={form.launchOptions}
                onChange={(e) =>
                  onFormChange({ launchOptions: e.target.value })
                }
                placeholder="-novid -tickrate 128 -allow_third_party_software"
                style={{ ...inputBase, paddingLeft: 40, fontFamily: 'monospace' }}
                onFocus={(e) => (e.target.style.borderColor = '#ff5500')}
                onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition"
              style={{
                background: editingId ? '#ea580c' : '#ff5500',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Check className="h-4 w-4" />
              {editingId ? 'Guardar cambios' : 'Guardar configuración'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="rounded-xl px-4 py-3 text-sm font-semibold transition"
                style={{
                  border: '1px solid #2a2a2a',
                  color: '#aaaaaa',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
