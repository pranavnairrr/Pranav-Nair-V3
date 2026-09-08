'use client';

import { useEffect, useState } from 'react';

interface ScreenshotThumbProps {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

const MAX_ATTEMPTS = 7;
const RETRY_MS = 4000;

export default function ScreenshotThumb({ url, alt, width = 900, height = 560 }: ScreenshotThumbProps) {
  const [attempt, setAttempt] = useState(0);
  const [hidden, setHidden] = useState(false);

  const src = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`;

  useEffect(() => {
    if (attempt >= MAX_ATTEMPTS) return;
    // mshots generates screenshots on demand and returns a placeholder until
    // ready — re-requesting the same URL is how it's meant to be polled.
    const timer = setTimeout(() => setAttempt((a) => a + 1), RETRY_MS);
    return () => clearTimeout(timer);
  }, [attempt]);

  if (hidden) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={attempt}
      src={src}
      alt={alt}
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top',
        display: 'block',
      }}
      onError={() => setHidden(true)}
    />
  );
}
