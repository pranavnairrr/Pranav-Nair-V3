import type { Metadata } from 'next';
import PasswordGate from '@/components/vault/PasswordGate';

export const metadata: Metadata = {
  title: 'Private',
  description: 'Private page.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
};

export default function VaultPage() {
  return <PasswordGate />;
}
