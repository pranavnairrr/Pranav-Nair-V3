import Image from 'next/image';
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
          transition: background 0.25s;
          display: flex;
          flex-direction: column;
        }
        .port-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
          z-index: 1;
        }
        .port-card:hover::before {
          transform: scaleX(1);
        }
        .port-card:hover {
          background: #0d0d0d !important;
        }
        .port-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 900 / 420;
          background: #111;
          overflow: hidden;
          border-bottom: 1px solid var(--grey);
        }
        .port-thumb-wrap img {
          transition: transform 0.4s ease;
        }
        .port-card:hover .port-thumb-wrap img {
          transform: scale(1.03);
        }
        .port-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        @media (max-width: 640px) {
          .port-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="portfolio"
        style={{
          padding: '80px var(--pad)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <RevealWrapper>
          <SectionLabel>Content Portfolio</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '20px' }}>
            MY WORK
          </h2>
        </RevealWrapper>

        {/* Note */}
        <RevealWrapper delay={0.1}>
          <div
            style={{
              borderLeft: '3px solid var(--orange)',
              paddingLeft: '20px',
              marginBottom: '48px',
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
              Shipped work — no concepts, no spec pieces.
            </p>
          </div>
        </RevealWrapper>

        {/* Portfolio Cards Grid */}
        <RevealWrapper delay={0.2}>
          <div className="port-grid">
            {portfolioItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="port-card"
                style={{
                  background: 'var(--black)',
                  textDecoration: 'none',
                }}
              >
                <div className="port-thumb-wrap">
                  <Image
                    src={item.thumbnail}
                    alt={`${item.title.replace('\n', ' ')} — preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>

                <div style={{ padding: 'clamp(28px, 3.5vw, 40px) clamp(24px, 3.5vw, 40px)' }}>
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
                      marginBottom: '14px',
                    }}
                  >
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(24px, 3vw, 36px)',
                      lineHeight: 0.98,
                      color: 'var(--white)',
                      marginBottom: '14px',
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
                      marginBottom: '22px',
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
                </div>
              </a>
            ))}
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
