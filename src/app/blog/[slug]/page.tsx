import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublicPosts, getPublicPostBySlug, getPageViewCount, formatMonthYear, estimateReadTime } from '@/lib/posts';
import { renderPostHtml } from '@/lib/renderPostHtml';
import { getPageSearchTotals } from '@/lib/searchConsole';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublicPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  if (!post) return {};
  const title = `${post.title} — Pranav Nair`;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      type: 'article',
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
    twitter: {
      card: post.cover_image_url ? 'summary_large_image' : 'summary',
      title,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPublicPosts();
  const others = allPosts.filter((p) => p.slug !== post.slug);
  const html = renderPostHtml(post.body_json);
  const viewCount = await getPageViewCount(`/blog/${post.slug}`);
  const searchTotals = await getPageSearchTotals(`https://pranavnair.co/blog/${post.slug}`);

  return (
    <main>
      {/* ── ARTICLE HERO ── */}
      <section style={{ padding: '100px var(--pad) 72px', borderBottom: '1px solid var(--grey)', maxWidth: '860px' }}>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.4)',
            textDecoration: 'none',
            marginBottom: '48px',
          }}
        >
          ← Back to Insights
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--orange)' }}>
            {post.category || 'Insights'}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)' }}>
            {formatMonthYear(post.published_at)}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)' }}>
            {estimateReadTime(post.body_json)}
          </span>
          {viewCount > 0 && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)' }}>
              {viewCount} view{viewCount === 1 ? '' : 's'}
            </span>
          )}
          {searchTotals && searchTotals.impressions > 0 && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)' }}>
              {searchTotals.impressions.toLocaleString()} search impressions
            </span>
          )}
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 5.5vw, 88px)', lineHeight: 0.92, marginBottom: '32px' }}>
          {post.title.toUpperCase()}
        </h1>

        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(16px, 1.8vw, 22px)', lineHeight: 1.65, color: 'rgba(245,240,232,0.6)' }}>
          {post.excerpt}
        </p>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section style={{ padding: '72px var(--pad)', borderBottom: '1px solid var(--grey)', maxWidth: '760px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '56px', paddingBottom: '32px', borderBottom: '1px solid var(--grey)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Pranav Nair" style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0 }} />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--white)' }}>Pranav Nair</div>
        </div>

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, lineHeight: 1.95, color: 'rgba(245,240,232,0.65)' }}
        />

        <style>{`
          .article-body h2 { font-family: var(--font-display); font-size: clamp(28px, 3.5vw, 48px); line-height: 0.95; color: var(--white); margin-top: 56px; margin-bottom: 20px; }
          .article-body p { margin-bottom: 24px; }
          .article-body ul { padding-left: 0; list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; }
          .article-body ul li { padding-left: 20px; position: relative; color: rgba(245,240,232,0.65); }
          .article-body ul li::before { content: '—'; position: absolute; left: 0; color: var(--orange); }
          .article-body strong { color: var(--white); font-weight: 500; }
          .article-body em { font-family: var(--font-serif); font-style: italic; color: rgba(245,240,232,0.8); }
          .article-body img { max-width: 100%; display: block; margin: 24px 0; }
          .article-body .post-youtube-embed { width: 100%; aspect-ratio: 16/9; margin: 24px 0; }
          .article-body .link-preview-card { display: block; border: 1px solid var(--grey); text-decoration: none; color: inherit; margin: 24px 0; overflow: hidden; }
          .article-body .lp-image { width: 100%; aspect-ratio: 2/1; background-size: cover; background-position: center; }
          .article-body .lp-body { padding: 16px 18px; }
          .article-body .lp-platform { display: block; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; }
          .article-body .lp-title { display: block; font-size: 15px; color: var(--white); margin-bottom: 4px; }
          .article-body .lp-desc { font-size: 12px; color: rgba(245,240,232,0.5); margin: 4px 0; }
          .article-body .lp-url { font-size: 11px; color: rgba(245,240,232,0.3); }
        `}</style>
      </section>

      {/* ── MORE ARTICLES ── */}
      {others.length > 0 && (
        <section style={{ padding: '88px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '40px' }}>
            More Insights
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(others.length, 3)}, 1fr)`,
              gap: '1px',
              background: 'var(--grey)',
              border: '1px solid var(--grey)',
            }}
          >
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{ background: 'var(--black)', padding: '40px 32px', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--orange)' }}>
                  {(p.category || 'Insights')} · {estimateReadTime(p.body_json)}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.0, color: 'var(--white)' }}>
                  {p.title.toUpperCase()}
                </h3>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--orange)', marginTop: 'auto' }}>
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding: '88px var(--pad)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--grey)', borderBottom: '1px solid var(--grey)' }}>
        <div style={{ background: 'var(--black)', padding: '64px var(--pad)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Work Together
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 78px)', lineHeight: 0.92 }}>
            LIKE WHAT<br />
            YOU<span style={{ color: 'var(--orange)' }}>&apos;RE</span><br />
            READING?
          </h2>
        </div>
        <div style={{ background: 'var(--black)', padding: '64px var(--pad)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: 'rgba(245,240,232,0.52)', maxWidth: '380px' }}>
            More of what I&apos;m learning, written down as I go.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/blog" className="btn btn-outline">More Articles</Link>
            <Link href="/work" className="btn btn-outline">See Experience</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
