'use client';

import RevealWrapper from '@/components/ui/RevealWrapper';
import LiteYouTube from '@/components/ui/LiteYouTube';
import { podcastVideos } from '@/lib/podcastVideos';

export { podcastVideos };

interface VideoFeatureProps {
  compact?: boolean;
}

export default function VideoFeature({ compact = false }: VideoFeatureProps) {
  if (compact) {
    return <LiteYouTube id={podcastVideos[0].id} title={podcastVideos[0].title} />;
  }

  return (
    <section
      id="featured-video"
      style={{
        padding: '88px var(--pad)',
        borderBottom: '1px solid var(--grey)',
      }}
    >
      <style>{`
        .video-grid-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        .video-grid-2x2 > div {
          background: var(--black);
        }
        @media (max-width: 640px) {
          .video-grid-2x2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <RevealWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <div>
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
              Podcast Sessions
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 5.5vw, 80px)',
                lineHeight: 0.92,
              }}
            >
              ON THE <span style={{ color: 'var(--orange)' }}>RECORD.</span>
            </h2>
          </div>
          <a href="/podcast" className="btn btn-outline" style={{ flexShrink: 0 }}>
            All Episodes
          </a>
        </div>
      </RevealWrapper>

      {/* 2×2 Video Grid */}
      <RevealWrapper delay={0.15}>
        <div className="video-grid-2x2">
          {podcastVideos.map((v) => (
            <div key={v.id}>
              <LiteYouTube id={v.id} title={v.title} />
            </div>
          ))}
        </div>
      </RevealWrapper>
    </section>
  );
}
