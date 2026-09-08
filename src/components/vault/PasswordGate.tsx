'use client';

import { Suspense, lazy, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Lazy-loaded so the protected content is never part of this page's initial
// HTML or JS bundle — it only downloads as its own chunk after Supabase
// confirms the password server-side.
const AmHealthHubCaseStudy = lazy(() => import('./AmHealthHubCaseStudy'));

const GATE_ID = 'am-health-hub';

export default function PasswordGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError('Backend not configured yet.');
      return;
    }

    setChecking(true);
    const { data, error: rpcError } = await supabase.rpc('check_vault_password', {
      gate_id: GATE_ID,
      attempt: value,
    });
    setChecking(false);

    if (rpcError) {
      setError('Something went wrong. Try again.');
      return;
    }
    if (data === true) {
      setUnlocked(true);
    } else {
      setError('Incorrect password.');
    }
  }

  if (!unlocked) {
    return (
      <main
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px var(--pad)',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: '360px', width: '100%' }}
        >
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
            Private
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 0.95,
              marginBottom: '16px',
            }}
          >
            THIS PAGE IS PRIVATE
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(245,240,232,0.5)',
              marginBottom: '28px',
            }}
          >
            Enter the password to view this case study. If you don&apos;t have it, ask Pranav directly.
          </p>
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%',
              padding: '14px 16px',
              background: '#111',
              border: '1px solid var(--grey)',
              color: 'var(--white)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              marginBottom: '12px',
              outline: 'none',
            }}
          />
          {error && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#c94a4a',
                marginBottom: '12px',
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-orange"
            disabled={checking}
            style={{ width: '100%', textAlign: 'center' }}
          >
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <Suspense
      fallback={
        <div style={{ padding: '120px var(--pad)', textAlign: 'center', opacity: 0.4 }}>
          Loading…
        </div>
      }
    >
      <AmHealthHubCaseStudy />
    </Suspense>
  );
}
