'use client';

import Image from 'next/image';
import { builds } from '@/lib/builds';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function Builds() {
  return (
    <>
      <style>{`
        .builds-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        .build-card {
          background: var(--black);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: background 0.2s;
        }
        .build-card:hover {
          background: #0d0d0d;
        }
        .build-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 900 / 420;
          background: #111;
          overflow: hidden;
          border-bottom: 1px solid var(--grey);
        }
        .build-thumb-wrap img {
          transition: transform 0.4s ease;
        }
        .build-card:hover .build-thumb-wrap img {
          transform: scale(1.03);
        }
        @media (max-width: 860px) {
          .builds-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="builds"
        style={{
          padding: '80px var(--pad)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <RevealWrapper>
          <SectionLabel>Live Product Builds</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '16px' }}>
            SHIPPED.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.4)',
              marginBottom: '48px',
              maxWidth: '520px',
            }}
          >
            Websites and a CRM, designed and built end to end. Live, not mockups.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.15}>
          <div className="builds-grid">
            {builds.map((b) => (
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="build-card"
              >
                <div className="build-thumb-wrap">
                  <Image
                    src={b.thumbnail}
                    alt={`${b.title} — screenshot`}
                    fill
                    sizes="(max-width: 860px) 100vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div style={{ padding: '24px 26px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--orange)',
                      marginBottom: '10px',
                    }}
                  >
                    {b.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      lineHeight: 1.0,
                      color: 'var(--white)',
                      marginBottom: '10px',
                    }}
                  >
                    {b.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      color: 'rgba(245,240,232,0.4)',
                      marginBottom: '14px',
                    }}
                  >
                    {b.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.3)',
                    }}
                  >
                    Visit Live ↗
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
