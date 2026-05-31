'use client';

import { useEffect, useState } from 'react';
import { Note } from '@/types';

const DEFAULT_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'Dust2: rotas de duelo A',
    content: 'Si el CT tiene control de caja y caja baja, el T debe entrar por largo con smoke de escalera y flash de sitio. Evitar quedarse en medio sin util.',
    createdAt: new Date('2026-05-24T12:00:00'),
    updatedAt: new Date('2026-05-26T09:30:00'),
  },
  {
    id: 'note-2',
    title: 'Mirage: stack B anti-split',
    content: 'Mantener un rotador en CT con flash y molotov listos. Si el rival ejecuta mid, rotar rápido con humo de mercado.',
    createdAt: new Date('2026-05-25T15:20:00'),
    updatedAt: new Date('2026-05-25T20:10:00'),
  },
  {
    id: 'note-3',
    title: 'Config de crosshair para noclip',
    content: 'Probar entre 1.2 y 1.5 de thickness con gap 0 para mejorar la visibilidad en cajas. Ideal para riflers de 5v5.',
    createdAt: new Date('2026-05-26T08:45:00'),
    updatedAt: new Date('2026-05-26T08:45:00'),
  },
];

function getInitialNotes(): Note[] {
  if (typeof window === 'undefined') return DEFAULT_NOTES;
  const saved = localStorage.getItem('notes');
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as any[];
      if (parsed.length === 0) return DEFAULT_NOTES;
      return parsed.map((note) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    } catch (e) {
      console.error('Error al cargar notas:', e);
      return DEFAULT_NOTES;
    }
  }
  return DEFAULT_NOTES;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(getInitialNotes());
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Por favor completa título y contenido de la nota.');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setFormData({ title: '', content: '' });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Notas</h1>
          <p className="text-zinc-400 max-w-2xl">
            Crea nuevas notas rápidas para guardar ideas, estrategias y recordatorios antes de tus sesiones.
          </p>
        </div>

        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Nueva nota</h2>
              <p className="text-sm text-zinc-400">Crea notas y revisa lo que estabas usando en cada sesión.</p>
            </div>
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">Rápido</span>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ej: Stack B, callout rápido"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Contenido</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                placeholder="Describe la nota o idea..."
                className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Guardar nota
            </button>
          </form>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <article key={note.id} className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 shadow-sm shadow-black/10">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-white">{note.title}</h2>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">Nota</span>
              </div>
              <p className="text-sm leading-6 text-zinc-300 mb-6">{note.content}</p>
              <div className="text-xs text-zinc-500">
                Actualizado: {note.updatedAt.toLocaleDateString()} • Creado: {note.createdAt.toLocaleDateString()}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
