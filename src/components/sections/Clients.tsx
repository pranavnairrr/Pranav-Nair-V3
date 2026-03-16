'use client';

import Image from 'next/image';
import { clients } from '@/lib/clients';
import RevealWrapper from '@/components/ui/RevealWrapper';

const logoItems = [
  { src: '/logos/AM Health.png', alt: 'AM Health Hub' },
  { src: '/logos/Aries.jpg', alt: 'Aries' },
  { src: '/logos/Hdfc.png', alt: 'HDFC' },
  { src: '/logos/Macins Luxe.jpg', alt: 'Macins Luxe' },
  { src: '/logos/Macins.png', alt: 'Macins' },
  { src: '/logos/Motilal.jpg', alt: 'Motilal' },
  { src: '/logos/Ventura.png', alt: 'Ventura' },
  { src: '/logos/Yes bank.png', alt: 'Yes Bank' },
];

const doubledLogos = [...logoItems, ...logoItems];

export default function Clients() {
  return (
    <section
      id="clients"
      style={{
        padding: '80px var(--pad)',
        borderBottom: '1px solid var(--grey)',
      }}
    >
      <RevealWrapper>
        <span className="sec-lbl">Current Clients</span>
        <h2 className="sec-title" style={{ marginBottom: '48px' }}>
          BRANDS I BUILD FOR
        </h2>
      </RevealWrapper>

      <RevealWrapper delay={0.15}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
          }}
        >
          {clients.map((client) => (
            <a
              key={client.id}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cc"
              style={{
                background: 'var(--black)',
                padding: '36px 28px',
                textDecoration: 'none',
                display: 'block',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#111';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--black)';
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                  marginBottom: '14px',
                  padding: '4px 10px',
                  border: '1px solid rgba(255,77,0,0.3)',
                }}
              >
                {client.industry}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.2vw, 30px)',
                  color: 'var(--white)',
                  lineHeight: 0.95,
                  marginBottom: '14px',
                }}
              >
                {client.name}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(245,240,232,0.42)',
                  marginBottom: '18px',
                }}
              >
                {client.desc}
              </p>

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.25)',
                }}
              >
                {client.loc}
              </span>
            </a>
          ))}
        </div>
      </RevealWrapper>

      {/* Logo Marquee */}
      <div
        style={{
          marginTop: '64px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 28s linear infinite',
            alignItems: 'center',
            gap: '56px',
          }}
        >
          {doubledLogos.map((logo, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.45,
                filter: 'grayscale(1) brightness(1.8)',
                transition: 'opacity 0.2s, filter 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.opacity = '1';
                el.style.filter = 'grayscale(0) brightness(1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.opacity = '0.45';
                el.style.filter = 'grayscale(1) brightness(1.8)';
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                height={36}
                width={120}
                style={{
                  objectFit: 'contain',
                  height: '36px',
                  width: 'auto',
                  maxWidth: '120px',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
