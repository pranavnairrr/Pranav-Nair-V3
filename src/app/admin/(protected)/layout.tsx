'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminGuard, { useRole } from '@/components/admin/AdminGuard';
import { supabase } from '@/lib/supabaseClient';

function AdminTopBar() {
  const pathname = usePathname();
  const role = useRole();

  async function signOut() {
    await supabase?.auth.signOut();
    window.location.href = '/admin/login';
  }

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: active ? 'var(--orange)' : 'rgba(245,240,232,0.5)',
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 24px',
        borderBottom: '1px solid var(--grey)',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link href="/admin" style={linkStyle(pathname === '/admin')}>Posts</Link>
        {role === 'admin' && <Link href="/admin/settings" style={linkStyle(pathname === '/admin/settings')}>Settings</Link>}
        {role && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)', border: '1px solid var(--grey)', padding: '3px 8px' }}>
            {role.replace('_', ' ')}
          </span>
        )}
      </div>
      <button onClick={signOut} style={{ ...linkStyle(false), background: 'transparent', border: 'none', cursor: 'pointer' }}>
        Sign Out
      </button>
    </div>
  );
}

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminTopBar />
      {children}
    </AdminGuard>
  );
}
