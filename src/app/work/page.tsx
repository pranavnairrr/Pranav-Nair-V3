import type { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies } from '@/lib/caseStudies';
import SectionLabel from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Case Studies — Pranav Nair',
  description:
    'Case studies from my work with AM Health Hub, Macins Group, HDFC Securities, Motilal Oswal, Ventura Securities, Me-Hin Tech, Storyfactory, and more.',
};

const primarySlugs = [
  'am-health-hub',
  'macins-group',
  'hdfc-securities',
  'motilal-oswal',
  'ventura-securities',
  'me-hin-tech',
  'storyfactory',
  'moins-view',
];

export default function WorkIndexPage() {
  const primary = primarySlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter(Boolean) as typeof caseStudies;

  return (
    <main>
      <style>{`
        .work-hero {
          padding: 100px var(--pad) 72px;
          border-bottom: 1px solid var(--grey);
          position: relative;
          overflow: hidden;
        }
        .work-ghost {
          position: absolute;
          bottom: -20px;
          right: var(--pad);
          font-family: var(--font-display);
          font-size: clamp(120px, 18vw, 240px);
          color: rgba(245,240,232,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .wc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        .wc-card {
          background: var(--black);
          padding: 40px 32px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: background 0.25s;
        }
        .wc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .wc-card:hover::before {
          transform: scaleX(1);
        }
        .wc-card:hover {
          background: #0d0d0d;
        }
        .wc-card-ghost {
          position: absolute;
          top: 14px;
          right: 18px;
          font-family: var(--font-display);
          font-size: 56px;
          color: rgba(245,240,232,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .wc-logo-wrap {
          height: 36px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .wc-logo {
          max-height: 32px;
          max-width: 100px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.55;
        }
        .wc-logo-text {
          font-family: var(--font-display);
          font-size: 18px;
          color: rgba(245,240,232,0.3);
          line-height: 1;
          letter-spacing: 1px;
        }
        .wc-tag {
          font-family: var(--font-body);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 12px;
        }
        .wc-title {
          font-family: var(--font-display);
          font-size: clamp(18px, 1.6vw, 24px);
          line-height: 1.0;
          color: var(--white);
          margin-bottom: 12px;
        }
        .wc-brief {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(245,240,232,0.38);
          margin-bottom: 20px;
          flex: 1;
        }
        .wc-cta {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--orange);
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s;
        }
        .wc-card:hover .wc-cta {
          gap: 10px;
        }
        .wc-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          border: 1px solid var(--grey);
          padding: 5px 10px;
          margin-top: auto;
        }
        @media (max-width: 960px) {
          .wc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .wc-grid { grid-template-columns: 1fr; }
          .wc-card { padding: 32px 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="work-hero">
        <div className="work-ghost">WORK</div>
        <SectionLabel>All Work</SectionLabel>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 8vw, 120px)',
            lineHeight: 0.92,
            marginBottom: '24px',
            marginTop: '16px',
          }}
        >
          CASE STUDIES
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.45)',
            maxWidth: '480px',
          }}
        >
          A record of brands built, strategies deployed, and results delivered — across
          finance, healthcare, real estate, and digital media.
        </p>
      </section>

      {/* ── COMPANY GRID ── */}
      <section style={{ padding: '80px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
        <div className="wc-grid">
          {primary.map((cs, idx) => (
            <Link key={cs.id} href={`/work/${cs.slug}`} className="wc-card">
              {/* Ghost index */}
              <div className="wc-card-ghost">{String(idx + 1).padStart(2, '0')}</div>

              {/* Logo or text */}
              <div className="wc-logo-wrap">
                {cs.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cs.logo} alt={cs.title} className="wc-logo" />
                ) : (
                  <span className="wc-logo-text">
                    {cs.title.split(' ').map((w) => w[0]).join('').slice(0, 4)}
                  </span>
                )}
              </div>

              {/* Tag */}
              <div className="wc-tag">{cs.tag.split(' · ')[0]}</div>

              {/* Title */}
              <h2 className="wc-title">{cs.title.toUpperCase()}</h2>

              {/* Brief */}
              <p className="wc-brief">
                {cs.brief.length > 100 ? cs.brief.slice(0, 97) + '…' : cs.brief}
              </p>

              {/* CTA or badge */}
              {cs.comingSoon ? (
                <span className="wc-badge">Case Study Coming Soon</span>
              ) : (
                <span className="wc-cta">View Case Study →</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section
        style={{
          padding: '80px var(--pad)',
          borderBottom: '1px solid var(--grey)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 0.92,
              color: 'var(--orange)',
              marginBottom: '16px',
            }}
          >
            YOUR PROJECT NEXT.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.42)',
              maxWidth: '400px',
            }}
          >
            Ready to build something that actually works? Let&apos;s talk strategy.
          </p>
        </div>
        <Link href="/#contact" className="btn btn-orange">
          Start a Project
        </Link>
      </section>
    </main>
  );
}
