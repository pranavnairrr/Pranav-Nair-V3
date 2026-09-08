'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getSessionId, logEvent } from '@/lib/analytics';

const VISIBILITY_THRESHOLD = 0.5;

export default function AnalyticsTracker() {
  const pathname = usePathname();

  // pageview — fires on first load and on every client-side route change
  useEffect(() => {
    const sessionId = getSessionId();
    logEvent({
      session_id: sessionId,
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      event_type: 'pageview',
    });
  }, [pathname]);

  // section engagement — how long each <section id="..."> stays in view
  useEffect(() => {
    const sessionId = getSessionId();
    const enteredAt = new Map<string, number>();

    function flush(sectionId: string) {
      const start = enteredAt.get(sectionId);
      if (start == null) return;
      enteredAt.delete(sectionId);
      logEvent({
        session_id: sessionId,
        path: pathname,
        event_type: 'section_view',
        section_id: sectionId,
        duration_ms: Math.round(performance.now() - start),
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          if (entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
            if (!enteredAt.has(id)) enteredAt.set(id, performance.now());
          } else {
            flush(id);
          }
        }
      },
      { threshold: [0, VISIBILITY_THRESHOLD] }
    );

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    sections.forEach((el) => observer.observe(el));

    function flushAll() {
      Array.from(enteredAt.keys()).forEach(flush);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushAll();
    });
    window.addEventListener('pagehide', flushAll);

    return () => {
      flushAll();
      observer.disconnect();
      window.removeEventListener('pagehide', flushAll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
