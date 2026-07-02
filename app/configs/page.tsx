'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Mouse, Monitor, SlidersHorizontal, Eye, LayoutPanelTop,
  Radar as RadarIcon, Terminal, Crosshair, Pencil, Trash2,
  X, Plus, ChevronDown, Check, Download,
} from 'lucide-react';
import { GameConfig } from '@/types';

type FieldType = 'number' | 'text' | 'select' | 'boolean';
interface FieldDef {
  key: string; label: string; type: FieldType;
  unit?: string; options?: string[]; placeholder?: string;
}
interface SectionDef {
  key: keyof Pick<GameConfig, 'mouse' | 'video' | 'advancedVideo' | 'viewmodel' | 'hud' | 'radar'>;
  label: string; icon: React.ComponentType<{ className?: string }>;
  accent: string; fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    key: 'mouse', label: 'Mouse', icon: Mouse, accent: 'sky',
    fields: [
      { key: 'dpi', label: 'DPI', type: 'number', placeholder: '400' },
      { key: 'sensitivity', label: 'Sensibilidad', type: 'number', placeholder: '2' },
      { key: 'zoomSensitivityRatio', label: 'Multiplicador de zoom', type: 'number', placeholder: '1' },
      { key: 'pollingRate', label: 'Tasa de sondeo', type: 'number', unit: 'Hz', placeholder: '1000' },
    ],
  },
  {
    key: 'video', label: 'Video', icon: Monitor, accent: 'violet',
    fields: [
      { key: 'brightness', label: 'Brillo', type: 'number', unit: '%', placeholder: '75' },
      { key: 'scalingMode', label: 'Modo de escala', type: 'select', options: ['Estirado', 'Normal', 'Mantener relación de aspecto'] },
      { key: 'aspectRatio', label: 'Relación de aspecto', type: 'select', options: ['4:3', '5:4', '16:9', '16:10'] },
      { key: 'resolution', label: 'Resolución', type: 'text', placeholder: '1280x960' },
      { key: 'displayMode', label: 'Modo de presentación', type: 'select', options: ['Pantalla completa', 'Ventana', 'Ventana sin bordes'] },
    ],
  },
  {
    key: 'advancedVideo', label: 'Video avanzado', icon: SlidersHorizontal, accent: 'fuchsia',
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
    key: 'viewmodel', label: 'Viewmodel', icon: Eye, accent: 'amber',
    fields: [
      { key: 'fov', label: 'FOV', type: 'number', placeholder: '68' },
      { key: 'offsetX', label: 'Offset X', type: 'number', placeholder: '2.5' },
      { key: 'offsetY', label: 'Offset Y', type: 'number', placeholder: '0' },
      { key: 'offsetZ', label: 'Offset Z', type: 'number', placeholder: '-1.5' },
    ],
  },
  {
    key: 'hud', label: 'HUD', icon: LayoutPanelTop, accent: 'emerald',
    fields: [
      { key: 'scaling', label: 'Escala del HUD', type: 'number', placeholder: '1' },
      { key: 'showLoadout', label: 'Mostrar loadout', type: 'boolean' },
      { key: 'safezoneX', label: 'Safezone X', type: 'number', placeholder: '1' },
      { key: 'safezoneY', label: 'Safezone Y', type: 'number', placeholder: '1' },
      { key: 'hudColor', label: 'Color del HUD', type: 'number', placeholder: '11' },
    ],
  },
  {
    key: 'radar', label: 'Radar', icon: RadarIcon, accent: 'rose',
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
  sky:     { bg: 'bg-sky-500/10',     text: 'text-sky-400',     border: 'border-sky-500/30',     ring: 'focus:border-sky-500' },
  violet:  { bg: 'bg-violet-500/10',  text: 'text-violet-400',  border: 'border-violet-500/30',  ring: 'focus:border-violet-500' },
  fuchsia: { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30', ring: 'focus:border-fuchsia-500' },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/30',   ring: 'focus:border-amber-500' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', ring: 'focus:border-emerald-500' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/30',    ring: 'focus:border-rose-500' },
};

type SectionData = Record<string, Record<string, string | number | boolean>>;
interface FormState {
  name: string; description: string; crosshairShareCode: string;
  launchOptions: string; enabled: Record<string, boolean>; data: SectionData;
}
const EMPTY_FORM: FormState = { name: '', description: '', crosshairShareCode: '', launchOptions: '', enabled: {}, data: {} };

const DEFAULT_CONFIGS: GameConfig[] = [
  {
    id: 'cfg-1', name: 'Config 31/5/2026',
    description: 'Setup guardado para revisión rápida de parámetros y sensibilidad.',
    mouse: { dpi: 400, sensitivity: 1.75, pollingRate: 1000 },
    hud: { scaling: 0.85, showLoadout: true },
    createdAt: new Date('2026-05-31T10:00:00'),
  },
  {
    id: 'cfg-2', name: 'Config 28/5/2026',
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
    name: config.name, description: config.description ?? '',
    crosshairShareCode: config.crosshairShareCode ?? '',
    launchOptions: config.launchOptions ?? '', enabled, data,
  };
}

function formToConfig(form: FormState, id: string, createdAt: Date): GameConfig {
  const result: GameConfig = {
    id, name: form.name.trim(),
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
      if (Object.keys(cleaned).length > 0) (result as any)[section.key] = cleaned;
    }
  }
  return result;
}

// ─── .cfg generator ──────────────────────────────────────────────────────────
function generateCfg(config: GameConfig): string {
  const lines: string[] = [
    `// CS2 Hub - ${config.name}`,
    `// Generado el ${config.createdAt.toLocaleDateString()}`,
    '',
  ];
  const m = (config as any).mouse;
  if (m) {
    lines.push('// Mouse');
    if (m.sensitivity !== undefined) lines.push(`sensitivity ${m.sensitivity}`);
    lines.push('m_rawinput 1');
    if (m.dpi !== undefined) lines.push(`// DPI: ${m.dpi}`);
    if (m.pollingRate !== undefined) lines.push(`// Polling rate: ${m.pollingRate}Hz`);
    lines.push('');
  }
  const v = (config as any).video;
  if (v) {
    lines.push('// Video');
    if (v.brightness !== undefined) lines.push(`mat_monitorgamma ${(2.2 - (v.brightness / 100) * 0.6).toFixed(2)}`);
    if (v.resolution !== undefined) lines.push(`// Resolución: ${v.resolution}`);
    if (v.aspectRatio !== undefined) lines.push(`// Relación de aspecto: ${v.aspectRatio}`);
    if (v.scalingMode !== undefined) lines.push(`// Modo de escala: ${v.scalingMode}`);
    if (v.displayMode !== undefined) lines.push(`// Modo: ${v.displayMode}`);
    lines.push('');
  }
  const vm = (config as any).viewmodel;
  if (vm) {
    lines.push('// Viewmodel');
    if (vm.fov !== undefined) lines.push(`viewmodel_fov ${vm.fov}`);
    if (vm.offsetX !== undefined) lines.push(`viewmodel_offset_x ${vm.offsetX}`);
    if (vm.offsetY !== undefined) lines.push(`viewmodel_offset_y ${vm.offsetY}`);
    if (vm.offsetZ !== undefined) lines.push(`viewmodel_offset_z ${vm.offsetZ}`);
    lines.push('');
  }
  const h = (config as any).hud;
  if (h) {
    lines.push('// HUD');
    if (h.scaling !== undefined) lines.push(`cl_hud_scaling ${h.scaling}`);
    if (h.hudColor !== undefined) lines.push(`cl_hud_color ${h.hudColor}`);
    if (h.safezoneX !== undefined) lines.push(`safezonex ${h.safezoneX}`);
    if (h.safezoneY !== undefined) lines.push(`safezoney ${h.safezoneY}`);
    lines.push('');
  }
  const r = (config as any).radar;
  if (r) {
    lines.push('// Radar');
    if (r.hudRadarScale !== undefined) lines.push(`cl_hud_radar_scale ${r.hudRadarScale}`);
    if (r.radarScale !== undefined) lines.push(`cl_radar_scale ${r.radarScale}`);
    if (r.alwaysCentered !== undefined) lines.push(`cl_radar_always_centered ${r.alwaysCentered ? 1 : 0}`);
    if (r.rotate !== undefined) lines.push(`cl_radar_rotate ${r.rotate ? 1 : 0}`);
    if (r.iconScaleMin !== undefined) lines.push(`cl_radar_icon_scale_min ${r.iconScaleMin}`);
    lines.push('');
  }
  if (config.launchOptions) {
    lines.push('// Launch options');
    lines.push(`// ${config.launchOptions}`);
  }
  return lines.join('\n');
}

function downloadCfg(config: GameConfig) {
  const content = generateCfg(config);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.cfg';
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Shared input style ───────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
  borderRadius: 12, color: '#ffffff', padding: '10px 14px',
  fontSize: 14, outline: 'none', boxSizing: 'border-box',
};

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
        if (parsed.length > 0)
          setConfigs(parsed.map((c) => ({ ...c, createdAt: new Date(c.createdAt) })));
      } catch (e) { console.error('Error al cargar configs:', e); }
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('gameConfigs', JSON.stringify(configs));
  }, [configs, mounted]);

  const editingConfig = useMemo(() => configs.find((c) => c.id === editingId) ?? null, [configs, editingId]);

  const toggleSection = (key: string, value: boolean) => {
    setForm((prev) => ({ ...prev, enabled: { ...prev.enabled, [key]: value } }));
    if (value) setOpenSection(key);
  };

  const setFieldValue = (sectionKey: string, fieldKey: string, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      data: { ...prev.data, [sectionKey]: { ...(prev.data[sectionKey] ?? {}), [fieldKey]: value } },
    }));
  };

  const activeSectionCount = SECTIONS.filter((s) => form.enabled[s.key]).length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) { alert('Por favor ingresa un nombre para la configuración.'); return; }
    if (editingId) {
      setConfigs((prev) => prev.map((c) => (c.id === editingId ? formToConfig(form, c.id, c.createdAt) : c)));
      setEditingId(null);
    } else {
      setConfigs((prev) => [formToConfig(form, Date.now().toString(), new Date()), ...prev]);
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

  const handleCancelEdit = () => { setEditingId(null); setForm(EMPTY_FORM); };

  const handleDelete = (id: string) => {
    setConfigs((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
    if (editingId === id) { setEditingId(null); setForm(EMPTY_FORM); }
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">

        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#ffffff' }}>Configs</h1>
          <p className="text-sm max-w-2xl" style={{ color: '#444444' }}>
            Guardá tus setups con nombre y descripción. Activá solo las secciones que quieras — mouse, video, viewmodel, HUD, radar.
          </p>
        </div>

        {/* Banner edición */}
        {editingId && (
          <div className="sticky top-4 z-10 flex items-center justify-between gap-4 rounded-xl px-5 py-3"
            style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)' }}>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c' }}>
                <Pencil className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#fb923c' }}>
                  Editando «{editingConfig?.name ?? form.name}»
                </p>
                <p className="text-xs" style={{ color: 'rgba(251,146,60,0.7)' }}>Los cambios se guardan al tocar "Guardar cambios".</p>
              </div>
            </div>
            <button type="button" onClick={handleCancelEdit}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
              style={{ border: '1px solid rgba(249,115,22,0.3)', color: '#fb923c', background: 'none', cursor: 'pointer' }}>
              <X className="h-3.5 w-3.5" /> Cancelar edición
            </button>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          {/* FORMULARIO */}
          <section className="rounded-xl p-6 bg-[var(--color-bg-card)] border shadow-[var(--shadow-sm)]"
            style={{ borderColor: editingId ? 'rgba(249,115,22,0.4)' : 'var(--color-border-subtle)' }}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-0.5" style={{ color: '#ffffff' }}>
                  {editingId ? 'Editar configuración' : 'Nueva configuración'}
                </h2>
                <p className="text-xs" style={{ color: '#444444' }}>
                  {activeSectionCount === 0 ? 'Elegí qué secciones querés cargar más abajo.'
                    : `${activeSectionCount} sección${activeSectionCount > 1 ? 'es' : ''} activa${activeSectionCount > 1 ? 's' : ''}.`}
                </p>
              </div>
              <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                style={{ background: editingId ? '#ea580c' : '#ff5500' }}>
                {editingId ? 'Editando' : 'Mi setup'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#444444' }}>Nombre</label>
                  <input type="text" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Config 31/5/2026" style={inputBase}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#444444' }}>Descripción</label>
                  <input type="text" value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="ej: Setup de práctica" style={inputBase}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#444444' }}>
                  Mira <span style={{ color: '#2a2a2a', textTransform: 'none', letterSpacing: 0 }}>— opcional</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Crosshair className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#333333' }} />
                  <input type="text" value={form.crosshairShareCode}
                    onChange={(e) => setForm({ ...form, crosshairShareCode: e.target.value })}
                    placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                    style={{ ...inputBase, paddingLeft: 40 }}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
              </div>

              {/* Secciones */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#444444' }}>Secciones a cargar</p>
                {SECTIONS.map((section) => {
                  const accent = ACCENT_CLASSES[section.accent];
                  const isEnabled = !!form.enabled[section.key];
                  const isOpen = openSection === section.key;
                  const Icon = section.icon;
                  return (
                    <div key={section.key} className="rounded-xl overflow-hidden transition-all"
                      style={{ border: `1px solid ${isEnabled ? '#2a2a2a' : '#1a1a1a'}`, background: isEnabled ? '#111111' : '#0a0a0a' }}>
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <button type="button" disabled={!isEnabled}
                          onClick={() => isEnabled && setOpenSection(isOpen ? null : section.key)}
                          className="flex flex-1 items-center gap-3 text-left"
                          style={{ background: 'none', border: 'none', cursor: isEnabled ? 'pointer' : 'default', padding: 0 }}>
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isEnabled ? accent.bg : ''}`}
                            style={!isEnabled ? { background: 'var(--bg-card)' } : {}}>
                            <Icon className={`h-4 w-4 ${isEnabled ? accent.text : 'text-[#333333]'}`} />
                          </span>
                          <span className="text-sm font-medium" style={{ color: isEnabled ? '#ffffff' : '#444444' }}>
                            {section.label}
                          </span>
                          {isEnabled && (
                            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                              style={{ color: '#444444' }} />
                          )}
                        </button>
                        {/* Toggle */}
                        <label className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center">
                          <input type="checkbox" checked={isEnabled}
                            onChange={(e) => toggleSection(section.key, e.target.checked)}
                            className="peer sr-only" />
                          <span className="absolute inset-0 rounded-full transition"
                            style={{ background: isEnabled ? '#ff5500' : '#2a2a2a' }} />
                          <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white transition"
                            style={{ transform: isEnabled ? 'translateX(20px)' : 'translateX(0)' }} />
                        </label>
                      </div>

                      {isEnabled && isOpen && (
                        <div className="grid gap-3 px-4 py-4 sm:grid-cols-2"
                          style={{ borderTop: '1px solid #1a1a1a' }}>
                          {section.fields.map((field) => {
                            const value = form.data[section.key]?.[field.key] ?? '';
                            if (field.type === 'boolean') {
                              return (
                                <label key={field.key}
                                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5"
                                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                                  <span className="text-sm" style={{ color: '#aaaaaa' }}>{field.label}</span>
                                  <input type="checkbox" checked={!!value}
                                    onChange={(e) => setFieldValue(section.key, field.key, e.target.checked)}
                                    className="h-4 w-4 rounded" style={{ accentColor: '#ff5500' }} />
                                </label>
                              );
                            }
                            if (field.type === 'select') {
                              return (
                                <div key={field.key}>
                                  <label className="block text-xs mb-1" style={{ color: '#444444' }}>{field.label}</label>
                                  <select value={String(value)}
                                    onChange={(e) => setFieldValue(section.key, field.key, e.target.value)}
                                    className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none ${accent.ring}`}
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}>
                                    <option value="">— Sin definir —</option>
                                    {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                  </select>
                                </div>
                              );
                            }
                            return (
                              <div key={field.key}>
                                <label className="block text-xs mb-1" style={{ color: '#444444' }}>
                                  {field.label}{field.unit ? ` (${field.unit})` : ''}
                                </label>
                                <input type={field.type === 'number' ? 'number' : 'text'} step="any"
                                  value={String(value)}
                                  onChange={(e) => setFieldValue(section.key, field.key, e.target.value)}
                                  placeholder={field.placeholder}
                                  className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none ${accent.ring}`}
                                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: '#ffffff' }} />
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
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#444444' }}>
                  Opciones de lanzamiento <span style={{ color: '#2a2a2a', textTransform: 'none', letterSpacing: 0 }}>— opcional</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Terminal className="absolute left-4 top-3.5 h-4 w-4 text-[#333333]" />
                  <input type="text" value={form.launchOptions}
                    onChange={(e) => setForm({ ...form, launchOptions: e.target.value })}
                    placeholder="-novid -tickrate 128 -allow_third_party_software"
                    style={{ ...inputBase, paddingLeft: 40, fontFamily: 'monospace' }}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')} />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition"
                  style={{ background: editingId ? '#ea580c' : '#ff5500', border: 'none', cursor: 'pointer' }}>
                  <Check className="h-4 w-4" />
                  {editingId ? 'Guardar cambios' : 'Guardar configuración'}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit}
                    className="rounded-xl px-4 py-3 text-sm font-semibold transition"
                    style={{ border: '1px solid #2a2a2a', color: '#aaaaaa', background: 'none', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* TIPS */}
          <aside className="rounded-xl p-5 h-fit bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]">
            <h2 className="text-base font-semibold mb-4" style={{ color: '#ffffff' }}>Consejos</h2>
            <div className="space-y-3 text-sm">
              {[
                { title: 'Solo lo que necesitás', body: 'Activá únicamente las secciones que quieras guardar. Si no activás "Radar", esa tarjeta directamente no aparece.' },
                { title: 'Nombres útiles', body: 'Usá nombres como «Config 31/5/2026» o «Setup de práctica» para identificar rápido cada versión.' },
                { title: 'Descargar .cfg', body: 'Cada config guardada tiene un botón para descargar el archivo .cfg listo para importar en CS2.' },
              ].map(tip => (
                <div key={tip.title} className="rounded-lg p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#ff5500', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tip.title}</p>
                  <p style={{ color: '#555555', fontSize: 12, lineHeight: 1.6 }}>{tip.body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* LISTADO */}
        <section className="grid gap-4 lg:grid-cols-2">
          {configs.length === 0 && (
            <div className="lg:col-span-2 rounded-xl py-14 text-center border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]">
              <p style={{ color: '#333333' }}>Todavía no guardaste ninguna configuración.</p>
            </div>
          )}
          {configs.map((config) => {
            const isBeingEdited = editingId === config.id;
            const activeSections = SECTIONS.filter((s) => (config as any)[s.key]);
            return (
              <article key={config.id} className="rounded-xl p-5 transition bg-[var(--color-bg-card)] border shadow-[var(--shadow-sm)]"
                style={{
                  borderColor: isBeingEdited ? 'rgba(249,115,22,0.5)' : 'var(--color-border-subtle)',
                }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: '#ffffff' }}>
                      {config.name}
                      {isBeingEdited && (
                        <span className="rounded-full px-2 py-0.5 text-xs font-semibold"
                          style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c' }}>
                          Editando
                        </span>
                      )}
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: '#444444' }}>{config.description || 'Sin descripción'}</p>
                  </div>
                  <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: '#ff5500' }}>
                    Guardada
                  </span>
                </div>

                {config.crosshairShareCode && (
                  <div className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#555555' }}>
                    <Crosshair className="h-3.5 w-3.5" style={{ color: '#333333' }} />
                    <span className="font-mono truncate" style={{ color: '#ff5500' }}>{config.crosshairShareCode}</span>
                  </div>
                )}

                {activeSections.length === 0 && !config.launchOptions ? (
                  <p className="text-sm italic" style={{ color: '#333333' }}>Sin secciones de ajustes cargadas.</p>
                ) : (
                  <div className="space-y-2">
                    {activeSections.map((section) => {
                      const accent = ACCENT_CLASSES[section.accent];
                      const Icon = section.icon;
                      const values = (config as any)[section.key] as Record<string, any>;
                      return (
                        <div key={section.key} className="rounded-lg p-3"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                          <div className="mb-2 flex items-center gap-2">
                            <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${accent.bg}`}>
                              <Icon className={`h-3.5 w-3.5 ${accent.text}`} />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#444444' }}>
                              {section.label}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                            {section.fields
                              .filter((f) => values[f.key] !== undefined && values[f.key] !== '')
                              .map((f) => (
                                <div key={f.key} className="flex items-center justify-between gap-2">
                                  <span style={{ color: '#444444' }}>{f.label}</span>
                                  <span className="font-medium truncate" style={{ color: '#ffffff' }}>
                                    {typeof values[f.key] === 'boolean' ? (values[f.key] ? 'Sí' : 'No')
                                      : `${values[f.key]}${f.unit ? ` ${f.unit}` : ''}`}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                    {config.launchOptions && (
                      <div className="rounded-lg p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                        <div className="mb-1 flex items-center gap-2">
                          <Terminal className="h-3.5 w-3.5" style={{ color: '#333333' }} />
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#444444' }}>Lanzamiento</span>
                        </div>
                        <code className="text-xs break-all" style={{ color: '#aaaaaa' }}>{config.launchOptions}</code>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid #1a1a1a' }}>
                  <span className="text-xs" style={{ color: '#333333' }}>
                    {config.createdAt.toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    {/* Descargar .cfg */}
                    <button onClick={() => downloadCfg(config)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
                      style={{ background: 'rgba(255,85,0,0.08)', border: '1px solid #ff5500', color: '#ff5500', cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,85,0,0.15)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,85,0,0.08)')}>
                      <Download className="h-3.5 w-3.5" /> .cfg
                    </button>
                    <button onClick={() => handleEdit(config)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
                      style={{ border: '1px solid #2a2a2a', color: '#aaaaaa', background: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#444'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.color = '#aaaaaa'; }}>
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </button>
                    {deleteConfirmId === config.id ? (
                      <div className="flex gap-1.5">
                        <button onClick={() => handleDelete(config.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-white"
                          style={{ background: '#ef4444', border: 'none', cursor: 'pointer' }}>
                          Confirmar
                        </button>
                        <button onClick={() => setDeleteConfirmId(null)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium"
                          style={{ border: '1px solid #2a2a2a', color: '#aaaaaa', background: 'none', cursor: 'pointer' }}>
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirmId(config.id)}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition"
                        style={{ border: '1px solid #1e1e1e', color: '#333333', background: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#7f1d1d'; (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e'; (e.currentTarget as HTMLElement).style.color = '#333333'; }}>
                        <Trash2 className="h-3.5 w-3.5" /> Borrar
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg lg:hidden"
          style={{ background: '#ff5500', border: 'none', cursor: 'pointer' }}>
          <Plus className="h-4 w-4" /> Nueva config
        </button>
      </div>
    </div>
  );
}