import type { Metadata } from 'next';
import Link from 'next/link';
import VideoFeature from '@/components/sections/VideoFeature';
import { podcastVideos } from '@/lib/podcastVideos';

export const metadata: Metadata = {
  title: 'Podcast — Pranav Nair',
  description:
    'The Pranav Nair podcast — candid conversations on brand strategy, AI-powered marketing, healthcare branding, and building in Dubai.',
};

const episodes = [
  {
    num: '001',
    title: 'Why Most Brand Strategies Fail Before Launch',
    guest: 'Solo Episode',
    date: 'Coming Soon',
    duration: '—',
    desc: 'The three decisions that determine whether a brand strategy lives or dies — and why most brands get all three wrong before they ever create a single piece of content.',
    platform: 'SPOTIFY',
  },
  {
    num: '002',
    title: 'AI in Healthcare Marketing — Opportunity or Risk?',
    guest: 'Solo Episode',
    date: 'Coming Soon',
    duration: '—',
    desc: 'Healthcare marketing has unique constraints: regulatory, ethical, and emotional. How do you build AI into a healthcare marketing workflow without breaking trust?',
    platform: 'YOUTUBE',
  },
  {
    num: '003',
    title: 'Building a Personal Brand in the UAE as a Marketer',
    guest: 'Solo Episode',
    date: 'Coming Soon',
    duration: '—',
    desc: 'Dubai is a crowded market for marketing talent. What separates the people who break through from the ones who stay invisible — and what I did differently.',
    platform: 'SPOTIFY',
  },
];

export default function PodcastPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--grey)',
          borderBottom: '1px solid var(--grey)',
        }}
      >
        <div
          style={{
            background: 'var(--black)',
            padding: '100px var(--pad) 72px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
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
            The Podcast
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 8.5vw, 130px)',
              lineHeight: 0.9,
            }}
          >
            ON THE <span style={{ color: 'var(--orange)' }}>RECORD.</span>
          </h1>
        </div>
        <div
          style={{
            background: 'var(--black)',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <VideoFeature compact />
        </div>
      </section>

      {/* ── SESSIONS GRID ── */}
      <section style={{ borderBottom: '1px solid var(--grey)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'var(--grey)',
          }}
        >
          {podcastVideos.map((v) => (
            <div key={v.id} style={{ background: 'var(--black)', position: 'relative', paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── EPISODES ── */}
      <section style={{ padding: '88px var(--pad)', borderBottom: '1px solid var(--grey)' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '16px',
          }}
        >
          Episodes
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 6vw, 90px)',
            lineHeight: 0.92,
            marginBottom: '52px',
          }}
        >
          UPCOMING<br />
          <span style={{ color: 'rgba(245,240,232,0.2)' }}>EPISODES</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
          }}
        >
          {episodes.map((ep) => (
            <div
              key={ep.num}
              style={{
                background: 'var(--black)',
                padding: '40px 36px',
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '32px',
                alignItems: 'start',
                transition: 'background 0.25s',
              }}
            >
              {/* Episode number */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '52px',
                  color: 'rgba(255,77,0,0.15)',
                  lineHeight: 1,
                  paddingTop: '4px',
                }}
              >
                {ep.num}
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      letterSpacing: '2.5px',
                      textTransform: 'uppercase',
                      color: 'var(--orange)',
                    }}
                  >
                    {ep.guest}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.2)',
                    }}
                  >
                    {ep.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.2vw, 30px)',
                    lineHeight: 1.0,
                    color: 'var(--white)',
                  }}
                >
                  {ep.title.toUpperCase()}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'rgba(245,240,232,0.38)',
                    maxWidth: '560px',
                  }}
                >
                  {ep.desc}
                </p>
              </div>

              {/* Platform badge */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.18)',
                  border: '1px solid var(--grey-mid)',
                  padding: '7px 12px',
                  flexShrink: 0,
                  alignSelf: 'flex-start',
                }}
              >
                {ep.platform}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section
        style={{
          padding: '72px var(--pad)',
          borderBottom: '1px solid var(--grey)',
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
            marginBottom: '40px',
          }}
        >
          Where to Listen
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--grey)',
            border: '1px solid var(--grey)',
          }}
        >
          {['Spotify', 'YouTube', 'Apple Podcasts', 'Google Podcasts'].map((platform) => (
            <div
              key={platform}
              style={{
                background: 'var(--black)',
                padding: '40px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  color: 'var(--white)',
                  lineHeight: 1,
                }}
              >
                {platform.toUpperCase()}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.2)',
                }}
              >
                Link coming soon
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── GUEST CTA ── */}
      <section
        style={{
          padding: '88px var(--pad)',
          borderBottom: '1px solid var(--grey)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--grey)',
        }}
      >
        <div
          style={{
            background: 'var(--black)',
            padding: '64px var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
            Be a Guest
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 76px)',
              lineHeight: 0.92,
            }}
          >
            WANT TO BE<br />ON THE <span style={{ color: 'var(--orange)' }}>SHOW?</span>
          </h2>
        </div>
        <div
          style={{
            background: 'var(--black)',
            padding: '64px var(--pad)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(245,240,232,0.52)',
              maxWidth: '380px',
            }}
          >
            Looking for founders, marketers, and brand builders with real stories from the UAE market and beyond. If you&apos;ve built something, broken something, or learned something worth sharing — let&apos;s talk.
          </p>
          <Link href="/#contact" className="btn btn-orange" style={{ alignSelf: 'flex-start' }}>
            Reach Out
          </Link>
        </div>
      </section>
    </main>
  );
}
