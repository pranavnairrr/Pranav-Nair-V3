import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, getBlogPost } from '@/lib/blog';

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Pranav Nair`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <main>
      {/* ── ARTICLE HERO ── */}
      <section
        style={{
          padding: '100px var(--pad) 72px',
          borderBottom: '1px solid var(--grey)',
          maxWidth: '860px',
        }}
      >
        {/* Back */}
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
            transition: 'color 0.2s',
          }}
        >
          ← Back to Insights
        </Link>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--orange)',
            }}
          >
            {post.category}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.25)',
            }}
          >
            {post.date}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.25)',
            }}
          >
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(42px, 5.5vw, 88px)',
            lineHeight: 0.92,
            marginBottom: '32px',
          }}
        >
          {post.title.toUpperCase()}
        </h1>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 1.8vw, 22px)',
            lineHeight: 1.65,
            color: 'rgba(245,240,232,0.6)',
          }}
        >
          {post.excerpt}
        </p>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section
        style={{
          padding: '72px var(--pad)',
          borderBottom: '1px solid var(--grey)',
          maxWidth: '760px',
        }}
      >
        {/* Author line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '56px',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--grey)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--grey-mid)',
              border: '1px solid var(--orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              color: 'var(--orange)',
              flexShrink: 0,
            }}
          >
            PN
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--white)',
              }}
            >
              Pranav Nair
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.35)',
                marginTop: '2px',
              }}
            >
              AI-Powered Marketing Strategist · Dubai, UAE
            </div>
          </div>
        </div>

        {/* Article HTML */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.body }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 1.95,
            color: 'rgba(245,240,232,0.65)',
          }}
        />

        {/* Article styles */}
        <style>{`
          .article-body h2 {
            font-family: var(--font-display);
            font-size: clamp(28px, 3.5vw, 48px);
            line-height: 0.95;
            color: var(--white);
            margin-top: 56px;
            margin-bottom: 20px;
          }
          .article-body p {
            margin-bottom: 24px;
          }
          .article-body ul {
            padding-left: 0;
            list-style: none;
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .article-body ul li {
            padding-left: 20px;
            position: relative;
            color: rgba(245,240,232,0.65);
          }
          .article-body ul li::before {
            content: '—';
            position: absolute;
            left: 0;
            color: var(--orange);
          }
          .article-body strong {
            color: var(--white);
            font-weight: 500;
          }
          .article-body em {
            font-family: var(--font-serif);
            font-style: italic;
            color: rgba(245,240,232,0.8);
          }
        `}</style>
      </section>

      {/* ── MORE ARTICLES ── */}
      {others.length > 0 && (
        <section style={{ padding: '88px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              marginBottom: '40px',
            }}
          >
            More Insights
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${others.length}, 1fr)`,
              gap: '1px',
              background: 'var(--grey)',
              border: '1px solid var(--grey)',
            }}
          >
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{
                  background: 'var(--black)',
                  padding: '40px 32px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'background 0.25s',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                  }}
                >
                  {p.category} · {p.readTime}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    lineHeight: 1.0,
                    color: 'var(--white)',
                  }}
                >
                  {p.title.toUpperCase()}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    marginTop: 'auto',
                  }}
                >
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section
        style={{
          padding: '88px var(--pad)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--grey)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <div
          style={{
            background: 'var(--black)',
            padding: '64px var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--orange)',
            }}
          >
            Work Together
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 78px)',
              lineHeight: 0.92,
            }}
          >
            LIKE WHAT<br />
            YOU<span style={{ color: 'var(--orange)' }}>&apos;RE</span><br />
            READING?
          </h2>
        </div>
        <div
          style={{
            background: 'var(--black)',
            padding: '64px var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.52)',
              maxWidth: '380px',
            }}
          >
            This is how I think. Imagine what I can do for your brand. Let&apos;s build something that actually works.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/#contact" className="btn btn-orange">
              Start a Project
            </Link>
            <Link href="/blog" className="btn btn-outline">
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
