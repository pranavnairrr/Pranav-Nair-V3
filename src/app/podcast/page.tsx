import type { Metadata } from 'next';
import { podcastVideos } from '@/lib/podcastVideos';
import LiteYouTube from '@/components/ui/LiteYouTube';

export const metadata: Metadata = {
  title: 'Conversations — Pranav Nair',
  description:
    'Recorded conversations with founders and industry leaders in Dubai — on medical tourism, robotics in surgery, real estate development, and building a business.',
};

export default function PodcastPage() {
  return (
    <main>
      <style>{`
        .pod-videos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--grey); }
        @media (max-width: 760px) {
          .pod-videos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          padding: '100px var(--pad) 72px',
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
            marginBottom: '20px',
          }}
        >
          Conversations
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 8vw, 120px)',
            lineHeight: 0.92,
            marginBottom: '24px',
          }}
        >
          ON THE <span style={{ color: 'var(--orange)' }}>RECORD.</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(245,240,232,0.45)',
            maxWidth: '520px',
          }}
        >
          Recorded conversations with founders and industry leaders in Dubai — filmed as
          they happen, not scripted for a launch date.
        </p>
      </section>

      {/* ── VIDEOS ── */}
      <section style={{ borderBottom: '1px solid var(--grey)' }}>
        <div className="pod-videos-grid">
          {podcastVideos.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', background: 'var(--black)' }}
            >
              <LiteYouTube id={v.id} title={v.title} />
              <div style={{ padding: '24px 28px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    lineHeight: 1.1,
                    color: 'var(--white)',
                    marginBottom: '8px',
                  }}
                >
                  {v.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    color: 'var(--orange)',
                  }}
                >
                  with {v.guest}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── MORE ── */}
      <section style={{ padding: '56px var(--pad)' }}>
        <a
          href="https://youtube.com/@pranavnairrrrr"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.4)',
            textDecoration: 'none',
          }}
        >
          More on YouTube ↗
        </a>
      </section>
    </main>
  );
}
