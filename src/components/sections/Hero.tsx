'use client';

import Image from 'next/image';
import Link from 'next/link';

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
        .hero-img-wrap {
          opacity: 0;
          animation: scaleIn 1.1s ease forwards;
          animation-delay: 0.3s;
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
              Head of Marketing · AI-Powered Growth &amp; Product Leader
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
            Head of Marketing at Aries Group &amp; Macins Group, Dubai. Documenting growth,
            product, and using AI to do more with less — shared for free.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/blog" className="btn btn-outline">
              Read My Writing
            </Link>
            <Link href="/work" className="btn btn-outline">
              See Experience
            </Link>
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
          <Image
            src="/hero.webp"
            alt="Pranav Nair"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'grayscale(15%) contrast(1.08)',
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
              8+
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
