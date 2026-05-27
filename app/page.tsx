'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/crosshairs');
  }, [router]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-white mb-2">CS2 Hub</h1>
          <p className="text-zinc-400">Cargando...</p>
        </div>
      </div>
    </div>
  );
}
