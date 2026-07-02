import { Metadata } from 'next';
import { configsMetadata } from '@/app/layout/metadata';

export const metadata: Metadata = configsMetadata;

export default function ConfigsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
