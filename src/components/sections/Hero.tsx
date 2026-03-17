'use client';

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-name-1 {
          opacity: 0;
          animation: fadeUp 0.9s ease forwards;
          animation-delay: 0.1s;
        }
        .hero-name-2 {
          opacity: 0;
          animation: fadeUp 0.9s ease forwards;
          animation-delay: 0.25s;
        }
        .hero-role {
          opacity: 0;
          animation: fadeUp 0.9s ease forwards;
          animation-delay: 0.4s;
        }
        .hero-desc {
          opacity: 0;
          animation: fadeUp 0.9s ease forwards;
          animation-delay: 0.55s;
        }
        .hero-ctas {
          opacity: 0;
          animation: fadeUp 0.9s ease forwards;
          animation-delay: 0.7s;
        }
        .hero-avail {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
          animation-delay: 0.2s;
        }
        .hero-img-wrap {
          opacity: 0;
          animation: scaleIn 1.1s ease forwards;
          animation-delay: 0.3s;
        }
        .avail-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .hero-badge {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .hero-img-wrap img {
          transition: transform 0.6s ease;
        }
        .hero-img-wrap:hover img {
          transform: scale(1.03);
        }

        /* ── Mobile ── */
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .hero-left {
            border-right: none !important;
            border-bottom: 1px solid var(--grey);
            padding: 52px var(--pad) 40px !important;
          }
          .hero-right {
            height: 300px !important;
            min-height: 300px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-right {
            height: 260px !important;
            min-height: 260px !important;
          }
          .hero-ctas {
            flex-direction: column;
          }
          .hero-ctas a {
            text-align: center;
          }
        }
      `}</style>

      <section
        id="hero"
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '92vh',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        {/* Left */}
        <div
          className="hero-left"
          style={{
            padding: 'clamp(48px, 7vw, 96px) var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0',
            borderRight: '1px solid var(--grey)',
          }}
        >
          {/* Availability */}
          <div
            className="hero-avail"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '36px',
            }}
          >
            <div className="avail-dot" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.45)',
              }}
            >
              Available for new projects
            </span>
          </div>

          {/* Name */}
          <div style={{ lineHeight: 0.88, marginBottom: '24px' }}>
            <div
              className="hero-name-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(72px, 10vw, 144px)',
                color: 'var(--white)',
                display: 'block',
              }}
            >
              PRANAV
            </div>
            <div
              className="hero-name-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(72px, 10vw, 144px)',
                color: 'var(--orange)',
                display: 'block',
              }}
            >
              NAIR
            </div>
          </div>

          {/* Role */}
          <div className="hero-role" style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(15px, 1.6vw, 22px)',
                color: 'rgba(245,240,232,0.65)',
                letterSpacing: '0.5px',
              }}
            >
              AI-Powered Marketing Strategist
            </span>
          </div>

          {/* Descriptor */}
          <p
            className="hero-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(245,240,232,0.45)',
              maxWidth: '420px',
              marginBottom: '36px',
            }}
          >
            Dubai-based. AI-powered. Full-stack strategist delivering brand identity,
            content, and performance campaigns — as one person, at full-team speed.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#portfolio" className="btn btn-orange">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Let&apos;s Talk
            </a>
          </div>
        </div>

        {/* Right — Photo */}
        <div
          className="hero-img-wrap hero-right"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--grey)',
            minHeight: '400px',
          }}
        >
          <img
            src="/photo.jpg"
            alt="Pranav Nair"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'grayscale(15%) contrast(1.08)',
              display: 'block',
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />

          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.1) 50%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Badge */}
          <div
            className="hero-badge"
            style={{
              position: 'absolute',
              bottom: '28px',
              right: '28px',
              background: 'rgba(8,8,8,0.82)',
              border: '1px solid var(--grey)',
              padding: '16px 20px',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '40px',
                lineHeight: 1,
                color: 'var(--orange)',
              }}
            >
              9+
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.5)',
                marginTop: '4px',
              }}
            >
              Years Experience
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
