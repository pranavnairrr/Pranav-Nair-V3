import Link from 'next/link';
import { experience } from '@/lib/experience';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function Experience() {
  return (
    <>
      <style>{`
        .exp-preview-row {
          display: grid;
          grid-template-columns: 80px 1fr 200px;
          gap: 24px;
          padding: 28px 0;
          border-bottom: 1px solid var(--grey);
          text-decoration: none;
          color: inherit;
          transition: opacity 0.2s;
        }
        .exp-preview-row:hover {
          opacity: 0.7;
        }
        .exp-preview-row:first-child {
          border-top: 1px solid var(--grey);
        }
        @media (max-width: 640px) {
          .exp-preview-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }
      `}</style>

      <section
        id="work"
        style={{
          padding: '80px var(--pad)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <RevealWrapper>
          <SectionLabel>Experience</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '48px' }}>
            WHERE I&apos;VE WORKED
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.15}>
          <div>
            {experience.map((exp) => (
              <Link key={exp.id} href={`/work/${exp.slug}`} className="exp-preview-row">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    color: 'rgba(245,240,232,0.25)',
                  }}
                >
                  {exp.num}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(18px, 1.8vw, 24px)',
                      lineHeight: 1.0,
                      color: 'var(--white)',
                      marginBottom: '4px',
                    }}
                  >
                    {exp.company.toUpperCase()}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--orange)',
                    }}
                  >
                    {exp.role}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'rgba(245,240,232,0.3)',
                    textAlign: 'right',
                  }}
                >
                  {exp.period}
                </span>
              </Link>
            ))}
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
