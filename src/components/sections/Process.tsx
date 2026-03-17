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
    <>
      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        .process-step {
          background: var(--black);
          padding: 40px 32px;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
          cursor: default;
        }
        .process-step::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .process-step:hover::after {
          transform: scaleX(1);
        }
        .process-step:hover {
          background: #0e0e0e !important;
        }
        .process-ghost {
          position: absolute;
          top: 16px;
          right: 20px;
          font-family: var(--font-display);
          font-size: 56px;
          color: rgba(255,77,0,0.10);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.3s;
        }
        .process-step:hover .process-ghost {
          color: rgba(255,77,0,0.18);
        }
        @media (max-width: 860px) {
          .process-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="process"
        style={{
          padding: '80px var(--pad)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <RevealWrapper>
          <SectionLabel>How I Work</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '48px' }}>
            THE PROCESS
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.15}>
          <div className="process-grid">
            {steps.map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-ghost">{step.num}</div>
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
    </>
  );
}
