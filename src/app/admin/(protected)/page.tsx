'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { JSONContent } from '@tiptap/react';
import { supabase } from '@/lib/supabaseClient';
import { useRole } from '@/components/admin/AdminGuard';
import { extractPlainText } from '@/lib/posts';

interface PostRow {
  id: string;
  slug: string;
  title: string;
  type: string;
  body_json: JSONContent;
  visibility: string;
  published_at: string | null;
  updated_at: string;
}

export default function AdminDashboard() {
  const role = useRole();
  const canWrite = role === 'admin' || role === 'content_manager';
  const [posts, setPosts] = useState<PostRow[] | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('posts')
      .select('id, slug, title, type, body_json, visibility, published_at, updated_at')
      .order('updated_at', { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  return (
    <main style={{ padding: '48px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--white)', lineHeight: 1 }}>
          POSTS
        </h1>
        {canWrite && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/admin/notes/new" className="btn btn-outline">
              New Note
            </Link>
            <Link href="/admin/posts/new" className="btn btn-orange">
              New Post
            </Link>
          </div>
        )}
      </div>

      {posts === null && (
        <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-body)' }}>Loading…</p>
      )}

      {posts !== null && posts.length === 0 && (
        <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-body)' }}>
          No posts yet.{canWrite && ' Create your first one.'}
        </p>
      )}

      {posts && posts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.map((p) => (
            <Link
              key={p.id}
              href={p.type === 'note' ? `/admin/notes/${p.id}` : `/admin/posts/${p.id}`}
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
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.type === 'note' ? extractPlainText(p.body_json) || '(empty note)' : p.title || '(untitled)'}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.35)', marginTop: '4px' }}>
                  {p.type === 'note' ? 'Note' : 'Article'} · {p.published_at ? 'Published' : 'Draft'} · {p.visibility}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', textTransform: 'uppercase', flexShrink: 0 }}>
                {canWrite ? 'Edit →' : 'View →'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
