'use client';

import { usePathname } from 'next/navigation';

interface SearchTotals {
  clicks: number;
  impressions: number;
}

export default function Footer({ searchTotals }: { searchTotals?: SearchTotals | null }) {
  const pathname = usePathname();
  const socials = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/pranavnairrr' },
    { label: 'Instagram', href: 'https://instagram.com/ps.ooo7' },
    { label: 'X', href: 'https://x.com/PranavNair__' },
    { label: 'YouTube', href: 'https://youtube.com/@pranavnairrrrr' },
  ];

  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer
      style={{
        borderTop: '1px solid var(--grey)',
        padding: '40px var(--pad)',
        background: 'var(--black)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Pranav Nair" style={{ height: '34px', width: 'auto', display: 'block', opacity: 0.5 }} />

        <div style={{ display: 'flex', gap: '28px', alignItems: 'center', flexWrap: 'wrap' }}>
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--white)',
                opacity: 0.4,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = '0.4';
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '1.5px',
            color: 'var(--white)',
            opacity: 0.28,
          }}
        >
          © 2026 Pranav Nair · Dubai, UAE
        </span>
      </div>

      {searchTotals && (searchTotals.clicks > 0 || searchTotals.impressions > 0) && (
        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid var(--grey)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9.5px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--white)',
              opacity: 0.22,
            }}
          >
            {searchTotals.impressions.toLocaleString()} Google search impressions · {searchTotals.clicks.toLocaleString()} clicks — real, unfiltered, via Search Console
          </span>
        </div>
      )}
    </footer>
  );
}
