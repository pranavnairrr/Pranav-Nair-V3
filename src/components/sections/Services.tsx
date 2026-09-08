import SectionLabel from '@/components/ui/SectionLabel';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { skillGroups } from '@/lib/skills';
import { brandIcons } from '@/lib/brandIcons';

const skills = [
  {
    num: '01',
    title: 'Brand Strategy',
    desc: 'Positioning, visual system, tone of voice, go-to-market planning.',
  },
  {
    num: '02',
    title: 'Content & Creative',
    desc: 'Reels, posters, campaigns, copy — high-volume creative output with a strategic layer underneath.',
  },
  {
    num: '03',
    title: 'Google & Meta Ads',
    desc: 'Keyword strategy, audience targeting, creative testing, Quality Score and CAC optimization.',
  },
  {
    num: '04',
    title: 'CRM & MarTech',
    desc: 'Designing and shipping the systems marketing runs on — CRMs, websites, landing pages, automation.',
  },
  {
    num: '05',
    title: 'AI-Assisted Workflows',
    desc: 'AI built into research, production, and reporting — used to move faster, not to cut corners.',
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
        .skill-group-title {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--orange);
          opacity: 0.75;
          margin-bottom: 14px;
        }
        .skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }
        .skill-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border: 1px solid var(--grey);
          background: #0d0d0d;
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 300;
          color: rgba(245,240,232,0.7);
          letter-spacing: 0.3px;
          transition: border-color 0.2s, color 0.2s;
        }
        .skill-chip:hover {
          border-color: var(--orange);
          color: var(--white);
        }
        .skill-chip svg {
          flex-shrink: 0;
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
          <SectionLabel>Areas of Focus</SectionLabel>
          <h2 className="sec-title" style={{ marginBottom: '12px' }}>
            WHAT I WORK ON
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
            The full stack, end to end — strategy through execution.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.15}>
          <div className="services-grid">
            {skills.map((skill) => (
              <div
                key={skill.num}
                className="svc"
                style={{
                  background: 'var(--black)',
                  padding: '36px 24px',
                  cursor: 'default',
                }}
              >
                <div className="svc-num">{skill.num}</div>
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
                  {skill.title}
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
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealWrapper>

        <RevealWrapper delay={0.2}>
          <div style={{ marginTop: '64px' }}>
            <SectionLabel>Tools I Use</SectionLabel>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 3vw, 30px)',
                lineHeight: 1,
                marginBottom: '32px',
                color: 'var(--white)',
              }}
            >
              SKILLS &amp; SOFTWARE
            </h3>

            {skillGroups.map((group) => (
              <div key={group.category}>
                <div className="skill-group-title">{group.category}</div>
                <div className="skill-chips">
                  {group.items.map((item) => {
                    const icon = item.icon ? brandIcons[item.icon] : undefined;
                    return (
                      <span className="skill-chip" key={item.label}>
                        {icon && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d={icon.path} />
                          </svg>
                        )}
                        {item.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </section>
    </>
  );
}
