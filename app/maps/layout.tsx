import { Metadata } from 'next';
import { mapsMetadata } from '@/app/layout/metadata';

export const metadata: Metadata = mapsMetadata;

export default function MapsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
