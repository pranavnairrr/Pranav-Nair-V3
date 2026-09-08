import type { Metadata } from 'next';
import Link from 'next/link';
import { experience } from '@/lib/experience';
import SectionLabel from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Experience — Pranav Nair',
  description:
    'Where I\'ve worked and what I did there — Aries Group & Macins Group, HDFC Securities, Motilal Oswal, Me-Hin Tech, and Ventura Securities.',
};

export default function WorkIndexPage() {
  return (
    <main>
      <style>{`
        .work-hero {
          padding: 100px var(--pad) 72px;
          border-bottom: 1px solid var(--grey);
          position: relative;
          overflow: hidden;
        }
        .work-ghost {
          position: absolute;
          bottom: -20px;
          right: var(--pad);
          font-family: var(--font-display);
          font-size: clamp(120px, 18vw, 240px);
          color: rgba(245,240,232,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .exp-row {
          display: grid;
          grid-template-columns: 100px 1fr 220px;
          gap: 32px;
          padding: 40px var(--pad);
          border-bottom: 1px solid var(--grey);
          text-decoration: none;
          color: inherit;
          transition: background 0.2s;
        }
        .exp-row:hover {
          background: #0d0d0d;
        }
        .exp-row:last-child {
          border-bottom: none;
        }
        @media (max-width: 760px) {
          .exp-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 32px var(--pad);
          }
          .exp-row > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="work-hero">
        <div className="work-ghost">EXP</div>
        <SectionLabel>Experience</SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 8vw, 120px)',
            lineHeight: 0.92,
            marginBottom: '24px',
            marginTop: '16px',
          }}
        >
          WHERE I&apos;VE WORKED
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.45)',
            maxWidth: '480px',
          }}
        >
          A straightforward record — companies, roles, and what the job actually involved.
        </p>
      </section>

      {/* ── EXPERIENCE LIST ── */}
      <section>
        {experience.map((exp) => (
          <Link key={exp.id} href={`/work/${exp.slug}`} className="exp-row">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px',
                color: 'rgba(245,240,232,0.25)',
              }}
            >
              {exp.num}
            </span>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  lineHeight: 1.05,
                  color: 'var(--white)',
                  marginBottom: '8px',
                }}
              >
                {exp.company.toUpperCase()}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'var(--orange)',
                  letterSpacing: '0.5px',
                }}
              >
                {exp.role}
                {exp.current && (
                  <span
                    style={{
                      marginLeft: '10px',
                      fontSize: '9px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.35)',
                    }}
                  >
                    Current
                  </span>
                )}
              </p>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'rgba(245,240,232,0.35)',
                textAlign: 'right',
              }}
            >
              <div>{exp.period}</div>
              <div style={{ opacity: 0.6, marginTop: '2px' }}>{exp.location}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
