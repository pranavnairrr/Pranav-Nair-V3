// Deno Edge Function. Deploy with: npx supabase functions deploy fetch-link-preview
//
// Fetches a URL server-side (avoids browser CORS entirely) and returns a
// generic preview card built from its Open Graph tags — used for anything
// pasted into the post editor that isn't a YouTube link (those get a real
// native embed client-side instead, via Tiptap's own YouTube extension).
// Results are cached in link_previews so the same URL is never re-fetched.

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function extractMeta(html: string, prop: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${prop}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']*)["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return decodeHtmlEntities(m[1]);
  }
  return null;
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function platformFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host.includes('twitter.com') || host.includes('x.com')) return 'x';
    if (host.includes('threads.net')) return 'threads';
    if (host.includes('instagram.com')) return 'instagram';
    if (host.includes('substack.com')) return 'substack';
    if (host.includes('medium.com')) return 'medium';
    return host;
  } catch {
    return 'link';
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'url is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    const { data: cached } = await admin.from('link_previews').select('*').eq('url', url).maybeSingle();
    if (cached) {
      return new Response(JSON.stringify(cached), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const platform = platformFromUrl(url);
    const res = await fetch(url, {
      headers: {
        // Many sites only serve full OG tags to something that looks like
        // a normal browser or a known crawler.
        'User-Agent':
          'Mozilla/5.0 (compatible; PranavNairBot/1.0; +https://pranavnair.co) facebookexternalhit/1.1',
      },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();

    const title = extractMeta(html, 'og:title') || html.match(/<title>([^<]*)<\/title>/i)?.[1] || url;
    const description = extractMeta(html, 'og:description') || extractMeta(html, 'description');
    const image = extractMeta(html, 'og:image');

    const preview = {
      url,
      platform,
      title: title?.trim().slice(0, 200) ?? url,
      description: description?.trim().slice(0, 300) ?? null,
      image_url: image ?? null,
      embed_html: null,
    };

    await admin.from('link_previews').upsert(preview);

    return new Response(JSON.stringify(preview), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
