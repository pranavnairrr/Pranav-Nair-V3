import { portfolioItems } from '@/lib/portfolio';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function Portfolio() {
  return (
    <>
      <style>{`
        .port-card {
          position: relative;
          overflow: hidden;
        }
        .port-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .port-card:hover::before {
          transform: scaleX(1);
        }
        .port-card:hover {
          background: #0d0d0d !important;
        }
      `}</style>

      <section
        id="portfolio"
        style={{
          padding: '96px var(--pad)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <RevealWrapper>
          <SectionLabel>Content Portfolio</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '20px' }}>
            MY WORK
          </h2>
        </RevealWrapper>

        {/* Authentic Note */}
        <RevealWrapper delay={0.1}>
          <div
            style={{
              borderLeft: '3px solid var(--orange)',
              paddingLeft: '20px',
              marginBottom: '56px',
              marginTop: '28px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 1.3vw, 17px)',
                color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.7,
                maxWidth: '680px',
              }}
            >
              Everything shown is real work, built for real clients, delivering real results.
              No concept pieces. No spec work. Just the actual content, campaigns, and creative
              that went live and moved the needle.
            </p>
          </div>
        </RevealWrapper>

        {/* Portfolio Cards Grid */}
        <RevealWrapper delay={0.2}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              background: 'var(--grey)',
              border: '1px solid var(--grey)',
            }}
          >
            {portfolioItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="port-card"
                style={{
                  background: 'var(--black)',
                  padding: '52px 44px',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background 0.2s',
                }}
              >
                {/* Ghost Platform */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(52px, 6vw, 80px)',
                    color: 'rgba(245,240,232,0.03)',
                    lineHeight: 1,
                    marginBottom: '-16px',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {item.platform}
                </div>

                {/* Tag */}
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    fontWeight: 500,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    marginBottom: '18px',
                    position: 'relative',
                  }}
                >
                  {item.tag}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(38px, 4vw, 58px)',
                    lineHeight: 0.92,
                    color: 'var(--white)',
                    marginBottom: '18px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {item.title}
                </h3>

                {/* Desc */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'rgba(245,240,232,0.42)',
                    marginBottom: '28px',
                    maxWidth: '480px',
                  }}
                >
                  {item.desc}
                </p>

                {/* CTA */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {item.cta} ↗
                </span>
              </a>
            ))}
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
