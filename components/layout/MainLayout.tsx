'use client';

import { Sidebar } from '@/components/sidebar/Sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto md:pl-0">
        {children}
      </main>
    </div>
  );
}
