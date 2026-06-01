'use client';

import { Crosshair } from '@/types';
import { FormEvent, useState } from 'react';
import { CrosshairPreview } from './CrosshairPreview';
import { Copy, Eye, EyeOff } from 'lucide-react';

interface CrosshairFormProps {
  onAdd: (crosshair: Omit<Crosshair, 'id' | 'createdAt'>) => void;
}

export function CrosshairForm({ onAdd }: CrosshairFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      alert('Por favor completa nombre y código');
      return;
    }

    onAdd({
      name: formData.name,
      code: formData.code,
      description: formData.description || undefined,
    });

    setFormData({ name: '', code: '', description: '' });
    setIsOpen(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(formData.code);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50 text-white"
      >
        {isOpen ? '✕ Cancelar' : '+ Nueva Mira'}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="border border-zinc-700 rounded-xl p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 space-y-6 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lado izquierdo: Formulario */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Detalles de la Mira
              </h3>

              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="ej: Mira Competitiva Standard"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Código */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                  Código de Mira
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Pega el código aquí (CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-sm"
                    rows={4}
                  />
                  {formData.code && (
                    <button
                      type="button"
                      onClick={copyCode}
                      className="absolute top-3 right-3 p-2 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-400 hover:text-blue-400"
                      title="Copiar código"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  placeholder="ej: Para retakes, baja sensibilidad"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/50 text-white mt-6"
              >
                ✓ Guardar Mira
              </button>
            </div>

            {/* Lado derecho: Preview */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 w-full justify-center">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {showPreview ? 'Ocultar' : 'Mostrar'} Preview
                </button>
              </div>

              {showPreview && formData.code && (
                <div className="w-full max-w-xs">
                  <CrosshairPreview code={formData.code} name={formData.name || 'Vista Previa'} />
                </div>
              )}

              {showPreview && !formData.code && (
                <div className="w-full max-w-xs p-6 border-2 border-dashed border-zinc-700 rounded-lg text-center text-zinc-500">
                  <p className="text-sm">Pega un código para ver la preview</p>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
