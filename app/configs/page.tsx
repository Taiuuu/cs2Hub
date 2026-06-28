'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Mouse,
  Monitor,
  SlidersHorizontal,
  Eye,
  LayoutPanelTop,
  Radar as RadarIcon,
  Terminal,
  Crosshair,
  Pencil,
  Trash2,
  X,
  Plus,
  ChevronDown,
  Check,
} from 'lucide-react';
import { GameConfig } from '@/types';

// ---------------------------------------------------------------------------
// Definición de secciones — cada una es opcional. El usuario activa solo las
// que quiere cargar, y solo esas aparecen después en la tarjeta guardada.
// ---------------------------------------------------------------------------

type FieldType = 'number' | 'text' | 'select' | 'boolean';

interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  unit?: string;
  options?: string[];
  placeholder?: string;
}

interface SectionDef {
  key: keyof Pick<
  GameConfig, 'mouse' | 'video' | 'advancedVideo' | 'viewmodel' | 'hud' | 'radar'>;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind color token usado en acentos puntuales
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    key: 'mouse',
    label: 'Mouse',
    icon: Mouse,
    accent: 'sky',
    fields: [
      { key: 'dpi', label: 'DPI', type: 'number', placeholder: '400' },
      { key: 'sensitivity', label: 'Sensibilidad', type: 'number', placeholder: '2' },
      { key: 'zoomSensitivityRatio', label: 'Multiplicador de zoom', type: 'number', placeholder: '1' },
      { key: 'pollingRate', label: 'Tasa de sondeo', type: 'number', unit: 'Hz', placeholder: '1000' },
    ],
  },
  {
    key: 'video',
    label: 'Video',
    icon: Monitor,
    accent: 'violet',
    fields: [
      { key: 'brightness', label: 'Brillo', type: 'number', unit: '%', placeholder: '75' },
      { key: 'scalingMode', label: 'Modo de escala', type: 'select', options: ['Estirado', 'Normal', 'Mantener relación de aspecto'] },
      { key: 'aspectRatio', label: 'Relación de aspecto', type: 'select', options: ['4:3', '5:4', '16:9', '16:10'] },
      { key: 'resolution', label: 'Resolución', type: 'text', placeholder: '1280x960' },
      { key: 'displayMode', label: 'Modo de presentación', type: 'select', options: ['Pantalla completa', 'Ventana', 'Ventana sin bordes'] },
    ],
  },
  {
    key: 'advancedVideo',
    label: 'Video avanzado',
    icon: SlidersHorizontal,
    accent: 'fuchsia',
    fields: [
      { key: 'boostPlayerContrast', label: 'Contraste de jugadores', type: 'select', options: ['Activado', 'Desactivado'] },
      { key: 'vsync', label: 'Sincronización vertical', type: 'select', options: ['Activado', 'Desactivado'] },
      { key: 'multisampling', label: 'Suavizado (MSAA)', type: 'select', options: ['Desactivado', '2x MSAA', '4x MSAA', '8x MSAA'] },
      { key: 'globalShadowQuality', label: 'Calidad de sombras', type: 'select', options: ['Baja', 'Media', 'Alta'] },
      { key: 'textureDetail', label: 'Detalle de texturas/modelos', type: 'select', options: ['Baja', 'Media', 'Alta'] },
      { key: 'textureFiltering', label: 'Filtrado de texturas', type: 'select', options: ['Bilineal', 'Anisotrópico 2X', 'Anisotrópico 4X', 'Anisotrópico 8X', 'Anisotrópico 16X'] },
      { key: 'shaderDetail', label: 'Detalle de sombreador', type: 'select', options: ['Baja', 'Media', 'Alta'] },
      { key: 'particleDetail', label: 'Detalle de partículas', type: 'select', options: ['Baja', 'Media', 'Alta'] },
      { key: 'dynamicShadows', label: 'Sombras dinámicas', type: 'select', options: ['Ninguna', 'Solo el jugador', 'Todas'] },
      { key: 'ambientOcclusion', label: 'Oclusión ambiental', type: 'select', options: ['Desactivado', 'Baja', 'Media', 'Alta'] },
      { key: 'hdr', label: 'Alto rango dinámico', type: 'select', options: ['Rendimiento', 'Calidad'] },
      { key: 'fsr', label: 'FSR', type: 'select', options: ['Desactivado (calidad máxima)', 'Rendimiento', 'Balanceado', 'Calidad'] },
      { key: 'nvidiaReflex', label: 'NVIDIA Reflex', type: 'select', options: ['Desactivado', 'Activado', 'Activado + Boost'] },
    ],
  },
  {
    key: 'viewmodel',
    label: 'Viewmodel',
    icon: Eye,
    accent: 'amber',
    fields: [
      { key: 'fov', label: 'FOV', type: 'number', placeholder: '68' },
      { key: 'offsetX', label: 'Offset X', type: 'number', placeholder: '2.5' },
      { key: 'offsetY', label: 'Offset Y', type: 'number', placeholder: '0' },
      { key: 'offsetZ', label: 'Offset Z', type: 'number', placeholder: '-1.5' },
    ],
  },
  {
    key: 'hud',
    label: 'HUD',
    icon: LayoutPanelTop,
    accent: 'emerald',
    fields: [
      { key: 'scaling', label: 'Escala del HUD', type: 'number', placeholder: '1' },
      { key: 'showLoadout', label: 'Mostrar loadout', type: 'boolean' },
      { key: 'safezoneX', label: 'Safezone X', type: 'number', placeholder: '1' },
      { key: 'safezoneY', label: 'Safezone Y', type: 'number', placeholder: '1' },
      { key: 'hudColor', label: 'Color del HUD', type: 'number', placeholder: '11' },
    ],
  },
  {
    key: 'radar',
    label: 'Radar',
    icon: RadarIcon,
    accent: 'rose',
    fields: [
      { key: 'hudRadarScale', label: 'Escala del radar (HUD)', type: 'number', placeholder: '1' },
      { key: 'radarScale', label: 'Escala del radar', type: 'number', placeholder: '0.7' },
      { key: 'alwaysCentered', label: 'Siempre centrado', type: 'boolean' },
      { key: 'rotate', label: 'Rotar con la vista', type: 'boolean' },
      { key: 'iconScaleMin', label: 'Escala mínima de iconos', type: 'number', placeholder: '0.6' },
    ],
  },
];

const ACCENT_CLASSES: Record<string, { bg: string; text: string; border: string; ring: string }> = {
  sky: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30', ring: 'focus:border-sky-500' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', ring: 'focus:border-violet-500' },
  fuchsia: { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30', ring: 'focus:border-fuchsia-500' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', ring: 'focus:border-amber-500' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', ring: 'focus:border-emerald-500' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', ring: 'focus:border-rose-500' },
};

type SectionData = Record<string, Record<string, string | number | boolean>>;

interface FormState {
  name: string;
  description: string;
  crosshairShareCode: string;
  launchOptions: string;
  enabled: Record<string, boolean>;
  data: SectionData;
}

const EMPTY_FORM: FormState = {
  name: '',
  description: '',
  crosshairShareCode: '',
  launchOptions: '',
  enabled: {},
  data: {},
};

const DEFAULT_CONFIGS: GameConfig[] = [
  {
    id: 'cfg-1',
    name: 'Config 31/5/2026',
    description: 'Setup guardado para revisión rápida de parámetros y sensibilidad.',
    mouse: { dpi: 400, sensitivity: 1.75, pollingRate: 1000 },
    hud: { scaling: 0.85, showLoadout: true },
    createdAt: new Date('2026-05-31T10:00:00'),
  },
  {
    id: 'cfg-2',
    name: 'Config 28/5/2026',
    description: 'Comparación de ajustes para práctica y revisión de sensi.',
    radar: { radarScale: 1.15 },
    launchOptions: '-novid -tickrate 128',
    createdAt: new Date('2026-05-28T09:40:00'),
  },
];

function configToForm(config: GameConfig): FormState {
  const enabled: Record<string, boolean> = {};
  const data: SectionData = {};
  for (const section of SECTIONS) {
    const value = (config as any)[section.key];
    if (value && Object.keys(value).length > 0) {
      enabled[section.key] = true;
      data[section.key] = value;
    }
  }
  return {
    name: config.name,
    description: config.description ?? '',
    crosshairShareCode: config.crosshairShareCode ?? '',
    launchOptions: config.launchOptions ?? '',
    enabled,
    data,
  };
}

function formToConfig(form: FormState, id: string, createdAt: Date): GameConfig {
  const result: GameConfig = {
    id,
    name: form.name.trim(),
    description: form.description.trim() || undefined,
    crosshairShareCode: form.crosshairShareCode.trim() || undefined,
    launchOptions: form.launchOptions.trim() || undefined,
    createdAt,
  };
  for (const section of SECTIONS) {
    if (form.enabled[section.key]) {
      const raw = form.data[section.key] ?? {};
      const cleaned: Record<string, string | number | boolean> = {};
      for (const field of section.fields) {
        const v = raw[field.key];
        if (v === undefined || v === '' || v === null) continue;
        cleaned[field.key] = field.type === 'number' ? Number(v) : v;
      }
      if (Object.keys(cleaned).length > 0) {
        (result as any)[section.key] = cleaned;
      }
    }
  }
  return result;
}

export default function ConfigsPage() {
  const [configs, setConfigs] = useState<GameConfig[]>(DEFAULT_CONFIGS);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>('mouse');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('gameConfigs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as any[];
        if (parsed.length > 0) {
          setConfigs(parsed.map((c) => ({ ...c, createdAt: new Date(c.createdAt) })));
        }
      } catch (e) {
        console.error('Error al cargar configs:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gameConfigs', JSON.stringify(configs));
    }
  }, [configs, mounted]);

  const editingConfig = useMemo(
    () => configs.find((c) => c.id === editingId) ?? null,
    [configs, editingId]
  );

  const toggleSection = (key: string, value: boolean) => {
    setForm((prev) => ({ ...prev, enabled: { ...prev.enabled, [key]: value } }));
    if (value) setOpenSection(key);
  };

  const setFieldValue = (sectionKey: string, fieldKey: string, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [sectionKey]: { ...(prev.data[sectionKey] ?? {}), [fieldKey]: value },
      },
    }));
  };

  const activeSectionCount = SECTIONS.filter((s) => form.enabled[s.key]).length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) {
      alert('Por favor ingresa un nombre para la configuración.');
      return;
    }

    if (editingId) {
      setConfigs((prev) =>
        prev.map((c) => (c.id === editingId ? formToConfig(form, c.id, c.createdAt) : c))
      );
      setEditingId(null);
    } else {
      const config = formToConfig(form, Date.now().toString(), new Date());
      setConfigs((prev) => [config, ...prev]);
    }

    setForm(EMPTY_FORM);
  };

  const handleEdit = (config: GameConfig) => {
    setEditingId(config.id);
    setForm(configToForm(config));
    const firstActive = SECTIONS.find((s) => (config as any)[s.key]);
    setOpenSection(firstActive?.key ?? 'mouse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (id: string) => {
    setConfigs((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
    if (editingId === id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Configs</h1>
          <p className="text-zinc-400 max-w-2xl">
            Guardá tus setups con nombre y descripción. Activá solo las secciones que quieras
            cargar — mouse, video, viewmodel, HUD, radar — el resto queda afuera.
          </p>
        </div>

        {/* Banner de estado de edición — siempre visible, sin ambigüedad */}
        {editingId && (
          <div className="sticky top-4 z-10 flex items-center justify-between gap-4 rounded-2xl border border-orange-500/40 bg-orange-500/10 px-5 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                <Pencil className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-orange-300">
                  Editando «{editingConfig?.name ?? form.name}»
                </p>
                <p className="text-xs text-orange-300/70">Los cambios se guardan al tocar "Guardar cambios".</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 px-3 py-1.5 text-xs font-medium text-orange-300 transition hover:bg-orange-500/10"
            >
              <X className="h-3.5 w-3.5" />
              Cancelar edición
            </button>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          {/* ----------------------------- FORMULARIO ----------------------------- */}
          <section
            className={`rounded-[2rem] border bg-zinc-950 p-6 transition-colors ${
              editingId ? 'border-orange-500/40' : 'border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {editingId ? 'Editar configuración' : 'Nueva configuración'}
                </h2>
                <p className="text-sm text-zinc-400">
                  {activeSectionCount === 0
                    ? 'Elegí qué secciones querés cargar más abajo.'
                    : `${activeSectionCount} sección${activeSectionCount > 1 ? 'es' : ''} activa${activeSectionCount > 1 ? 's' : ''}.`}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white ${
                  editingId ? 'bg-orange-600' : 'bg-blue-600'
                }`}
              >
                {editingId ? 'Editando' : 'Mi setup'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Config 31/5/2026"
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Descripción</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="ej: Setup de práctica de A/B"
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Mira <span className="text-zinc-500">(opcional)</span>
                </label>
                <div className="relative">
                  <Crosshair className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={form.crosshairShareCode}
                    onChange={(e) => setForm({ ...form, crosshairShareCode: e.target.value })}
                    placeholder="Código de mira de la sección Miras (CSGO-...)"
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Secciones opcionales */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-300">Secciones a cargar</p>
                {SECTIONS.map((section) => {
                  const accent = ACCENT_CLASSES[section.accent];
                  const isEnabled = !!form.enabled[section.key];
                  const isOpen = openSection === section.key;
                  const Icon = section.icon;
                  return (
                    <div
                      key={section.key}
                      className={`rounded-2xl border transition-colors ${
                        isEnabled ? `${accent.border} bg-zinc-900/60` : 'border-zinc-800 bg-zinc-900/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <button
                          type="button"
                          onClick={() => isEnabled && setOpenSection(isOpen ? null : section.key)}
                          className="flex flex-1 items-center gap-3 text-left disabled:cursor-default"
                          disabled={!isEnabled}
                        >
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${isEnabled ? accent.bg : 'bg-zinc-800'}`}>
                            <Icon className={`h-4 w-4 ${isEnabled ? accent.text : 'text-zinc-500'}`} />
                          </span>
                          <span className={`text-sm font-medium ${isEnabled ? 'text-white' : 'text-zinc-500'}`}>
                            {section.label}
                          </span>
                          {isEnabled && (
                            <ChevronDown
                              className={`h-4 w-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          )}
                        </button>

                        <label className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={(e) => toggleSection(section.key, e.target.checked)}
                            className="peer sr-only"
                          />
                          <span className="absolute inset-0 rounded-full bg-zinc-700 transition peer-checked:bg-blue-600" />
                          <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                        </label>
                      </div>

                      {isEnabled && isOpen && (
                        <div className="grid gap-3 border-t border-zinc-800/80 px-4 py-4 sm:grid-cols-2">
                          {section.fields.map((field) => {
                            const value = form.data[section.key]?.[field.key] ?? '';
                            if (field.type === 'boolean') {
                              return (
                                <label
                                  key={field.key}
                                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5"
                                >
                                  <span className="text-sm text-zinc-300">{field.label}</span>
                                  <input
                                    type="checkbox"
                                    checked={!!value}
                                    onChange={(e) => setFieldValue(section.key, field.key, e.target.checked)}
                                    className={`h-4 w-4 rounded accent-current ${accent.text}`}
                                  />
                                </label>
                              );
                            }
                            if (field.type === 'select') {
                              return (
                                <div key={field.key}>
                                  <label className="block text-xs text-zinc-500 mb-1">{field.label}</label>
                                  <select
                                    value={String(value)}
                                    onChange={(e) => setFieldValue(section.key, field.key, e.target.value)}
                                    className={`w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:outline-none ${accent.ring}`}
                                  >
                                    <option value="">— Sin definir —</option>
                                    {field.options?.map((opt) => (
                                      <option key={opt} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              );
                            }
                            return (
                              <div key={field.key}>
                                <label className="block text-xs text-zinc-500 mb-1">
                                  {field.label}
                                  {field.unit ? ` (${field.unit})` : ''}
                                </label>
                                <input
                                  type={field.type === 'number' ? 'number' : 'text'}
                                  step="any"
                                  value={String(value)}
                                  onChange={(e) => setFieldValue(section.key, field.key, e.target.value)}
                                  placeholder={field.placeholder}
                                  className={`w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white focus:outline-none ${accent.ring}`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Opciones de lanzamiento <span className="text-zinc-500">(opcional)</span>
                </label>
                <div className="relative">
                  <Terminal className="absolute left-4 top-3.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={form.launchOptions}
                    onChange={(e) => setForm({ ...form, launchOptions: e.target.value })}
                    placeholder="-novid -tickrate 128 -allow_third_party_software"
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 pl-10 pr-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
                    editingId ? 'bg-orange-600 hover:bg-orange-500' : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  <Check className="h-4 w-4" />
                  {editingId ? 'Guardar cambios' : 'Guardar configuración'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-2xl border border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* ------------------------------- TIPS ------------------------------- */}
          <aside className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 h-fit">
            <h2 className="text-xl font-semibold text-white mb-4">Consejos</h2>
            <div className="space-y-4 text-sm text-zinc-300">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">Solo lo que necesitás</p>
                <p>Activá únicamente las secciones que quieras guardar. Si no activás "Radar", esa tarjeta directamente no aparece.</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">Nombres útiles</p>
                <p>Usá nombres como «Config 31/5/2026» o «Setup de práctica» para identificar rápido cada versión.</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">Editar</p>
                <p>Mientras editás una config, vas a ver un aviso naranja arriba con el nombre exacto que estás modificando.</p>
              </div>
            </div>
          </aside>
        </div>

        {/* ------------------------------ LISTADO ------------------------------ */}
        <section className="grid gap-6 lg:grid-cols-2">
          {configs.length === 0 && (
            <div className="lg:col-span-2 rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-950 p-10 text-center text-zinc-500">
              Todavía no guardaste ninguna configuración.
            </div>
          )}
          {configs.map((config) => {
            const isBeingEdited = editingId === config.id;
            const activeSections = SECTIONS.filter((s) => (config as any)[s.key]);
            return (
              <article
                key={config.id}
                className={`rounded-[2rem] border bg-zinc-950 p-6 transition ${
                  isBeingEdited ? 'border-orange-500/60 ring-1 ring-orange-500/20' : 'border-zinc-800'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                      {config.name}
                      {isBeingEdited && (
                        <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
                          Editando
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-zinc-400">{config.description || 'Sin descripción'}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-600/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">
                    Guardada
                  </span>
                </div>

                {config.crosshairShareCode && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400">
                    <Crosshair className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="font-mono truncate">{config.crosshairShareCode}</span>
                  </div>
                )}

                {activeSections.length === 0 && !config.launchOptions ? (
                  <p className="text-sm text-zinc-500 italic">Sin secciones de ajustes cargadas.</p>
                ) : (
                  <div className="space-y-3">
                    {activeSections.map((section) => {
                      const accent = ACCENT_CLASSES[section.accent];
                      const Icon = section.icon;
                      const values = (config as any)[section.key] as Record<string, any>;
                      return (
                        <div key={section.key} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
                          <div className="mb-2 flex items-center gap-2">
                            <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${accent.bg}`}>
                              <Icon className={`h-3.5 w-3.5 ${accent.text}`} />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                              {section.label}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                            {section.fields
                              .filter((f) => values[f.key] !== undefined && values[f.key] !== '')
                              .map((f) => (
                                <div key={f.key} className="flex items-center justify-between gap-2">
                                  <span className="text-zinc-500">{f.label}</span>
                                  <span className="text-white font-medium truncate">
                                    {typeof values[f.key] === 'boolean'
                                      ? values[f.key]
                                        ? 'Sí'
                                        : 'No'
                                      : `${values[f.key]}${f.unit ? ` ${f.unit}` : ''}`}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                    {config.launchOptions && (
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-700/40">
                            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Lanzamiento
                          </span>
                        </div>
                        <code className="block text-xs text-zinc-300 break-all">{config.launchOptions}</code>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Creado: {config.createdAt.toLocaleDateString()}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(config)}
                      className="flex items-center gap-1.5 rounded-xl border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </button>

                    {deleteConfirmId === config.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(config.id)}
                          className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded-xl border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(config.id)}
                        className="flex items-center gap-1.5 rounded-xl border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-red-800 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Borrar
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 lg:hidden"
        >
          <Plus className="h-4 w-4" />
          Nueva config
        </button>
      </div>
    </div>
  );
}
