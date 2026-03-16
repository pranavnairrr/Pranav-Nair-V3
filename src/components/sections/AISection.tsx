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
    <section
      id="ai"
      style={{
        background: '#050505',
        borderBottom: '1px solid var(--grey)',
        borderTop: '1px solid var(--grey)',
        padding: '96px var(--pad)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
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
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
          }}
        >
          {aiCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: 'var(--black)',
                padding: '32px 28px',
              }}
            >
              <div
                style={{
                  fontSize: '22px',
                  marginBottom: '14px',
                  lineHeight: 1,
                }}
              >
                {card.icon}
              </div>
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
  );
}
