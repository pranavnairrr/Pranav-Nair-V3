import Link from 'next/link';
import { caseStudies } from '@/lib/caseStudies';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function CaseStudies() {
  return (
    <>
      <style>{`
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        .cs-card {
          background: var(--black);
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: block;
          transition: background 0.25s;
        }
        .cs-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .cs-card:hover::before {
          transform: scaleX(1);
        }
        .cs-card:hover {
          background: #0d0d0d !important;
        }
        .cs-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .cs-card:hover .cs-arrow {
          transform: translateX(5px);
        }
        @media (max-width: 640px) {
          .cs-grid {
            grid-template-columns: 1fr !important;
          }
          .cs-card {
            padding: 36px 28px !important;
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
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '48px' }}>
            SELECTED WORK
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.15}>
          <div className="cs-grid">
            {caseStudies.map((cs) => (
              <Link
                key={cs.id}
                href={`/work/${cs.slug}`}
                className="cs-card"
              >
                {/* Ghost Number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '68px',
                    color: 'rgba(245,240,232,0.025)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {cs.num}
                </div>

                {/* Tag */}
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    fontWeight: 500,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    marginBottom: '16px',
                  }}
                >
                  {cs.tag}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(26px, 2.5vw, 34px)',
                    lineHeight: 1.0,
                    color: 'var(--white)',
                    marginBottom: '16px',
                  }}
                >
                  {cs.title}
                </h3>

                {/* Brief */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'rgba(245,240,232,0.45)',
                    marginBottom: '28px',
                  }}
                >
                  {cs.brief}
                </p>

                {/* Result Pill */}
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    border: '1px solid rgba(255,77,0,0.4)',
                    padding: '7px 14px',
                  }}
                >
                  {cs.resultPill}
                </span>

                {/* View CTA */}
                <div style={{ marginTop: '20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      letterSpacing: '2.5px',
                      textTransform: 'uppercase',
                      color: 'var(--orange)',
                    }}
                  >
                    View Case Study <span className="cs-arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}

            {/* CTA Cell */}
            <div
              style={{
                background: 'var(--black)',
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 50px)',
                  lineHeight: 0.92,
                  color: 'var(--orange)',
                  marginBottom: '20px',
                }}
              >
                YOUR PROJECT NEXT.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: 'rgba(245,240,232,0.42)',
                  marginBottom: '28px',
                  maxWidth: '320px',
                }}
              >
                Ready to build something that actually works? Let&apos;s talk strategy.
              </p>
              <a href="#contact" className="btn btn-orange" style={{ alignSelf: 'flex-start' }}>
                Start a Project
              </a>
            </div>
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
