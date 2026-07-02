import { Metadata } from 'next';
import { tacticsMetadata } from '@/app/layout/metadata';

export const metadata: Metadata = tacticsMetadata;

export default function TacticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
