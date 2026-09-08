'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin');
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError('Backend not configured.');
      return;
    }
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace('/admin');
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <form onSubmit={handleSubmit} style={{ maxWidth: '340px', width: '100%' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '16px',
          }}
        >
          Admin
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            lineHeight: 0.95,
            marginBottom: '28px',
            color: 'var(--white)',
          }}
        >
          SIGN IN
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoFocus
          autoComplete="username"
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          style={{ ...inputStyle, marginTop: '10px' }}
        />

        {error && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#c94a4a', marginTop: '12px' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-orange"
          disabled={loading}
          style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
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
