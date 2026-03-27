'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Results', href: '/results' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .nav-hamburger span {
          display: block;
          height: 1.5px;
          background: var(--white);
          transition: all 0.28s ease;
          transform-origin: center;
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }
        .nav-mobile-menu {
          display: none;
          position: fixed;
          top: 57px;
          left: 0;
          right: 0;
          background: rgba(8,8,8,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--grey);
          z-index: 99;
          padding: 16px var(--pad) 24px;
          animation: slideMenu 0.22s ease forwards;
          flex-direction: column;
          gap: 0;
        }
        .nav-mobile-menu.open {
          display: flex;
        }
        .nav-mobile-link {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid var(--grey);
          color: rgba(245,240,232,0.6);
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-mobile-link:last-of-type { border-bottom: none; }
        .nav-mobile-link:hover,
        .nav-mobile-link.active { color: var(--orange); }
        .nav-mobile-hire {
          margin-top: 16px;
          display: block;
          text-align: center;
        }
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(8,8,8,0.97)' : 'rgba(8,8,8,0.94)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--grey)',
          padding: '18px var(--pad)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.3s',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Pranav Nair" style={{ height: '38px', width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
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

        {/* Hamburger */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => {
          const isActive =
            link.href.startsWith('/') && !link.href.includes('#')
              ? pathname === link.href
              : false;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-mobile-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <span style={{ fontSize: '14px', opacity: 0.35 }}>↗</span>
            </Link>
          );
        })}
        <a
          href="mailto:ppranav18@gmail.com"
          className="btn btn-orange nav-mobile-hire"
          onClick={() => setMenuOpen(false)}
        >
          Hire Me
        </a>
      </div>
    </>
  );
}
