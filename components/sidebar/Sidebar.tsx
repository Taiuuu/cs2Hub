'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Crosshair,
  Settings,
  Map,
  BookOpen,
  BarChart3,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/crosshairs', label: 'Miras', icon: <Crosshair className="w-5 h-5" /> },
  { href: '/configs', label: 'Configs', icon: <Settings className="w-5 h-5" /> },
  { href: '/maps', label: 'Mapas', icon: <Map className="w-5 h-5" /> },
  { href: '/notes', label: 'Notas', icon: <BookOpen className="w-5 h-5" /> },
  { href: '/stats', label: 'Stats', icon: <BarChart3 className="w-5 h-5" /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-zinc-900 text-zinc-200 hover:bg-zinc-800 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-black border-r border-zinc-800 p-6 flex flex-col transition-transform duration-200 z-30 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 pt-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">CS2 Hub</h1>
          <p className="text-xs text-zinc-500 mt-1">Competitive Toolkit</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-zinc-900 text-white border-l-2 border-blue-500'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer info */}
        <div className="pt-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-600">v0.1.0</p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
