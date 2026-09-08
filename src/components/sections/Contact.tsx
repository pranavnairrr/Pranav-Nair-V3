'use client';

import RevealWrapper from '@/components/ui/RevealWrapper';

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '64px var(--pad)',
      }}
    >
      <RevealWrapper>
        <div style={{ maxWidth: '560px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.35)',
              marginBottom: '16px',
            }}
          >
            Get In Touch
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.55)',
              marginBottom: '24px',
            }}
          >
            Happy to talk shop, compare notes, or answer a question about anything on this
            site. Reach me here.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <a
              href="mailto:ppranav18@gmail.com"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--orange)',
                textDecoration: 'none',
              }}
            >
              ppranav18@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/pranavnairrr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(245,240,232,0.5)',
                textDecoration: 'none',
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
