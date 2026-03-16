import type { Metadata } from 'next';
import Link from 'next/link';
import { clients } from '@/lib/clients';

export const metadata: Metadata = {
  title: 'Proof — Pranav Nair',
  description:
    'Real results from real brands. Before/after metrics, campaign outcomes, and brand transformations — documented by Pranav Nair, Dubai-based Marketing Strategist.',
};

const clientResults = [
  {
    id: 'am-health-hub',
    name: 'AM HEALTH HUB',
    industry: 'Healthcare · Medical Tourism',
    metrics: [
      { label: 'Social Presence', before: 'Zero', after: 'Active multi-platform' },
      { label: 'Monthly Content Output', before: '0 pieces', after: '30+ pieces' },
      { label: 'Brand System', before: 'None', after: 'Full visual identity' },
      { label: 'Inquiry Channels', before: 'Word of mouth only', after: 'Social + web + email' },
      { label: 'Content Consistency', before: 'Non-existent', after: 'Daily calendar' },
    ],
    pill: 'Built from zero',
  },
  {
    id: 'aries-dental',
    name: 'ARIES DENTAL & AESTHETIC',
    industry: 'Premium Clinic · JBR Dubai',
    metrics: [
      { label: 'Brand Positioning', before: 'Generic clinic feel', after: '5-star editorial aesthetic' },
      { label: 'Content Quality', before: 'Inconsistent, low production', after: 'Editorial grade, on-brand' },
      { label: 'Visual Identity', before: 'Fragmented across platforms', after: 'Cohesive system' },
      { label: 'Campaign Cadence', before: 'Ad-hoc', after: 'Planned monthly calendar' },
    ],
    pill: '5-star presence delivered',
  },
  {
    id: 'macins-group',
    name: 'MACINS GROUP',
    industry: 'Multi-Sector Conglomerate',
    metrics: [
      { label: 'Sectors Covered', before: 'Inconsistent coverage', after: '10+ sectors unified' },
      { label: 'Geographic Reach', before: 'UAE local focus', after: 'UAE · India · KSA · Qatar' },
      { label: 'Brand Coherence', before: 'No system', after: 'Multi-sector brand architecture' },
      { label: 'Digital Presence', before: 'Minimal', after: 'Multi-platform active' },
    ],
    pill: 'Multi-sector system built',
  },
];

export default function ResultsPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          padding: '100px var(--pad) 72px',
          borderBottom: '1px solid var(--grey)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ghost bg text */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: 'var(--pad)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 14vw, 200px)',
            color: 'rgba(255,77,0,0.04)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          PROOF
        </div>

        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '20px',
          }}
        >
          Proof, Not Promises
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(64px, 9vw, 140px)',
            lineHeight: 0.9,
            maxWidth: '800px',
          }}
        >
          REAL <span style={{ color: 'var(--orange)' }}>RESULTS.</span><br />
          REAL BRANDS.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: 1.9,
            color: 'rgba(245,240,232,0.45)',
            maxWidth: '520px',
            marginTop: '32px',
          }}
        >
          Not case study templates. Not hypothetical projections. These are the actual before/after outcomes from brands I&apos;ve built and managed — documented and updated as results compound.
        </p>
      </section>

      {/* ── RESULTS BY CLIENT ── */}
      {clientResults.map((client, ci) => (
        <section
          key={client.id}
          style={{
            padding: '88px var(--pad)',
            borderBottom: '1px solid var(--grey)',
          }}
        >
          {/* Client header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                  marginBottom: '10px',
                }}
              >
                {client.industry}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 4.5vw, 68px)',
                  lineHeight: 0.92,
                }}
              >
                {client.name}
              </h2>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                border: '1px solid rgba(255,77,0,0.4)',
                padding: '9px 18px',
                flexShrink: 0,
              }}
            >
              {client.pill}
            </span>
          </div>

          {/* Metrics table */}
          <div
            style={{
              display: 'grid',
              gap: '1px',
              background: 'var(--grey)',
              border: '1px solid var(--grey)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: '1px',
                background: 'var(--grey)',
              }}
            >
              {['Metric', 'Before', 'After'].map((h) => (
                <div
                  key={h}
                  style={{
                    background: '#0f0f0f',
                    padding: '12px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.28)',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {client.metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '1px',
                  background: 'var(--grey)',
                }}
              >
                <div
                  style={{
                    background: 'var(--black)',
                    padding: '20px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--white)',
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    background: 'var(--black)',
                    padding: '20px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(245,240,232,0.32)',
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(255,77,0,0.35)',
                  }}
                >
                  {m.before}
                </div>
                <div
                  style={{
                    background: 'var(--black)',
                    padding: '20px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--orange)',
                  }}
                >
                  {m.after}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── SCREENSHOT PLACEHOLDER ── */}
      <section style={{ padding: '88px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '20px',
          }}
        >
          Dashboard Screenshots
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 68px)',
            lineHeight: 0.92,
            marginBottom: '48px',
          }}
        >
          LIVE ANALYTICS<br />
          <span style={{ color: 'rgba(245,240,232,0.25)' }}>COMING SOON</span>
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
          }}
        >
          {['Instagram Insights', 'Google Analytics', 'Meta Ads Manager'].map((label) => (
            <div
              key={label}
              style={{
                background: 'var(--black)',
                padding: '64px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                minHeight: '200px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px dashed rgba(255,77,0,0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  color: 'rgba(255,77,0,0.3)',
                }}
              >
                +
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.2)',
                  textAlign: 'center',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(245,240,232,0.22)',
            marginTop: '20px',
            letterSpacing: '1px',
          }}
        >
          * Real dashboard screenshots will be added monthly as campaigns deliver data.
        </p>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: '88px var(--pad)',
          borderBottom: '1px solid var(--grey)',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '20px',
          }}
        >
          Your Brand, Next
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 5.5vw, 82px)',
            lineHeight: 0.92,
            marginBottom: '32px',
          }}
        >
          WANT RESULTS<br />
          LIKE <span style={{ color: 'var(--orange)' }}>THESE?</span>
        </h2>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/#contact" className="btn btn-orange">
            Start a Project
          </Link>
          <Link href="/#work" className="btn btn-outline">
            See Case Studies
          </Link>
        </div>
      </section>
    </main>
  );
}
