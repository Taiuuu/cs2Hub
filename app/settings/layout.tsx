import { Metadata } from 'next';
import { settingsMetadata } from '@/app/layout/metadata';

export const metadata: Metadata = settingsMetadata;

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
