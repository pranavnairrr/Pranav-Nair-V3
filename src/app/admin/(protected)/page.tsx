'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface PostRow {
  id: string;
  slug: string;
  title: string;
  visibility: string;
  published_at: string | null;
  updated_at: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<PostRow[] | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('posts')
      .select('id, slug, title, visibility, published_at, updated_at')
      .order('updated_at', { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  async function signOut() {
    await supabase?.auth.signOut();
    window.location.href = '/admin/login';
  }

  return (
    <main style={{ padding: '48px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: 'var(--white)',
            lineHeight: 1,
          }}
        >
          POSTS
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/admin/posts/new" className="btn btn-orange">
            New Post
          </Link>
          <button
            onClick={signOut}
            className="btn btn-outline"
            style={{ background: 'transparent', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {posts === null && (
        <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-body)' }}>Loading…</p>
      )}

      {posts !== null && posts.length === 0 && (
        <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-body)' }}>
          No posts yet. Create your first one.
        </p>
      )}

      {posts && posts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/admin/posts/${p.id}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                padding: '18px 0',
                borderBottom: '1px solid var(--grey)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white)' }}>
                  {p.title || '(untitled)'}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.35)', marginTop: '4px' }}>
                  {p.published_at ? 'Published' : 'Draft'} · {p.visibility}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', textTransform: 'uppercase', flexShrink: 0 }}>
                Edit →
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
