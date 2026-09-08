import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { experience } from '@/lib/experience';

export async function generateStaticParams() {
  return experience.map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const exp = experience.find((e) => e.slug === params.slug);
  if (!exp) return {};
  return {
    title: `${exp.company} — Pranav Nair`,
    description: exp.summary,
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const exp = experience.find((e) => e.slug === params.slug);
  if (!exp) notFound();

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
          {exp.num}
        </div>

        <Link href="/work" className="work-back-link">
          ← Back to Experience
        </Link>

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
          {exp.role} · {exp.period} · {exp.location}
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            lineHeight: 0.95,
            maxWidth: '900px',
          }}
        >
          {exp.company.toUpperCase()}
        </h1>
      </section>

      {/* ── SUMMARY + DUTIES ── */}
      <section style={{ padding: '72px var(--pad)', borderBottom: '1px solid var(--grey)', maxWidth: '760px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.7)',
            marginBottom: '40px',
          }}
        >
          {exp.summary}
        </p>

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
          What the role involved
        </span>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {exp.duties.map((duty, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '14px',
                padding: '16px 0',
                borderTop: i === 0 ? '1px solid var(--grey)' : 'none',
                borderBottom: '1px solid var(--grey)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.6)',
              }}
            >
              <span style={{ color: 'var(--orange)', flexShrink: 0 }}>—</span>
              <span>{duty}</span>
            </li>
          ))}
        </ul>

        {exp.links && exp.links.length > 0 && (
          <>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                margin: '40px 0 16px',
              }}
            >
              Live
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exp.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(245,240,232,0.6)',
                    textDecoration: 'none',
                  }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── MORE EXPERIENCE ── */}
      <section style={{ padding: '72px var(--pad)' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '32px',
          }}
        >
          More Experience
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {experience
            .filter((e) => e.slug !== exp.slug)
            .map((e) => (
              <Link
                key={e.id}
                href={`/work/${e.slug}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 0',
                  borderBottom: '1px solid var(--grey)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--white)',
                  }}
                >
                  {e.company}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: 'var(--orange)',
                    textTransform: 'uppercase',
                  }}
                >
                  View →
                </span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
