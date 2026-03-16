'use client';

import { useEffect, useState } from 'react';
import RevealWrapper from '@/components/ui/RevealWrapper';
import type { LinkedInPost } from '@/app/api/linkedin-posts/route';

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function PostCard({ post, index }: { post: LinkedInPost; index: number }) {
  const [hovered, setHovered] = useState(false);

  // Split text: first line as "headline", rest as body
  const lines = post.text.split('\n').filter(Boolean);
  const headline = lines[0] ?? '';
  const body = lines.slice(1).join('\n').trim();

  return (
    <RevealWrapper delay={index * 0.07}>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: hovered ? '#111' : 'var(--black)',
          border: '1px solid var(--grey)',
          padding: '28px 24px',
          textDecoration: 'none',
          transition: 'background 0.2s',
          cursor: 'none',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          {/* LinkedIn wordmark */}
          <svg
            width="72"
            height="18"
            viewBox="0 0 72 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="LinkedIn"
          >
            <path
              d="M2.25 0C1.007 0 0 1.007 0 2.25v13.5C0 16.993 1.007 18 2.25 18h13.5C16.993 18 18 16.993 18 15.75V2.25C18 1.007 16.993 0 15.75 0H2.25ZM5.4 14.4H3V6.6h2.4v7.8ZM4.2 5.55a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7ZM15 14.4h-2.4v-3.9c0-.93-.018-2.13-1.296-2.13-1.299 0-1.5 1.014-1.5 2.061V14.4H7.4V6.6h2.304v1.062h.033c.321-.609 1.104-1.248 2.271-1.248 2.43 0 2.88 1.596 2.88 3.672V14.4H15Z"
              fill="rgba(245,240,232,0.18)"
            />
            <text
              x="22"
              y="13"
              fontFamily="DM Sans, sans-serif"
              fontSize="10"
              fontWeight="500"
              letterSpacing="1"
              fill="rgba(245,240,232,0.18)"
              textAnchor="start"
            >
              LinkedIn
            </text>
          </svg>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.22)',
            }}
          >
            {timeAgo(post.publishedAt)}
          </span>
        </div>

        {/* Headline */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.1,
            color: hovered ? 'var(--orange)' : 'var(--white)',
            marginBottom: body ? '14px' : '0',
            transition: 'color 0.2s',
            flexShrink: 0,
          }}
        >
          {headline.length > 120 ? headline.slice(0, 120) + '…' : headline}
        </p>

        {/* Body excerpt */}
        {body && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(245,240,232,0.38)',
              flexGrow: 1,
            }}
          >
            {body.length > 220 ? body.slice(0, 220) + '…' : body}
          </p>
        )}

        {/* Footer arrow */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: hovered ? 'var(--orange)' : 'rgba(245,240,232,0.2)',
            transition: 'color 0.2s',
          }}
        >
          Read on LinkedIn
          <span style={{ fontSize: '11px' }}>→</span>
        </div>
      </a>
    </RevealWrapper>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        border: '1px solid var(--grey)',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {['60%', '90%', '75%', '80%', '50%'].map((w, i) => (
        <div
          key={i}
          style={{
            height: i === 0 ? '8px' : '10px',
            width: w,
            background: 'var(--grey)',
            borderRadius: '2px',
            animation: 'pulse 1.6s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function LinkedInPosts() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error' | 'unconfigured'>('loading');

  useEffect(() => {
    fetch('/api/linkedin-posts')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setStatus(data.error.includes('not configured') ? 'unconfigured' : 'error');
        } else {
          setPosts(data.posts ?? []);
          setStatus('ok');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section
      id="linkedin"
      style={{ padding: '88px var(--pad)', borderBottom: '1px solid var(--grey)' }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .li-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--grey);
          border: 1px solid var(--grey);
        }
        .li-grid > * { background: var(--black); }
        @media (max-width: 960px) {
          .li-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .li-grid { grid-template-columns: 1fr !important; }
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
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          <div>
            <span className="sec-lbl">Thoughts &amp; Insights</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 5.5vw, 80px)',
                lineHeight: 0.92,
              }}
            >
              ON <span style={{ color: 'var(--orange)' }}>LINKEDIN</span>
            </h2>
          </div>
          <a
            href="https://linkedin.com/in/pranavnairrr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ flexShrink: 0 }}
          >
            Follow on LinkedIn
          </a>
        </div>
      </RevealWrapper>

      {/* States */}
      {status === 'loading' && (
        <div className="li-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {status === 'ok' && posts.length > 0 && (
        <div className="li-grid">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}

      {status === 'ok' && posts.length === 0 && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'rgba(245,240,232,0.3)',
          }}
        >
          No posts found.
        </p>
      )}

      {(status === 'error' || status === 'unconfigured') && (
        <div
          style={{
            border: '1px solid var(--grey)',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--orange)',
            }}
          >
            {status === 'unconfigured' ? 'Setup Required' : 'Connection Error'}
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(245,240,232,0.35)',
              maxWidth: '480px',
              lineHeight: 1.75,
            }}
          >
            {status === 'unconfigured'
              ? 'Add LINKEDIN_ACCESS_TOKEN and LINKEDIN_MEMBER_ID to .env.local to display posts automatically.'
              : 'Could not load LinkedIn posts. Your access token may have expired — update it in .env.local.'}
          </p>
          <a
            href="https://linkedin.com/in/pranavnairrr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ marginTop: '8px' }}
          >
            View Profile on LinkedIn
          </a>
        </div>
      )}
    </section>
  );
}
