'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { renderPostHtmlClient } from '@/lib/renderPostHtmlClient';

interface PostData {
  title: string;
  excerpt: string;
  category: string | null;
  body_json: unknown;
  visibility: string;
}

export default function ReadPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get('t') ?? '';

  const [status, setStatus] = useState<'checking' | 'found' | 'needs-password' | 'not-found'>('checking');
  const [post, setPost] = useState<PostData | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!supabase || !token) {
      setStatus('not-found');
      return;
    }
    supabase
      .rpc('get_post_by_share', { p_slug: params.slug, p_token: token })
      .then(({ data, error: rpcError }) => {
        if (rpcError || !data || data.length === 0) {
          setStatus('needs-password');
          return;
        }
        setPost(data[0]);
        setStatus('found');
      });
  }, [params.slug, token]);

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    setChecking(true);
    const { data, error: rpcError } = await supabase.rpc('check_post_password', {
      p_slug: params.slug,
      p_token: token,
      p_attempt: password,
    });
    setChecking(false);
    if (rpcError || !data || data.length === 0) {
      setError('Incorrect password, or this link has expired.');
      return;
    }
    setPost(data[0]);
    setStatus('found');
  }

  if (status === 'checking') {
    return <CenteredMessage>Checking link…</CenteredMessage>;
  }

  if (status === 'not-found') {
    return <CenteredMessage>This link is invalid or has expired.</CenteredMessage>;
  }

  if (status === 'needs-password') {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '360px', width: '100%' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '16px' }}>
            Private
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 0.95, marginBottom: '16px', color: 'var(--white)' }}>
            PASSWORD REQUIRED
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{ width: '100%', padding: '14px 16px', background: '#111', border: '1px solid var(--grey)', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '14px', marginBottom: '12px', outline: 'none' }}
          />
          {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#c94a4a', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" className="btn btn-orange" disabled={checking} style={{ width: '100%', textAlign: 'center' }}>
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </main>
    );
  }

  if (!post) return <CenteredMessage>This link is invalid or has expired.</CenteredMessage>;

  const html = renderPostHtmlClient(post.body_json as never);

  return (
    <main style={{ padding: '100px var(--pad) 80px', maxWidth: '740px', margin: '0 auto' }}>
      <style>{`
        .read-body h2 { font-family: var(--font-display); font-size: clamp(24px,3vw,34px); color: var(--white); margin: 32px 0 14px; }
        .read-body p { font-family: var(--font-body); font-size: 15px; font-weight: 300; line-height: 1.85; color: rgba(245,240,232,0.7); margin-bottom: 18px; }
        .read-body ul { margin: 0 0 18px; padding-left: 22px; }
        .read-body li { font-family: var(--font-body); font-size: 15px; font-weight: 300; line-height: 1.8; color: rgba(245,240,232,0.7); margin-bottom: 8px; }
        .read-body img { max-width: 100%; display: block; margin: 20px 0; }
        .read-body .post-youtube-embed { width: 100%; aspect-ratio: 16/9; margin: 20px 0; }
        .link-preview-card { display: block; border: 1px solid var(--grey); text-decoration: none; color: inherit; margin: 20px 0; overflow: hidden; }
        .lp-image { width: 100%; aspect-ratio: 2/1; background-size: cover; background-position: center; }
        .lp-body { padding: 16px 18px; }
        .lp-platform { display: block; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; }
        .lp-title { display: block; font-size: 15px; color: var(--white); margin-bottom: 4px; }
        .lp-desc { font-size: 12px; color: rgba(245,240,232,0.5); margin: 4px 0; }
        .lp-url { font-size: 11px; color: rgba(245,240,232,0.3); }
      `}</style>

      <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '20px' }}>
        Private Link · Not Indexed
      </span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', lineHeight: 0.95, marginBottom: '32px', color: 'var(--white)' }}>
        {post.title}
      </h1>
      <div className="read-body" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(245,240,232,0.4)' }}>{children}</p>
    </div>
  );
}
