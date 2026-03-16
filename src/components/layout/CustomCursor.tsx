'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ringEl = ringRef.current;
    if (!cursor || !ringEl) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);

      ringEl.style.left = ring.current.x + 'px';
      ringEl.style.top = ring.current.y + 'px';

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMouseEnterInteractive = () => {
      hoveredRef.current = true;
      ringEl.style.width = '48px';
      ringEl.style.height = '48px';
      ringEl.style.borderColor = 'var(--orange)';
    };

    const onMouseLeaveInteractive = () => {
      hoveredRef.current = false;
      ringEl.style.width = '34px';
      ringEl.style.height = '34px';
      ringEl.style.borderColor = 'rgba(255,77,0,0.5)';
    };

    const selectors = 'a, button, .svc, .wc, .cc, .ps, .port-card';
    const interactiveEls = document.querySelectorAll(selectors);

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    document.addEventListener('mousemove', onMouseMove);

    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll(selectors);
      newEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      const els = document.querySelectorAll(selectors);
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        id="cursor"
        style={{
          position: 'fixed',
          width: '10px',
          height: '10px',
          background: 'var(--orange)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      <div
        ref={ringRef}
        id="cursorRing"
        style={{
          position: 'fixed',
          width: '34px',
          height: '34px',
          border: '1px solid rgba(255,77,0,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
        }}
      />
    </>
  );
}
