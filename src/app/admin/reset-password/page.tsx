'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    // The emailed link contains a recovery token in the URL; supabase-js
    // parses it automatically and turns it into a session on load.
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSaving(true);
    const { error: updateError } = await supabase!.auth.updateUser({ password });
    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.replace('/admin'), 1500);
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ maxWidth: '340px', width: '100%' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '16px' }}>
          Admin
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', lineHeight: 0.95, marginBottom: '28px', color: 'var(--white)' }}>
          SET NEW PASSWORD
        </h1>

        {!ready && !done && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(245,240,232,0.4)' }}>
            Checking your reset link…
          </p>
        )}

        {ready && !done && (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              autoFocus
              style={inputStyle}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              style={{ ...inputStyle, marginTop: '10px' }}
            />
            {error && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#c94a4a', marginTop: '12px' }}>
                {error}
              </p>
            )}
            <button type="submit" disabled={saving} className="btn btn-orange" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
              {saving ? 'Saving…' : 'Set Password'}
            </button>
          </form>
        )}

        {done && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4a9e7a' }}>
            Password updated — redirecting…
          </p>
        )}
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: '#111',
  border: '1px solid var(--grey)',
  color: 'var(--white)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  outline: 'none',
};
