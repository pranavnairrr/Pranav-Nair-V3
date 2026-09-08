import { google } from 'googleapis';

// Server-only. Reads Google Search Console data via a service account.
// Mirrors the supabaseClient pattern: if the env vars aren't set yet,
// every function here just returns null/empty instead of throwing, so the
// site works fine before this is configured — the stats block simply
// doesn't render.
//
// Setup (one-time, done by the site owner, not this code):
//   1. In Google Search Console, verify pranavnair.co as a property.
//   2. In Google Cloud Console, enable the "Search Console API" and create
//      a service account + JSON key.
//   3. In Search Console > Settings > Users and permissions, add the
//      service account's email as a Restricted user (read-only is enough).
//   4. Set GOOGLE_SC_CLIENT_EMAIL, GOOGLE_SC_PRIVATE_KEY, and
//      GOOGLE_SC_SITE_URL (e.g. "https://pranavnair.co" or
//      "sc-domain:pranavnair.co") in .env.local and in Vercel's env vars.

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

function getClient() {
  const email = process.env.GOOGLE_SC_CLIENT_EMAIL;
  const key = process.env.GOOGLE_SC_PRIVATE_KEY;
  if (!email || !key) return null;
  return new google.auth.JWT({
    email,
    // Vercel/`.env` files store multi-line keys with literal "\n" — un-escape them.
    key: key.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  });
}

function getSiteUrl(): string | null {
  return process.env.GOOGLE_SC_SITE_URL ?? null;
}

export interface SearchTotals {
  clicks: number;
  impressions: number;
}

// In-memory cache so we don't call the GSC API on every single page load —
// this module runs inside the server component render, and GSC data only
// changes about once a day anyway. Per serverless instance, not shared
// across regions, which is fine for a "roughly how many" stat.
let cachedTotals: { value: SearchTotals | null; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// GSC only retains ~16 months of history — this is effectively "since the
// property started being tracked," not literally forever, but for a site
// this new the two coincide.
export async function getSearchTotals(): Promise<SearchTotals | null> {
  if (cachedTotals && Date.now() - cachedTotals.fetchedAt < CACHE_TTL_MS) {
    return cachedTotals.value;
  }

  const auth = getClient();
  const siteUrl = getSiteUrl();
  if (!auth || !siteUrl) return null;

  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3); // GSC has a ~2-3 day reporting lag
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 16);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      },
    });

    const row = res.data.rows?.[0];
    const value = row ? { clicks: row.clicks ?? 0, impressions: row.impressions ?? 0 } : { clicks: 0, impressions: 0 };
    cachedTotals = { value, fetchedAt: Date.now() };
    return value;
  } catch {
    return null;
  }
}

// Per-URL search impressions/clicks (e.g. for a single blog post).
export async function getPageSearchTotals(pageUrl: string): Promise<SearchTotals | null> {
  const auth = getClient();
  const siteUrl = getSiteUrl();
  if (!auth || !siteUrl) return null;

  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3);
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 16);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        dimensionFilterGroups: [
          { filters: [{ dimension: 'page', operator: 'equals', expression: pageUrl }] },
        ],
      },
    });

    const row = res.data.rows?.[0];
    if (!row) return { clicks: 0, impressions: 0 };
    return { clicks: row.clicks ?? 0, impressions: row.impressions ?? 0 };
  } catch {
    return null;
  }
}
