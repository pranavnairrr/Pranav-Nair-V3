'use client';

export default function Footer() {
  const socials = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/pranavnairrr' },
    { label: 'Instagram', href: 'https://instagram.com/ps.ooo7' },
    { label: 'X', href: 'https://x.com/PranavNair__' },
    { label: 'YouTube', href: 'https://youtube.com/@pranavnairrrrr' },
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid var(--grey)',
        padding: '40px var(--pad)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        background: 'var(--black)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          letterSpacing: '4px',
          color: 'var(--white)',
          opacity: 0.28,
        }}
      >
        PRANAV NAIR
      </span>

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
    </footer>
  );
}
