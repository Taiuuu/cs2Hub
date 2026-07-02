import { Metadata } from 'next';
import { crosshairsMetadata } from '@/app/layout/metadata';

export const metadata: Metadata = crosshairsMetadata;

export default function CrosshairsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
