export default function Marquee() {
  const items = [
    'Brand Strategy',
    'Google Ads',
    'Meta Ads',
    'Content Creation',
    'AI-Powered Marketing',
    'Social Media',
    'Creative Direction',
    'Performance Marketing',
  ];

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: 'var(--orange)',
        overflow: 'hidden',
        borderBottom: '1px solid var(--grey)',
        padding: '14px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 24s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--black)',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              paddingRight: '20px',
            }}
          >
            {item}
            <span
              style={{
                color: 'rgba(8,8,8,0.45)',
                fontSize: '14px',
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
