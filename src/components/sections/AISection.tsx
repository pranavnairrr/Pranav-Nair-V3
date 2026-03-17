import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

const aiTools = [
  'Claude AI',
  'ChatGPT',
  'Midjourney',
  'Canva AI',
  'Meta Advantage+',
  'Google PMax',
  'CapCut AI',
  'Notion AI',
];

const aiCards = [
  {
    icon: '⚡',
    title: '10x Speed',
    desc: 'Deliverables in days not weeks. AI handles the heavy lifting while strategy stays sharp.',
  },
  {
    icon: '🎯',
    title: 'Smarter Targeting',
    desc: 'AI-assisted audience research and campaign optimization that finds the right people.',
  },
  {
    icon: '📈',
    title: 'Better ROI',
    desc: 'More output per dirham. One strategic hire delivering full marketing team results.',
  },
  {
    icon: '🔄',
    title: 'Always Iterating',
    desc: 'Continuous testing, learning and optimization baked into every single campaign.',
  },
];

export default function AISection() {
  return (
    <>
      <style>{`
        .ai-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .ai-card {
          background: var(--black);
          padding: 32px 28px;
          transition: background 0.25s, transform 0.25s;
          cursor: default;
        }
        .ai-card:hover {
          background: #111 !important;
          transform: translateY(-3px);
        }
        .ai-card-icon {
          font-size: 22px;
          margin-bottom: 14px;
          line-height: 1;
          transition: transform 0.3s ease;
        }
        .ai-card:hover .ai-card-icon {
          transform: scale(1.2) rotate(-5deg);
        }
        @media (max-width: 860px) {
          .ai-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .ai-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="ai"
        className="ai-grid"
        style={{
          background: '#050505',
          borderBottom: '1px solid var(--grey)',
          borderTop: '1px solid var(--grey)',
          padding: '80px var(--pad)',
        }}
      >
        {/* Left */}
        <RevealWrapper>
          <SectionLabel>The AI Advantage</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 0.92,
              marginBottom: '28px',
            }}
          >
            FASTER. SMARTER.{' '}
            <br />
            <span style={{ color: 'var(--orange)' }}>AI-DRIVEN.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.55)',
              marginBottom: '32px',
              maxWidth: '480px',
            }}
          >
            While most marketers are still figuring out AI, I&apos;ve already built it into every
            part of my workflow. Campaigns that used to take 2 weeks get done in 3 days. Content
            that required a full team — delivered by one person, without cutting corners.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {aiTools.map((tool) => (
              <span key={tool} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </RevealWrapper>

        {/* Right — AI Cards */}
        <RevealWrapper delay={0.2}>
          <div
            className="ai-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--grey)',
              border: '1px solid var(--grey)',
            }}
          >
            {aiCards.map((card) => (
              <div key={card.title} className="ai-card">
                <div className="ai-card-icon">{card.icon}</div>
                <h4
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--white)',
                    marginBottom: '10px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {card.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: 'rgba(245,240,232,0.38)',
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
