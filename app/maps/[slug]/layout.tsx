import { Metadata } from 'next';
import { allMaps } from '@/lib/mapsData';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const mapData = allMaps.find((m) => m.id === params.slug);

  if (!mapData) {
    return {
      title: 'Mapa no encontrado | CS2 Hub',
      description: 'El mapa solicitado no existe.',
    };
  }

  return {
    title: `${mapData.name} | CS2 Hub`,
    description: `${mapData.description} Explora estrategias, callouts y análisis del mapa ${mapData.name}.`,
    openGraph: {
      title: `${mapData.name} | CS2 Hub`,
      description: `Estrategias y análisis de ${mapData.name}`,
      type: 'article',
    },
  };
}

export default function MapDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
