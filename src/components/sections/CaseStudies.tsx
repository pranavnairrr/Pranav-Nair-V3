import Link from 'next/link';
import { caseStudies } from '@/lib/caseStudies';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

const featuredSlugs = ['am-health-hub', 'macins-group', 'hdfc-securities', 'motilal-oswal'];

export default function CaseStudies() {
  const featured = featuredSlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter(Boolean) as typeof caseStudies;

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
            {featured.map((cs) => (
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

            {/* View All Cell */}
            <div
              style={{
                background: 'var(--black)',
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 50px)',
                    lineHeight: 0.92,
                    color: 'var(--orange)',
                    marginBottom: '20px',
                  }}
                >
                  8 COMPANIES.
                  <br />
                  ALL WORK.
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'rgba(245,240,232,0.42)',
                    marginBottom: '28px',
                    maxWidth: '300px',
                  }}
                >
                  From finance to healthcare to YouTube — full case studies across every brand I&apos;ve built.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                <Link href="/work" className="btn btn-orange">
                  View All Case Studies
                </Link>
                <a
                  href="#contact"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.4)',
                    textDecoration: 'none',
                  }}
                >
                  Or Start a Project →
                </a>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
