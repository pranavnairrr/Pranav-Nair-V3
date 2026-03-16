'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Results', href: '/results' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(8,8,8,0.94)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--grey)',
        padding: '18px var(--pad)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          letterSpacing: '4px',
          color: 'var(--white)',
          textDecoration: 'none',
        }}
      >
        PN
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {navLinks.map((link) => {
          const isActive =
            link.href.startsWith('/') && !link.href.includes('#')
              ? pathname === link.href
              : false;

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: isActive ? 'var(--orange)' : 'var(--white)',
                opacity: isActive ? 1 : 0.5,
                textDecoration: 'none',
                transition: 'opacity 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = '0.5';
                }
              }}
            >
              {link.label}
            </Link>
          );
        })}

        <a
          href="mailto:ppranav18@gmail.com"
          className="btn btn-orange"
          style={{ fontSize: '10px', letterSpacing: '2px', padding: '10px 22px' }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
