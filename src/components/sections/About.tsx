import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '5', label: 'Business Units' },
  { value: '4', label: 'Industries Served' },
];

const tags = [
  'Data Science',
  'Google Analytics',
  'Google Ads',
  'Meta Ads',
  'CRM & MarTech',
  'Video Production',
  'AI Marketing',
];

export default function About() {
  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: clamp(32px, 3.5vw, 48px);
          color: var(--orange);
          line-height: 1;
          margin-bottom: 6px;
          transition: transform 0.3s ease;
        }
        .stat-cell:hover .stat-num {
          transform: scale(1.08);
        }
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>

      <section
        id="about"
        className="about-grid"
        style={{
          padding: '80px var(--pad)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        {/* Left */}
        <RevealWrapper>
          <SectionLabel>About Me</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5.5vw, 80px)',
              lineHeight: 0.9,
              marginBottom: '40px',
            }}
          >
            WHERE STRATEGY{' '}
            <br />
            MEETS{' '}
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--orange)',
                fontWeight: 400,
              }}
            >
              SPEED.
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--grey)',
              border: '1px solid var(--grey)',
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-cell"
                style={{
                  background: 'var(--black)',
                  padding: '24px 20px',
                  textAlign: 'center',
                  cursor: 'default',
                }}
              >
                <div className="stat-num">{stat.value}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    fontWeight: 400,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.38)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* Right */}
        <RevealWrapper delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(245,240,232,0.65)',
              }}
            >
              Dubai-based Head of Marketing. 8+ years across growth strategy, performance
              marketing, and hands-on product/tech ownership. Started in branch marketing and
              growth roles, then moved into building the MarTech that powers marketing — CRMs,
              websites, high-converting landing pages — using modern AI-assisted tools.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(245,240,232,0.65)',
              }}
            >
              Currently owns full-funnel marketing strategy and execution across five business
              units at Aries Group &amp; Macins Group — spanning healthcare, aesthetics, real estate,
              and construction — reporting directly to founders and leadership.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(245,240,232,0.65)',
              }}
            >
              Not a pitch for freelance work — this is a record of what&apos;s being learned along
              the way: the systems, the campaigns, the tools.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
