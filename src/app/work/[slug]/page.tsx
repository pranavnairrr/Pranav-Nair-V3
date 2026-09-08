import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies } from '@/lib/caseStudies';

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Pranav Nair`,
    description: cs.brief,
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          padding: '100px var(--pad) 72px',
          borderBottom: '1px solid var(--grey)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ghost number */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: 'var(--pad)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(120px, 16vw, 220px)',
            color: 'rgba(245,240,232,0.03)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {cs.num}
        </div>

        {/* Back link */}
        <Link href="/work" className="work-back-link">
          ← Back to Work
        </Link>

        {/* Tag */}
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '20px',
          }}
        >
          {cs.tag}
        </span>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 7vw, 110px)',
            lineHeight: 0.92,
            maxWidth: '900px',
          }}
        >
          {cs.title.toUpperCase()}
        </h1>
      </section>

      {/* ── BODY ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--grey)',
          border: '1px solid var(--grey)',
          borderTop: 'none',
          borderBottom: 'none',
        }}
      >
        {/* THE BRIEF */}
        <div style={{ background: 'var(--black)', padding: '64px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
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
            The Brief
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.6)',
            }}
          >
            {cs.brief}
          </p>
        </div>

        {/* THE STRATEGY */}
        <div style={{ background: 'var(--black)', padding: '64px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
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
            The Strategy
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.6)',
            }}
          >
            {cs.strategy}
          </p>
        </div>

        {/* THE EXECUTION — full width */}
        <div
          style={{
            background: 'var(--black)',
            padding: '64px var(--pad)',
            borderBottom: '1px solid var(--grey)',
            gridColumn: '1 / -1',
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
            The Execution
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.6)',
              maxWidth: '680px',
            }}
          >
            {cs.execution}
          </p>
        </div>
      </div>

      {/* ── THE RESULTS ── */}
      <section
        style={{
          padding: '88px var(--pad)',
          borderBottom: '1px solid var(--grey)',
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
            marginBottom: '16px',
          }}
        >
          The Results
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 6vw, 88px)',
            lineHeight: 0.92,
            marginBottom: '52px',
          }}
        >
          BEFORE → AFTER
        </h2>

        {cs.comingSoon || cs.results.length === 0 ? (
          /* Coming Soon state */
          <div
            style={{
              border: '1px solid var(--grey)',
              padding: '60px 40px',
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4vw, 56px)',
                color: 'rgba(245,240,232,0.08)',
                marginBottom: '20px',
              }}
            >
              COMING SOON
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(245,240,232,0.35)',
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Full case study with results and metrics will be published here. Check back soon.
            </p>
          </div>
        ) : (
          /* Results table */
          <div
            style={{
              display: 'grid',
              gap: '1px',
              background: 'var(--grey)',
              border: '1px solid var(--grey)',
              marginBottom: '40px',
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: '1px',
                background: 'var(--grey)',
              }}
            >
              {['Metric', 'Before', 'After'].map((h) => (
                <div
                  key={h}
                  style={{
                    background: '#0f0f0f',
                    padding: '14px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.28)',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {cs.results.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '1px',
                  background: 'var(--grey)',
                }}
              >
                <div
                  style={{
                    background: 'var(--black)',
                    padding: '20px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--white)',
                  }}
                >
                  {r.metric}
                </div>
                <div
                  style={{
                    background: 'var(--black)',
                    padding: '20px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(245,240,232,0.35)',
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(255,77,0,0.4)',
                  }}
                >
                  {r.before}
                </div>
                <div
                  style={{
                    background: 'var(--black)',
                    padding: '20px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--orange)',
                  }}
                >
                  {r.after}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Result pill */}
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: cs.comingSoon ? 'rgba(245,240,232,0.3)' : 'var(--orange)',
            border: cs.comingSoon ? '1px solid var(--grey)' : '1px solid rgba(255,77,0,0.4)',
            padding: '10px 20px',
          }}
        >
          {cs.resultPill}
        </span>
      </section>

      {/* ── NEXT CASE STUDIES ── */}
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
          More Work
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
          }}
        >
          {caseStudies
            .filter((c) => c.slug !== cs.slug)
            .map((c) => (
              <Link
                key={c.id}
                href={`/work/${c.slug}`}
                style={{
                  background: 'var(--black)',
                  padding: '36px 28px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'background 0.25s',
                  position: 'relative',
                  overflow: 'hidden',
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
                  {c.num}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    lineHeight: 1.0,
                    color: 'var(--white)',
                  }}
                >
                  {c.title.toUpperCase()}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: 'var(--orange)',
                    marginTop: 'auto',
                  }}
                >
                  View Case Study →
                </span>
              </Link>
            ))}

          {/* CTA cell */}
          <div
            style={{
              background: 'var(--black)',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 38px)',
                lineHeight: 0.95,
                color: 'var(--orange)',
              }}
            >
              YOUR PROJECT NEXT.
            </h3>
            <Link href="/#contact" className="btn btn-orange" style={{ alignSelf: 'flex-start' }}>
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
