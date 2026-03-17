'use client';

import { useState } from 'react';

interface LiteYouTubeProps {
  id: string;
  title: string;
}

export default function LiteYouTube({ id, title }: LiteYouTubeProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        background: '#000',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => setActive(true)}
    >
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
        />
      ) : (
        <>
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Dark overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8,8,8,0.35)',
            }}
          />

          {/* Play button */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                background: 'var(--orange)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease, background 0.2s ease',
                boxShadow: '0 4px 24px rgba(255,77,0,0.45)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
                style={{ marginLeft: '3px' }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Title label */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(8,8,8,0.85), transparent)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.6)',
              }}
            >
              {title}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
