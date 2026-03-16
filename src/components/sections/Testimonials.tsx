import RevealWrapper from '@/components/ui/RevealWrapper';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding: '100px var(--pad)',
        borderBottom: '1px solid var(--grey)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost BG Text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 14vw, 200px)',
          color: 'rgba(255,77,0,0.05)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        QUOTE
      </div>

      <RevealWrapper>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}>
          {/* Opening Quote */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 6vw, 80px)',
              color: 'var(--orange)',
              lineHeight: 0.5,
              marginBottom: '24px',
              fontStyle: 'normal',
            }}
          >
            &ldquo;
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              lineHeight: 1.6,
              color: 'rgba(245,240,232,0.85)',
              marginBottom: '24px',
            }}
          >
            Pranav doesn&apos;t just execute — he thinks. Every piece of content has a strategy
            behind it, and the results speak for themselves. Rare to find someone who can do
            both at this level.
          </blockquote>

          {/* Closing Quote */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 6vw, 80px)',
              color: 'var(--orange)',
              lineHeight: 0.5,
              marginBottom: '32px',
              fontStyle: 'normal',
            }}
          >
            &rdquo;
          </div>

          {/* Attribution */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '1.5px',
                color: 'rgba(245,240,232,0.55)',
                marginBottom: '6px',
              }}
            >
              — Client, Dubai UAE
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.22)',
              }}
            >
              (Real testimonial coming soon)
            </p>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
