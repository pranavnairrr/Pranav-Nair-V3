import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';

const services = [
  {
    num: '01',
    title: 'Brand Strategy',
    desc: 'Complete brand identity — positioning, visual system, tone of voice, and go-to-market plan. Built from scratch to market-ready.',
  },
  {
    num: '02',
    title: 'Content Creation',
    desc: 'Reels, posters, campaigns, copy — high-volume creative output with a sharp strategic layer. Consistent. On-brand. Always.',
  },
  {
    num: '03',
    title: 'Google & Meta Ads',
    desc: 'Performance campaigns that convert. Keyword strategy, audience targeting, creative testing, and budget optimization.',
  },
  {
    num: '04',
    title: 'Social Media Management',
    desc: 'Multi-platform presence that grows. Content calendars, community management, and growth systems that compound.',
  },
  {
    num: '05',
    title: 'AI-Powered Marketing',
    desc: 'AI integrated into every workflow — faster delivery, smarter campaigns, better ROI for every dirham you spend.',
  },
];

export default function Services() {
  return (
    <>
      <style>{`
        .svc {
          position: relative;
          overflow: hidden;
          transition: background 0.25s, transform 0.25s;
        }
        .svc::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .svc:hover::before {
          transform: scaleX(1);
        }
        .svc:hover {
          background: #0d0d0d !important;
        }
        .svc-num {
          font-family: var(--font-display);
          font-size: 44px;
          color: var(--grey-light);
          line-height: 1;
          margin-bottom: 20px;
          opacity: 0.5;
          user-select: none;
          transition: opacity 0.25s, color 0.25s;
        }
        .svc:hover .svc-num {
          opacity: 1;
          color: var(--orange);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 400px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="services"
        style={{
          padding: '80px var(--pad)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <RevealWrapper>
          <SectionLabel>What I Do</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '12px' }}>
            WHAT I DO
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.4)',
              marginBottom: '48px',
              letterSpacing: '0.5px',
            }}
          >
            Full-stack marketing. One strategic hire. Complete output.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.15}>
          <div className="services-grid">
            {services.map((svc) => (
              <div
                key={svc.num}
                className="svc"
                style={{
                  background: 'var(--black)',
                  padding: '36px 24px',
                  cursor: 'default',
                }}
              >
                <div className="svc-num">{svc.num}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    color: 'var(--white)',
                    marginBottom: '12px',
                    lineHeight: 1.4,
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'rgba(245,240,232,0.32)',
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
