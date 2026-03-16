'use client';

import RevealWrapper from '@/components/ui/RevealWrapper';

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '96px var(--pad)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        borderBottom: '1px solid var(--grey)',
      }}
    >
      {/* Left */}
      <RevealWrapper>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 6vw, 88px)',
            lineHeight: 0.9,
            color: 'var(--white)',
          }}
        >
          LET&apos;S BUILD{' '}
          <br />
          <span style={{ color: 'var(--orange)' }}>TOGETHER.</span>
        </h2>
      </RevealWrapper>

      {/* Right */}
      <RevealWrapper delay={0.15}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.55)',
            marginBottom: '32px',
          }}
        >
          Whether you need a full brand built from scratch, a performance ad campaign launched,
          or an AI-powered content system that runs itself — I&apos;m the person you call.
          Based in Dubai. Working globally.
        </p>

        {/* Email */}
        <div style={{ marginBottom: '24px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.3)',
              marginBottom: '8px',
            }}
          >
            Email
          </span>
          <a
            href="mailto:ppranav18@gmail.com"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              letterSpacing: '2px',
              color: 'var(--orange)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--orange-dim)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--orange)';
            }}
          >
            ppranav18@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '36px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.3)',
              marginBottom: '8px',
            }}
          >
            Phone / WhatsApp
          </span>
          <a
            href="tel:+971567951808"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 300,
              letterSpacing: '1.5px',
              color: 'rgba(245,240,232,0.65)',
              textDecoration: 'none',
            }}
          >
            +971 567 951 808
          </a>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="mailto:ppranav18@gmail.com" className="btn btn-orange">
            Email Me
          </a>

          <a
            href="https://wa.me/971567951808"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: '#25d366',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '14px 30px',
              display: 'inline-block',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#1dad55';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#25d366';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            WhatsApp
          </a>

          <a
            href="https://linkedin.com/in/pranavnairrr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            LinkedIn
          </a>
        </div>
      </RevealWrapper>
    </section>
  );
}
