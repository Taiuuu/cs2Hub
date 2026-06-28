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
  Zap,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/maps', label: 'Mapas', icon: <Map className="w-5 h-5" />, description: 'Estrategias y calls' },
  { href: '/stats', label: 'Stats', icon: <BarChart3 className="w-5 h-5" />, description: 'Steam & FACEIT' },
  { href: '/crosshairs', label: 'Miras', icon: <Crosshair className="w-5 h-5" />, description: 'Crosshair manager' },
  { href: '/configs', label: 'Configs', icon: <Settings className="w-5 h-5" />, description: 'Ajustes del juego' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-40 p-2 rounded-lg md:hidden"
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ffffff' }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 flex flex-col transition-transform duration-200 z-30 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#0d0d0d', borderRight: '1px solid #1e1e1e' }}
      >
        {/* Logo */}
        <div className="px-5 py-6" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#ff5500' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: '#ffffff' }}>
              CS2 <span style={{ color: '#ff5500' }}>Hub</span>
            </h1>
          </div>
          <p className="text-xs ml-9" style={{ color: '#444444' }}>Competitive Toolkit</p>
        </div>

        {/* Section label */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#333333' }}>
            Menú
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group"
                style={{
                  background: active ? 'rgba(255, 85, 0, 0.08)' : 'transparent',
                  borderLeft: active ? '3px solid #ff5500' : '3px solid transparent',
                  color: active ? '#ffffff' : '#555555',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.color = '#aaaaaa';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#555555';
                  }
                }}
              >
                <span style={{ color: active ? '#ff5500' : 'inherit' }}>
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span style={{ color: active ? '#ffffff' : 'inherit', lineHeight: '1.2' }}>
                    {item.label}
                  </span>
                  <span className="text-xs" style={{ color: active ? '#ff550088' : '#333333', fontWeight: 400 }}>
                    {item.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid #1a1a1a' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: '#2a2a2a' }}>v0.1.0</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff5500' }}></div>
              <span className="text-xs" style={{ color: '#333333' }}>CS2</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
