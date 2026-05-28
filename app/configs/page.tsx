import { GameConfig } from '@/types';

const sampleConfigs: GameConfig[] = [
  {
    id: 'cfg-1',
    name: 'FPS competitivo',
    description: 'Ajustes limpios para jugar en servidores competitivos con sensibilidad estable.',
    settings: {
      resolution: '1920x1080',
      crosshair: 'classic',
      sensitivity: 1.85,
      rawInput: true,
      hudScale: 0.85,
    },
    createdAt: new Date('2026-05-20T11:10:00'),
  },
  {
    id: 'cfg-2',
    name: 'Economía / buy-rush',
    description: 'Configuración para analizar buy-rush, mensajería rápida y comunicación en rondas de eco.',
    settings: {
      radarScale: 1.15,
      quickSwitch: true,
      teamVoice: 'allies',
      micVolume: 85,
    },
    createdAt: new Date('2026-05-21T09:40:00'),
  },
];

export default function ConfigsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Configuraciones</h1>
          <p className="text-zinc-400 max-w-2xl">
            Guarda y compara tus mejores setups de juego para CS2: sensi, HUD, radar y comunicaciones.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {sampleConfigs.map((config) => (
            <section key={config.id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{config.name}</h2>
                  <p className="text-sm text-zinc-400">{config.description}</p>
                </div>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">Guardado</span>
              </div>
              <div className="grid gap-3 text-sm text-zinc-300">
                {Object.entries(config.settings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-2xl bg-zinc-900 p-3">
                    <span className="text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-white">{String(value)}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
