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
  const [mode, setMode] = useState<'signin' | 'reset'>('signin');
  const [resetStatus, setResetStatus] = useState<string | null>(null);

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

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResetStatus(null);
    if (!supabase || !email.trim()) return;
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setResetStatus('If that email has an account, a reset link is on its way.');
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
      <div style={{ maxWidth: '340px', width: '100%' }}>
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
          {mode === 'signin' ? 'SIGN IN' : 'RESET PASSWORD'}
        </h1>

        {mode === 'signin' ? (
          <form onSubmit={handleSubmit}>
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

            <button
              type="button"
              onClick={() => {
                setMode('reset');
                setError(null);
              }}
              style={forgotLinkStyle}
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoFocus
              autoComplete="username"
              style={inputStyle}
            />

            {error && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#c94a4a', marginTop: '12px' }}>
                {error}
              </p>
            )}
            {resetStatus && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4a9e7a', marginTop: '12px' }}>
                {resetStatus}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-orange"
              disabled={loading}
              style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
            >
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError(null);
                setResetStatus(null);
              }}
              style={forgotLinkStyle}
            >
              ← Back to sign in
            </button>
          </form>
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

const forgotLinkStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'center',
  marginTop: '16px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  color: 'rgba(245,240,232,0.4)',
};
