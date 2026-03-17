import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Insights — Pranav Nair',
  description:
    'Marketing strategy, AI workflows, and brand building — written by Pranav Nair, Dubai-based AI-Powered Marketing Strategist.',
};

export default function BlogPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="blog-hero-grid"
        style={{
          padding: '100px var(--pad) 72px',
          borderBottom: '1px solid var(--grey)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--grey)',
        }}
      >
        <style>{`
          @media (max-width: 760px) {
            .blog-hero-grid { grid-template-columns: 1fr !important; }
            .blog-posts-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 1024px) and (min-width: 761px) {
            .blog-posts-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div style={{ background: 'var(--black)', padding: '72px var(--pad)', borderRight: 'none' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              marginBottom: '20px',
            }}
          >
            Insights
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 8.5vw, 130px)',
              lineHeight: 0.9,
            }}
          >
            THINKING<br />
            OUT <span style={{ color: 'var(--orange)' }}>LOUD.</span>
          </h1>
        </div>
        <div
          style={{
            background: 'var(--black)',
            padding: '72px var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '20px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.52)',
              maxWidth: '420px',
            }}
          >
            Brand strategy, AI workflows, healthcare marketing, luxury real estate content — written from the front lines of doing it every day across four live client accounts in Dubai.
          </p>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.25)',
            }}
          >
            {blogPosts.length} Articles Published
          </span>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section style={{ padding: '88px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
        <div
          className="blog-posts-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
          }}
        >
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                background: 'var(--black)',
                padding: '48px 36px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.25s',
              }}
            >
              {/* Ghost index */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '68px',
                  color: 'rgba(245,240,232,0.025)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Category + read time */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
                  {post.category}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.22)',
                  }}
                >
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.2vw, 32px)',
                  lineHeight: 1.0,
                  color: 'var(--white)',
                }}
              >
                {post.title.toUpperCase()}
              </h2>

              {/* Excerpt */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: 'rgba(245,240,232,0.42)',
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>

              {/* Date + CTA */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--grey)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.22)',
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
                    color: 'var(--orange)',
                  }}
                >
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: '88px var(--pad)',
          borderBottom: '1px solid var(--grey)',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '20px',
          }}
        >
          Work Together
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 5.5vw, 82px)',
            lineHeight: 0.92,
            marginBottom: '32px',
          }}
        >
          READY TO BUILD <span style={{ color: 'var(--orange)' }}>SOMETHING?</span>
        </h2>
        <Link href="/#contact" className="btn btn-orange">
          Let&apos;s Talk
        </Link>
      </section>
    </main>
  );
}
