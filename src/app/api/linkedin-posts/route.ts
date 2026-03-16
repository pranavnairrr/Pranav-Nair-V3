import { NextResponse } from 'next/server';

export const revalidate = 3600;

export interface LinkedInPost {
  id: string;
  text: string;
  publishedAt: number; // unix ms
  url: string;
}

// ── helpers ────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractBetween(str: string, open: string, close: string): string {
  const start = str.indexOf(open);
  if (start === -1) return '';
  const from = start + open.length;
  const end = str.indexOf(close, from);
  return end === -1 ? '' : str.slice(from, end).trim();
}

function parseRssItems(xml: string): LinkedInPost[] {
  const items: LinkedInPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const title = stripHtml(extractBetween(block, '<title>', '</title>').replace(/<!\[CDATA\[/, '').replace(/\]\]>/, ''));
    const link = extractBetween(block, '<link>', '</link>') ||
                 extractBetween(block, '<guid>', '</guid>');
    const pubDate = extractBetween(block, '<pubDate>', '</pubDate>');
    const description = stripHtml(
      (extractBetween(block, '<description>', '</description>') ||
       extractBetween(block, '<content:encoded>', '</content:encoded>'))
        .replace(/<!\[CDATA\[/, '')
        .replace(/\]\]>/, '')
    );

    // Prefer description body; fall back to title
    const text = description.length > title.length ? description : title;
    if (!text || !link) continue;

    items.push({
      id: link,
      text: text.slice(0, 600),
      publishedAt: pubDate ? new Date(pubDate).getTime() : Date.now(),
      url: link,
    });
  }

  return items;
}

// ── LinkedIn API source ────────────────────────────────────────────────────

async function fetchFromLinkedInAPI(token: string, memberId: string): Promise<LinkedInPost[]> {
  const res = await fetch(
    `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn%3Ali%3Aperson%3A${memberId})&count=9&sortBy=LAST_MODIFIED`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202304',
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) throw new Error(`LinkedIn API ${res.status}`);

  const data = await res.json();
  const elements: Record<string, unknown>[] = data.elements ?? [];

  return elements
    .filter((el) => el.lifecycleState === 'PUBLISHED')
    .map((el) => {
      const id = String(el.id ?? '');
      const created = (el.created as { time?: number })?.time ?? 0;
      const content = (el.specificContent as Record<string, unknown>)?.['com.linkedin.ugc.ShareContent'] as Record<string, unknown> | undefined;
      const text = (content?.shareCommentary as { text?: string })?.text ?? '';
      return {
        id,
        text: text.slice(0, 600),
        publishedAt: created,
        url: `https://www.linkedin.com/feed/update/${id}/`,
      };
    })
    .filter((p) => p.text.length > 0);
}

// ── RSS.app source ─────────────────────────────────────────────────────────

async function fetchFromRSS(rssUrl: string): Promise<LinkedInPost[]> {
  const res = await fetch(rssUrl, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`RSS fetch ${res.status}`);
  const xml = await res.text();
  return parseRssItems(xml);
}

// ── Route handler ──────────────────────────────────────────────────────────

export async function GET() {
  const token    = process.env.LINKEDIN_ACCESS_TOKEN;
  const memberId = process.env.LINKEDIN_MEMBER_ID;
  const rssUrl   = process.env.LINKEDIN_RSS_URL;

  // 1 ─ Try LinkedIn API
  if (token && memberId) {
    try {
      const posts = await fetchFromLinkedInAPI(token, memberId);
      return NextResponse.json({ posts, source: 'api' });
    } catch (err) {
      console.warn('LinkedIn API failed, trying RSS fallback:', err);
    }
  }

  // 2 ─ Try RSS.app feed
  if (rssUrl) {
    try {
      const posts = await fetchFromRSS(rssUrl);
      return NextResponse.json({ posts, source: 'rss' });
    } catch (err) {
      console.error('RSS fallback also failed:', err);
      return NextResponse.json({ error: 'Failed to fetch posts.' }, { status: 500 });
    }
  }

  // 3 ─ Nothing configured
  return NextResponse.json(
    { error: 'LinkedIn credentials not configured.' },
    { status: 503 }
  );
}
