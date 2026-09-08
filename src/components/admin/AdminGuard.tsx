'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

export type Role = 'admin' | 'content_manager' | 'viewer' | null;

const RoleContext = createContext<Role>(null);
export function useRole() {
  return useContext(RoleContext);
}

// Real access control lives in Postgres RLS (is_admin() / can_write() check
// admin_users on every request) — this is the UX layer: redirect signed-out
// visitors to the login form, and make each caller's role available to the
// UI so it can hide buttons a viewer or content manager can't actually use.
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | 'loading'>('loading');
  const [role, setRole] = useState<Role>(null);

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
    if (session === null) {
      router.replace('/admin/login');
      return;
    }
    if (session && supabase) {
      supabase.rpc('my_role').then(({ data }) => setRole((data as Role) ?? null));
    }
  }, [session, router]);

  if (session === 'loading') {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', color: 'rgba(245,240,232,0.4)' }}>
        Loading…
      </div>
    );
  }

  if (!session) return null;

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}
