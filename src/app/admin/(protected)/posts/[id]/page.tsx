'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { JSONContent } from '@tiptap/react';
import { supabase } from '@/lib/supabaseClient';
import Editor from '@/components/admin/Editor';

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const EXPIRY_OPTIONS = [
  { label: 'Never', days: null },
  { label: '24 hours', days: 1 },
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 },
];

export default function PostEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === 'new';

  const [postId, setPostId] = useState<string | null>(isNew ? null : params.id);
  const [loading, setLoading] = useState(!isNew);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState<JSONContent>({ type: 'doc', content: [] });
  const [visibility, setVisibility] = useState<'public' | 'private' | 'password'>('private');
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [siteOrigin, setSiteOrigin] = useState('');

  useEffect(() => {
    setSiteOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (isNew || !supabase) return;
    supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title ?? '');
          setSlug(data.slug ?? '');
          setSlugEdited(true);
          setExcerpt(data.excerpt ?? '');
          setCategory(data.category ?? '');
          setBody(data.body_json ?? { type: 'doc', content: [] });
          setVisibility(data.visibility ?? 'private');
          setPublishedAt(data.published_at ?? null);
          setShareToken(data.share_token ?? null);
          setTokenExpiresAt(data.token_expires_at ?? null);
        }
        setLoading(false);
      });
  }, [isNew, params.id]);

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(title));
  }, [title, slugEdited]);

  const save = useCallback(
    async (opts?: { publish?: boolean }) => {
      if (!supabase) return;
      if (!title.trim()) {
        alert('Add a title first.');
        return;
      }
      setSaving(true);
      const payload: Record<string, unknown> = {
        title,
        slug,
        excerpt,
        category,
        body_json: body,
        visibility,
      };
      if (opts?.publish) {
        payload.visibility = 'public';
        payload.published_at = new Date().toISOString();
      }

      if (postId) {
        const { error } = await supabase.from('posts').update(payload).eq('id', postId);
        if (error) {
          alert(error.message);
          setSaving(false);
          return;
        }
      } else {
        const { data, error } = await supabase.from('posts').insert(payload).select('id').single();
        if (error) {
          alert(error.message);
          setSaving(false);
          return;
        }
        setPostId(data.id);
        router.replace(`/admin/posts/${data.id}`);
      }

      if (opts?.publish) {
        setVisibility('public');
        setPublishedAt(new Date().toISOString());
      }
      setSaving(false);
      setSavedAt(new Date());
    },
    [title, slug, excerpt, category, body, visibility, postId, router]
  );

  async function generateShareLink(days: number | null) {
    if (!postId) {
      alert('Save the post first.');
      return;
    }
    const token = crypto.randomUUID();
    const expires = days ? new Date(Date.now() + days * 86400000).toISOString() : null;
    const { error } = await supabase!
      .from('posts')
      .update({ share_token: token, token_expires_at: expires })
      .eq('id', postId);
    if (error) {
      alert(error.message);
      return;
    }
    setShareToken(token);
    setTokenExpiresAt(expires);
  }

  async function revokeShareLink() {
    if (!postId) return;
    const { error } = await supabase!
      .from('posts')
      .update({ share_token: null, token_expires_at: null })
      .eq('id', postId);
    if (error) {
      alert(error.message);
      return;
    }
    setShareToken(null);
    setTokenExpiresAt(null);
  }

  async function savePassword() {
    if (!postId || !newPassword) return;
    const { error } = await supabase!.rpc('set_post_password', {
      p_id: postId,
      p_new_password: newPassword,
    });
    if (error) alert(error.message);
    else {
      alert('Password updated.');
      setNewPassword('');
    }
  }

  async function copyShareLink() {
    if (!shareToken) return;
    const url = `${siteOrigin}/read/${slug}?t=${shareToken}`;
    await navigator.clipboard.writeText(url);
    alert('Link copied.');
  }

  if (loading) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', color: 'rgba(245,240,232,0.4)' }}>Loading…</div>;
  }

  return (
    <main style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/admin" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', color: 'rgba(245,240,232,0.4)', textDecoration: 'none' }}>
          ← All Posts
        </Link>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {savedAt && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.3)' }}>
              Saved {savedAt.toLocaleTimeString()}
            </span>
          )}
          <button onClick={() => save()} disabled={saving} className="btn btn-outline" style={{ background: 'transparent', cursor: 'pointer' }}>
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
          <button onClick={() => save({ publish: true })} disabled={saving} className="btn btn-orange" style={{ cursor: 'pointer' }}>
            {publishedAt ? 'Update & Republish' : 'Publish'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', alignItems: 'start' }}>
        {/* Main */}
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--grey)',
              color: 'var(--white)',
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              padding: '8px 0',
              marginBottom: '16px',
              outline: 'none',
            }}
          />
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="One or two sentence excerpt"
            rows={2}
            style={{
              width: '100%',
              background: '#0d0d0d',
              border: '1px solid var(--grey)',
              color: 'rgba(245,240,232,0.7)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              padding: '10px 12px',
              marginBottom: '20px',
              outline: 'none',
              resize: 'vertical',
            }}
          />
          <Editor content={body} onChange={setBody} />
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Field label="Slug">
            <input
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugEdited(true);
              }}
              style={sideInput}
            />
          </Field>

          <Field label="Category">
            <input value={category} onChange={(e) => setCategory(e.target.value)} style={sideInput} />
          </Field>

          <Field label="Visibility">
            <select value={visibility} onChange={(e) => setVisibility(e.target.value as typeof visibility)} style={sideInput}>
              <option value="public">Public</option>
              <option value="private">Private (link only)</option>
              <option value="password">Password</option>
            </select>
          </Field>

          {visibility !== 'public' && (
            <div style={{ border: '1px solid var(--grey)', padding: '14px', background: '#0d0d0d' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '10px', textTransform: 'uppercase' }}>
                Share Link
              </div>

              {shareToken ? (
                <>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.5)', wordBreak: 'break-all', marginBottom: '8px' }}>
                    {siteOrigin}/read/{slug}?t={shareToken.slice(0, 8)}…
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(245,240,232,0.3)', marginBottom: '10px' }}>
                    Expires: {tokenExpiresAt ? new Date(tokenExpiresAt).toLocaleString() : 'Never'}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={copyShareLink} className="btn btn-outline" style={smallBtn}>Copy</button>
                    <button onClick={revokeShareLink} className="btn btn-outline" style={smallBtn}>Revoke</button>
                  </div>
                </>
              ) : (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.4)', marginBottom: '10px' }}>
                  No active link.
                </p>
              )}

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                {EXPIRY_OPTIONS.map((opt) => (
                  <button key={opt.label} onClick={() => generateShareLink(opt.days)} className="btn btn-outline" style={smallBtn}>
                    {shareToken ? 'Regenerate' : 'Create'}: {opt.label}
                  </button>
                ))}
              </div>

              {visibility === 'password' && (
                <div style={{ marginTop: '14px', borderTop: '1px solid var(--grey)', paddingTop: '14px' }}>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Set password"
                    style={sideInput}
                  />
                  <button onClick={savePassword} className="btn btn-outline" style={{ ...smallBtn, marginTop: '8px', width: '100%' }}>
                    Save Password
                  </button>
                </div>
              )}
            </div>
          )}

          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(245,240,232,0.25)', lineHeight: 1.6 }}>
            Public posts are indexed and get real social preview cards. Private and
            password posts are never listed, never indexed, and only reachable with
            the exact link.
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: '6px' }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const sideInput: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid var(--grey)',
  color: 'var(--white)',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  padding: '10px 12px',
  outline: 'none',
};

const smallBtn: React.CSSProperties = {
  fontSize: '9px',
  padding: '8px 10px',
  background: 'transparent',
  cursor: 'pointer',
};
