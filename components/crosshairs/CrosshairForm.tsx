'use client';

import { Crosshair } from '@/types';
import { FormEvent, useState } from 'react';

interface CrosshairFormProps {
  onAdd: (crosshair: Omit<Crosshair, 'id' | 'createdAt'>) => void;
}

export function CrosshairForm({ onAdd }: CrosshairFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    team: 'Both' as 'CT' | 'T' | 'Both',
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
      team: formData.team,
    });

    setFormData({ name: '', code: '', description: '', team: 'Both' });
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors mb-6"
      >
        {isOpen ? 'Cancelar' : '+ Nueva Mira'}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="border border-zinc-800 rounded-lg p-6 mb-6 bg-zinc-900">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre</label>
              <input
                type="text"
                placeholder="ej: Mira Competitiva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Código</label>
              <textarea
                placeholder="Pega el código de la mira aquí"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 font-mono text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Descripción (opcional)</label>
              <input
                type="text"
                placeholder="ej: Para retakes"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Equipo</label>
              <select
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value as 'CT' | 'T' | 'Both' })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Both">Ambos</option>
                <option value="CT">CT</option>
                <option value="T">T</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Guardar Mira
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
