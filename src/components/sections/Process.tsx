import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: "I dig into your brand, competitors, and current marketing. What's working, what's wasting budget, and where the real opportunity is hiding.",
  },
  {
    num: '02',
    title: 'Strategy & Positioning',
    desc: 'Full marketing strategy — messaging, channels, content pillars, and campaign roadmap. AI-assisted research, human-led strategic thinking.',
  },
  {
    num: '03',
    title: 'Execution at Speed',
    desc: 'Content, creatives, ad campaigns — executed with AI tools that compress timelines without compressing quality or strategic intent.',
  },
  {
    num: '04',
    title: 'Optimize & Scale',
    desc: "Data-driven iteration. What's working gets scaled. What isn't gets cut. Campaigns that compound and get better every week.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      style={{
        padding: '96px var(--pad)',
        borderBottom: '1px solid var(--grey)',
      }}
    >
      <RevealWrapper>
        <SectionLabel>How I Work</SectionLabel>
        <h2 className="sec-title" style={{ marginBottom: '52px' }}>
          THE PROCESS
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
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: 'var(--black)',
                padding: '40px 32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost Number */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '56px',
                  color: 'rgba(255,77,0,0.10)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  color: 'var(--white)',
                  marginBottom: '14px',
                  marginTop: '12px',
                  lineHeight: 1.4,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: 'rgba(245,240,232,0.38)',
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </RevealWrapper>
    </section>
  );
}
