'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Real access control lives in Postgres RLS (is_admin() checks the JWT's
// email claim on every request) — this is just a UX redirect so a signed
// out visitor to /admin lands on the login form instead of an empty page.
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | 'loading'>('loading');

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === null) router.replace('/admin/login');
  }, [session, router]);

  if (session === 'loading') {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', color: 'rgba(245,240,232,0.4)' }}>
        Loading…
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}
