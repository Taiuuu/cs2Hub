import { Note } from '@/types';

const sampleNotes: Note[] = [
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

export default function NotesPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Notas</h1>
          <p className="text-zinc-400 max-w-2xl">
            Guarda tus ideas, mecánicas y jugadas clave para repasarlas antes de cada sesión.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleNotes.map((note) => (
            <article key={note.id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-sm shadow-black/10">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-white">{note.title}</h2>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">Nota</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">{note.content}</p>
              <div className="text-xs text-zinc-500">
                Actualizado: {note.updatedAt.toLocaleDateString()} • Creado: {note.createdAt.toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
