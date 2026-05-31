'use client';

import { useEffect, useState } from 'react';
import { GameConfig } from '@/types';

const DEFAULT_CONFIGS: GameConfig[] = [
  {
    id: 'cfg-1',
    name: 'Config 31/5/2026',
    description: 'Setup guardado para revisión rápida de parámetros y sensibilidad.',
    settings: {
      crosshair: 'classic',
      sensitivity: 1.75,
      rawInput: true,
      hudScale: 0.85,
    },
    createdAt: new Date('2026-05-31T10:00:00'),
  },
  {
    id: 'cfg-2',
    name: 'Config 28/5/2026',
    description: 'Comparación de ajustes para práctica y revisión de sensi.',
    settings: {
      radarScale: 1.15,
      quickSwitch: true,
      micVolume: 85,
    },
    createdAt: new Date('2026-05-28T09:40:00'),
  },
];

function getInitialConfigs(): GameConfig[] {
  if (typeof window === 'undefined') return DEFAULT_CONFIGS;
  const saved = localStorage.getItem('gameConfigs');
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as any[];
      if (parsed.length === 0) return DEFAULT_CONFIGS;
      return parsed.map((config) => ({
        ...config,
        createdAt: new Date(config.createdAt),
      }));
    } catch (e) {
      console.error('Error al cargar configs:', e);
      return DEFAULT_CONFIGS;
    }
  }
  return DEFAULT_CONFIGS;
}

export default function ConfigsPage() {
  const [configs, setConfigs] = useState<GameConfig[]>(getInitialConfigs());
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    settings: JSON.stringify(
      {
        crosshair: 'classic',
        sensitivity: 1.8,
        hudScale: 0.9,
      },
      null,
      2
    ),
  });

  useEffect(() => {
    localStorage.setItem('gameConfigs', JSON.stringify(configs));
  }, [configs]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor ingresa un nombre para la configuración.');
      return;
    }

    let parsedSettings: Record<string, string | number | boolean> = {};
    try {
      parsedSettings = JSON.parse(formData.settings);
    } catch (e) {
      alert('El JSON de ajustes no es válido. Revísalo antes de guardar.');
      return;
    }

    const config: GameConfig = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      settings: parsedSettings,
      createdAt: new Date(),
    };

    setConfigs([config, ...configs]);
    setFormData({
      name: '',
      description: '',
      settings: JSON.stringify({ crosshair: 'classic', sensitivity: 1.8, hudScale: 0.9 }, null, 2),
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Configs</h1>
          <p className="text-zinc-400 max-w-2xl">
            Crea y guarda configuraciones con nombre, descripción y ajustes. Así podés volver a ver qué usabas en cada sesión.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Nueva configuración</h2>
                <p className="text-sm text-zinc-400">Guardá una configuración con nombre y descripción clara.</p>
              </div>
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">Mi setup</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Config 31/5/2026"
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Descripción</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="ej: Ajustes usados en práctica de A/B"
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Ajustes (JSON)</label>
                <textarea
                  value={formData.settings}
                  onChange={(e) => setFormData({ ...formData, settings: e.target.value })}
                  rows={10}
                  className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Guardar configuración
              </button>
            </form>
          </section>

          <aside className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Consejos</h2>
            <div className="space-y-4 text-sm text-zinc-300">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">Nombres útiles</p>
                <p>Usá nombres como «Config 31/5/2026» o «Practice setup» para recordar más rápido qué estabas usando.</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">Descripción</p>
                <p>La descripción te ayuda a saber si era un setup de entrada, de duelos o de revisión.</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">Ajustes</p>
                <p>Guardá valores clave como crosshair, sensibilidad y HUD para volver a comparar.</p>
              </div>
            </div>
          </aside>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          {configs.map((config) => (
            <article key={config.id} className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{config.name}</h2>
                  <p className="text-sm text-zinc-400">{config.description || 'Sin descripción'}</p>
                </div>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">
                  Guardada
                </span>
              </div>
              <div className="grid gap-3 text-sm text-zinc-300">
                {Object.entries(config.settings).map(([key, value]) => (
                  <div key={key} className="rounded-2xl bg-zinc-900 p-3 border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-400">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-xs text-zinc-500">Creado: {config.createdAt.toLocaleDateString()}</div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
