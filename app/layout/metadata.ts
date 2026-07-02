import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  title: 'CS2 Hub',
  description: 'Herramienta competitiva para Counter-Strike 2: mapas, estrategias, estadísticas, miras y configuraciones.',
  keywords: ['CS2', 'Counter-Strike 2', 'competitive', 'mapas', 'estrategias', 'stats'],
  authors: [{ name: 'CS2 Hub' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'CS2 Hub',
    title: 'CS2 Hub',
    description: 'Herramienta competitiva para Counter-Strike 2',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CS2 Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CS2 Hub',
    description: 'Herramienta competitiva para Counter-Strike 2',
  },
};

export const mapsMetadata: Metadata = {
  title: 'Mapas | CS2 Hub',
  description: 'Explora playbooks completos, callouts, fundamentos y estrategias por mapa en Counter-Strike 2.',
  openGraph: {
    title: 'Mapas | CS2 Hub',
    description: 'Estrategias y análisis de mapas competitivos de CS2',
  },
};

export const statsMetadata: Metadata = {
  title: 'Stats | CS2 Hub',
  description: 'Consulta tus estadísticas de Steam y FACEIT en Counter-Strike 2.',
  openGraph: {
    title: 'Stats | CS2 Hub',
    description: 'Estadísticas de Steam y FACEIT en tiempo real',
  },
};

export const crosshairsMetadata: Metadata = {
  title: 'Miras | CS2 Hub',
  description: 'Gestor de miras (crosshairs) para Counter-Strike 2. Guarda y comparte tus códigos.',
  openGraph: {
    title: 'Miras | CS2 Hub',
    description: 'Crea y gestiona tus miras de CS2',
  },
};

export const configsMetadata: Metadata = {
  title: 'Configuraciones | CS2 Hub',
  description: 'Crea y guarda configuraciones de juego (mouse, video, HUD, etc.) para Counter-Strike 2.',
  openGraph: {
    title: 'Configuraciones | CS2 Hub',
    description: 'Configurador de ajustes para Counter-Strike 2',
  },
};

export const settingsMetadata: Metadata = {
  title: 'Configuración | CS2 Hub',
  description: 'Backup y restauración de tus datos en CS2 Hub.',
  openGraph: {
    title: 'Configuración | CS2 Hub',
    description: 'Gestión de datos y backup',
  },
};

export const tacticsMetadata: Metadata = {
  title: 'Tácticas | CS2 Hub',
  description: 'Base de datos de tácticas y estrategias competitivas para Counter-Strike 2.',
  openGraph: {
    title: 'Tácticas | CS2 Hub',
    description: 'Estrategias competitivas de CS2',
  },
};
