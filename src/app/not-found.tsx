import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          marginBottom: '20px',
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 8vw, 64px)',
          lineHeight: 0.95,
          marginBottom: '20px',
          color: 'var(--white)',
        }}
      >
        PAGE NOT FOUND
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 300,
          color: 'rgba(245,240,232,0.5)',
          marginBottom: '36px',
          maxWidth: '400px',
        }}
      >
        That page doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn btn-orange">
        Back to Home
      </Link>
    </main>
  );
}
