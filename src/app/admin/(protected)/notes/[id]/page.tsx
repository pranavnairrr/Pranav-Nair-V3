'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { JSONContent } from '@tiptap/react';
import { supabase } from '@/lib/supabaseClient';
import Editor from '@/components/admin/Editor';
import { useRole } from '@/components/admin/AdminGuard';

function newNoteSlug() {
  return `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function NoteEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const role = useRole();
  const readOnly = role === 'viewer';
  const isNew = params.id === 'new';

  const [noteId, setNoteId] = useState<string | null>(isNew ? null : params.id);
  const [slug] = useState<string>(() => newNoteSlug());
  const [loading, setLoading] = useState(!isNew);
  const [body, setBody] = useState<JSONContent>({ type: 'doc', content: [] });
  const [visibility, setVisibility] = useState<'public' | 'private' | 'password'>('public');
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (isNew || !supabase) return;
    supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setBody(data.body_json ?? { type: 'doc', content: [] });
          setVisibility(data.visibility ?? 'public');
          setPublishedAt(data.published_at ?? null);
        }
        setLoading(false);
      });
  }, [isNew, params.id]);

  const isEmpty = useCallback(() => {
    const text = JSON.stringify(body);
    return !body.content || body.content.length === 0 || text.length < 40;
  }, [body]);

  const save = useCallback(
    async (opts?: { publish?: boolean }) => {
      if (!supabase) return;
      if (isEmpty()) {
        alert('Write something first.');
        return;
      }
      setSaving(true);
      const payload: Record<string, unknown> = {
        type: 'note',
        title: '',
        excerpt: '',
        category: null,
        body_json: body,
        visibility,
      };
      if (opts?.publish) {
        payload.published_at = new Date().toISOString();
      }

      if (noteId) {
        const { error } = await supabase.from('posts').update(payload).eq('id', noteId);
        if (error) {
          alert(error.message);
          setSaving(false);
          return;
        }
      } else {
        const { data, error } = await supabase
          .from('posts')
          .insert({ ...payload, slug })
          .select('id')
          .single();
        if (error) {
          alert(error.message);
          setSaving(false);
          return;
        }
        setNoteId(data.id);
        router.replace(`/admin/notes/${data.id}`);
      }

      if (opts?.publish) setPublishedAt(new Date().toISOString());
      setSaving(false);
      setSavedAt(new Date());
    },
    [body, visibility, noteId, slug, router, isEmpty]
  );

  async function deleteNote() {
    if (!noteId || !supabase) return;
    if (!window.confirm('Delete this note permanently? This cannot be undone.')) return;
    const { error } = await supabase.from('posts').delete().eq('id', noteId);
    if (error) {
      alert(error.message);
      return;
    }
    router.replace('/admin');
  }

  if (loading) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', color: 'rgba(245,240,232,0.4)' }}>Loading…</div>;
  }

  return (
    <main style={{ padding: '32px 24px', maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/admin" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', color: 'rgba(245,240,232,0.4)', textDecoration: 'none' }}>
          ← All Posts
        </Link>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {savedAt && !readOnly && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.3)' }}>
              Saved {savedAt.toLocaleTimeString()}
            </span>
          )}
          {readOnly && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)' }}>
              Read Only
            </span>
          )}
          {role === 'admin' && noteId && (
            <button onClick={deleteNote} className="btn btn-outline" style={{ background: 'transparent', cursor: 'pointer', borderColor: '#c94a4a', color: '#c94a4a' }}>
              Delete
            </button>
          )}
          {!readOnly && (
            <>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as typeof visibility)}
                style={{ background: '#0d0d0d', border: '1px solid var(--grey)', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '12px', padding: '9px 10px' }}
              >
                <option value="public">Public</option>
                <option value="private">Private (link only)</option>
                <option value="password">Password</option>
              </select>
              <button onClick={() => save()} disabled={saving} className="btn btn-outline" style={{ background: 'transparent', cursor: 'pointer' }}>
                {saving ? 'Saving…' : 'Save Draft'}
              </button>
              <button onClick={() => save({ publish: true })} disabled={saving} className="btn btn-orange" style={{ cursor: 'pointer' }}>
                {publishedAt ? 'Update' : 'Post'}
              </button>
            </>
          )}
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.3)', marginBottom: '16px' }}>
        A note — a short thought, a link, an image. No title needed. Shows up on{' '}
        <Link href="/notes" style={{ color: 'var(--orange)' }}>/notes</Link> once posted (if public).
      </p>

      <Editor content={body} onChange={setBody} editable={!readOnly} />
    </main>
  );
}
