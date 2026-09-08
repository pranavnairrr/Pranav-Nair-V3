import type { Metadata } from 'next';
import RegisterServiceWorker from '@/components/admin/RegisterServiceWorker';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'PN Admin' },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      <RegisterServiceWorker />
      {children}
    </div>
  );
}
