export default function GuiltBanner() {
  return (
    <>
      <style>{`
        .guilt-line {
          position: relative;
          display: inline-block;
        }
        .guilt-line::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          height: 2px;
          background: var(--black);
          width: 0;
          animation: strike 0.6s ease forwards;
        }
        .guilt-line-1::after { animation-delay: 0.4s; }
        .guilt-line-2::after { animation-delay: 1.0s; }
        .guilt-line-3::after { animation-delay: 1.6s; }

        .guilt-item {
          opacity: 0;
          animation: slideIn 0.5s ease forwards;
        }
        .guilt-item-1 { animation-delay: 0.1s; }
        .guilt-item-2 { animation-delay: 0.7s; }
        .guilt-item-3 { animation-delay: 1.3s; }

        .guilt-sub {
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
          animation-delay: 2.2s;
        }

        .solution-content {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
          animation-delay: 0.5s;
        }

        .guilt-banner-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--grey);
        }

        @media (max-width: 640px) {
          .guilt-banner-grid {
            grid-template-columns: 1fr !important;
          }
          .guilt-left {
            padding: 44px var(--pad) !important;
          }
          .guilt-right {
            padding: 44px var(--pad) !important;
            border-left: none !important;
            border-top: 1px solid var(--grey);
          }
        }
      `}</style>

      <section className="guilt-banner-grid">
        {/* Left Panel — Orange */}
        <div
          className="guilt-left"
          style={{
            background: 'var(--orange)',
            padding: '72px var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            <div className="guilt-item guilt-item-1">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px, 1.4vw, 16px)',
                  fontWeight: 400,
                  color: 'var(--black)',
                  lineHeight: 1.4,
                }}
              >
                <span className="guilt-line guilt-line-1">
                  Your content is slow and inconsistent.
                </span>
              </p>
            </div>

            <div className="guilt-item guilt-item-2">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px, 1.4vw, 16px)',
                  fontWeight: 400,
                  color: 'var(--black)',
                  lineHeight: 1.4,
                }}
              >
                <span className="guilt-line guilt-line-2">
                  Your campaigns are burning budget, not building growth.
                </span>
              </p>
            </div>

            <div className="guilt-item guilt-item-3">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px, 1.4vw, 16px)',
                  fontWeight: 400,
                  color: 'var(--black)',
                  lineHeight: 1.4,
                }}
              >
                <span className="guilt-line guilt-line-3">
                  Your brand looks unfinished next to your competitors.
                </span>
              </p>
            </div>
          </div>

          <p
            className="guilt-sub"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '1px',
              color: 'rgba(8,8,8,0.65)',
              lineHeight: 1.6,
            }}
          >
            Sound familiar? You&apos;re leaving money on the table — there&apos;s a fix.
          </p>
        </div>

        {/* Right Panel — Black */}
        <div
          className="guilt-right"
          style={{
            background: 'var(--black)',
            padding: '72px var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderLeft: '1px solid var(--grey)',
          }}
        >
          <div className="solution-content">
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: '20px',
              }}
            >
              The Solution
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 4.5vw, 64px)',
                lineHeight: 0.92,
                color: 'var(--white)',
                marginBottom: '20px',
              }}
            >
              ONE PERSON.{' '}
              <span style={{ color: 'var(--orange)' }}>FULL RESULTS.</span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.35)',
              }}
            >
              Scroll to see how
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
