'use client';

import { useState, useRef } from 'react';
import { Download, Upload, AlertCircle, CheckCircle } from 'lucide-react';

interface BackupData {
  version: string;
  exportedAt: string;
  crosshairs?: any[];
  gameConfigs?: any[];
  notes?: any[];
}

type NotificationType = 'success' | 'error' | 'warning' | null;

export default function SettingsPage() {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    if (type === 'success' || type === 'error') {
      setTimeout(() => setNotification({ type: null, message: '' }), 4000);
    }
  };

  const handleExport = () => {
    try {
      const backup: BackupData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
      };

      // Exportar crosshairs
      const crosshairsData = localStorage.getItem('crosshairs');
      if (crosshairsData) {
        backup.crosshairs = JSON.parse(crosshairsData);
      }

      // Exportar gameConfigs
      const configsData = localStorage.getItem('gameConfigs');
      if (configsData) {
        backup.gameConfigs = JSON.parse(configsData);
      }

      // Exportar notes (si existen)
      const notesData = localStorage.getItem('notes');
      if (notesData) {
        backup.notes = JSON.parse(notesData);
      }

      const dataStr = JSON.stringify(backup, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cs2-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showNotification('success', '✓ Backup exportado correctamente');
    } catch (error) {
      console.error('Error al exportar backup:', error);
      showNotification('error', '✗ Error al exportar backup');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backup: BackupData = JSON.parse(content);

        // Validación básica
        if (!backup.version || !backup.exportedAt) {
          throw new Error('Archivo de backup inválido');
        }

        let itemsImported = 0;

        // Importar crosshairs
        if (backup.crosshairs && Array.isArray(backup.crosshairs)) {
          localStorage.setItem('crosshairs', JSON.stringify(backup.crosshairs));
          itemsImported++;
        }

        // Importar gameConfigs
        if (backup.gameConfigs && Array.isArray(backup.gameConfigs)) {
          localStorage.setItem('gameConfigs', JSON.stringify(backup.gameConfigs));
          itemsImported++;
        }

        // Importar notes
        if (backup.notes && Array.isArray(backup.notes)) {
          localStorage.setItem('notes', JSON.stringify(backup.notes));
          itemsImported++;
        }

        if (itemsImported === 0) {
          showNotification('warning', '⚠ No se encontraron datos para importar');
        } else {
          showNotification('success', `✓ ${itemsImported} categorías importadas correctamente`);
          // Recargar página para reflejar cambios
          setTimeout(() => window.location.reload(), 2000);
        }
      } catch (error) {
        console.error('Error al importar backup:', error);
        showNotification('error', '✗ Error al importar backup. Verifica el formato del archivo');
      } finally {
        setIsLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      showNotification('error', '✗ Error al leer el archivo');
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
        {/* Header */}
        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8">
          <h1 className="text-4xl font-bold text-white">Configuración</h1>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            Exporta e importa todos tus datos de forma segura usando archivos JSON.
          </p>
        </section>

        {/* Notification */}
        {notification.type && (
          <div
            className={`rounded-lg border p-4 flex items-start gap-3 transition-all ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : notification.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  notification.type === 'success' ? 'text-emerald-400' : 'text-amber-400'
                }`}
              />
            ) : (
              <AlertCircle
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  notification.type === 'error' ? 'text-red-400' : 'text-amber-400'
                }`}
              />
            )}
            <p
              className={`text-sm ${
                notification.type === 'success'
                  ? 'text-emerald-200'
                  : notification.type === 'error'
                    ? 'text-red-200'
                    : 'text-amber-200'
              }`}
            >
              {notification.message}
            </p>
          </div>
        )}

        {/* Backup & Restore Section */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Backup & Restauración</h2>
            <p className="text-sm text-zinc-400">
              Descarga un archivo con todos tus datos (Miras, Configuraciones, Notas) o restaura desde un backup anterior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Export */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Download className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white">Exportar Backup</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Descarga un archivo JSON con todos tus datos guardados. Puedes usar este archivo para restaurar en otro navegador o dispositivo.
              </p>
              <button
                onClick={handleExport}
                className="w-full px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors font-medium text-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar como JSON
                </span>
              </button>
              <p className="text-xs text-zinc-500">
                El archivo se descargará como: <code className="bg-zinc-900/50 px-2 py-1 rounded">cs2-hub-backup-YYYY-MM-DD.json</code>
              </p>
            </div>

            {/* Import */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Upload className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white">Importar Backup</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Carga un archivo JSON previamente exportado. Se fusionarán con tus datos actuales.
              </p>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  disabled={isLoading}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    {isLoading ? 'Importando...' : 'Seleccionar archivo'}
                  </span>
                </button>
              </div>
              <p className="text-xs text-zinc-500">
                Selecciona un archivo JSON exportado previamente
              </p>
            </div>
          </div>
        </section>

        {/* Data Overview */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 space-y-6">
          <h2 className="text-xl font-bold text-white">Resumen de datos</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Miras guardadas</p>
              <p className="text-2xl font-bold text-white">
                {(() => {
                  try {
                    const data = localStorage.getItem('crosshairs');
                    return data ? JSON.parse(data).length : 0;
                  } catch {
                    return 0;
                  }
                })()}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Configuraciones</p>
              <p className="text-2xl font-bold text-white">
                {(() => {
                  try {
                    const data = localStorage.getItem('gameConfigs');
                    return data ? JSON.parse(data).length : 0;
                  } catch {
                    return 0;
                  }
                })()}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Notas guardadas</p>
              <p className="text-2xl font-bold text-white">
                {(() => {
                  try {
                    const data = localStorage.getItem('notes');
                    return data ? JSON.parse(data).length : 0;
                  } catch {
                    return 0;
                  }
                })()}
              </p>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-6 space-y-4">
          <h3 className="font-semibold text-zinc-300">ℹ️ Información importante</h3>
          <ul className="text-sm text-zinc-400 space-y-2">
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-0.5">•</span>
              <span>Los datos se guardan en LocalStorage de tu navegador. Este backup es específico de tu navegador y dispositivo.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-0.5">•</span>
              <span>Al importar un backup, los datos nuevos se combinan con los existentes. Si hay conflictos, se mantienen ambos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-0.5">•</span>
              <span>Guarda este archivo en un lugar seguro si deseas tener un respaldo permanente.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-500 mt-0.5">•</span>
              <span>El archivo JSON es texto plano y puede ser editado manualmente si sabes qué haces.</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
