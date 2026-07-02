'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Mouse, Monitor, SlidersHorizontal, Eye, LayoutPanelTop,
  Radar as RadarIcon, Plus,
} from 'lucide-react';
import { GameConfig } from '@/types';
import { ConfigForm, ConfigCard, ConfigSection } from '@/components/configs';
import type { SectionDefProps, FieldDef } from '@/components/configs/ConfigSection';
import type { FormState } from '@/components/configs/ConfigForm';

type FieldType = 'number' | 'text' | 'select' | 'boolean';

interface SectionDef extends SectionDefProps {}

const SECTIONS: SectionDef[] = [
  {
    key: 'mouse' as const, label: 'Mouse', icon: Mouse, accent: 'sky',
    fields: [
      { key: 'dpi', label: 'DPI', type: 'number', placeholder: '400' },
      { key: 'sensitivity', label: 'Sensibilidad', type: 'number', placeholder: '2' },
      { key: 'zoomSensitivityRatio', label: 'Multiplicador de zoom', type: 'number', placeholder: '1' },
      { key: 'm_yaw', label: 'Yaw (lado)', type: 'number', placeholder: '0.022', unit: 'base' },
      { key: 'pollingRate', label: 'Tasa de sondeo', type: 'number', unit: 'Hz', placeholder: '1000' },
    ],
  },
  {
    key: 'video' as const, label: 'Video', icon: Monitor, accent: 'violet',
    fields: [
      { key: 'brightness', label: 'Brillo', type: 'number', unit: '%', placeholder: '75' },
      { key: 'scalingMode', label: 'Modo de escala', type: 'select', options: ['Estirado', 'Normal', 'Mantener relación de aspecto'] },
      { key: 'aspectRatio', label: 'Relación de aspecto', type: 'select', options: ['4:3', '5:4', '16:9', '16:10'] },
      { key: 'resolution', label: 'Resolución', type: 'text', placeholder: '1280x960' },
      { key: 'displayMode', label: 'Modo de presentación', type: 'select', options: ['Pantalla completa', 'Ventana', 'Ventana sin bordes'] },
    ],
  },
  {
    key: 'advancedVideo' as const, label: 'Video avanzado', icon: SlidersHorizontal, accent: 'fuchsia',
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
    key: 'viewmodel' as const, label: 'Viewmodel', icon: Eye, accent: 'amber',
    fields: [
      { key: 'fov', label: 'FOV', type: 'number', placeholder: '68' },
      { key: 'offsetX', label: 'Offset X', type: 'number', placeholder: '2.5' },
      { key: 'offsetY', label: 'Offset Y', type: 'number', placeholder: '0' },
      { key: 'offsetZ', label: 'Offset Z', type: 'number', placeholder: '-1.5' },
    ],
  },
  {
    key: 'hud' as const, label: 'HUD', icon: LayoutPanelTop, accent: 'emerald',
    fields: [
      { key: 'scaling', label: 'Escala del HUD', type: 'number', placeholder: '1' },
      { key: 'showLoadout', label: 'Mostrar loadout', type: 'boolean' },
      { key: 'safezoneX', label: 'Safezone X', type: 'number', placeholder: '1' },
      { key: 'safezoneY', label: 'Safezone Y', type: 'number', placeholder: '1' },
      { key: 'hudColor', label: 'Color del HUD', type: 'number', placeholder: '11' },
    ],
  },
  {
    key: 'radar' as const, label: 'Radar', icon: RadarIcon, accent: 'rose',
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
    if (m.m_yaw !== undefined) lines.push(`m_yaw ${m.m_yaw}`);
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
  width: '100%', background: '#111111', border: '1px solid #2a2a2a',
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
    <div className="flex-1 overflow-y-auto" style={{ background: '#0a0a0a' }}>
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
          <ConfigForm
            form={form}
            sections={SECTIONS}
            accentClasses={ACCENT_CLASSES}
            editingId={editingId}
            editingConfig={editingConfig}
            openSection={openSection}
            onFormChange={(updates) =>
              setForm((prev) => ({ ...prev, ...updates }))
            }
            onToggleSection={toggleSection}
            onSetOpenSection={setOpenSection}
            onFieldChange={setFieldValue}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
          />

          {/* TIPS */}
          <aside className="rounded-xl p-5 h-fit" style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}>
            <h2 className="text-base font-semibold mb-4" style={{ color: '#ffffff' }}>Consejos</h2>
            <div className="space-y-3 text-sm">
              {[
                { title: 'Solo lo que necesitás', body: 'Activá únicamente las secciones que quieras guardar. Si no activás "Radar", esa tarjeta directamente no aparece.' },
                { title: 'Nombres útiles', body: 'Usá nombres como «Config 31/5/2026» o «Setup de práctica» para identificar rápido cada versión.' },
                { title: 'Descargar .cfg', body: 'Cada config guardada tiene un botón para descargar el archivo .cfg listo para importar en CS2.' },
              ].map(tip => (
                <div key={tip.title} className="rounded-lg p-3" style={{ background: '#111111', border: '1px solid #1a1a1a' }}>
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
            <div
              className="lg:col-span-2 rounded-xl py-14 text-center"
              style={{ border: '1px dashed #2a2a2a', background: '#0d0d0d' }}
            >
              <p style={{ color: '#333333' }}>
                Todavía no guardaste ninguna configuración.
              </p>
            </div>
          )}
          {configs.map((config) => (
            <ConfigCard
              key={config.id}
              config={config}
              sections={SECTIONS}
              accentClasses={ACCENT_CLASSES}
              isBeingEdited={editingId === config.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownloadCfg={downloadCfg}
              deleteConfirmId={deleteConfirmId}
              onSetDeleteConfirm={setDeleteConfirmId}
            />
          ))}
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