import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

const stats = [
  { value: '9+', label: 'Years Experience' },
  { value: '15+', label: 'Brands Built' },
  { value: '4', label: 'Industries Served' },
];

const tags = [
  'Certified Data Scientist',
  'Google Analytics',
  'Google Ads',
  'Meta Ads',
  'Video Production',
  'Brand Identity',
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
              I&apos;m a Dubai-based AI-Powered Marketing Strategist with 9+ years of experience
              building brands from zero — content, creative, campaigns, and everything in between.
              Started as a media specialist, mastered the full stack, evolved into a strategist who
              delivers full-team output as one person.
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
              I currently manage digital marketing across AM Health Hub, Aries Dental &amp; Aesthetic,
              Aries Group, and Macins Group — brand identity, social media, content operations, and
              creative direction simultaneously across healthcare, wellness, and construction sectors
              in Dubai.
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
              I use AI tools to deliver what used to require a full team. Campaigns in days, not
              weeks. I also build my own brands — Printadi, a clothing venture in India — so I
              don&apos;t just advise brands, I build them.
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
