import type { Metadata } from 'next';
import Image from 'next/image';
import { getPublicNotes } from '@/lib/posts';
import { renderPostHtml } from '@/lib/renderPostHtml';

export const metadata: Metadata = {
  title: 'Notes — Pranav Nair',
  description: 'Short thoughts, links, and things worth pointing at — from Pranav Nair, Dubai-based Head of Marketing.',
};

export const revalidate = 60;

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function NotesPage() {
  const notes = await getPublicNotes();

  return (
    <main>
      <style>{`
        .note-body p { font-family: var(--font-body); font-size: 15px; font-weight: 300; line-height: 1.7; color: rgba(245,240,232,0.85); margin: 0 0 12px; }
        .note-body p:last-child { margin-bottom: 0; }
        .note-body img { max-width: 100%; border: 1px solid var(--grey); display: block; margin: 12px 0; }
        .note-body a { color: var(--orange); }
        .note-body .link-preview-card { display: block; border: 1px solid var(--grey); text-decoration: none; color: inherit; margin: 12px 0; overflow: hidden; }
        .note-body .lp-image { width: 100%; aspect-ratio: 2/1; background-size: cover; background-position: center; }
        .note-body .lp-body { padding: 14px 16px; }
        .note-body .lp-platform { display: block; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; }
        .note-body .lp-title { display: block; font-size: 14px; color: var(--white); margin-bottom: 4px; }
        .note-body .lp-desc { font-size: 12px; color: rgba(245,240,232,0.5); margin: 4px 0; }
        .note-body .lp-url { font-size: 11px; color: rgba(245,240,232,0.3); }
      `}</style>

      <section style={{ padding: '100px var(--pad) 56px', borderBottom: '1px solid var(--grey)' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '20px' }}>
          Notes
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 90px)', lineHeight: 0.92, marginBottom: '20px' }}>
          SHORT THOUGHTS,<br />NOT ARTICLES.
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245,240,232,0.5)', maxWidth: '480px' }}>
          Links, one-liners, things worth pointing at. The longer stuff lives on the{' '}
          <a href="/blog" style={{ color: 'var(--orange)' }}>blog</a>.
        </p>
      </section>

      <section style={{ padding: '0 var(--pad)', maxWidth: '640px', margin: '0 auto' }}>
        {notes.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(245,240,232,0.35)', padding: '64px 0', textAlign: 'center' }}>
            Nothing posted yet. Check back soon.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              style={{
                display: 'flex',
                gap: '14px',
                padding: '28px 0',
                borderBottom: '1px solid var(--grey)',
              }}
            >
              <Image
                src="/logo.png"
                alt="Pranav Nair"
                width={40}
                height={40}
                style={{ objectFit: 'contain', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--white)' }}>
                    Pranav Nair
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(245,240,232,0.3)' }}>
                    · {timeAgo(note.published_at)}
                  </span>
                </div>
                <div className="note-body" dangerouslySetInnerHTML={{ __html: renderPostHtml(note.body_json) }} />
              </div>
            </div>
          ))
        )}
      </section>

      <div style={{ padding: '56px var(--pad)' }} />
    </main>
  );
}
