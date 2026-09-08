const SESSION_KEY = 'pn_session_id';

export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // sessionStorage unavailable (private mode etc.) — fall back to a
    // per-call random id; this just means that visit won't be grouped
    // into a single session server-side.
    return crypto.randomUUID();
  }
}

interface AnalyticsEvent {
  session_id: string;
  path: string;
  referrer?: string;
  event_type: 'pageview' | 'section_view';
  section_id?: string;
  duration_ms?: number;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Raw fetch rather than the supabase-js client so `keepalive` can be set —
// that's what lets events fired right as the user navigates away (e.g. a
// section_view on unmount) actually reach the server instead of being
// cancelled mid-flight.
export function logEvent(event: AnalyticsEvent) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  if (typeof event.duration_ms === 'number' && event.duration_ms < 250) return;

  try {
    fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(event),
    }).catch(() => {
      // Analytics failures should never surface to the visitor.
    });
  } catch {
    // ignore
  }
}
